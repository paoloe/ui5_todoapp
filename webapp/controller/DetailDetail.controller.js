sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
], function (JSONModel, Controller, Filter, FilterOperator ) {
	"use strict";

	return Controller.extend("sap.ui.demo.fiori2.controller.DetailDetail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oActionModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("detailDetail").attachMatched(this._onPatternMatch, this);
		},

		_onPatternMatch: function (oEvent) {			
			var oArguments = oEvent.getParameter("arguments");
			var item = oArguments.id;
			var path = "/" + item + "/description"
			var description = this.getView().getModel("oActionModel").getProperty(path);	
			
			var aFilter = [];

			aFilter.push(new Filter("description", FilterOperator.EQ, description));

			// filter binding
			var oList = this.getView().byId("descTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onExit: function () {
			this.oRouter.getRoute("detailDetail").detachPatternMatched(this._onPatternMatch, this);
		}
	});
});