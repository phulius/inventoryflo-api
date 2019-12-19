console.log("Loading function");

const router = require("./pkg/router");

exports.handler = async event => {
	let method = event.httpMethod;

	if (method === "OPTIONS") {
		let allowedMethods = "OPTIONS, GET, POST, PUT, DELETE";
		return response(200, "", {
			Allow: allowedMethods,
			"Access-Control-Allow-Methods": allowedMethods,
			"Access-Control-Allow-Origin": "*",
			"Content-Length": "0",
		});
	}

	let path = event.path.split("/").slice(1);
	let body = JSON.parse(event.body);

	let [resp, err] = router.route(method, path, body);
	if (err != null) {
		return response(err.status, err.message);
	}
	return response(200, resp);
};

function response(status, body, headers = {}) {
	let defaultHeaders = {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	};
	return {
		isBase64Encoded: false,
		statusCode: String(status),
		body: String(body),
		headers: { ...defaultHeaders, ...headers },
	};
}
