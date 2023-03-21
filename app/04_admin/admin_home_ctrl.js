document.addEventListener("DOMContentLoaded", function () {

  $(document).ready(function () {
    ejecutarDatatables();
  });

  function ejecutarDatatables() {
    // INICIA DATATABLES
    var listado = $("#tblVentas").DataTable({
      ajax: {
        url: "admin_home_mdl.php?accion=listar_ventas",
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
        targets: 2,
        render: $.fn.dataTable.render.number('.', ',', 0, '$')
        //DataTable.render.number(null,null,2,$), // Thousands and decimal specified
      },
        {
          targets: 4,
          defaultContent:
            "<button class='btn btn-primary btn-sm btn_ver_turnos' id='btn_ver_turnos'>Turnos</button>",
          data: null,
        },

        {
          targets: 5,
          defaultContent:
            "<button  class='btn btn-success btn-sm btn_ver_dias' id='btn_ver_dias'>Dias</button>",
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
      datatables_todos_turnos(registroEdit.mes_actual);
    });

    // boton ver dias
    $("#tblVentas tbody").on("click", "button.btn_ver_dias", function () {
      let registroEdit = listado.row($(this).parents("tr")).data();
      $("#mdl_ver_dias").modal("show");
      datatables_todos_dias(registroEdit.mes_actual);
    });

};  // final funcion ejecutar datatables




  function datatables_todos_turnos(mes_actual) {
    // INICIA DATATABLES
    var listado = $("#tbl_turnos").DataTable({
      ajax: {
        url: "admin_home_mdl.php?accion=listar_turnos_mes&mes_actual="+mes_actual,
        dataSrc: "",
        data: "",
      },
      columns: [
        { data: "turno_id" },
        { data: "jornada_nombre" },
        { data: "user_nombre" },
        { data: "turno_saldo_caja" },
        { data: "turno_total_utilidad" },
        { data: "turno_total_entrega" },
        { data: "turno_descuadre" },
        { data: "hora_creado" },
        { data: "hora_cierre" },
        { data: null, orderable: false },
      ],
      columnDefs: [
      {
        targets: 3,
        render: $.fn.dataTable.render.number('.', ',', 0, '$')
      },
      {
        targets: 4,
        render: $.fn.dataTable.render.number('.', ',', 0, '$')
      },
      {
        targets: 5,
        render: $.fn.dataTable.render.number('.', ',', 0, '$')
      },
      {
        targets: 6,
        render: $.fn.dataTable.render.number('.', ',', 0, '$')
      },
        {
          targets: 9,
          defaultContent:
            "<button class='btn btn-primary btn-sm btn_ver_turnos' id='btn_ver_turnos' name='btn_ver_turnos'>Turnos</button>",
          data: null,
        },
      ],
      order: [[0, 'asc']],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },
      searching: false,
      paging: false,
      fixedHeader: true,
      scrollY: "400px",
      scrollCollapse: true,
      destroy: true,
    });

  }  // fin funcion datatables todos los turnos


  function datatables_todos_dias(mes_actual) {
    // INICIA DATATABLES
    var listado = $("#tbl_turnos").DataTable({
      ajax: {
        url: "admin_home_mdl.php?accion=listar_dias_mes&mes_actual="+mes_actual,
        dataSrc: "",
        data: "",
      },
      columns: [
        { data: "dia" },
        { data: "utilidad" },
        { data: "num_gestiones" },
        { data: null, orderable: false },
      ],
      columnDefs: [
      {
        targets: 1,
        render: $.fn.dataTable.render.number('.', ',', 0, '$')
      },
        {
          targets: 3,
          defaultContent:
            "<button class='btn btn-primary btn-sm btn_ver_turnos' id='btn_ver_turnos' name='btn_ver_turnos'>Turnos</button>",
          data: null,
        },
      ],
      order: [[0, 'asc']],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },
      searching: false,
      paging: false,
      fixedHeader: true,
      scrollY: "400px",
      scrollCollapse: true,
      destroy: true,
    });
  } // fin función datatables todos dias


  }); //  final del addEventListener de inicio