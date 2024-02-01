
// carga pantalla de inicio 
document.addEventListener("DOMContentLoaded", function () {
//*! valores desactivados por que los estoy tomando desde los inputs
//var turno_id="";//se carga con CargarAcceso()
//var user_id="";//se carga con CargarAcceso()
cargarAcceso()//TODO: 2024-01-30 se debe ejecutar solo al iniciar por variables de sesion.
actualizaPantallaPrincipal();
});



function actualizaPantallaPrincipal() {
  let turno_id = $("#npt_turno_id_actual").val();
  let user_id = $("#npt_user_id_actual").val();
  // *! cargarAcceso(); eliminada para solucion problemas recarga
  aplicaEstilosPorUsuario(user_id);
  datatablesDomiPorSalir();
  datatablesDomiEnCurso();
  datatablesGestiones();
  datatablesGestionesEnEspera();
  consultarDatosTurnoActual(turno_id);
  acumuladoMesUsuarioActual();
  acumuladoTurnoUsuarioActual();
  mesActual();

}

// intercambia la hoja de estilos segun el perfil de usuario
function aplicaEstilosPorUsuario(user_id){
if (user_id == 1){
  document.getElementById('estilos').href = 'ventas_1.css';
}else{
    document.getElementById('estilos').href = 'ventas_2.css';
}
};

//esta funcion la uso en gestion_del.js y en gestion_new.js
function recargaElementosEntorno(){
  let turno_id = $("#npt_turno_id_actual").val();
  // *! cargarAcceso(); la he quitado para probar fallos en recarga
  consultarDatosTurnoActual(turno_id);
  acumuladoMesUsuarioActual(turno_id);
  acumuladoTurnoUsuarioActual(turno_id);
  }


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
      //*! valores eliminados porque en las funciones tomo los datos desde los inputs
      //turno_id = $("#npt_turno_id_actual").val();
      //user_id = $("#npt_user_id_actual").val();
    
    },
    error: function () {
      alert("Problema en cargar acceso");
    },
  });
}




function consultarDatosTurnoActual() {
  let turno_id = $("#npt_turno_id_actual").val();
  $.ajax({
    type: "GET",
    async: false, //necesario
    url: "venta_home_mdl.php?accion=consultarDatosTurnoActual&turno_id="+turno_id,
    data: "",
    success: function (datos) {
      //$("#npt_turno_id_actual").val(datos[0].turno_id_actual);
      $("#npt_user_nombre").html(datos[0].user_nombre);
      $("#npt_user_apellido").html(datos[0].user_apellido);
      $("#spn_user_nombre").html(datos[0].user_nombre);
      $("#spn_user_apellido").html(datos[0].user_apellido);
      $("#spn_jornada_nombre").html(datos[0].jornada_nombre);
    },
    error: function () {
      alert("Problema en consultar datos turno actual en venta_home_ctrl.js");
    },
  });
}


// carga la fecha actual y cuadro principal de pagina
function getTime() {
  var today = moment();
  date = today.format("LLLL");
  document.getElementById("hoy_moment").innerHTML =
    `<span>${date}</span>`;
}
setInterval(function () {
  getTime();
}, 1000);

// carga el mes actual
function mesActual() {
  let mesActual = moment().format("MMMM-YYYY");
  $(".mesActual").html(mesActual);
}

// SIDEBAR
$("#lnk_gestiones_mes_vendedor").on("click", function () {
  $("#mdl_gestiones_mes_vendedor").modal("show");
  dttbl_mes_vendedor(turno_id, user_id);
});

$("#lnk_gestiones_agrupadas_por_dia").on("click", function () {
  $("#mdl_gestiones_agrupadas_por_dia").modal("show");
  dttbl_gestiones_agrupadas_por_dia(turno_id, user_id);
});

$("#lnk_gestiones_mes_todos").on("click", function () {
  $("#mdl_gestiones_mes_todos").modal("show");
  dttbl_mes_todos(turno_id, user_id);
});

$("#lnk_gestiones_mes_vendedor").on("click", function () {
  $("#mdl_gestiones_mes_vendedor").modal("show");
});

$("#lnk_gestiones_mes_vendedor").on("click", function () {
  $("#mdl_gestiones_mes_vendedor").modal("show");
});

