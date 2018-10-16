sap.ui.define([
	"sap/ui/base/Object",
	"com/pepsico/core/sap/netweaver/utils/UserExitStrategyException",
	"com/pepsico/core/sap/ui/model/odata/v2/ODataModel"
], function(Object, UserExitStrategyException, ODataModelExt) {
	"use strict";
	/*
		aFieldValueMapping = [
			{ 
				ExitId: "EXIT01",
				FieldValue1: "",
				FieldValue2: "",
				FieldValue3: "",
			}
		];
	*/
	return Object.extend("com.pepsico.core.sap.netweaver.utils.UserExitStrategy", {
		constructor: function({
			aUserExitIds = [],
			aUserExitStrategyMapping = undefined,
			sServiceUrl = undefined
		} = {}) {
			Object.apply(this);
			this._aUserExitIds = aUserExitIds;
			this._aUserExitStrategyMapping = aUserExitStrategyMapping;
			this._oInitDeferred = $.Deferred();
			this._oOdataModel = new ODataModelExt(
				sServiceUrl, {
					json: true,
					useBatch: true,
					defaultBindingMode: sap.ui.model.BindingMode.TwoWay,
					defaultUpdateMethod: sap.ui.model.odata.UpdateMethod.Put,
					loadMetadataAsync: true
				}
			);
		},
		init: function() {
			return new Promise((fnResolve, fnReject) => {
				if (this._aUserExitStrategyMapping) {
					this._oInitDeferred.resolve();
					fnResolve();
				} else {
					this._aUserExitStrategyMapping = [];
					this._oOdataModel.readPromise("/UserExit2Set")
						.then((oData) => { 
							oData.results
								.forEach((oItem) => this._aUserExitStrategyMapping.push(oItem));
							this._oInitDeferred.resolve();
							fnResolve();
						});
				}	
			});
		},
		getInitDeferred: function() {
			return this._oInitDeferred;
		},
		exec: function({
			sUserExitId = undefined,
			sFieldValue1 = undefined,
			sFieldValue2 = undefined,
			sFieldValue3 = undefined,
			sFieldValue4 = undefined,
			sFieldValue5 = undefined,
			oHandler = undefined,
			oData = undefined
		}) {
			if (!sUserExitId) {
				throw new UserExitStrategyException({
					sMessage: 'UserExitId parameter is missing'
				});
			}
			if (!oHandler) {
				throw new UserExitStrategyException({
					sMessage: 'Handler parameter is missing'
				});
			}
			if (this._aUserExitStrategyMapping === undefined) {
				throw new UserExitStrategyException({
					sMessage: 'User Exit Strategy is not initialised, call init() before exec()'
				});
			}
			if (!this._aUserExitIds.find(sId => sId === sUserExitId)) {
				throw new UserExitStrategyException({
					sMessage: `UserExitId "${sUserExitId}" is not found in UserExitStrategy`
				});
			}
			this._aUserExitStrategyMapping
				.filter(oEntry =>
					oEntry.UserExitId === sUserExitId &&
					oEntry.FieldValue1 === sFieldValue1 &&
					(oEntry.FieldValue2 === sFieldValue2 || !oEntry.FieldValue2) &&
					(oEntry.FieldValue3 === sFieldValue3 || !oEntry.FieldValue3) &&
					(oEntry.FieldValue4 === sFieldValue4 || !oEntry.FieldValue4) &&
					(oEntry.FieldValue5 === sFieldValue5 || !oEntry.FieldValue5)
				)
				.forEach(oEntry => {
					if (typeof oHandler[oEntry.FunctionName] !== 'function') {
						throw new UserExitStrategyException({
							sMessage: `"${oEntry.FunctionName}" not found in the Handler or is not a function, UserExitId: "${sUserExitId}"`
						});
					}
					oHandler[oEntry.FunctionName].call(oHandler, oData);
				});
		}
	});
});