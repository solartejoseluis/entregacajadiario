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