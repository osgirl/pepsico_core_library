sap.ui.define([
	"com/pepsico/core/sap/ui/base/RuntimeException"
], function(RuntimeException) {
	"use strict";
	let UnhandledRejection = RuntimeException.extend("com.pepsico.core.sap.netweaver.utils.UserExitStrategyException", {
		constructor: function({
			sName = "UserExitStrategyException",
			sMessage = "",
			oCausedBy = null
		} = {}) {
			RuntimeException.call(this, {
				sName: sName,
				sMessage: sMessage,
				oCausedBy: oCausedBy
			});
			// exclude call of this constructor from call stack
			this._sStackTrace = RuntimeException.prototype._removeFirstLinesFromStackTrace.call(this, this._sStackTrace, 1); 
		}
	});
	
	return UnhandledRejection;
});