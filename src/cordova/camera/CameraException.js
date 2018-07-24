sap.ui.define([
	"com/pepsico/core/sap/ui/base/RuntimeException"
], function(RuntimeException) {
	"use strict";
	let UnhandledRejection = RuntimeException.extend("com.pepsico.core.cordova.camera.CameraException", {
		constructor: function({
			sName = "CameramException",
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
	
	return UnhandledRejection;
});