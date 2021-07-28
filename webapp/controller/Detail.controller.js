sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/f/library',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/syncStyleClass",
	"sap/ui/core/Fragment",
], function (Controller, fioriLibrary, Filter, FilterOperator, syncStyleClass, Fragment) {
	"use strict";

	return Controller.extend("tdapp.controller.Detail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();
			this.oRouter = oOwnerComponent.getRouter();
			this.oRouter.getRoute("detail").attachMatched(this._onProductMatched, this);
		},

		onOpenDialog: function () {
			var oView = this.getView();

			// create dialog lazily
			if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "tdapp.view.fragment.AddAction",
					controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					return oDialog;
				});
			} 
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
		},

		onDialogAddPress: function () {
			// don't actually know what the below is doing?...
			const isInput = control => control.isA("sap.m.InputBase");
			// below retrieves the input values as an array from the dialogue
			var aFormInput = this.byId("form").getControlsByFieldGroupId("inputs").filter(isInput);
			this.oActModel = this.getOwnerComponent().getModel("oActModel");
			var aInput = this.oActModel.getData();

			aInput.push({"ItemId": "a5",
						"Category": "c1",
						"Selected": false,
						"Action": "Add check box",
						"Description": "You can add more text here for additional notes 1",
						"DateSet": this.getCurrentDate(),
						"DateDue": "01/07/2021"});
			
			//this.oActModel.setProperty("/", aInput);
			this.oActModel.setData(aInput);

			// aFormInput.forEach(function(oInputElement, i){
			// 	var test = oInputElement.lastValue;
			// });

			// this.oActModel.getData().push({	"ItemId": "a5",
			// 							"Category": "c1",
			// 							"Selected": true,
			// 							"Action": "Add check box",
			// 							"Description": "You can add more text here for additional notes 1",
			// 							"DateSet": this.getCurrentDate(),
			// 							"DateDue": "01/07/2021"});;
			// console.log(this.oActModel);
		},
		
		getCategory: function(){
			
		},

		getNewItemId: function(){
			return this.oActModel[length];
		},

		getCurrentDate: function(){
			var oFormat = sap.ui.core.format.DateFormat.getInstance({pattern: "dd/MM/yy"});
			return oFormat.format(new Date());
		},

		onDialogCancelPress: function() {
			this.byId("AddActionDialog").close();
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
			})
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
