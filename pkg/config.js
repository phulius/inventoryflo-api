// const aes256 = require("aes256");
// const aws = require("aws-sdk");
// const kms = new aws.KMS();
// const env = process.env.env;
// var dataKey = None;

// const constants = {};

// const envVars = {};

// const secrets = {};

// function getDataKey() {
// 	let encryptedDataKey = Buffer.from(process.env.data_key, "base64");
// 	dataKey = kms.decrypt();
// 	return dataKey;
// }

// function decrypt(cipherText) {
// 	if (dataKey == None) {
// 		dataKey = getDataKey();
// 	}
// 	return aes256.decrypt(dataKey, cipherText);
// }

// exports.get = key => {
// 	if (key in constants) {
// 		return constants[key];
// 	}
// 	if (key in envVars[env]) {
// 		return envVars[env][key];
// 	}
// 	if (key in secrets[env]) {
// 		return decrypt(secrets[env][key]);
// 	}
// 	return undefined;
// };
