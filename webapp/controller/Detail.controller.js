sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/f/library'
], function (Controller, fioriLibrary) {
	"use strict";

	return Controller.extend("sap.ui.demo.fiori2.controller.Detail", {
		onInit: function () {
			this.oOwnerComponent = this.getOwnerComponent();

			this.oView = this.getView();
			this.oRouter = this.oOwnerComponent.getRouter();
			this.oModel = this.oOwnerComponent.getModel();

			this.oRouter.getRoute("master").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onProductMatched, this);

			// var oBunlde2 = this.getView().getModel("oModel").getProperty("/");
			// for(var i = 0; i < oBunlde2.length; i++){
			// 	var obj = oBunlde2[i];
			// 	console.log(obj);
			// }
		},

		onSupplierPress: function (oEvent) {
			// var supplierPath = oEvent.getSource().getBindingContext("list").getPath(),
			// 	supplier = supplierPath.split("/").slice(-1).pop();
			// 	oNextUIState;

			// this.oOwnerComponent.getHelper().then(function (oHelper) {
			// 	oNextUIState = oHelper.getNextUIState(2);
			// 	this.oRouter.navTo("detailDetail", {
			// 		layout: oNextUIState.layout,
			// 		supplier: supplier,
			// 		product: this._product
			// 	});
			// }.bind(this));

			// this.oRouter.navTo("detailDetail", {layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, supplier: supplier, product: this._product});

			var oFCL = this.oView.getParent().getParent();
			oFCL.setLayout(fioriLibrary.LayoutType.ThreeColumnsMidExpanded);	
		},

		_onProductMatched: function (oEvent) {
			this._product = oEvent.getParameter("arguments").product || this._product || "0";
			this.getView().bindElement({
				path: "/list/" + this._product,
				model: "list"
			});
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
