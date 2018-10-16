//jQuery.sap.declare("mysapui5_sandbox_app.models.InputWithSearchHelp");
sap.ui.define("com/pepsico/core/sap/m/InputWithSearchHelp", [
	"sap/m/Input"
], function(Input) {
	"use strict";
	return Input.extend("com.pepsico.core.sap.m.InputWithSearchHelp", {
		metadata : {
			properties : {
				suggestionKeyKey: {type : "string", defaultValue : ""}
				suggestionKeyKey: {type : "string", defaultValue : ""}
			}
		},
		
		constructor: function(sId, mSettings) {
			Input.call(this, sId, mSettings);
			this.attachLiveChange(null, this.onLiveChange, this);
			this.attachValueHelpRequest(null, this.onValueHelpRequest, this);
			this._oSelectDialog = null;
			this._aSuggestionItemsFilters = undefined;
		},
		_getBindingPropertyName: function(sProperty) {
			return this.getBinding(sProperty).getPath().split("/").slice(-1)[0];
		},
		onLiveChange: function(oEvent) {
			let sEnteredValue = oEvent.getParameter('value');
			if (sEnteredValue === "") {
				this.setSelectedKey(undefined);
			}
			let aSuggestedItems = this.getBinding("suggestionItems").getModel().getProperty(this.getBinding("suggestionItems").getPath());
			let oFoundItem = aSuggestedItems.find(oItem => oItem[this._getBindingPropertyName("value")] === sEnteredValue);
			if (oFoundItem) {
				this.setSelectedKey(oFoundItem[this._getBindingPropertyName("selectedKey")]);
			}
		},
		onValueHelpRequest: function(oEvent) {
			if (!this._oSelectDialog) {
				this._oSelectDialog = new sap.ui.xmlfragment("com.pepsico.core.sap.m.SelectDialog", this);
				this._aSuggestionItemsFilters = (this.getBinding("suggestionItems").aFilters || []).slice();
			}
			var oTemplate = new sap.m.StandardListItem({
				title: "{" + this._getBindingPropertyName("selectedKey") + "}",
				description: "{" + this._getBindingPropertyName("value") + "}"
			});
			oTemplate.setModel(this.getBinding("suggestionItems").getModel());
			this._oSelectDialog.bindAggregation("items", this.getBinding("suggestionItems").getPath(), oTemplate);
			this._oSelectDialog.setModel(this.getBinding("suggestionItems").getModel());
			this._oSelectDialog.getBinding("items").filter(this.getBinding("suggestionItems").aApplicationFilters || [], sap.ui.model.FilterType
				.Application);
			this._oSelectDialog.open(this.getValue()); // open dialog
		},
		onSelectLiveChange: function(oEvent) {
			var sValue = oEvent.getParameters().value;
			var aFilters = []; //this.getBinding("suggestionItems").aApplicationFilters.slice();
			if (sValue && sValue.length > 0) {
				aFilters.push(new sap.ui.model.Filter({
					filters: [
						new sap.ui.model.Filter({
							path: this._getBindingPropertyName("selectedKey"),
							operator: sap.ui.model.FilterOperator.StartsWith,
							value1: sValue
						}),
						new sap.ui.model.Filter({
							path: this._getBindingPropertyName("value"),
							operator: sap.ui.model.FilterOperator.Contains,
							value1: sValue
						})
					],
					and: false
				}));
			}
			oEvent.getSource().getBinding("items").filter(aFilters);
		},
		onSelectConfirm: function(oEvent) {
			this.setValue(oEvent.getParameters().selectedItem.getDescription());
			this.setSelectedKey(oEvent.getParameters().selectedItem.getTitle());
		},
		renderer: {}
	});
});