const suppliers = [{
  _id: 1,
  number: 20,
  viewName: "Rubber Chicken Ltd",
  details: "13 Some Road, SomePlace, 23948 Burgh" },
{
  _id: 2,
  number: 22,
  viewName: "Pulley Inc.",
  details: "Pulley Square, Out There, A637Z3 Boondocks" }];


const bookings = [{
  _id: 1,
  number: 1,
  date: new Date(2016, 0, 3),
  details: "Monthly Pulley payment",
  supplier_id: 2,
  amount: 12.59,
  currency: "USD" },
{
  _id: 1,
  number: 2,
  date: new Date(2016, 0, 4),
  details: "Big Rubber Chicken order",
  supplier_id: 1,
  amount: 47623.45,
  currency: "BOO" }];


const grid = $("#grid").dxDataGrid({
  dataSource: bookings,
  columns: [{
    dataField: "number",
    dataType: "number",
    format: {
      type: "decimal",
      precision: 5 },

    allowEditing: false },
  {
    dataField: "date",
    dataType: "date" },

  "amount",
  "currency",
  "details", {
    dataField: "supplier_id",
    caption: "Supplier",
    lookup: {
      dataSource: {
        store: suppliers },

      valueExpr: "_id",
      displayExpr: s => s ? `${s.number} - ${s.viewName}` : "Not assigned" },

    editCellTemplate: (cellElement, cellInfo) => {
      const $editor = $("<div>").appendTo(cellElement).dxTextBox({
        readOnly: true,
        value: cellInfo.text });


      const popup = $('<div class="dx-dropdowneditor-overlay">').appendTo(cellElement).dxPopover({
        height: "30ex",
        width: "30ex",
        showTitle: false,
        showCloseButton: false,
        shading: false,
        position: {
          collision: "flipfit flipfit",
          my: "top",
          at: "bottom" },

        contentTemplate: () => {
          const $list = $("<div>").dxList({
            dataSource: suppliers,
            selectionMode: "single",
            itemTemplate: (itemData, itemIndex, itemElement) => {
              itemElement.text(`${itemData.number} - ${itemData.viewName}`);
            },
            onSelectionChanged: ({ addedItems }) => {
              if (addedItems && addedItems.length == 1) {
                $editor.dxTextBox("instance").option("value", cellInfo.column.lookup.displayExpr(addedItems[0]));
                cellInfo.setValue(addedItems[0]._id);
              }
            } });

          return $list;
        },
        onHidden: () => grid.closeEditCell() }).
      dxPopover("instance");

      popup.option("position.of", $editor);
      setTimeout(() => {
        popup.show();
      });
    } }],


  editing: {
    mode: "batch",
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true } }).

dxDataGrid("instance");