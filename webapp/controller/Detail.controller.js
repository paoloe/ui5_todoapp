sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/f/library',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
], function (Controller, fioriLibrary, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.demo.fiori2.controller.Detail", {
		onInit: function () {
			this.oOwnerComponent = this.getOwnerComponent();

			this.oView = this.getView();
			this.oRouter = this.oOwnerComponent.getRouter();
			this.oModel = this.oOwnerComponent.getModel();
			this.oActionModel = this.oOwnerComponent.getModel();

			this.oRouter.getRoute("master").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onProductMatched, this);

			// this.oRouter.getRoute("detail").attachMatched(this._onProductMatched, this);
			

			// var oBunlde2 = this.getView().getModel("oModel").getProperty("/");
			// for(var i = 0; i < oBunlde2.length; i++){
			// 	var obj = oBunlde2[i];
			// 	console.log(obj);
			// }
		},

		onSupplierPress: function (oEvent) {
			var bindingContext = oEvent.getSource().getBindingContext("list").getPath(),
				id = bindingContext.split("/").slice(-1).pop();

			this.oRouter.navTo("detailDetail", {
			layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, 
			id: id
			});

			// var oFCL = this.oView.getParent().getParent();
			// oFCL.setLayout(fioriLibrary.LayoutType.ThreeColumnsMidExpanded);
		},

		_onProductMatched: function (oEvent) {		
			var oArguments = oEvent.getParameter("arguments");
			var item = oArguments.id;
			var path = "/" + item + "/listName";
			var listName = this.getView().getModel("oActionModel").getProperty(path);			
			var aFilter = [];

			aFilter.push(new Filter("listName", FilterOperator.Contains, listName));

			// filter binding
			var oList = this.getView().byId("suppliersTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
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
