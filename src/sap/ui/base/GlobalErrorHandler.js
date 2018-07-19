sap.ui.define([
	"sap/ui/base/Object",
	"com/pepsico/core/sap/ui/base/UnhandledRejection"
], function(Object, UnhandledRejection) {
	"use strict";
	let GlobalErrorHandler = Object.extend("com.pepsico.core.sap.ui.base.GlobalErrorHandler", {
		constructor: function() {
			Object.apply(this);
			this._aHandlers = new Map();
			this._fnBindedHandleWindowOnError = this._handleWindowOnError.bind(this);
			this._fnBindedHandleWindowOnUnhandledRejection = this._handleWindowOnUnhandledRejection.bind(this);
		},
		attachError: function({
			fnHandler = undefined,
			oListener = null,
			oData = {}
		} = {}) {
			if(this._aHandlers.size === 0) {
				this._activate();
			}
			this._aHandlers.set(fnHandler, {
				fnHandler: fnHandler.bind(oListener || {}),
				oListener: oListener,
				oData: oData
			});
		},
		detachError: function(fnHandler) {
			this._aHandlers.delete(fnHandler);
			if(this._aHandlers.size === 0) {
				this._deactivate();
			}
		},
		_activate: function() {
			window.addEventListener('error', this._fnBindedHandleWindowOnError);
			window.addEventListener('unhandledrejection', this._fnBindedHandleWindowOnUnhandledRejection);
		},
		_deactivate: function() {
			window.removeEventListener('error', this._fnBindedHandleWindowOnError);
			window.removeEventListener('unhandledrejection', this._fnBindedHandleWindowOnUnhandledRejection);
		},
		_handleWindowOnError: function(oEvent) {
			this._fireOnError(oEvent.error);	
		},
		_handleWindowOnUnhandledRejection: function(oEvent) {
			this._fireOnError(new UnhandledRejection({
				sMessage: "Unhandled rejection in Promise",
				oCausedBy: oEvent.reason,
				oPromisedBy: oEvent.promise
			}));
		},
		_fireOnError: function(oException) {
			this._aHandlers.forEach((oValue, oKey, oMap) => {
				oValue.fnHandler({
					oException: oException,
					oData: oValue.oData
				});
			});
		}
	});

	return GlobalErrorHandler;
});