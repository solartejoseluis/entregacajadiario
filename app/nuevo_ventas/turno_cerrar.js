//-------------------------------
  //CICLO CERRAR TURNO
  //-------------------------------
  $("#menu_cerrar_turno").click(function () {
    limpiarDatosFormularioCerrar();
    $("#mdl_cerrar_turno").modal("show");
  });

  function limpiarDatosFormularioCerrar() {
    //$('#npt_turno_id').val('');
    $("#npt_turno_saldo_caja").val("");
    $("#npt_turno_total_utilidad").val("");
    $("#npt_turno_total_entrega").val("");
    $("#npt_turno_descuadre").val("");
  }

  //----------------------
  //CICLO CALCULO UTILIDAD
  //----------------------
  $("#npt_turno_saldo_caja").focusout(function () {
    $.ajax({
      type: "GET",
      url: "venta_home_mdl.php?accion=consultar_utilidad_turno",
      data: { turno_id: turno_id },
      success: function (datos) {
        let valorCero = 0;
        let totalUtilidad = 0;
        $("#npt_turno_total_utilidad").val(datos[0].utilidad_turno);
        if ($("#npt_turno_total_utilidad").val() === "") {
          alert("Aviso:la utilidad de este turno es CERO");
          $("#npt_turno_total_utilidad").val(valorCero);
          totalUtilidad = valorCero;
        } else {
          totalUtilidad = $("#npt_turno_total_utilidad").val();
        }
        let totalSaldo = $("#npt_turno_saldo_caja").val();
        //let entrega =
        //parseFloat(totalSaldo.replace(/\$|\./g, "")) +
        //parseFloat(totalUtilidad.replace(/\$|\./g, ""));
        let entrega = parseFloat(totalSaldo) + parseFloat(totalUtilidad);
        $("#npt_turno_total_entrega").val(entrega);
      },
      error: function () {
        alert("Problema en cargar datos utilidad turno");
      },
    });
  });

  $("#btn_confirma_cerrar_turno").click(function () {
    //VALIDACION DE DATOS DEL MODAL
    let valida_saldo_caja = $("#npt_turno_saldo_caja").val();
    let valida_descuadre = $("#npt_turno_descuadre").val();
    // compara datos de variables contra vacio y muestra un alert
    if (valida_saldo_caja.trim() == "") {
      alert("digite valor saldo.");
      $("#npt_turno_saldo_caja").focus();
      return false;
    } else if (valida_descuadre.trim() == "") {
      alert("Digite Valor De Descuadre");
      $("#npt_turno_descuadre").focus();
      return false;
    } else {
      let registro = recolectarDatosFormularioCerrar();
      guardarRegistroCerrar(registro);
      $("#mdl_cerrar_turno").modal("hide");
      comprobarCierreDelTurno();
      $("#mdl_cerrar_final").modal("show");
    }
  });

  function recolectarDatosFormularioCerrar() {
    let registro = {
      //turno_id_actual: $("#npt_turno_id_actual").val(),
      turno_saldo_caja: $("#npt_turno_saldo_caja").val(),
      turno_total_utilidad: $("#npt_turno_total_utilidad").val(),
      turno_total_entrega: $("#npt_turno_total_entrega").val(),
      turno_descuadre: $("#npt_turno_descuadre").val(),
    };
    return registro;
  }

  function guardarRegistroCerrar(registro) {
    $.ajax({
      type: "POST",
      url:
        "venta_home_mdl.php?accion=guardar_cierre_turno&turno_id=" + turno_id,
      data: registro,
      success: function (msg) {},
      error: function () {
        alert("problema en: guardar Cierre turno");
      },
    });
  }
  // FIN CICLO CERRAR TURNO

  //-------------------------------
  //CICLO FINALIZA CERRAR
  //-------------------------------
  $("#btn_final_turno").click(function () {
    $("#mdl_cerrar_final").modal("hide");
    alert("El Turno Ha sido Cerrado");
    $(location).attr("href", "../01_login/login_view.html");
  });

  function comprobarCierreDelTurno() {
    $.ajax({
      type: "GET",
      url: "venta_home_mdl.php?accion=consultar_turno_cerrado",
      data: { turno_id: turno_id },
      success: function (datos) {
        $("#npt_final_saldo_caja").val(datos[0].turno_saldo_caja);
        $("#npt_final_total_utilidad").val(datos[0].turno_total_utilidad);
        $("#npt_final_total_entrega").val(datos[0].turno_total_entrega);
        $("#npt_final_descuadre").val(datos[0].turno_descuadre);
      },
      error: function () {
        alert("problema en: guardar Cierre turno");
      },
    });
  }
  // FIN CICLO FINALIZAR CERRAR

  //Calcula Utilidad Modal EDITAR GESTION
  $("#nptEdit_venta_valor_venta").focusout(function () {
    let costo = $("#nptEdit_venta_costo_producto_base").val();
    let valor_venta = $("#nptEdit_venta_valor_venta").val();
    let utilidad =
      parseFloat(valor_venta.replace(/\$|\./g, "")) -
      parseFloat(costo.replace(/\$|\./g, ""));
    $("#nptEdit_venta_utilidad").val(utilidad);
  });

  $("#nptEdit_venta_costo_producto").focusout(function () {
    let costo = $("#nptEdit_venta_costo_producto").val();
    let valor_venta = $("#nptEdit_venta_valor_venta").val();
    let utilidad =
      parseFloat(valor_venta.replace(/\$|\./g, "")) -
      parseFloat(costo.replace(/\$|\./g, ""));
    $("#nptEdit_venta_utilidad").val(utilidad);
  });