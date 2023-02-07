document.addEventListener("DOMContentLoaded", function () {
  var mes = 1;

  $(document).ready(function () {
    ejecutarDatatables();
  });


  function ejecutarDatatables() {
    // INICIA DATATABLES
    var listadoVentas = $("#tblVentas").DataTable({
      ajax: {
        url: "../models/admin_febrero_dias_mdl.php?accion=listar_ventas",
        dataSrc: "",
        data: {mes: mes},
      },
      columns: [
        { data: "dia" },
        { data: "utilidad" },
        { data: "num_gestiones" },
      ],
      columnDefs: [
      ],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },
      paging: false,
    });

  } // final del datatables

}); // CIERRE  DEL DATATABLES
