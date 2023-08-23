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