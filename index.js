console.log("Loading function");
const { Pool } = require("pg");
const pool = new Pool({
	user: "root",
	host: "if-dev-use2-db-instance-1.ctshbytidoqu.us-east-2.rds.amazonaws.com",
	database: "inventoryflo",
	password: "inventoryflo",
	port: 5432,
});

const resourceDbDetails = {
	items: { table: "itemstemp", id: "sku" },
	contacts: { table: "contacts", id: "id" },
};

function respond(status, body, headers = {}) {
	let defaultHeaders = {
		"Content-Type": "application/json",
	};
	return {
		isBase64Encoded: false,
		statusCode: String(status),
		body: String(body),
		headers: { ...defaultHeaders, ...headers },
	};
}

function get(resource, resourceId) {
	dbDetails = resourceDbDetails[resource];
	let all = resourceId === null;
	let condition = all ? "" : ` WHERE ${dbDetails.id} = '${resourceId}'`;
	let queryStr = `SELECT * FROM ${dbDetails.table}${condition}`;
	console.log(queryStr);
	return pool
		.query(queryStr)
		.then(res => {
			console.log(res.rows);
			return respond(200, JSON.stringify(all ? res.rows : res.rows[0]));
		})
		.catch(err => {
			console.log(err);
			return respond(500, err);
		});
}

function post(resource, record) {
	dbDetails = resourceDbDetails[resource];
	let keys = Object.keys(record).join(", ");
	let valuesStr = Array(Object.keys(record).length) //todo change
		.fill(0)
		.map((_, i) => `$${i + 1}`)
		.join(", ");
	let values = Object.values(record);
	let queryStr = `INSERT INTO ${dbDetails.table}(${keys}) VALUES(${valuesStr}) RETURNING *`;
	console.log(queryStr);
	return pool
		.query(queryStr, values)
		.then(res => {
			console.log(res.rows);
			return respond(200, JSON.stringify(res.rows[0]));
		})
		.catch(err => {
			console.log(err);
			return respond(500, err);
		});
}

function put(resource, record, id) {
	dbDetails = resourceDbDetails[resource];
	let keys = Object.keys(record)
		.map((key, i) => `${key} = $${i + 1}`)
		.join(", ");
	let values = Object.values(record);
	let queryStr = `UPDATE ${dbDetails.table} SET ${keys} WHERE ${dbDetails.id} = '${id}'`;
	console.log(queryStr);
	return pool
		.query(queryStr, values)
		.then(res => {
			console.log(res.rows);
			return respond(200, JSON.stringify(res.rows[0]));
		})
		.catch(err => {
			console.log(err);
			return respond(500, err);
		});
}

exports.handler = async event => {
	let method = event.httpMethod;
	let path = event.path.split("/");
	let endpoint = path[1];
	let id;
	let record;

	switch (method) {
		case "OPTIONS":
			let allowedMethods = "OPTIONS, GET, POST, PUT, DELETE";
			return respond(200, "", {
				Allow: allowedMethods,
				"Access-Control-Allow-Methods": allowedMethods,
				"Access-Control-Allow-Origin": "*",
				"Content-Length": "0",
			});
		case "GET":
			id = path.length >= 3 && path[2] ? path[2] : null;
			return get(endpoint, id);
		case "POST":
			record = JSON.parse(event.body);
			return post(endpoint, record);
		case "PUT":
			id = path[2];
			record = JSON.parse(event.body);
			return put(endpoint, record, id);
		case "DELETE":
			break;
		default:
			return respond(404, "Unsupported method: " + method);
	}
};
