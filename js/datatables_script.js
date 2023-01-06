 
//-----------------------
// INICIA DATATABLES
//-----------------------
document.addEventListener("DOMContentLoaded", function() {
  let listadoVentas = $("#tblVentas").DataTable({
    "ajax": {
      url: "venta_data.php?accion=listar_ventas",
      dataSrc: ""
    },
    "columns": [
      { "data": "venta_id" },
      { "data": "venta_nombre_producto" },
      { "data": "venta_nombre_proveedor" },
      { "data": "venta_costo_producto" },
      { "data": "venta_valor_venta" },
      { "data": "user_nombre" }, //nombre vendedor
      { "data": "venta_utilidad" },
      { "data": null, "orderable": false },
      { "data": null, "orderable": false }
    ],
    "columnDefs": [{
        targets: 7,
        "defaultContent": "<button class='btn btn-primary btn-sm btnEdit'>/<i class='fa-solid fa-pen'></i></button>",
        data: null
      },

      {
        targets: 8,
        "defaultContent": "<button  class='btn btn-danger btn-sm btnDel'>X<i class='fa fa-trash-o fa-lg'></i></button>",
        data: null
      }
    ],
    "language": {
      "url": "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
  });

});
  // *******************
  // FIN DATATABLES
  // *******************