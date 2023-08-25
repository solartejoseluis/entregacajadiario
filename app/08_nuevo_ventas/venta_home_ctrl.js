document.addEventListener("DOMContentLoaded", function () {
  var turno_id = "";
  var user_id = "";

  datatablesDomiPorSalir();
  datatablesDomiEnCurso();
  datatablesGestiones();
  cargarAcceso();
  consultarDatosTurnoActual(turno_id);




  function cargarAcceso() {
    $.ajax({
      type: "POST",
      async: false, // hacer que sea asincronico para sarle tiempo a ajax para cargar variable
      url: "venta_home_mdl.php?accion=consultar_acceso",
      data: "",
      success: function (datos) {
        $("#npt_turno_id_actual").val(datos[0].turno_id);
        $("#npt_user_id_actual").val(datos[0].user_id);
        //He tomado el valor del input
        turno_id = $("#npt_turno_id_actual").val();
        user_id = $("#npt_user_id_actual").val();
      },
      error: function () {
        alert("Problema en cargar acceso");
      },
    });
  }

  function consultarDatosTurnoActual(turno_id) {
    $.ajax({
      type: "GET",
      async: false, //necesario
      url: "venta_home_mdl.php?accion=consultarDatosTurnoActual",
      data: { turno_id: turno_id },
      success: function (datos) {
        //$("#npt_turno_id_actual").val(datos[0].turno_id_actual);
        $("#npt_user_nombre").html(datos[0].user_nombre);
        $("#npt_user_apellido").html(datos[0].user_apellido);
        $("#spn_user_nombre").html(datos[0].user_nombre);
        $("#spn_user_apellido").html(datos[0].user_apellido);
        $("#spn_jornada_nombre").html(datos[0].jornada_nombre);
      },
      error: function () {
        alert("Problema en consultar datos turno actual");
      },
    });
  }


  // CARGA LA FECHA ACTUAL y CUADRO PRINCIPAL DE PAGINA
  // function getTime() {
  //   var today = moment();

  //   time = today.format("LT");
  //   //date = today.format('dddd, MMMM, YYYY');
  //   date = today.format("LL");
  //   document.getElementById("hoy_moment").innerHTML =
  //     `<br>` +
  //     `<h1 class='large'>${time}</h1>` +
  //     `<span class='dark'>${date}</span>`;
  // }
  // setInterval(function () {
  //   getTime();
  // }, 1000);

  // function mesActual() {
  //   let mes_actual = moment().format("MMMM-YYYY");
  //   $("#mes_actual1").html(mes_actual);
  // }

  // SIDEBAR
  $("#lnk_gestiones_mes_vendedor").on("click", function () {
    $("#mdl_gestiones_mes_vendedor").modal("show");
    dttbl_mes_vendedor(turno_id, user_id);
  });

  $("#lnk_gestiones_agrupadas_por_dia").on("click", function () {
    $("#mdl_gestiones_agrupadas_por_dia").modal("show");
    dttbl_gestiones_agrupadas_por_dia(turno_id,user_id);
  });

  $("#lnk_gestiones_mes_todos").on("click", function () {
    $("#mdl_gestiones_mes_todos").modal("show");
    dttbl_mes_todos(turno_id,user_id);
  });

  $("#lnk_gestiones_mes_vendedor").on("click", function () {
    $("#mdl_gestiones_mes_vendedor").modal("show");
  });

  $("#lnk_gestiones_mes_vendedor").on("click", function () {
    $("#mdl_gestiones_mes_vendedor").modal("show");
  });

  // CARGA ELEMENTOS DE INICIO PAGINA
  function cargarAcceso() {
    $.ajax({
      type: "POST",
      async: false,
      url: "venta_home_mdl.php?accion=consultar_acceso",
      data: "",
      success: function (datos) {
        $("#npt_turno_id_actual").val(datos[0].turno_id);
        $("#npt_user_id_actual").val(datos[0].user_id);
        turno_id = $("#npt_turno_id_actual").val();
        user_id = $("#npt_user_id_actual").val();
      },
      error: function () {
        alert("Problema en cargar acceso");
      },
    });
  }
}); // cierre del addEventListener del inicio de pagina

