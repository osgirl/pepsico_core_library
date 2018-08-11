// https://help.sap.com/saphelp_smp305sdk/helpdata/en/5e/ad1a55804310149b19b8d5b5d9100b/frameset.htm
sap.ui.define([
	"sap/ui/base/Object",
	"com/pepsico/core/sap/mobile/kapsel/odata/OfflineStoreException"
], function(Object, OfflineStoreException) {
	"use strict";
	let OfflineStore = Object.extend("com.pepsico.core.sap.mobile.kapsel.odata.OfflineStore", {
		constructor: function(oProperties) {
			Object.call(this);
			this._oOfflineStore = sap.OData.createOfflineStore(oProperties);
		},
		open: function(oOptions) {
			let that = this;
			return new Promise(function(fnResolve, fnReject) {
				that._oOfflineStore.open(
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
			let that = this;
			return new Promise(function(fnResolve, fnReject) {
				that._oOfflineStore.close(
					() => fnResolve(),
					(oError) => fnReject(new OfflineStoreException({
						sMessage: "Failed to close offline store",
						oCausedBy: oError
					}))
				);
			});
		},
		refresh: function(oSubset) {
			let that = this;
			return new Promise(function(fnResolve, fnReject) {
				that._oOfflineStore.refresh(
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
			let that = this;
			return new Promise(function(fnResolve, fnReject) {
				that._oOfflineStore.clear(
					() => fnResolve(),
					(oError) => fnReject(new OfflineStoreException({
						sMessage: "Failed to open offline store",
						oCausedBy: oError
					}))
				);
			});
		},
		flush: function() {
			let that = this;
			return new Promise(function(fnResolve, fnReject) {
				that._oOfflineStore.flush(
					() => fnResolve(),
					(oError) => fnReject(new OfflineStoreException({
						sMessage: "Failed to open offline store",
						oCausedBy: oError
					}))
				);
			});
		},
		getStore: function() {
			return this._oOfflineStore;
		}
	});

	return OfflineStore;
});