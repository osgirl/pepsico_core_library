sap.ui.define([
	"sap/ui/model/odata/v2/ODataModel",
	"com/pepsico/core/sap/ui/model/odata/v2/ODataException"
], function(ODataModel, ODataException) {
	"use strict";
	return {
		attachChange: function(oODataModel, sPath, fnOnChange) {
			let oBinding = new sap.ui.model.Binding(oODataModel, sPath, oODataModel.getContext(sPath));
			oBinding.attachChange((oEvent) => fnOnChange(oEvent));
		},
		getRelatedPath: function(oODataModel, sFullPath) {
			return sFullPath.replace(oODataModel.sServiceUrl, "");
		},
		readPromise: function(oODataModel, sPath, mParameters) {
			mParameters = mParameters || {};
			return new Promise(function(fnResolve, fnReject) {
				mParameters.success = fnResolve;
				mParameters.error = (oException) =>
						fnReject(new ODataException({sMessage: "Failed to read '" + sPath + "'", oCausedBy: oException}));
				oODataModel.read(sPath, mParameters);
			});
		},
		createPromise: function(oODataModel, sPath, oData, mParameters) {
			mParameters = mParameters || {};
			return new Promise(function(fnResolve, fnReject) {
				mParameters.success = fnResolve;
				mParameters.error = (oException) =>
						fnReject(new ODataException({
							sMessage: "Failed to create entry at path '" + sPath + "', data: " + JSON.stringify(oData, null, 4), 
							oCausedBy: oException
						}));
				oODataModel.create(sPath, oData, mParameters);
			});
		},
		removePromise: function(oODataModel, sPath, mParameters) {
			mParameters = mParameters || {};
			return new Promise(function(fnResolve, fnReject) {
				mParameters.success = fnResolve;
				mParameters.error = (oException) =>
						fnReject(new ODataException({sMessage: "Failed to remove '" + sPath + "'", oCausedBy: oException}));
				oODataModel.remove(sPath, mParameters);
			});
		},
		submitChangesPromise: function(oODataModel, mParameters) {
			mParameters = mParameters || {};
			return new Promise(function(fnResolve, fnReject) {
				mParameters.success = fnResolve;
				mParameters.error = (oException) =>
						fnReject(new ODataException({sMessage: "Failed to submit changes", oCausedBy: oException}));
				oODataModel.submitChanges(mParameters);
			});
		},
		callFunctionPromise: function(oODataModel, sFuncPath, mParameters) {
			mParameters = mParameters || {};
			return new Promise(function(fnResolve, fnReject) {
				mParameters.success = fnResolve;
				mParameters.error = (oException) =>
						fnReject(new ODataException({sMessage: "Failed to call function '" + sFuncPath + "'", oCausedBy: oException}));
				oODataModel.callFunction(sFuncPath, mParameters);
			});
		},
		refreshSecurityTokenPromise: function(oODataModel, bAsync) {
			return new Promise(function(fnResolve, fnReject) {
				oODataModel.refreshSecurityToken(fnResolve, fnReject, bAsync);
			});
		}
	};
});