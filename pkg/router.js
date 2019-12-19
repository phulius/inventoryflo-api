exports.route = (method, path, body) => {
	switch (method) {
		case "GET":
			return get(path);
		// id = path.length >= 3 && path[2] ? path[2] : null;
		// return get(endpoint, id);
		case "POST":
			return post(path, body);
		// record = JSON.parse(event.body);
		// return post(endpoint, record);
		case "PUT":
			return put(path, body);
		// id = path[2];
		// record = JSON.parse(event.body);
		// return put(endpoint, record, id);
		case "DELETE":
			return del(path);
		default:
			return [null, err(404, "Unsupported method: " + method)];
	}
};

const get = path => {
	return path;
};

const post = (path, body) => {
	return [path, body];
};

const put = (path, body) => {
	return [path, body];
};

const del = path => {
	return path;
};

const err = (s, m) => {
	return {
		status: s,
		message: m,
	};
};
