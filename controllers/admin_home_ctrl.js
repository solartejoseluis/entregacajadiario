document.addEventListener("DOMContentLoaded", function () {

  $(document).ready(function () {
    ejecutarDatatables();
  });

  function ejecutarDatatables() {
    // INICIA DATATABLES
    var listado = $("#tblVentas").DataTable({
      ajax: {
        url: "../models/admin_home_mdl.php?accion=listar_ventas",
        dataSrc: "",
        data: "",
      },
      columns: [
        { data: "mes" },
        { data: "año" },
        { data: "acumulado_utilidad" },
        { data: "cuenta_num_gestiones" },
        { data: null, orderable: false },
        { data: null, orderable: false },
        { data: null, orderable: false },
      ],
      columnDefs: [
        {
          targets: 4,
          defaultContent:
            "<button class='btn btn-primary btn-sm btn_ver_turnos' id='btn_ver_turnos' name='btn_ver_turnos'>Turnos</button>",
          data: null,
        },

        {
          targets: 5,
          defaultContent:
            "<button  class='btn btn-success btn-sm btn_ver_dias'>Dias</button>",
          data: null,
        },
        {
          targets: 6,
          defaultContent:
            "<button  class='btn btn-warning btn-sm btn_ver_gestiones'>Gestiones</button>",
          data: null,
        },
      ],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },
      searching: false,
      paging: false,
    });

    // boton ver turnos
    $("#tblVentas tbody").on("click", "button.btn_ver_turnos", function () {
      let registroEdit = listado.row($(this).parents("tr")).data();
      $("#mdl_ver_turnos").modal("show");
    });










  }  // FIN FUNCION DATATABLES

}); // CIERRE  DEL DATATABLES



