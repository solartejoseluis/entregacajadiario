  //----------------------
  //CICLO EDITAR gestion
  //----------------------
  function recuperarRegistro(registro) {
    $.ajax({
      type: "GET",
      url: "gestion_mdl.php?accion=consultar_venta&venta_id=" + registro.venta_id,
      data: "",
      success: function (datos) {
        $("#nptEdit-venta_id").val(datos[0].venta_id);
        $("#nptEdit_venta_nombre_producto").val(datos[0].venta_nombre_producto);
        $("#nptEdit_venta_nombre_proveedor").val(
          datos[0].venta_nombre_proveedor
        );
        $("#nptEdit_venta_costo_producto").val(datos[0].venta_costo_producto);
        $("#nptEdit_venta_valor_venta").val(datos[0].venta_valor_venta);
        $("#nptEdit_vendedor_nombres").val(datos[0].user_nombre);

        $("#slctEdit_vendedor").val(datos[0].user_id);
        $("#nptEdit_vendedor_id").val(datos[0].user_id);

        $("#nptEdit_venta_utilidad").val(datos[0].venta_utilidad);
        $("#mdl_edit_ventas").modal("show");
      },
      error: function () {
        alert("Problema en recuperarRegistro");
      },
    });
  }


  //carga el select vendedores
  $(document).ready(function () {
    $.ajax({
      type: "POST",
      url: "select_vendedor_mdl.php",
      success: function (response) {
        $(".selectVendedor select").html(response).fadeIn();
      },
    });
  });
  // asigna valor select vendedor al input
  $("#slctEdit_vendedor").change(function () {
    $("#nptEdit_vendedor_id").val($(this).val());
  });


  // TOMA EL VALOR DEL SELECT Y PONERLO EN INPUT
  $("#slctEdit-user").change(function () {
  $("#nptEdit-user_id").val($(this).val());
});

  $("#btn_confirm_edit").click(function () {
    //GUARDA LOS DATOS MODIFICADOS
    $("#mdl_edit_ventas").modal("hide");
    let registro = recolectarDatosFrmGestiones();
    modificarRegistro(registro);
  });

  function recolectarDatosFrmGestiones() {
    let registro = {
      venta_id: $("#nptEdit-venta_id").val(),
      venta_nombre_producto: $("#nptEdit_venta_nombre_producto").val(),
      venta_nombre_proveedor: $("#nptEdit_venta_nombre_proveedor").val(),
      venta_costo_producto: $("#nptEdit_venta_costo_producto").val(),
      venta_valor_venta: $("#nptEdit_venta_valor_venta").val(),
      user_nombre: $("#nptEdit_user_nombre").val(),
      user_id: $("#nptEdit_vendedor_id").val(),
      venta_utilidad: $("#nptEdit_venta_utilidad").val(),
    };
    return registro;
  }

  function modificarRegistro(registro) {
    $.ajax({
      type: "POST",
      url:
        "gestion_mdl.php?accion=modificar_venta&venta_id=" +
        registro.venta_id,
      data: registro,
      success: function (msg) {
        // listadoVentas.ajax.reload();
        $("#tbl_gestiones").DataTable().ajax.reload();
        cargaPantallaPrincipal();
      },
      error: function () {
        alert("Problema modificando");
      },
    });
  }
  // FIN CICLO EDITAR gestion