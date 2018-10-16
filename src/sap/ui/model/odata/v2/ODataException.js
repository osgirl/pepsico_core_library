sap.ui.define([
	"com/pepsico/core/sap/ui/base/RuntimeException"
], function(RuntimeException) {
	"use strict";
	let ODataException = RuntimeException.extend("com.pepsico.core.sap.ui.model.odata.v2.ODataException", {
		constructor: function({
			sName = "ODataException",
			sMessage = "",
			oCausedBy = null
		} = {}) {
			RuntimeException.call(this, {
				sName: sName,
				sMessage: sMessage,
				oCausedBy: oCausedBy
			});
			this._sStackTrace = RuntimeException.prototype._removeFirstLinesFromStackTrace.call(this, this._sStackTrace, 1); 
		}
	});
	
	return ODataException;
});