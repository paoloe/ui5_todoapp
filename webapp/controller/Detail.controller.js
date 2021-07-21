sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/f/library',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
], function (Controller, fioriLibrary, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("tdapp.controller.Detail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			// this.oView = this.getView();
			this.oRouter = oOwnerComponent.getRouter();
			// this.oModel = oOwnerComponent.getModel();
			// this.oActModel = oOwnerComponent.getModel();
			// this.oCatModel = oOwnerComponent.getModel();
			// this.oProductsTable = this.oView.byId("productsTable");

			// this.oRouter.getRoute("master").attachMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").attachMatched(this._onProductMatched, this);
			// this.oRouter.getRoute("detailDetail").attachMatched(this._onProductMatched, this);
		},

		/* 
			get path of selected action
			pass to detailDetail
		*/
		onSupplierPress: function (oEvent) {
			var bindingContext = oEvent.getSource().getBindingContext("actions").getPath(),
				action = bindingContext.split("/").slice(-1).pop();

			this.oRouter.navTo("detailDetail", {
			layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, 
			action: action
			});
		},

		/*
			get selected item from lists
			get categoryid and filter action list based on this 
		 */
		_onProductMatched: function (oEvent) {		
			this._actions = oEvent.getParameter("arguments").action;
			// var item = oArguments.id;
			var path = "/" + this._actions + "/CategoryId";
			var categoryId = this.getView().getModel("oCatModel").getProperty(path);			
			var aFilter = [];

			aFilter.push(new Filter("Category", FilterOperator.Contains, categoryId));

			// // filter binding
			var oList = this.getView().byId("suppliersTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);

			// this._action = oEvent.getParameter("arguments").action || this._action || "0";
			// this.getView().bindElement({
			// 	path: "/" + this._action,
			// 	model: "actions"
			// });
		},

		onEditToggleButtonPress: function() {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();

			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},

		handleFullScreen: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/fullScreen");
			this.oRouter.navTo("detail", {layout: sNextLayout, product: this._product});
		},

		handleExitFullScreen: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
			this.oRouter.navTo("detail", {layout: sNextLayout, product: this._product});
		},

		handleClose: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/closeColumn");
			this.oRouter.navTo("master", {layout: sNextLayout});
		},

		onExit: function () {
			this.oRouter.getRoute("master").detachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onProductMatched, this);
		}
	});
});
