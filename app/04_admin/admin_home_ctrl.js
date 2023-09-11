document.addEventListener("DOMContentLoaded", function () {
  $(document).ready(function () {
    dttblGestionesGeneral();
    dttblDomiciliosGeneral()
  });
}); //  final del addEventListener de inicio


// CARGA LA FECHA ACTUAL y CUADRO PRINCIPAL DE PAGINA
function getTime() {
  var today = moment();
  date = today.format("LLLL");
  document.getElementById("hoy_moment").innerHTML =
    `<span>${date}</span>`;
}
setInterval(function () {
  getTime();
}, 1000);

// DTTBL DOMICILIOS GENERAL
function dttblDomiciliosGeneral() {

  let listado = $("#tbl_domicilios_general").DataTable({
    ajax: {
      url: "admin_home_mdl.php?accion=listar_domicilios_general",
      dataSrc: "",
      data: "",
    },
    columns: [
      { data: "mes_actual" },
      { data: "mes" },
      { data: "año" },
      { data: "cuenta_domi_total" },
      { data: "suma_domi_total" },
      { data: null, orderable: false },
      { data: null, orderable: false },
      { data: null, orderable: false },
      { data: null, orderable: false },
    ],

    columnDefs: [
      {
        targets: 4,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },

      {
        targets: 5,
        defaultContent:
          "<button class='btn btn-outline-primary btn-sm btn_domicilios_turnos' id='btn_domicilios_turnos'>Turnos</button>",
        data: null,
      },

      {
        targets: 6,
        defaultContent:
          "<button  class='btn btn-outline-primary btn-sm btn_domicilios_dias' id='btn_domicilios_dias'>Dias</button>",
        data: null,
      },
      {
        targets: 7,
        defaultContent:
          "<button  class='btn btn-outline-primary btn-sm btn_domicilios_mes'>Entregados</button>",
        data: null,
      },
      {
        targets: 8,
        defaultContent:
          "<button  class='btn btn-outline-primary btn-sm btn_domicilios_informe'>Informe</button>",
        data: null,
      },
    ],
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
    searching: false,
    info: false,
    paging: false,
    destroy: true,
  }); // final datatables  domicilios general

  //btn para MDL DOMICILIOS turnos
  $("#tbl_domicilios_general tbody").on("click", "button.btn_domicilios_turnos", function () {
    let registro = listado.row($(this).parents("tr")).data();
    $("#mdl_domicilios_turnos").modal("show");
    dttbl_domicilios_internos_turnos(registro.mes_actual);
    dttbl_domicilios_externos_turnos(registro.mes_actual);
  });

    //btn para MDL DOMICILIOS dias
  $("#tbl_domicilios_general tbody").on("click", "button.btn_domicilios_dias", function () {
    let registro = listado.row($(this).parents("tr")).data();
    $("#mdl_domicilios_dias").modal("show");
    dttbl_domicilios_dias(registro.mes_actual);
  });

  //btn para MDL DOMICILIOS mes
  $("#tbl_domicilios_general tbody").on("click", "button.btn_domicilios_mes", function () {
    let registro = listado.row($(this).parents("tr")).data();
    $("#mdl_domicilios_mes").modal("show");
    dttbl_domicilios_mes(registro.mes_actual);
  });

  //btn para MDL DOMICILIOS informe
  $("#tbl_domicilios_general tbody").on("click", "button.btn_domicilios_informe", function () {
    let registro = listado.row($(this).parents("tr")).data();
    $("#mdl_domicilios_informe").modal("show");
    dttbl_domicilios_informe_internos(registro.mes_actual);
    dttbl_total_domi_mes_internos(registro.mes_actual);
    dttbl_domicilios_informe_externos(registro.mes_actual);
    dttbl_total_domi_mes_externos(registro.mes_actual);
  });


} // final dttbl Domicilios General

