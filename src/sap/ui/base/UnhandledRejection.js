sap.ui.define([
	"com/pepsico/core/sap/ui/base/RuntimeException"
], function(RuntimeException) {
	"use strict";
	let UnhandledRejection = RuntimeException.extend("com.pepsico.core.sap.ui.base.UnhandledRejection", {
		constructor: function({
			sName = "UnhandledRejection",
			sMessage = "",
			oCausedBy = null,
			oPromisedBy = null
		} = {}) {
			RuntimeException.call(this, {
				sName: sName,
				sMessage: sMessage,
				oCausedBy: oCausedBy
			});
			this._oPromisedBy = oPromisedBy;
			// exclude call of this constructor from call stack
			this._sStackTrace = RuntimeException.prototype._removeFirstLinesFromStackTrace.call(this, this._sStackTrace, 1); 
		},
		getPromisedBy: function() {
			return this._oPromisedBy;
		},
		toString: function() {
			return RuntimeException.prototype.toString.call(this) + "\n" +
				"Promised By: " + this.getPromisedBy().toString();
		}
	});
	
	return UnhandledRejection;
});