// DTTBL DOMI POR SALIR
function datatablesDomiPorSalir() {
  let listadoDomiPorSalir = $("#tbl_domi_por_salir").DataTable({
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
      { data: "gestion_01" },
      { data: "gestion_02" },
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
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      }, {
        targets: 6,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },

      {
        targets: 7,
        defaultContent:
          "<button class='btn btn-outline-primary btn-sm btnVerDomiPorSalir'><i class='fa-solid fa-pen'></i></button>",
        data: null,
      },
      {
        targets: 8,
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
        //$("#bloque_edit_inyectologia").hide();
        $("#bloque_edit_transportador").hide();
        $("#bloque_edit_domi_externo, #bloque_edit_valor_domi_externo").show();
      }
      $("#mdl_domi_por_salir").modal("show");
    }
  );

  function reestablecerModalDomiPorSalir() {
    $("#bloque_edit_domi_externo, #bloque_edit_valor_domi_externo").show();
    //$("#grupo_edit_inyectologia").show();
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
      type: "GET",
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
// final DTTBL domi por salir

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
      { data: "domi_interno_nombre" },
      { data: "domi_externo_nombre" },
      { data: "valor_venta" },
      { data: "gestion_01" },
      { data: "gestion_02" },
      { data: "hora_salida" },
      { data: null, orderable: false },
    ],
    columnDefs: [
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
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
      {
        targets: 7,
        defaultContent:
          "<button class='btn btn-outline-danger btn-sm btnHoraLlegada' id='btn_hora_llegada'>Llega</button>",
        data: null,
      },
    ],
    order: [[6, "asc"]],
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
        //$("#bloque_edit_inyectologia").hide();
        $("#bloque_edit_transportador").hide();
        $("#bloque_edit_domi_externo, #bloque_edit_valor_domi_externo").show();
      }
      $("#mdl_domi_por_salir").modal("show");
    }
  );

  function reestablecerModalDomiEnCurso() {
    $("#bloque_edit_domi_externo, #bloque_edit_valor_domi_externo").show();
    //$("#grupo_edit_inyectologia").show();
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
      type: "GET",
      url:
        "domi_en_curso_mdl.php?accion=define_hora_llegada&domicilio_id=" +
        registro.domicilio_id,
      dataSrc: "",
      data: registro,
      success: function (msg) {
        //$("#tbl_domi_por_salir").DataTable().ajax.reload();
        $("#tbl_domi_en_curso").DataTable().ajax.reload();
      },
      error: function () {
        alert("Problema en define_hora_salida");
      },
    });
  }
}
// fin dttbl domi en curso