function dttblGestionesGeneral() {
  let listado = $("#tbl_gestiones_general").DataTable({
    ajax: {
      url: "admin_home_mdl.php?accion=listar_gestiones",
      dataSrc: "",
      data: "",
    },
    columns: [
      { data: "mes_actual" },
      { data: "mes" },
      { data: "año" },
      { data: "cuenta_num_gestiones" },
      { data: "acumulado_utilidad" },
      { data: null, orderable: false },
      { data: null, orderable: false },
      { data: null, orderable: false },
      { data: null, orderable: false },
    ],

    columnDefs: [
      {
        targets: 4,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
      {
        targets: 5,
        defaultContent:
          "<button class='btn btn-outline-success btn-sm btn_ver_turnos' id='btn_ver_turnos'>Turnos</button>",
        data: null,
      },

      {
        targets: 6,
        defaultContent:
          "<button  class='btn btn-outline-success btn-sm btn_ver_dias' id='btn_ver_dias'>Dias</button>",
        data: null,
      },
      {
        targets: 7,
        defaultContent:
          "<button  class='btn btn-outline-success btn-sm btn_ver_gestiones'>Ges</button>",
        data: null,
      },
      {
        targets: 8,
        defaultContent:
          "<button  class='btn btn-outline-success btn-sm btn_informe_mes'>Informe</button>",
        data: null,
      },
    ],
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
    searching: false,
    info: false,
    paging: false,
    destroy: true,
  }); // final datatables ver gestiones general

  // boton ver MDL turnos
  $("#tbl_gestiones_general tbody").on("click", "button.btn_ver_turnos", function () {
    let registro = listado.row($(this).parents("tr")).data();
    $("#mdl_ver_turnos").modal("show");
    datatables_todos_turnos(registro.mes_actual);
  });

  // boton MDL ver dias
  $("#tbl_gestiones_general tbody").on("click", "button.btn_ver_dias", function () {
    let registro = listado.row($(this).parents("tr")).data();
    $("#mdl_ver_dias").modal("show");
    datatables_todos_dias(registro.mes_actual);
  });

  // boton ver MDL gestiones
  $("#tbl_gestiones_general tbody").on("click", "button.btn_ver_gestiones", function () {
    let registro = listado.row($(this).parents("tr")).data();
    $("#mdl_ver_gestiones").modal("show");
    datatables_todos_gestiones(registro.mes_actual);
  });

  // boton MDL informe mes
  $("#tbl_gestiones_general tbody").on("click", "button.btn_informe_mes", function () {
    let registro = listado.row($(this).parents("tr")).data();
    $("#mdl_informe_mes").modal("show");
    datatables_informe_mes(registro.mes_actual);
    datatables_informe_mes_turno(registro.mes_actual);
  });


  function datatables_todos_turnos(mes_actual) {
    let listado = $("#tbl_turnos").DataTable({
      ajax: {
        url:
          "admin_home_mdl.php?accion=listar_turnos_mes&mes_actual=" +
          mes_actual,
        dataSrc: "",
        data: "",
      },
      columns: [
        { data: "turno_id" },
        { data: "turno_fecha_creado" },
        { data: "dia_semana" },
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
          targets: 5,
          createdCell: function (td) {
            $(td).css("background-color", "#CAFC26");
          },
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
        {
          targets: 6,
          createdCell: function (td) {
            $(td).css("background-color", "#CAFC26");
          },
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
        {
          targets: 7,
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
        {
          targets: 8,
          createdCell: function (td) {
            $(td).css("background-color", "#CAFC26");
          },
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
        {
          targets: 11,
          defaultContent:
            "<button class='btn btn-primary btn-sm btn_detalle_turno' id='btn_detalle_turno'> Ver</button>",
          data: null,
        },
      ],
      order: [[0, "asc"]],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },
      scrollY: "800px",
      scrollCollapse: true,
      paging: false,
      destroy: true,
    });
    // boton detalle_turno (SUBMODAL)
    $("#tbl_turnos tbody").on("click", "button.btn_detalle_turno", function () {
      let registro = listado.row($(this).parents("tr")).data();
      $("#mdl_detalle_turno").modal("show");
      datatables_ver_detalle_turno(registro.turno_id);
      // cargarDatosUtilidadVendedor1(registro.turno_id);
    });
  } // fin funcion datatables todos los turnos


  // DTTBL MDL  INFORME  GESTIONES POR DIAS
  function datatables_todos_dias(mes_actual) {
    var listado = $("#tbl_dias").DataTable({
      ajax: {
        url:
          "admin_home_mdl.php?accion=listar_dias_mes&mes_actual=" + mes_actual,
        dataSrc: "",
        data: "",
      },

      columns: [
        { data: "turno_fecha" },
        { data: "dia_semana" },
        { data: "suma_caja" },
        { data: "suma_total_utilidad" },
        { data: "acumulado_utilidad_gestiones" },
        { data: "suma_total_entrega" },
        { data: "suma_total_descuadre" },
        { data: "acumulado_descuadre" },
      ],
      columnDefs: [
        {
          targets: 2,
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
        {
          targets: 3,
          createdCell: function (td) {
            $(td).css("background-color", "#CAFC26");
          },
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
        {
          targets: 4,
          createdCell: function (td) {
            $(td).css("background-color", "#CAFC26");
          },
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
        {
          targets: 5,
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
        {
          targets: 6,
          createdCell: function (td) {
            $(td).css("background-color", "#FCDE19");
          },
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
        {
          targets: 7,
          createdCell: function (td) {
            $(td).css("background-color", "#FCDE19");
          },
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
      ],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },
      scrollY: "800px",
      scrollCollapse: true,
      searching: true,
      paging: false,
      order: [[0, "asc"]],
      destroy: true,
    }); // final dttbl mdl informe gestiones por dias

  }

  // DTTBL MDL TODAS LAS GESTIONES DEL MES
  function datatables_todos_gestiones(mes_actual) {
    let listado = $("#tbl_gestiones_mes").DataTable({
      ajax: {
        url:
          "admin_home_mdl.php?accion=listar_gestiones_mes&mes_actual=" + mes_actual,
        dataSrc: "",
        data: "",
      },

      columns: [
        { data: "venta_id" },
        { data: "FECHA" },
        { data: "DIA" },
        { data: "HORA" },
        { data: "venta_nombre_producto" },
        { data: "venta_nombre_proveedor" },
        { data: "venta_costo_producto" },
        { data: "venta_valor_venta" },
        { data: "user_nombre" },
        { data: "venta_utilidad" },
      ],
      columnDefs: [
        {
          targets: 6,
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
        {
          targets: 7,
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
        {
          targets: 9,
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
      ],
      order: [[0, "asc"]],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },
      fixedHeader: {
        header: true,
        footer: true,
      },
      scrollY: "800px",
      scrollCollapse: true,
      paging: false,
      searching: true,
      destroy: true,
    });
  } // fin funcion datatables todos las gestiones

  // DTTBL INFORME MES
  function datatables_informe_mes(mes_actual) {
    // seccion de  exportacion
    var buttonCommon = {
      exportOptions: {
        format: {
          body: function (data, row, column, node) {
            return column === 3 ? data.replace(/[$,.]/g, "") : data;
          },
        },
      },
    };

    var listado = $("#tbl_informe_mes").DataTable({
      ajax: {
        url: "admin_home_mdl.php?accion=informe_mes&mes_actual=" + mes_actual,
        dataSrc: "",
        data: "",
      },

      dom: "Bfrtip",
      buttons: [
        $.extend(true, {}, buttonCommon, {
          extend: "copyHtml5",
        }),
        $.extend(true, {}, buttonCommon, {
          extend: "excelHtml5",
          exportOptions: {
            columns: [0, 2, 3],
          },
        }),
        $.extend(true, {}, buttonCommon, {
          extend: "pdfHtml5",
        }),
      ],

      columns: [
        { data: "user_nombre" },
        { data: "acumulado_utilidad" },
        { data: "cuenta_num_gestiones" },
        { data: "valor_a_pagar" },
      ],
      columnDefs: [
        {
          targets: 1,
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
        {
          targets: 1,
          createdCell: function (td) {
            $(td).css("background-color", "#86B000");
          },
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
        {
          targets: 3,
          createdCell: function (td) {
            $(td).css("background-color", "#CAFC26");
          },
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
      ],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },
      searching: false,
      paging: false,
      order: [[1, "desc"]],
      destroy: true,
    });
  } // fin función datatables todos dias


  function datatables_informe_mes_turno(mes_actual) {
    var listado = $("#tbl_informe_mes_turno").DataTable({
      ajax: {
        url:
          "admin_home_mdl.php?accion=informe_mes_turno&mes_actual=" +
          mes_actual,
        dataSrc: "",
        data: "",
      },

      columns: [
        { data: "mes" },
        { data: "suma_total_caja" },
        { data: "suma_total_utilidad" },
        { data: "suma_total_entrega" },
        { data: "suma_total_descuadre" },
        { data: "suma_total_pago_vendedor" },
      ],
      columnDefs: [
        {
          targets: 1,
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
        {
          targets: 2,
          createdCell: function (td) {
            $(td).css("background-color", "#86B000");
          },
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
        {
          targets: 3,
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
        {
          targets: 4,
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
        {
          targets: 5,
          createdCell: function (td) {
            $(td).css("background-color", "#CAFC26");
          },
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
      ],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },
      searching: false,
      paging: false,
      order: [[1, "desc"]],
      destroy: true,
    });
  } // fin función datatables informe_mes_turno

  function datatables_ver_detalle_turno(turno_id) {
    var listadoVentas = $("#tblVentas").DataTable({
      ajax: {
        url: "admin_home_mdl.php?accion=ver_detalle_turno&turno_id=" + turno_id,
        dataSrc: "",
        data: "",
      },
      columns: [
        { data: "venta_id" },
        { data: "venta_nombre_producto" },
        { data: "venta_nombre_proveedor" },
        { data: "venta_costo_producto" },
        { data: "venta_valor_venta" },
        { data: "user_nombre" }, //nombre vendedor
        { data: "venta_utilidad" },
      ],
      columnDefs: [
      ],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },
      fixedHeader: true,
      scrollY: "400px",
      scrollCollapse: true,
      paging: false,
      destroy: true,
    });
    // FIN DATATABLES

    cargarDatosUtilidadVendedor1(turno_id);
    cargarDatosUtilidadVendedor2(turno_id);
    cargarDatosUtilidadVendedor3(turno_id);
    cargarDatosUtilidadVendedor4(turno_id);
    utilidadTurno(turno_id);
    consultarDatosTurnoActual(turno_id);

    //boton Editar
    $("#tblVentas tbody").on("click", "button.btnEdit", function () {
      let registroEdit = listadoVentas.row($(this).parents("tr")).data();
      recuperarRegistro(registroEdit.venta_id);
    });

    //boton borrar
    $("#tblVentas tbody").on("click", "button.btnDel", function () {
      //ACCIONA BOTON BORRAR REGISTRO DEL DATATABLES
      if (confirm("¿Confirma la Eliminación?")) {
        let registro = listadoVentas.row($(this).parents("tr")).data();
        borrarRegistro(registro.venta_id);
      }
    });
  }

} // final dttbl gestiones general


// SECCION DE DOMICILIOS

function dttbl_domicilios_internos_turnos(mes_actual) {
  turno_id = $("#npt_turno_id_actual").val();
  user_id = $("#npt_user_id_actual").val();
  let listado = $("#tbl_domicilios_internos_turnos").DataTable({
    ajax: {
      url: "admin_home_mdl.php?accion=listar_domicilios_internos_turnos&mes_actual=" + mes_actual,
      dataSrc: "",
      data: "",
    },
    columns: [
      { data: "turno_id" },
      { data: "turno_fecha_creado" },
      { data: "dia_semana" },
      { data: "jornada_nombre" },
      { data: "user_nombre" },
      { data: "cuenta_domi_internos" },
      { data: "suma_domi_internos" },
    ],
    columnDefs: [
      {
        targets: 6,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },

    ],
    order: [[1, "asc"]],
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
    info: false,
    searching: false,
    paging: false,
    destroy: true,
  });
}

function dttbl_domicilios_externos_turnos(mes_actual) {
  turno_id = $("#npt_turno_id_actual").val();
  user_id = $("#npt_user_id_actual").val();
  let listado = $("#tbl_domicilios_externos_turnos").DataTable({
    ajax: {
      url: "admin_home_mdl.php?accion=listar_domicilios_externos_turnos&mes_actual=" + mes_actual,
      dataSrc: "",
      data: "",
    },
    columns: [
      { data: "turno_id" },
      { data: "turno_fecha_creado" },
      { data: "dia_semana" },
      { data: "jornada_nombre" },
      { data: "user_nombre" },
      { data: "cuenta_domi_externos" },
      { data: "suma_domi_externos" },
    ],
    columnDefs: [
      {
        targets: 6,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },

    ],
    order: [[1, "asc"]],
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
    info: false,
    searching: false,
    paging: false,
    destroy: true,
  });
}


function dttbl_domicilios_dias(mes_actual) {
  turno_id = $("#npt_turno_id_actual").val();
  user_id = $("#npt_user_id_actual").val();
  let listado = $("#tbl_domicilios_dias").DataTable({
    ajax: {
      url: "admin_home_mdl.php?accion=listar_domicilios_dias&mes_actual=" + mes_actual,
      dataSrc: "",
      data: "",
    },
    columns: [
      { data: "dia_del_mes" },
      { data: "fecha" },
      { data: "dia" },
      { data: "cuenta_total" },
      { data: "venta_total" },
    ],
    columnDefs: [
      {
        targets: 4,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },

    ],
    order: [[0, "asc"]],
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
    info: false,
    searching: false,
    paging: false,
    destroy: true,
  });
}


function dttbl_domicilios_mes(mes_actual) {
  let listado = $("#tbl_domicilios_mes").DataTable({
    ajax: {
      url: "admin_home_mdl.php?accion=listar_domicilios_mes&mes_actual=" + mes_actual,
      dataSrc: "",
      data: "",
    },
    columns: [
      { data: "fecha_creado" },
      { data: "dia" },
      { data: "hora_salida" },
      { data: "hora_llegada" },
      { data: "barrio_nombre" },
      { data: "user_nombre" },
      { data: "domi_externo_nombre" },
      { data: "valor_domi_externo" },
      { data: "valor_venta" },
      { data: "numero_factura" },
      { data: "observaciones" },
      { data: "turno_id" },
    ],
    columnDefs: [
      {
        targets: 7,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
      {
        targets: 8,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      }
    ],
    order: [[0, "asc"],[2, "asc"] ],

    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
    info: true,
    searching: true,
    paging: false,
    destroy: true,
  });
}



function dttbl_domicilios_informe_internos(mes_actual) {
  let listado = $("#tbl_domicilios_informe_int").DataTable({
    ajax: {
      url: "admin_home_mdl.php?accion=listar_domicilios_informe_int&mes_actual=" + mes_actual,
      dataSrc: "",
      data: "",
    },
    columns: [
      { data: "nombres" },
      { data: "cuenta_domi" },
      { data: "a_pagar" },
    ],
    columnDefs: [
      {
        targets: 2,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
    ],
    // order: [[0, "asc"]],
    // order: [[1, "asc"]],

    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
    info: false,
    searching: false,
    paging: false,
    destroy: true,
  });
}


function dttbl_total_domi_mes_internos(mes_actual) {
  let listado = $("#tbl_total_domi_mes_int").DataTable({
    ajax: {
      url: "admin_home_mdl.php?accion=calcula_total_domi_mes_int&mes_actual=" + mes_actual,
      dataSrc: "",
      data: "",
    },
    columns: [
      { data: "total_domi" },
      { data: "total_a_pagar" },
    ],
    columnDefs: [
      {
        targets: 1,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
    ],
    // order: [[0, "asc"]],
    // order: [[1, "asc"]],

    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
    info: false,
    searching: false,
    paging: false,
    destroy: true,
  });
}


function dttbl_domicilios_informe_externos(mes_actual) {
  let listado = $("#tbl_domicilios_informe_ext").DataTable({
    ajax: {
      url: "admin_home_mdl.php?accion=listar_domicilios_informe_ext&mes_actual=" + mes_actual,
      dataSrc: "",
      data: "",
    },
    columns: [
      { data: "nombres" },
      { data: "cuenta_domi" },
      { data: "a_pagar" },
    ],
    columnDefs: [
      {
        targets: 2,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
    ],
    // order: [[0, "asc"]],
    // order: [[1, "asc"]],

    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
    info: false,
    searching: false,
    paging: false,
    destroy: true,
  });
}


function dttbl_total_domi_mes_externos(mes_actual) {
  let listado = $("#tbl_total_domi_mes_ext").DataTable({
    ajax: {
      url: "admin_home_mdl.php?accion=calcula_total_domi_mes_ext&mes_actual=" + mes_actual,
      dataSrc: "",
      data: "",
    },
    columns: [
      { data: "total_domi" },
      { data: "total_a_pagar" },
    ],
    columnDefs: [
      {
        targets: 1,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
    ],
    // order: [[0, "asc"]],
    // order: [[1, "asc"]],

    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
    info: false,
    searching: false,
    paging: false,
    destroy: true,
  });
}





// - - - - - - - - - - - - - - - - - 
// INICIA SUB MODAL VER TURNO DE HOY
// - - - - - - - - - - - - - - - - - 

// cargas en la pantalla principal SUBMODAL
function cargarDatosUtilidadVendedor1(turno_id) {
  $.ajax({
    type: "GET",
    url:
      "admin_home_mdl.php?accion=consultar_utilidad_vendedor1&turno_id=" +
      turno_id,
    data: "",
    success: function (datos) {
      $("#utilidadVendedor1").html(datos[0].utilidad_vendedor1);
      $("#ventasVendedor1").html(datos[0].ventas_vendedor1);
    },
    error: function () {
      alert("Problema en consultarUtilidadVendedor1");
    },
  });
}

function cargarDatosUtilidadVendedor2(turno_id) {
  $.ajax({
    type: "GET",
    url:
      "admin_home_mdl.php?accion=consultar_utilidad_vendedor2&turno_id=" +
      turno_id,
    data: "",
    success: function (datos) {
      $("#utilidadVendedor2").html(datos[0].utilidad_vendedor2);
      $("#ventasVendedor2").html(datos[0].ventas_vendedor2);
    },
    error: function () {
      alert("Problema en consultarUtilidadVendedor2");
    },
  });
}

function cargarDatosUtilidadVendedor3(turno_id) {
  $.ajax({
    type: "GET",
    url:
      "admin_home_mdl.php?accion=consultar_utilidad_vendedor3&turno_id=" +
      turno_id,
    data: "",
    success: function (datos) {
      $("#utilidadVendedor3").html(datos[0].utilidad_vendedor3);
      $("#ventasVendedor3").html(datos[0].ventas_vendedor3);
    },
    error: function () {
      alert("Problema en consultarUtilidadVendedor3");
    },
  });
}

function cargarDatosUtilidadVendedor4(turno_id) {
  $.ajax({
    type: "GET",
    url:
      "admin_home_mdl.php?accion=consultar_utilidad_vendedor4&turno_id=" +
      turno_id,
    data: "",
    success: function (datos) {
      $("#utilidadVendedor4").html(datos[0].utilidad_vendedor4);
      $("#ventasVendedor4").html(datos[0].ventas_vendedor4);
    },
    error: function () {
      alert("Problema en consultarUtilidadVendedor4");
    },
  });
}

function utilidadTurno(turno_id) {
  $.ajax({
    type: "GET",
    url:
      "admin_home_mdl.php?accion=consultar_utilidad_turno&turno_id=" +
      turno_id,
    data: "",
    success: function (datos) {
      $("#p_utilidad_turno").html(datos[0].utilidad_turno);
      $("#p_turno_numero_ventas").html(datos[0].ventas_turno);
    },
    error: function () {
      alert("Problema en cargar datos utilidad turno");
    },
  });
}

function consultarDatosTurnoActual(turno_id) {
  $.ajax({
    type: "GET",
    async: false, //necesario
    url:
      "admin_home_mdl.php?accion=consultarDatosTurnoActual&turno_id=" +
      turno_id,
    data: "",
    success: function (datos) {
      //$("#npt_turno_id_actual").val(datos[0].turno_id_actual);
      $("#npt_user_nombre").html(datos[0].user_nombre);
      $("#npt_user_nombre1").html(datos[0].user_nombre);
      $("#npt_user_apellido").html(datos[0].user_apellido);
      $("#npt_user_apellido1").html(datos[0].user_apellido);
      $("#npt_jornada_nombre").html(datos[0].jornada_nombre);
      $("#npt_turno_fecha").html(datos[0].FECHA);
      $("#npt_turno_dia").html(datos[0].DIA);
    },
    error: function () {
      alert("Problema en consultar datos turno actual");
    },
  });
}
