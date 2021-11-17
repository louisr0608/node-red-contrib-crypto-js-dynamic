module.exports = function (RED) {
	var CryptoJS = require("crypto-js");

	function EncodeMsgNode(config) {
		RED.nodes.createNode(this, config);

		var node = this;
		node.encodemsg = config.encodemsg;

		node.on('input', function (msg) {
			// check configurations
			if(!node.encodemsg) {
				// rising misconfiguration error
				node.error("Missing configuration, please check your encode.", msg);
			} else {
				// check the payload
				if(msg.payload) {
					// debugging message
					node.debug('Encoding payload using '+node.encodemsg);
					// encode with CryptoJS
					msg.payload = CryptoJS.enc[node.encodemsg].stringify(msg.payload);
				} else {
					// debugging message
					node.trace('Nothing to encode: empty payload');
				}

				node.send(msg);
			}
		});
	}

	RED.nodes.registerType("encodemsg", EncodeMsgNode);
};
