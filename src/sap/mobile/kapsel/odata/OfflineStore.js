// https://help.sap.com/saphelp_smp305sdk/helpdata/en/5e/ad1a55804310149b19b8d5b5d9100b/frameset.htm
sap.ui.define([
	"sap/ui/base/Object",
	"com/pepsico/core/sap/kapsel/odata/OfflineStoreException"
], function(Object, OfflineStoreException) {
	"use strict";
	let UnhandledRejection = Object.extend("com.pepsico.core.sap.kapsel.odata.OfflineStore", {
		constructor: function(oProperties) {
			Object.call(this);
			this._oOfflineStore = sap.OData.createOfflineStore(oProperties);
		},
		open: function(oOptions) {
			return new Promise(function(fnResolve, fnReject) {
				this._oOfflineStore.open(
					() => fnResolve(),
					(oError) => fnReject(new OfflineStoreException({
						sMessage: "Failed to open offline store",
						oCausedBy: oError
					})),
					oOptions
				);
			});
		},
		close: function() {
			return new Promise(function(fnResolve, fnReject) {
				this._oOfflineStore.open(
					() => fnResolve(),
					(oError) => fnReject(new OfflineStoreException({
						sMessage: "Failed to open offline store",
						oCausedBy: oError
					}))
				);
			});
		},
		refresh: function(oSubset) {
			return new Promise(function(fnResolve, fnReject) {
				this._oOfflineStore.refresh(
					() => fnResolve(),
					(oError) => fnReject(new OfflineStoreException({
						sMessage: "Failed to open offline store",
						oCausedBy: oError
					})),
					oSubset
				);
			});
		},
		clear: function() {
			return new Promise(function(fnResolve, fnReject) {
				this._oOfflineStore.clear(
					() => fnResolve(),
					(oError) => fnReject(new OfflineStoreException({
						sMessage: "Failed to open offline store",
						oCausedBy: oError
					}))
				);
			});
		},
		flush: function() {
			return new Promise(function(fnResolve, fnReject) {
				this._oOfflineStore.flush(
					() => fnResolve(),
					(oError) => fnReject(new OfflineStoreException({
						sMessage: "Failed to open offline store",
						oCausedBy: oError
					}))
				);
			});
		},
	});

	return UnhandledRejection;
});