// DTTBL DOMI POR SALIR
function datatablesDomiPorSalir() {
  var listadoDomiPorSalir = $("#tbl_domi_por_salir").DataTable({
    ajax: {
      url: "venta_home_mdl.php?accion=carga_dttbl_domi_por_salir",
      dataSrc: "",
      data: "",
    },
    columns: [
      { data: "hora_creado" },
      { data: "barrio_nombre" },
      { data: "user_nombre" },
      { data: "domi_externo_nombre" },
      { data: "valor_venta" },
      { data: null, orderable: false },
      { data: null, orderable: false },
    ],
    columnDefs: [
      {
        targets: 5,
        defaultContent:
          "<button class='btn btn-outline-primary btn-sm btnVerDomiPorSalir'><i class='fa-solid fa-pen'></i></button>",
        data: null,
      },
      {
        targets: 6,
        defaultContent:
          "<button class='btn btn-outline-primary btn-sm btnHoraSalida'>Sale</button>",
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
  });

  // BOTON EDITAR DOMI POR SALIR
  $("#tbl_domi_por_salir tbody").on(
    "click",
    "button.btnVerDomiPorSalir",
    function () {
      let registro = listadoDomiPorSalir.row($(this).parents("tr")).data();
      reestablecerModalDomiPorSalir();
      listarRegistroDomiPorSalir(registro);
      let btnDomiInternoPorsalir = registro.btn_domi_interno;
      if (btnDomiInternoPorsalir == 1) {
        $("#bloque_edit_domi_externo, #bloque_edit_valor_domi_externo").hide();
      } else {
        $("#bloque_edit_inyectologia").hide();
        $("#bloque_edit_transportador").hide();
        $("#bloque_edit_domi_externo, #bloque_edit_valor_domi_externo").show();
      }
      $("#mdl_domi_por_salir").modal("show");
    }
  );

  function reestablecerModalDomiPorSalir() {
    $("#bloque_edit_domi_externo, #bloque_edit_valor_domi_externo").show();
    $("#grupo_edit_inyectologia").show();
    $("#bloque_edit_transportador").show();
  }

  // boton SALE.
  $("#tbl_domi_por_salir tbody").on(
    "click",
    "button.btnHoraSalida",
    function () {
      let registro = listadoDomiPorSalir.row($(this).parents("tr")).data();
      defineHoraSalida(registro);
    }
  );

  function defineHoraSalida(registro) {
    $.ajax({
      type: "POST",
      url:
        "domixsalir_mdl.php?accion=define_hora_salida&domicilio_id=" +
        registro.domicilio_id,
      dataSrc: "",
      data: registro,
      success: function (msg) {
        $("#tbl_domi_por_salir").DataTable().ajax.reload();
        $("#tbl_domi_en_curso").DataTable().ajax.reload();
      },
      error: function () {
        alert("Problema en define_hora_salida");
      },
    });
  }
}
// final datatables domi por salir

// DTTBL DOMI EN CURSO
function datatablesDomiEnCurso() {
  let listadoDomiEnCurso = $("#tbl_domi_en_curso").DataTable({
    ajax: {
      url: "venta_home_mdl.php?accion=carga_dttbl_domi_en_curso",
      dataSrc: "",
      data: "",
    },
    columns: [
      { data: "barrio_nombre" },
      { data: "user_nombre" },
      { data: "domi_externo_nombre" },
      { data: "valor_venta" },
      { data: "hora_salida" },
      { data: "inyectologia" },
      { data: null, orderable: false },
    ],
    columnDefs: [
      {
        targets: 6,
        defaultContent:
          "<button class='btn btn-outline-primary btn-sm btnVerDomiEnCurso'><i class='fa-solid fa-pen'></i></button>",
        data: null,
      },
      {
        targets: 7,
        defaultContent:
          "<button class='btn btn-outline-danger btn-sm btnHoraLlegada' id='btn_hora_llegada'>Llega</button>",
        data: null,
      },
    ],
    order: [[4, "asc"]],
    info: false,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
    searching: false,
    paging: false,
    destroy: true,
  });
  // boton ver/editar domi en curso
  $("#tbl_domi_en_curso tbody").on(
    "click",
    "button.btnVerDomiEnCurso",
    function () {
      let registro = listadoDomiEnCurso.row($(this).parents("tr")).data();
      reestablecerModalDomiEnCurso();
      listarRegistroDomiEnCurso(registro);
      let btnDomiInternoPorsalir = registro.btn_domi_interno;
      if (btnDomiInternoPorsalir == 1) {
        $("#bloque_edit_domi_externo, #bloque_edit_valor_domi_externo").hide();
      } else {
        $("#bloque_edit_inyectologia").hide();
        $("#bloque_edit_transportador").hide();
        $("#bloque_edit_domi_externo, #bloque_edit_valor_domi_externo").show();
      }
      $("#mdl_domi_por_salir").modal("show");
    }
  );

  function reestablecerModalDomiEnCurso() {
    $("#bloque_edit_domi_externo, #bloque_edit_valor_domi_externo").show();
    $("#grupo_edit_inyectologia").show();
    $("#bloque_edit_transportador").show();
  }

  // boton LLEGA.
  $("#tbl_domi_en_curso tbody").on(
    "click",
    "button.btnHoraLlegada",
    function () {
      let registro = listadoDomiEnCurso.row($(this).parents("tr")).data();
      defineHoraLlegada(registro);
    }
  );

  function defineHoraLlegada(registro) {
    $.ajax({
      type: "POST",
      url:
        "domi_en_curso_mdl.php?accion=define_hora_llegada&domicilio_id=" +
        registro.domicilio_id,
      dataSrc: "",
      data: registro,
      success: function (msg) {
        $("#tbl_domi_por_salir").DataTable().ajax.reload();
        $("#tbl_domi_en_curso").DataTable().ajax.reload();
      },
      error: function () {
        alert("Problema en define_hora_salida");
      },
    });
  }
}
// fin datatables domi en curso

// DTTBL GESTIONES
function datatablesGestiones() {
  let listadoGestiones = $("#tbl_gestiones").DataTable({
    ajax: {
      url: "venta_home_mdl.php?accion=carga_dttbl_gestiones",
      dataSrc: "",
      data: "",
    },
    columns: [
      { data: "venta_nombre_producto" },
      { data: "venta_nombre_proveedor" },
      { data: "venta_costo_producto" },
      { data: "venta_valor_venta" },
      { data: "user_nombre" },
      { data: "venta_utilidad" },
      { data: "venta_tipo" },
      { data: null, orderable: false },
    ],
    columnDefs: [
      {
        targets: 7,
        defaultContent:
          "<button class='btn btn-outline-success btn-sm btnVerGestion'><i class='fa-solid fa-pen'></i></button>",
        data: null,
      },
    ],
    order: [[4, "asc"]],
    info: false,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
    searching: false,
    paging: false,
    destroy: true,
  });

  // boton ver/editar domi en curso
  $("#tbl_gestiones").on("click", "button.btnVerGestion", function () {
    let registro = listadoGestiones.row($(this).parents("tr")).data();
    recuperarRegistro(registro);
    $("#mdl_edit_ventas").modal("show");
  });
}
// fin datatables gestiones

// DTTBL MDL GESTIONES MES VENDEDOR
function dttbl_mes_vendedor(turno_id, user_id) {
  var listado = $("#tbl_gestiones_mes_vendedor").DataTable({
    ajax: {
      url: "venta_home_mdl.php?accion=listar_ventas_mes_vendedor",
      dataSrc: "",
      data: { turno_id: turno_id, user_id: user_id },
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
      { data: "venta_utilidad" },
    ],
    columnDefs: [],
    order: [[1, "asc"]],
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
    fixedHeader: true,
    // scrollY: "400px",
    // scrollCollapse: true,
    paging: false,
    destroy: true,
  });
}

// DTTBL MDL GESTIONES AGRUPADAS POR DIA
function dttbl_gestiones_agrupadas_por_dia(turno_id, user_id) {
  var listado = $("#tbl_gestiones_agrupadas_por_dia").DataTable({
    ajax: {
      url: "venta_home_mdl.php?accion=listar_ventas_agrupadas_por_dia_vendedor",
      dataSrc: "",
      data: { turno_id: turno_id, user_id: user_id },
    },
    columns: [
      { data: "FECHA" },
      { data: "DIA" },
      { data: "UTILIDAD" },
      { data: "NUM_GESTIONES" },
    ],
    columnDefs: [],
    order: [[0, "asc"]],
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },

    fixedHeader: true,
    // scrollY: "400px",
    // scrollCollapse: true,
    paging: false,
    destroy: true,
  });
}

//DTTBL MDL MES TODOS
function dttbl_mes_todos(turno_id,user_id) {
    var listado = $("#tbl_gestiones_mes_todos").DataTable({
      ajax: {
        url: "venta_home_mdl.php?accion=listar_ventas_mes_todos",
        dataSrc: "",
        data: { turno_id: turno_id, user_id:user_id },
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
      columnDefs: [],
      order: [[1, 'asc']],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },
       fixedHeader: true,
        // scrollY: "400px",
        // scrollCollapse: true,
       paging: false,
       destroy: true,
    });
  }
