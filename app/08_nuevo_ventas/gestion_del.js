  //----------------------
  // CICLO BORRAR GESTION
  //----------------------

// boton eliminar gestion
  $("#btn_eliminar_gestion").on(
    "click",
    function () {
        $("#mdl_confirma_eliminar_gestion").modal("show");
    }
  );


// boton confirma eliminar gestion
  $("#btn_confirma_eliminar_gestion").on(
    "click",
    function () {
    let ventaId = $("#nptEdit_venta_id").val()
    $("#mdl_confirma_eliminar_gestion").modal("hide");   
    delGestion(ventaId);

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
        //actualizaPantallaPrincipal();
          recargaElementosEntorno();
          $("#tbl_gestiones_en_espera").DataTable().ajax.reload();
          $("#tbl_gestiones").DataTable().ajax.reload();
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
        //cargaPantallaPrincipal();
        recargaElementosEntorno();
        $("#tbl_gestiones_en_espera").DataTable().ajax.reload();
        $("#tbl_gestiones").DataTable().ajax.reload();
      },
      error: function () {
        alert("Problema en borrarRegistro");
      },
    });
  }
  // fin ciclo borrar registro