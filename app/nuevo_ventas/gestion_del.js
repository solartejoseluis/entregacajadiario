  //----------------------
  // CICLO BORRAR DOMI POR SALIR
  //----------------------

// boton eliminar domi por salir, abre el modal de confirmacion
  $("#btn_eliminar_gestion").on(
    "click",
    function () {
        $("#mdl_confirma_eliminar_gestion").modal("show");
    }
  );


// boton confirma eliminar domi, elimina el registro
  $("#btn_confirma_eliminar_gestion").on(
    "click",
    function () {
    let ventaId = $("#nptEdit_venta_id").val()
    delGestion(ventaId);
        $("#mdl_confirma_eliminar_gestion").modal("hide");
    }
  );

  function delGestion(venta_id) {
    $.ajax({
      type: "GET",
      url: "gestion_mdl.php?accion=borrar_venta&venta_id=" + venta_id,
      data: "",
      success: function (msg) {
        $("#tbl_gestiones").DataTable().ajax.reload();
        $("#mdl_confirma_eliminar_gestion").modal("hide");
        $("#mdl_edit_gestion").modal("hide");
      },
      error: function () {
        alert("Problema en borrar gestion");
      },
    });
  }

//----------------------
  // CICLO BORRAR gestion
  //----------------------
  function borrarRegistro(venta_id) {
    // BORRA REGISTRO Y ACTUALIZA DATATABLES
    $.ajax({
      type: "GET",
      url: "venta_home_mdl.php?accion=borrar_venta&venta_id=" + venta_id,
      data: "",
      success: function (msg) {
        // listadoVentas.ajax.reload();
        $("#tblVentas").DataTable().ajax.reload();
        cargaPantallaPrincipal();
      },
      error: function () {
        alert("Problema en borrarRegistro");
      },
    });
  }
  // fin ciclo borrar registro