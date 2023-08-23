//-------------------------------
//CICLO CERRAR TURNO
//-------------------------------
$("#menu_cerrar_turno").click(function () {
  limpiarDatosModalCerrar();
  $("#mdl_cerrar_turno").modal("show");
  let turno_id = 300;
  $("#npt_turno_id_actual").val(turno_id);
  calculaTotalGestiones(turno_id);
});

function limpiarDatosModalCerrar() {
  // ocultar elementos
  $("#grupo_sobrante").hide();
  $("#grupo_faltante").hide();
  // normaliza fondos
  $("#npt_saldo_caja, #npt_total_gestiones,#npt_saldo_final, #slct_descuadre, #npt_entrega_final").css("background-color", "");
  //limpiar input
  $("#npt_turno_saldo_caja_base").val("");
  $("#npt_saldo_caja").val("");
  $("#npt_total_gestiones_base").val("");
  $("#npt_total_gestiones").val("");
  $("#npt_saldo_final_base").val("");
  $("#npt_saldo_final").val("");
  $("#slct_descuadre").val("");
  $("#npt_descuadre_id").val("");
  $("#npt_sobrante_base").val("");
  $("#npt_sobrante").val("");
  $("#npt_faltante_base").val("");
  $("#npt_faltante").val("");
  $("#npt_entrega_final_base").val("");
  $("#npt_entrega_final").val("");
}


//  CALCULA TOTAL GESTIONES
function calculaTotalGestiones(turno_id) {
  $.ajax({
    type: "GET",
    url: "venta_home_mdl.php?accion=total_utilidad_gestiones",
    data: { turno_id: turno_id },
    success: function (datos) {
      $("#npt_total_gestiones_base").val(Number(datos[0].sumatoria_gestiones));
      let valor_base = $("#npt_total_gestiones_base").val();
      //dar formato  al valor y mostrarlo en el input utilidad
      let valor_formato = Number(valor_base)
        .toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }
        );
      $("#npt_total_gestiones").val(valor_formato);
      $("#npt_total_gestiones").css("background-color", "#dbe5f0");
    },
    error: function () {
      alert("Problema en total utilidad gestiones");
    },
  });
}

// CALCULA SALDO FINAL Y DA FORMATO

$("#npt_saldo_caja").on("change", function () {
  const value = this.value.replace(/\$|\./g, "");
  $("#npt_saldo_caja_base").val(value);

  let totalCaja = $("#npt_saldo_caja_base").val();
  // alert("total caja "+totalCaja)
  let totalGestiones = $("#npt_total_gestiones_base").val();
  // alert("total caja "+totalGestiones)
  let saldoFinal = Number(totalCaja) + Number(totalGestiones);
  $("#npt_saldo_final_base").val(saldoFinal);

  //dar formato  al valor y mostrarlo en el input utilidad
  let valor_formato = Number(saldoFinal)
    .toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }
    );
  $("#npt_saldo_final").val(valor_formato);
  $("#npt_saldo_final").css("background-color", "#dbe5f0");

});


// VALIDACIONES Y FORMATO AL DIGITAR

// solo deja ingresar numeros al input
$(document).ready(function () {
  $("#npt_saldo_caja, #npt_sobrante, #npt_faltante")
    .on("input", function (evt) {
      $(this).val($(this).val().replace(/[^0-9]./g, ""));
    });
});

// FORMATO AUTOMATICO AL NPT SALDO CAJA
$("#npt_saldo_caja").on("change", function () {
  const value = this.value.replace(/\$|\./g, "");
  if (value === "") {
    // validacion para evitar que se muestre NaN en el input al quitar foco
    return false;
  } else {
    $("#npt_saldo_caja").css("background-color", "#dbe5f0");
    //pasar el valor solo numeros al npt_base
    let valor_base = this.value;
    $("#npt_venta_valor_venta_base").val(valor_base);
    //conversion del valor al formato moneda con parseFloat
    this.value = Number(value).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  }
});


// INPUT SOBRANTE Y CALCULOS
$("#npt_sobrante").on("change", function () {
  const value = this.value.replace(/\$|\./g, "");
  if (value === "") {
    // validacion para evitar que se muestre NaN en el input al quitar foco
    return false;
  } else {
    $("#npt_sobrante").css("background-color", "#dbe5f0");
    //pasar el valor solo numeros al npt_base
    let valor_base = this.value;
    $("#npt_sobrante_base").val(valor_base);
    //conversion del valor al formato moneda con parseFloat
    this.value = parseFloat(value).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
    // calculo para el input entrega final
    let inputSaldoFinal = $("#npt_saldo_final_base").val();
    let SumaFinalSobrante = Number(inputSaldoFinal) + Number(valor_base)
    //conversion del valor al formato moneda
    let valorFormato = Number(SumaFinalSobrante).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
    $("#npt_entrega_final").val(valorFormato);
    $("#npt_entrega_final").css("background-color", "#dbe5f0");
    $("#npt_entrega_final_base").val(SumaFinalSobrante);
    return false;
  }
});


