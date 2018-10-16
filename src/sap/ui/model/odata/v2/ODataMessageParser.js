sap.ui.define([
	"com/pepsico/core/sap/ui/model/odata/v2/ODataMessageParserException"
], function(ODataMessageParserException) {
	"use strict";
	return {
		/**
		 * Parses SAP OData response text and return messages array, with structure:
		 *		code: "ZLLA_COM_CASH_CUST/004"
		 *		message: "Message Text"
		 *		propertyref: ""
		 *		severity: "warning"
		 *		target: ""
		 * @param {string} sResponseText
		 * @returns {array} Messages array
		 */
		parseResponseText: function(sResponseText) {
			try {
				return JSON.parse(sResponseText).error.innererror.errordetails;
			} catch (oException) {
				throw new ODataMessageParserException({
					sMessage: "Failed to parse server response",
					oCausedBy: oException
				});
			}
		}
	};
});