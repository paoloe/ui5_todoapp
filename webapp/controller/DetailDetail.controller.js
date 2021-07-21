sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
], function (JSONModel, Controller, Filter, FilterOperator ) {
	"use strict";

	return Controller.extend("tdapp.controller.DetailDetail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oActionModel = oOwnerComponent.getModel();
			
			this.oRouter.getRoute("detailDetail").attachMatched(this._onPatternMatch, this);
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
			// this._action = oEvent.getParameter("arguments").action || this._action || "0";
			// this._description = oEvent.getParameter("arguments")._description || this._description || "0";

			// this.getView().bindElement({
			// 	path:  "/" + this._action + "/" + this._description,
			// 	model: "products"
			// });
		},

		onExit: function () {
			this.oRouter.getRoute("detailDetail").detachPatternMatched(this._onPatternMatch, this);
		}
	});
});