sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox',
	'sap/f/library'
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary) {
	"use strict";

	return Controller.extend("tdapp.controller.Master", {
		onInit: function () {
			this.oView = this.getView();
			this._bDescendingSort = false;
			this.oModel = this.getOwnerComponent().getModel();
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oCatModel = this.getOwnerComponent().getModel();

		},

		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("Name", FilterOperator.Contains, sQuery)];
			}

			this.oModel.getBinding("list").filter(oTableSearchState, "listName");
		},

		onAdd: function () {
			MessageBox.information("This functionality is not ready yet.", {title: "Aw, Snap!"});
		},

		onSort: function () {
			this._bDescendingSort = !this._bDescendingSort;
			var oBinding = this.oProductsTable.getBinding("items"),
				oSorter = new Sorter("Name", this._bDescendingSort);

			oBinding.sort(oSorter);
		},

		onListItemPress: function (oEvent) {
			var itemPath = oEvent.getSource().getBindingContext("categories").getPath(),
				action = itemPath.split("/").slice(-1).pop();

			// this.oRouter.navTo("detail",{
			// 	"listName": listName
			//   });

			  this.oRouter.navTo("detail", {
				  layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, 
				  action: action
				});

			// var oFCL = this.oView.getParent().getParent();
			// oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
		},

		onPressFilter: function(oEvent){
			// build the filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("To Do", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.getView().byId("list");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
	});
});
