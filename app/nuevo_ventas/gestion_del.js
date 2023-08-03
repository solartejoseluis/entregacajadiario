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
    let domicilioId = $("#npt_edit_domicilio_id").val()
    DelDomiPorSalir(domicilioId);
        $("#mdl_confirma_eliminar_gestion").modal("hide");
    }
  );

  function DelDomiPorSalir(domicilio_id) {
    $.ajax({
      type: "GET",
      url: "domixsalir_mdl.php?accion=borrar_domi&domicilio_id=" + domicilio_id,
      data: "",
      success: function (msg) {
        $("#tbl_domi_por_salir").DataTable().ajax.reload();
        $("#mdl_domi_por_salir").modal("hide");
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