// DTTBL GESTIONES EN ESPERA
function datatablesGestionesEnEspera() {
  turno_id = $("#npt_turno_id_actual").val();
  user_id = $("#npt_user_id_actual").val();
  let listadoGestiones = $("#tbl_gestiones_en_espera").DataTable({
    ajax: {
      url: "venta_home_mdl.php?accion=carga_dttbl_gestiones_en_espera&turno_id=" + turno_id,
      dataSrc: "",
      data: "",
    },
    columns: [
      { data: "venta_id" },
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
        targets: 3,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
      {
        targets: 4,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
      {
        targets: 6,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
      {
        targets: 8,
        defaultContent:
          "<button class='btn btn-outline-success btn-sm btnVerGestion'><i class='fa-solid fa-pen'></i></button>",
        data: null,
      },
    ],
    order: [[5, "asc"]],
    info: false,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
    searching: false,
    paging: false,
    destroy: true,
  });

  // boton editar gestion en espera
  $("#tbl_gestiones_en_espera").on("click", "button.btnVerGestion", function () {
    let registro = listadoGestiones.row($(this).parents("tr")).data();
    recuperarRegistro(registro);
    $("#mdl_edit_ventas").modal("show");
  });
}
// fin datatables gestiones en espera


// DTTBL GESTIONES
function datatablesGestiones() {
  turno_id = $("#npt_turno_id_actual").val();
  user_id = $("#npt_user_id_actual").val();
  let listadoGestiones = $("#tbl_gestiones").DataTable({
    ajax: {
      url: "venta_home_mdl.php?accion=carga_dttbl_gestiones&turno_id=" + turno_id,
      dataSrc: "",
      data: "",
    },
    columns: [
      { data: "venta_id" },
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
        targets: 3,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
      {
        targets: 4,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
      {
        targets: 6,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
      {
        targets: 8,
        defaultContent:
          "<button class='btn btn-outline-success btn-sm btnVerGestion'><i class='fa-solid fa-pen'></i></button>",
        data: null,
      },
    ],
    order: [[5, "asc"]],
    info: false,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
    searching: false,
    paging: false,
    destroy: true,
  });

  // boton editar gestion
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
function dttbl_mes_todos(turno_id, user_id) {
  var listado = $("#tbl_gestiones_mes_todos").DataTable({
    ajax: {
      url: "venta_home_mdl.php?accion=listar_ventas_mes_todos",
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


// CARGAS EN PANTALLA PRINCIPAL

function cargarDatosUtilidadVendedor1() {
  $.ajax({
    type: "GET",
    url: "venta_home_mdl.php?accion=consultar_utilidad_vendedor1",
    data: { turno_id: turno_id },
    success: function (datos) {
      $("#utilidadVendedor1").html(datos[0].utilidad_vendedor1);
      $("#ventasVendedor1").html(datos[0].ventas_vendedor1);
    },
    error: function () {
      alert("Problema en consultarUtilidadVendedor1");
    },
  });
}

function cargarDatosUtilidadVendedor2() {
  $.ajax({
    type: "GET",
    url: "venta_home_mdl.php?accion=consultar_utilidad_vendedor2",
    data: { turno_id: turno_id },
    success: function (datos) {
      $("#utilidadVendedor2").html(datos[0].utilidad_vendedor2);
      $("#ventasVendedor2").html(datos[0].ventas_vendedor2);
    },
    error: function () {
      alert("Problema en consultarUtilidadVendedor2");
    },
  });
}

function cargarDatosUtilidadVendedor3() {
  $.ajax({
    type: "GET",
    url: "venta_home_mdl.php?accion=consultar_utilidad_vendedor3",
    data: { turno_id: turno_id },
    success: function (datos) {
      $("#utilidadVendedor3").html(datos[0].utilidad_vendedor3);
      $("#ventasVendedor3").html(datos[0].ventas_vendedor3);
    },
    error: function () {
      alert("Problema en consultarUtilidadVendedor3");
    },
  });
}

function cargarDatosUtilidadVendedor4() {
  $.ajax({
    type: "GET",
    url: "venta_home_mdl.php?accion=consultar_utilidad_vendedor4",
    data: { turno_id: turno_id },
    success: function (datos) {
      $("#utilidadVendedor4").html(datos[0].utilidad_vendedor4);
      $("#ventasVendedor4").html(datos[0].ventas_vendedor4);
    },
    error: function () {
      alert("Problema en consultarUtilidadVendedor4");
    },
  });
}

function utilidadTurno() {
  $.ajax({
    type: "GET",
    url: "venta_home_mdl.php?accion=consultar_utilidad_turno",
    data: { turno_id: turno_id },
    success: function (datos) {
      $("#p_utilidad_turno").html(datos[0].utilidad_turno);
      $("#p_turno_numero_ventas").html(datos[0].ventas_turno);
    },
    error: function () {
      alert("Problema en cargar datos utilidad turno");
    },
  });
}

function acumuladoMesUsuarioActual() {
  $.ajax({
    type: "GET",
    url: "venta_home_mdl.php?accion=acumulado_mes_usuario_actual",
    data: { user_id: user_id },
    success: function (datos) {
      $(".cuenta_nmr_gestiones").html(datos[0].cuenta_nmr_gestiones);
      $(".acumulado_utilidad").html(datos[0].acumulado_utilidad);
      $(".acumulado_ganancia").html(datos[0].acumulado_ganancia);
    },
    error: function () {
      alert("Problema en cargar acumulado mes");
    },
  });
}


function acumuladoTurnoUsuarioActual() {
  $.ajax({
    type: "GET",
    url: "venta_home_mdl.php?accion=acumulado_turno_usuario_actual",
    data: { user_id: user_id, turno_id: turno_id },
    success: function (datos) {
      $(".cuenta_nmr_gestiones_turno").html(datos[0].cuenta_nmr_gestiones_turno);
      $(".acumulado_utilidad_turno").html(datos[0].acumulado_utilidad_turno);
      $(".acumulado_ganancia_turno").html(datos[0].acumulado_ganancia_turno);
    },
    error: function () {
      alert("Problema en cargar acumulado turno");
    },
  });
}

// CICLO CERRAR SESION
$("#lnk_cerrar_sesion").on("click", function () {
  $("#mdl_confirma_cerrar_sesion").modal("show");
});

$("#btn_confirma_cerrar_sesion").on("click", function () {
  // $("#mdl_confirma_cerrar_sesion").modal("show");
  $(location).attr("href", "../01_login/login_view.html");
});


// -------------------------------------
// ciclo mostrar domicilios entregados
// -------------------------------------

$("#btn_domi_entregados").on("click", function () {
  $("#mdl_domi_entregados").modal("show");
  datatablesDomiEntregados();
});

function datatablesDomiEntregados() {
  turno_id = $("#npt_turno_id_actual").val();
  user_id = $("#npt_user_id_actual").val();
  let listado = $("#tbl_domi_entregados").DataTable({
    ajax: {
      url: "venta_home_mdl.php?accion=listar_domi_entregados&turno_id=" + turno_id,
      dataSrc: "",
      data: "",
    },
    columns: [
      { data: "barrio_nombre" },
      { data: "user_nombre" },
      { data: "domi_externo_nombre" },
      { data: "valor_domi_externo" },
      { data: "valor_venta" },
      { data: "numero_factura" },
      { data: "hora_salida" },
      { data: "hora_llegada" },
      { data: "gestion_01" },
      { data: "gestion_02" },
      { data: "observaciones" },
      { data: "turno_id" },
    ],
    columnDefs: [
      {
        targets: 3,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
      {
        targets: 4,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
      {
        targets: 9,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
      {
        targets: 10,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },

    ],
    order: [[6, "asc"]],
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
    info: true,
    searching: true,
    paging: false,
    destroy: true,
  });
}