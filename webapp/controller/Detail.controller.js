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
			
			this.sCurrentCategory;
			this.sTask;
			this.sDesc;
			this.sDueDate;
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
			this.oActModel = this.getOwnerComponent().getModel("oActModel");
			var aInput = this.oActModel.getData();
			this.getFormInput();

			aInput.push({"ItemId": this.getNewItemId(),
						"Category": this.getCategory(),
						"Selected": false,
						"Action": this.getTask(),
						"Description": this.getDesc(),
						"DateSet": this.getCurrentDate(),
						"DateDue": this.getDueDate()});
			this.oActModel.setProperty("/", aInput);
			this.oActModel.setData(this.oActModel.getData(), true)
			this.getView().getModel("oActModel").updateBindings(true);
			console.log(this.oActModel.getData());
		},
		/**
		 * getFormInput will return the three input variables from the
		 * dialogue - logic?...
		 * aFormInput = array of the input values
		 * foreach aFormInput if i == 0 assign to taskInput
		 * 	if i == 1 assign value to descriptionInput
		 * 	if i == 2 assign value to dueDate
		 */
		getFormInput: function () {
			// don't actually know what the below is doing?...
			const isInput = control => control.isA("sap.m.InputBase");
			// below retrieves the input values as an array from the dialogue
			const aFormInput = this.byId("form").getControlsByFieldGroupId("inputs").filter(isInput);

			// this.setTask(aFormInput[0]._lastValue);
			// this.setDesc(aFormInput[1]._lastValue);
			// this.setDueDate(aFormInput[2]._lastValue);

			aFormInput.forEach(function(oInputElement, i){
				var test = aFormInput[i]._lastValue;
				if(i == 0){
					this.setTask(aFormInput[i]._lastValue);
					console.log(aFormInput[i]._lastValue);
				}
				else if(i == 1){
					this.setDesc(aFormInput[i]._lastValue);
					console.log(aFormInput[i]._lastValue);
				}
				else if(i == 2){
					this.setDueDate(aFormInput[i]._lastValue);
					console.log(aFormInput[i]._lastValue);
				}
			}.bind(this))
		},

		onAfterDialogClose: function(){

		},
		setCategory: function (sCurrentCategory) {
			this.sCurrentCategory = sCurrentCategory;
		},
		getCategory: function () {
			return this.sCurrentCategory;
		},
		setDueDate: function(sDueDate){
			this.sDueDate = sDueDate;
		},
		getDueDate: function () {
			return this.sDueDate;
		},

		setTask: function (sTask) {
			this.sTask = sTask;
		},
		getTask: function () {
			return this.sTask;
		},

		setDesc: function (sDesc) {
			this.sDesc = sDesc;
		},
		getDesc: function () {
			return this.sDesc;
		},

		getNewItemId: function(){
			this.oActModel = this.getOwnerComponent().getModel("oActModel");
			var iArrTotal = this.oActModel.getData().length;
			// incremenet by 1 as this is a new entry
			var sNewCategory = "a" + (iArrTotal + 1);
			return sNewCategory;
		},

		getCurrentDate: function(){
			var oFormat = sap.ui.core.format.DateFormat.getInstance({pattern: "dd/MM/yyyy"});
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
			var bindingContext = oEvent.getSource().getBindingContext("oActModel").getPath(),
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
			this.actions = oEvent.getParameter("arguments").action;
			// var item = oArguments.id;
			var path = "/" + this.actions + "/CategoryId";
			var categoryId = this.getView().getModel("oCatModel").getProperty(path);
			this.setCategory(categoryId);

			var aFilter = [];

			aFilter.push(new Filter("Category", FilterOperator.Contains, categoryId));

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
