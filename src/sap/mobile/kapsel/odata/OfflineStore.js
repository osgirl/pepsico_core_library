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
			this._oOpenedDeferred = $.Deferred();
		},
		open: function(oOptions) {
			let that = this;
			return new Promise(function(fnResolve, fnReject) {
				that._oOfflineStore.open(
					() => {
						that._oOpenedDeferred.resolve();
						fnResolve();
					},
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
					() => {
						that._oOpenedDeferred = $.Deferred();
						fnResolve();
					},
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
		},
		getOpenedDeferred: function() {
			return this._oOpenedDeferred;
		},
		stringifyNotification: function(iNotification) {
			if (iNotification === sap.OfflineStore.Notification.PENDING_REFRESH) {
				return "PENDING_REFRESH";
			} else if (iNotification === sap.OfflineStore.Notification.PENDING_FLUSH) {
				return "PENDING_FLUSH";
			} else {
				return "";
			}
		},
		stringifyProgressState: function(iProgressState) {
			if (iProgressState === sap.OfflineStore.ProgressState.STORE_DOWNLOADING) {
				return "STORE_DOWNLOADING";
			} else if (iProgressState === sap.OfflineStore.ProgressState.REFRESH) {
				return "REFRESH";
			} else if (iProgressState === sap.OfflineStore.ProgressState.FLUSH_REQUEST_QUEUE) {
				return "FLUSH_REQUEST_QUEUE";
			} else if (iProgressState === sap.OfflineStore.ProgressState.DONE) {
				return "DONE";
			} else {
				return "";
			}
		},
		stringifyState: function(iState) {
			if (iState === sap.OfflineStore.State.OPENING) {
				return "OPENING";
			} else if (iState === sap.OfflineStore.State.INITIALIZING) {
				return "INITIALIZING";
			} else if (iState === sap.OfflineStore.State.POPULATING) {
				return "POPULATING";
			} else if (iState === sap.OfflineStore.State.DOWNLOADING) {
				return "DOWNLOADING";
			} else if (iState === sap.OfflineStore.State.OPEN) {
				return "OPEN";
			} else if (iState === sap.OfflineStore.State.CLOSED) {
				return "CLOSED";
			} else {
				return "";
			}
		}
	});

	return OfflineStore;
});