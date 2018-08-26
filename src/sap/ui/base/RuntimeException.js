sap.ui.define([
	"sap/ui/base/Object",
	"com/pepsico/core/sap/ui/base/ExceptionStringifier"
], function(Object, ExceptionStringifier) {
	"use strict";
	let webLogPublisher = Object.extend("com.pepsico.core.sap.ui.base.RuntimeException", {
		constructor: function({
			sName = "RuntimeException",
			sMessage = "",
			oCausedBy = null
		} = {}) {
			Object.apply(this);
			this._sName = sName;
			this._sMessage = sMessage;
			this._oCausedBy = oCausedBy;
			// get stack trace;
			let tmp = Error.call(this, "");
			this._sStackTrace = this._removeFirstLinesFromStackTrace(tmp.stack, 2); // first two lines contains class name and constructor call
		},
		_removeFirstLinesFromStackTrace: function(sStackTrace, iNumLines) {
			let aLines = sStackTrace.split('\n');
			aLines.splice(0,iNumLines); 
			return aLines.join('\n');
		},
		getName: function() {
			return this._sName;
		},
		getMessage: function() {
			return this._sMessage;
		},
		getCausedBy: function() {
			return this._oCausedBy;
		},
		printStackTrace: function() {
			return this._sStackTrace;
		},
		_printCauseBy: function(oException) {
			if (!oException) {
				return "";
			}
			return "Caused by: " + ExceptionStringifier.stringify(oException);
		},
		toString: function() {
			return this.getName() + ": " + this.getMessage() + "\n" +
					this.printStackTrace() + "\n" +
					this._printCauseBy(this.getCausedBy());
		}
	});

	return webLogPublisher;
});