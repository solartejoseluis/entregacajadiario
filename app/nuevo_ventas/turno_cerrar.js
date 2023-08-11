//-------------------------------
//CICLO CERRAR TURNO
//-------------------------------
$("#menu_cerrar_turno").click(function () {
  limpiarDatosModalCerrar();
  $("#mdl_cerrar_turno").modal("show");
});

function limpiarDatosModalCerrar() {
  // mostrar ocultar elementos
  $("#grupo_sobrante").hide();
  $("#grupo_faltante").hide();
  // normaliza fondos
  $("#npt_turno_saldo_caja, #npt_turno_total_utilidad,#npt_turno_total_entrega, #slct_descuadre, #npt_turno_entrega_final").css("background-color", "");
  //limpiar input
  $("#npt_turno_saldo_caja_base").val("");
  $("#npt_turno_saldo_caja").val("");
  $("#npt_turno_total_utilidad_base").val("");
  $("#npt_turno_total_utilidad").val("");
  $("#npt_turno_total_entrega_base").val("");
  $("#npt_turno_total_entrega").val("");
  $("#slct_descuadre").val("");
  $("#npt_descuadre_id").val("");
  $("#npt_sobrante_base").val("");
  $("#npt_sobrante").val("");
  $("#npt_faltante_base").val("");
  $("#npt_faltante").val("");
  $("#npt_turno_entrega_final_base").val("");
  $("#npt_turno_entrega_final").val("");
}


// validaciones y formato al digitar

// solo deja ingresar numeros al input
$(document).ready(function () {
  $("#npt_turno_saldo_caja, #npt_turno_total_utilidad, #npt_sobrante, #npt_faltante")
    .on("input", function (evt) {
      $(this).val($(this).val().replace(/[^0-9]./g, ""));
    });
});


// cambia de color el fondo y Convierte a mayusculas




$("#npt_turno_saldo_caja").on("change", function () {
  const value = this.value.replace(/\$|\./g, "");
  if (value === "") {
    // validacion para evitar que se muestre NaN en el input al quitar foco
    return false;
  } else {
    $("#npt_turno_saldo_caja").css("background-color", "#dbe5f0");
    //pasar el valor solo numeros al npt_base
    let valor_base = this.value;
    $("#npt_venta_valor_venta_base").val(valor_base);
    //conversion del valor al formato moneda con parseFloat
    this.value = parseFloat(value).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  }
});


$("#npt_turno_total_utilidad").on("change", function () {
  const value = this.value.replace(/\$|\./g, "");
  if (value === "") {
    // validacion para evitar que se muestre NaN en el input al quitar foco
    return false;
  } else {
    $("#npt_turno_total_utilidad").css("background-color", "#dbe5f0");
    //pasar el valor solo numeros al npt_base
    let valor_base = this.value;
    $("#npt_venta_total_utilidad_base").val(valor_base);
    //conversion del valor al formato moneda con parseFloat
    this.value = parseFloat(value).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  }
});

$("#npt_turno_total_entrega").on("change", function () {
  const value = this.value.replace(/\$|\./g, "");
  if (value === "") {
    // validacion para evitar que se muestre NaN en el input al quitar foco
    return false;
  } else {
    $("#npt_turno_total_entrega").css("background-color", "#dbe5f0");
    //pasar el valor solo numeros al npt_base
    let valor_base = this.value;
    $("#npt_venta_total_entrega_base").val(valor_base);
    //conversion del valor al formato moneda con parseFloat
    this.value = parseFloat(value).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  }
});

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
  }
});

$("#npt_faltante").on("change", function () {
  const value = this.value.replace(/\$|\./g, "");
  if (value === "") {
    // validacion para evitar que se muestre NaN en el input al quitar foco
    return false;
  } else {
    $("#npt_faltante").css("background-color", "#dbe5f0");
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
  }
});

$("#slct_descuadre").on("change", function () {
  $("#npt_descuadre_id").val($(this).val());
  $("#slct_descuadre").css("background-color", "#dbe5f0");
  let descuadreId = $("#npt_descuadre_id").val();
  if (descuadreId == "2") {
    $("#npt_sobrante").val("");
    $("#npt_faltante").val("");
    $("#grupo_sobrante").show();
    $("#grupo_faltante").hide();
  } else if (descuadreId == "3") {
    $("#npt_sobrante").val("");
    $("#npt_faltante").val("");
    $("#grupo_sobrante").hide();
    $("#grupo_faltante").show();
  } else {
    $("#npt_sobrante").val("");
    $("#npt_faltante").val("");
    $("#grupo_sobrante").hide();
    $("#grupo_faltante").hide();
    return false;
  }
});


//CICLO CALCULO UTILIDAD

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

// BOTON CONFIRMA CIERRE DEL TURNO
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
    success: function (msg) { },
    error: function () {
      alert("problema en: guardar Cierre turno");
    },
  });
}
// fin ciclo cerrar turno

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
// fin ciclo finalizar cerrar

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