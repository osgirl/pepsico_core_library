sap.ui.define([
	"sap/ui/base/Object"
], function(Object, WebLogPublisher) {
	"use strict";
	let webLogPublisher = Object.extend("com.pepsico.core.sap.ui.log.WebLogPublisher", {
		constructor: function() {
			Object.apply(this);
			this._bLogListenerAttached = false;
		},
		attachListener: function() {
			if (this._bLogListenerAttached) {
			}
			jQuery.sap.log.addLogListener(this);
			this._bLogListenerAttached = true;
		},
		detachListener: function() {
			jQuery.sap.log.removeLogListener(this);
			this._bLogListenerAttached = false;
		}
	});

	return webLogPublisher;
});