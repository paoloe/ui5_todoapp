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
			
			this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onPatternMatch, this);
		},

		/* 
			get id of selected action
			filter selected action description by id
		*/
		_onPatternMatch: function (oEvent) {			
			this._action = oEvent.getParameter("arguments").action;
			var path = "/" + this._action + "/ItemId";
			var description = this.getView().getModel("oActModel").getProperty(path);
			var bFilter = [];

			bFilter.push(new Filter("ItemId", FilterOperator.Contains, description));

			// filter binding
			var oList = this.getView().byId("descTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(bFilter);
		},

		onExit: function () {
			this.oRouter.getRoute("detailDetail").detachPatternMatched(this._onPatternMatch, this);
		}
	});
});