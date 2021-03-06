sap.ui.define([
	"com/pepsico/core/sap/ui/base/RuntimeException"
], function(RuntimeException) {
	"use strict";
	let PushNotificationException = RuntimeException.extend("com.pepsico.core.sap.mobile.kapsel.push.PushNotificationException", {
		constructor: function({
			sName = "PushNotificationException",
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
	
	return PushNotificationException;
});