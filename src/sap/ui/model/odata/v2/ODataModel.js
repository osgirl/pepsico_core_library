sap.ui.define([
	"sap/ui/model/odata/v2/ODataModel",
	"com/pepsico/core/sap/ui/model/odata/v2/ODataModel/ODataException"
], function(ODataModel, ODataException) {
	"use strict";
	return ODataModel.extend("com.pepsico.core.sap.ui.model.odata.v2.ODataModel.ODataModel", {
		/*constructor: function() {
			ODataModel.call(this);
			
		},*/
		attachChange: function(sPath, fnOnChange) {
			let oBinding = new sap.ui.model.Binding(this, sPath, this.getContext(sPath));
			oBinding.attachChange((oEvent) => fnOnChange(oEvent));
		},
		getRelatedPath: function(sFullPath) {
			return sFullPath.replace(this.sServiceUrl, "");
		},
		read: function(sPath, mParameters) {
			mParameters = mParameters || {};
			var that = this;
			return new Promise(function(fnResolve, fnReject) {
				mParameters.success = fnResolve;
				mParameters.error = (oException) =>
						fnReject(new ODataException({sMessage: "Failed to read '" + sPath + "'", oException}));
				that.read(sPath, mParameters);
			});
		},
		create: function(sPath, oData, mParameters) {
			mParameters = mParameters || {};
			var that = this;
			return new Promise(function(fnResolve, fnReject) {
				mParameters.success = fnResolve;
				mParameters.error = (oException) =>
						fnReject(new ODataException({sMessage: "Failed to create path '" + sPath + "', data: " + JSON.stringify(oData, null, 4), oException}));
				that.read(sPath, mParameters);
			});
		},
		remove: function(sPath, mParameters) {
			mParameters = mParameters || {};
			var that = this;
			return new Promise(function(fnResolve, fnReject) {
				mParameters.success = fnResolve;
				mParameters.error = (oException) =>
						fnReject(new ODataException({sMessage: "Failed to remove '" + sPath + "'", oException}));
				that.remove(sPath, mParameters);
			});
		},
		submitChanges: function(mParameters) {
			mParameters = mParameters || {};
			var that = this;
			return new Promise(function(fnResolve, fnReject) {
				mParameters.success = fnResolve;
				mParameters.error = (oException) =>
						fnReject(new ODataException({sMessage: "Failed to submit changes", oException}));
				that.submitChanges(mParameters);
			});
		},
		callFunction: function(sFuncPath, mParameters) {
			mParameters = mParameters || {};
			var that = this;
			return new Promise(function(fnResolve, fnReject) {
				mParameters.success = fnResolve;
				mParameters.error = (oException) =>
						fnReject(new ODataException({sMessage: "Failed to call function '" + sFuncPath + "'", oException}));
				that.callFunction(sFuncPath, mParameters);
			});
		}
	});
});