// INPUT FALTANTE Y CALCULOS
$("#npt_faltante").on("change", function () {
  const value = this.value.replace(/\$|\./g, "");
  if (value === "") {
    // validacion para evitar que se muestre NaN en el input al quitar foco
    return false;
  } else {
    $("#npt_faltante").css("background-color", "#dbe5f0");
    //pasar el valor solo numeros al npt_base
    let valor_base = this.value;
    $("#npt_faltante_base").val(valor_base);
    //conversion del valor al formato moneda con parseFloat
    this.value = parseFloat(value).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
    // calculo para el input entrega final
    let inputSaldoFinal = $("#npt_saldo_final_base").val();
    let restaFinalFaltante = Number(inputSaldoFinal) - Number(valor_base)
    //conversion del valor al formato moneda
    let valorFormato = Number(restaFinalFaltante).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
    $("#npt_entrega_final").val(valorFormato);
    $("#npt_entrega_final").css("background-color", "#dbe5f0");
    $("#npt_entrega_final_base").val(restaFinalFaltante);
    return false;
  }
});


// COMPORTAMIENTO DEL SELECT DESCUADRE
$("#slct_descuadre").on("change", function () {
  $("#npt_descuadre_id").val($(this).val());
  $("#slct_descuadre").css("background-color", "#dbe5f0");
  let descuadreId = $("#npt_descuadre_id").val();
    if (descuadreId == "2") {
    $("#npt_sobrante").val("");
    $("#npt_faltante").val("");
    $("#npt_faltante_base").val("0");
    $("#npt_entrega_final").val("");
    $("#npt_entrega_final_base").val("0");
    $("#npt_sobrante").css("background-color", "");
    $("#npt_faltante").css("background-color", "");
    $("#npt_entrega_final").css("background-color", "");
    $("#grupo_sobrante").show();
    $("#grupo_faltante").hide();

  } else if (descuadreId == "3") {
    $("#npt_sobrante").val("");
    $("#npt_sobrante_base").val("0");
    $("#npt_faltante").val("");
    $("#npt_entrega_final").val("");
    $("#npt_entrega_final_base").val("");
    $("#npt_sobrante").css("background-color", "");
    $("#npt_faltante").css("background-color", "");
    $("#npt_entrega_final").css("background-color", "");
    $("#grupo_sobrante").hide();
    $("#grupo_faltante").show();
  } else if (descuadreId == "1") {
    $("#npt_sobrante").val("");
    $("#npt_sobrante_base").val("0");
    $("#npt_faltante").val("");
    $("#npt_faltante_base").val("0");
    $("#grupo_sobrante").hide();
    $("#grupo_faltante").hide();
    let inputSaldoFinal = $("#npt_saldo_final").val();
    let inputSaldoFinalBase = $("#npt_saldo_final_base").val();
    $("#npt_entrega_final").val(inputSaldoFinal);
    $("#npt_entrega_final_base").val(inputSaldoFinalBase);
    return false;
  }
});

// BOTON CONFIRMA CIERRE DEL TURNO
$("#btn_confirma_cerrar_turno").click(function () {
  //VALIDACION DE DATOS DEL MODAL
  let valida_saldo_caja = $("#npt_saldo_caja_base").val();
  let valida_descuadre = $("#npt_descuadre_id").val();
  let valida_entrega = $("#npt_entrega_final_base").val();
  // compara datos de variables contra vacio y muestra un alert
  if (valida_saldo_caja.trim() == "") {
    alert("digite valor saldo.");
    $("#npt_saldo_caja").focus();
    return false;
  } else if (valida_descuadre.trim() == "") {
    alert("valor de descuadre en cero");
    $("#slct_descuadre").focus();
    return false;
    } else if (valida_entrega.trim() == "") {
    alert("valor de entrega en cero");
    return false;
  } else {
    let registro = recolectarDatosFormularioCerrar();
    guardarRegistroCerrar(registro);
    $("#mdl_cerrar_turno").modal("hide");
    // comprobarCierreDelTurno();
    // $("#mdl_cerrar_final").modal("show");
  }
});

function recolectarDatosFormularioCerrar() {
  let registro = {
    turno_id: $("#npt_turno_id_actual").val(),
    turno_saldo_caja: $("#npt_saldo_caja_base").val(),
    turno_total_utilidad: $("#npt_total_gestiones_base").val(),
    turno_total_entrega: $("#npt_saldo_final_base").val(),
    turno_descuadre: $("#npt_descuadre_id").val(),
    turno_sobrante: $("#npt_sobrante_base").val(),
    turno_faltante: $("#npt_faltante_base").val(),
    turno_entrega_final: $("#npt_entrega_final_base").val(),
  };
  return registro;
}

function guardarRegistroCerrar(registro) {
  $.ajax({
    type: "POST",
    url:
      "venta_home_mdl.php?accion=guardar_cierre_turno&turno_id=" + registro.turno_id,
    data: registro,
    success: function (msg) { },
    error: function () {
      alert("problema en: guardar Cierre turno");
    },
  });
}

//CICLO FINALIZA CERRAR
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

//CALCULA UTILIDAD MODAL EDITAR GESTION
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