document.addEventListener("DOMContentLoaded", function () {
  // actualizaPantallaPrincipal();
});

// DTTBL DOMI POR SALIR
function datatablesDomiPorSalir(turno_id) {
  let listadoDomiPorSalir = $("#tbl_domi_por_salir").DataTable({
    ajax: {
      url: "admin_turno_mdl.php?accion=carga_dttbl_domi_por_salir&turno_id=" + turno_id,
      dataSrc: "",
      data: "",
      
    },
    columns: [
      { data: "hora_creado" },
      { data: "barrio_nombre" },
      { data: "user_nombre" },
      { data: "domi_externo_nombre" },
      { data: "valor_venta" },

    ],
    columnDefs: [
      {
        targets: 4,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
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


 }
  // final DTTBL domi por salir

  // DTTBL DOMI EN CURSO
  function datatablesDomiEnCurso(turno_id) {

    let listadoDomiEnCurso = $("#tbl_domi_en_curso").DataTable({
      ajax: {
        url: "admin_turno_mdl.php?accion=carga_dttbl_domi_en_curso&turno_id=" + turno_id,
        dataSrc: "",
        data: "",
      },
      columns: [
        { data: "barrio_nombre" },
        { data: "domi_interno_nombre" },
        { data: "domi_externo_nombre" },
        { data: "valor_venta" },
        { data: "hora_salida" },
     ],
      columnDefs: [
        {
          targets: 3,
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
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
  }
  // fin dttbl domi en curso

// DTTBL DOMI ENTREGADOS
  function datatablesDomiEntregados(turno_id) {
    // turno_id = $("#npt_turno_id_actual").val();
    // user_id = $("#npt_user_id_actual").val();
    let listado = $("#tbl_domi_entregados").DataTable({
      ajax: {
        url: "admin_turno_mdl.php?accion=carga_dttbl_domi_entregados&turno_id=" + turno_id,
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
        { data: "observaciones" },
        { data: "turno_id" },
      ],
      columnDefs: [
        {
          targets: 4,
          render: $.fn.dataTable.render.number(".", ",", 0, "$"),
        },
        // {
        //   targets: 13,
        //   defaultContent:
        //     "<button class='btn btn-primary btn-sm btnVerDomiEntregado' id='btn_ver_domi_entregado'><i class='fa-solid fa-pen'></i></button>",
        //   data: null,
        // },
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
// fin dttbl domi entregados


  // DTTBL GESTIONES
  function datatablesGestiones(turno_id) {
    let listadoGestiones = $("#tbl_gestiones").DataTable({
      ajax: {
        url: "admin_turno_mdl.php?accion=carga_dttbl_gestiones&turno_id=" + turno_id,
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
        url: "admin_turno_mdl.php?accion=listar_ventas_mes_vendedor",
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
        url: "admin_turno_mdl.php?accion=listar_ventas_agrupadas_por_dia_vendedor",
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
        url: "admin_turno_mdl.php?accion=listar_ventas_mes_todos",
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
      url: "admin_turno_mdl.php?accion=consultar_utilidad_vendedor1",
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


  function utilidadTurno() {
    $.ajax({
      type: "GET",
      url: "admin_turno_mdl.php?accion=consultar_utilidad_turno",
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
      url: "admin_turno_mdl.php?accion=acumulado_mes_usuario_actual",
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
      url: "admin_turno_mdl.php?accion=acumulado_turno_usuario_actual",
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



  $("#btn_actualiza_mdl_domicilios").on("click", function () {
alert("actualiza_los datos del modal domicilios");
  });

