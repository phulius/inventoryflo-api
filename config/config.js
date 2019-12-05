// const aes256 = require("aes256");
// const aws = require("aws-sdk");
// const kms = new aws.KMS();
// const env = process.env.env;
// var dataKey = None;

// function getDataKey() {
// 	let encryptedDataKey = Buffer.from(process.env.data_key, "base64");
// 	dataKey = await kms.decrypt();
// }

// function decrypt(cipherText) {
// 	if (dataKey == None) {
// 		dataKey = getDataKey();
// 	}
// 	return aes256.decrypt(dataKey, cipherText);
// }

// exports.get = key => {};
