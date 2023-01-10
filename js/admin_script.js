//-----------------------
// INICIA DATATABLES
//-----------------------
document.addEventListener("DOMContentLoaded", function() {
  let resumen = $("#tbl_admin").DataTable({
    "ajax": {
      url: "admin_ctrl.php?accion=listar_resumen",
      dataSrc: ""
    },
    "columns": [
      {"data":"turno_id"},
      {"data":"turno_fecha_creado"},
      {"data":"jornada_nombre"},
      {"data":"user_nombre"},
      {"data":"turno_saldo_caja"},
      {"data":"turno_total_utilidad"},
      {"data":"turno_total_entrega"}, //nombre vendedor
      {"data":"turno_descuadre"},
      {"data":null,"orderable":false}
    ],
    "columnDefs": [{
        targets: 8,
        "defaultContent": "<button class='btn btn-primary btn-sm btnVer'>/<i class='fa-solid fa-pen'></i></button>",
        data: null
    }],
    "language":{
      "url": "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
  });
  // *******************
  // FIN DATATABLES
  // *******************
}); // CIERRE DEL DATATABLES