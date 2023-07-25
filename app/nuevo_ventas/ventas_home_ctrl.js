document.addEventListener("DOMContentLoaded", function () {
  datatablesDomiPorSalir();
  datatablesDomiEnCurso();

  var turno_id = "";
  var user_id = "";

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
  //--------------------------------------
  // DATATABLES DOMI POR SALIR
  //--------------------------------------
  function datatablesDomiPorSalir() {
    var listadoDomiPorSalir = $("#tbl_domi_por_salir").DataTable({
      ajax: {
        url: "domixsalir_mdl.php?accion=listar_domi_por_salir",
        dataSrc: "",
        data: "",
      },
      columns: [
        { data: "domicilio_id" },
        { data: "hora_creado" },
        { data: "barrio_nombre" },
        { data: "user_nombre" },
        { data: "domi_externo_nombre" },
        { data: "valor_venta" },
        { data: "inyectologia" },
        { data: null, orderable: false },
      ],
      columnDefs: [
        {
          targets: 7,
          defaultContent:
            "<button class='btn btn-primary btn-sm btnVerDomiPorSalir' id='btn_ver_domi_por_salir'><i class='fa-solid fa-pen'></i></button>",
          data: null,
        },
      ],
      // order: [[3, "desc"]],
      // fixedHeader: {
      //   header: false,
      //   footer: false,
      // },
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },
      searching: false,
      info: false,
      paging: false,
      destroy: true,
    });

    // boton ver/editar domi por salir
    $("#tbl_domi_por_salir tbody").on(
      "click",
      "button.btnVerDomiPorSalir",
      function () {
        let registro = listadoDomiPorSalir.row($(this).parents("tr")).data();
        reestablecerModalDomiPorSalir();
        listarRegistroDomiPorSalir(registro.domicilio_id);
        let btnDomiInternoPorsalir = registro.btn_domi_interno;
        if (btnDomiInternoPorsalir == 1) {
          $(
            "#bloque_edit_domi_externo, #bloque_edit_valor_domi_externo"
          ).hide();
        } else {
          $("#grupo_edit_inyectologia").hide();
          $("#bloque_edit_transportador").hide();
          $(
            "#bloque_edit_domi_externo, #bloque_edit_valor_domi_externo"
          ).show();
        }
        $("#mdl_domi_por_salir").modal("show");
      }
    );

    function reestablecerModalDomiPorSalir() {
      $("#bloque_edit_domi_externo, #bloque_edit_valor_domi_externo").show();
      $("#grupo_edit_inyectologia").show();
      $("#bloque_edit_transportador").show();
    }

  }
  // FINAL DATATABLES DOMI POR SALIR

  //-----------------------------
  //CICLO menu: mis gestiones / detalle de productos
  //-----------------------------
  $("#menu_gestiones_mes_vendedor").click(function () {
    // limpiarFormulario();
    // listadoVentas = "";
    $("#mdl_gestiones_mes_vendedor").modal("show");
    // $("#mdl_gestiones_del_mes").DataTable().ajax.reload();
    ejecutar_datatables_mes_vendedor();
  });

  function ejecutar_datatables_mes_vendedor() {
    // Datatables Mes/Vendedor
    var listado_gestiones_mes_vendedor = $(
      "#tbl_gestiones_mes_vendedor"
    ).DataTable({
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
      scrollY: "400px",
      scrollCollapse: true,
      paging: false,
      destroy: true,
    });
    // fin datatables mes/vendedor
  }

  //-----------------------------
  //CICLO menu: mis gestiones/ agrupadas por dia
  //-----------------------------
  $("#menu_gestiones_agrupadas_por_dia").click(function () {
    $("#mdl_gestiones_agrupadas_por_dia").modal("show");
    ejecutar_datatables_gestiones_agrupadas_por_dia();
  });

  function ejecutar_datatables_gestiones_agrupadas_por_dia() {
    // datatables gestiones/dia
    var listado_gestiones_agrupadas_por_dia = $(
      "#tbl_gestiones_agrupadas_por_dia"
    ).DataTable({
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
      scrollY: "400px",
      scrollCollapse: true,
      paging: false,
      destroy: true,
    });
    // fin datatables gestiones dia
  }

  //-----------------------------
  //menu: productos /  gestiones del mes todos
  //-----------------------------
  $("#menu_gestiones_mes_todos").click(function () {
    // limpiarFormulario();
    // listadoVentas = "";
    $("#mdl_gestiones_mes_todos").modal("show");
    // $("#mdl_gestiones_del_mes").DataTable().ajax.reload();
    ejecutar_datatables_mes_todos();
  });

  function ejecutar_datatables_mes_todos() {
    // datatables mes/todos
    var listado_gestiones_mes_vendedor = $(
      "#tbl_gestiones_mes_todos"
    ).DataTable({
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
      order: [[1, "asc"]],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },
      fixedHeader: true,
      scrollY: "400px",
      scrollCollapse: true,
      paging: false,
      destroy: true,
    });
    // fin datatables mes todos
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
}); // cierre del addEventListener del inicio de pagina
