//-----------------------------
//CICLO AGREGAR GESTION
//-----------------------------
$("#menu_nueva_gestion, #btn_nueva_gestion").click(function () {
  limpiarModalGestiones();
  $("#mdl_new_gestion").modal("show");
});

function limpiarModalGestiones() {
  $(
    "#slct_vendedor, #npt_venta_nombre_producto, #npt_venta_id, #npt_venta_nombre_producto, #npt_venta_nombre_proveedor, #npt_venta_costo_producto,#npt_venta_valor_venta,#npt_venta_utilidad"
  ).css("background-color", "");

  $("#npt_venta_id").val("");
  $("#npt_venta_nombre_producto").val("");
  $("#npt_venta_nombre_proveedor").val("");
  $("#npt_venta_costo_producto").val("");
  $("#npt_venta_costo_producto_base").val("");
  $("#npt_venta_valor_venta").val("");
  $("#npt_venta_valor_venta_base").val("");
  $("#npt_venta_utilidad").val("");
  $("#npt_venta_utilidad_base").val("");
  $("#slct_vendedor").val("0");
  $("#npt_vendedor_id").val("");
  $("#npt_venta_tipo").val("");
$("#npt_turno_id_modal").val($("#npt_turno_id_actual").val());

}

// Validaciones al digitar
$("#slct_vendedor").on("change", function () {
  $("#slct_vendedor").css("background-color", "#dbe5f0");
});

$("#npt_venta_nombre_producto").on("keyup", function () {
  $("#npt_venta_nombre_producto").val($(this).val().toUpperCase());
});
$("#npt_venta_nombre_producto").on("change", function () {
  $("#npt_venta_nombre_producto").css("background-color", "#dbe5f0");
});

$("#npt_venta_nombre_proveedor").on("keyup", function () {
  $("#npt_venta_nombre_proveedor").val($(this).val().toUpperCase());
});
$("#npt_venta_nombre_proveedor").on("change", function () {
  $("#npt_venta_nombre_proveedor").css("background-color", "#dbe5f0");
});

//validacion en el costo producto
$("#npt_venta_costo_producto").on("change", function () {
  const value = this.value.replace(/\$|\./g, "");
  // validacion para evitar que se muestre NaN en el input al quitar foco
  if (value === "") {
    return false;
  } else {
    $("#npt_venta_costo_producto").css("background-color", "#dbe5f0");

    //pasar el valor solo numeros al npt_base
    let valor_base = this.value;
    $("#npt_venta_costo_producto_base").val(valor_base);
    //conversion del valor al formato moneda con parseFloat
    this.value = parseFloat(value).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  }
});

// validacion en el input valor venta

$("#npt_venta_valor_venta").on("change", function () {
  const value = this.value.replace(/\$|\./g, "");
  if (value === "") {
    // validacion para evitar que se muestre NaN en el input al quitar foco
    return false;
  } else {
    $("#npt_venta_valor_venta").css("background-color", "#dbe5f0");
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

//calculo de la utilidad modal nueva gestion
$("#npt_venta_costo_producto, #npt_venta_valor_venta").on(
  "change",
  function () {
    // const value = this.value.replace(/\$|\./g, "");
    let nptventaValorVenta = $("#npt_venta_valor_venta").val();
    let nptVentaCostoProducto = $("#npt_venta_costo_producto").val();
    if (nptventaValorVenta === "" || nptVentaCostoProducto === "") {
      // validacion para evitar que se muestre NaN en el input venta utilidad al falta un valor
      return false;
    } else {
      // calculo de la utilidad
      let costo = $("#npt_venta_costo_producto_base").val();
      let valor_venta = $("#npt_venta_valor_venta_base").val();
      let utilidad = parseFloat(valor_venta) - parseFloat(costo);
      //almacena el valor solo numerico en input base
      $("#npt_venta_utilidad_base").val(utilidad);
      //dar formato  al valor y mostrarlo en el input utilidad
      let utilidad_formato = utilidad.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      });
      $("#npt_venta_utilidad").val(utilidad_formato);
      $("#npt_venta_utilidad").css("background-color", "#dbe5f0");
      valor_base01 = 0;
      valor_base02 = 0;
    }
  }
);

// validacion solo deja ingresar numeros al input
$(document).ready(function () {
  $("#npt_venta_costo_producto, #npt_venta_valor_venta").on(
    "input",
    function (evt) {
      $(this).val(
        $(this)
          .val()
          .replace(/[^0-9]/g, "")
      );
    }
  );
});
// fin operaciones en modal Nueva Gestión

// confirma agregar gestion local
$("#btn_save_punto_fisico").click(function () {
  //VALIDACION DE DATOS DEL MODAL NUEVO
  let valida_nombre_producto = $("#npt_venta_nombre_producto").val();
  let valida_nombre_proveedor = $("#npt_venta_nombre_proveedor").val();
  let valida_venta_costo_producto = $("#npt_venta_costo_producto_base").val();
  let valida_venta_valor_venta = $("#npt_venta_valor_venta_base").val();
  let valida_vendedor_id = $("#npt_vendedor_id").val();
  $("#npt_venta_tipo").val("LOCAL");
  // compara datos de variables contra vacio y muestra un alert
  if (valida_vendedor_id.trim() == "") {
    alert("elija vendedor");
    $("#slct_vendedor").focus();
    return false;
  } else if (valida_nombre_producto.trim() == "") {
    alert("Digitar nombre producto.");
    $("#npt_venta_nombre_producto").focus();
    return false;
  } else if (valida_nombre_proveedor.trim() == "") {
    alert("Digite nombre proveedor");
    $("#npt_venta_nombre_proveedor").focus();
    return false;
  } else if (valida_venta_costo_producto.trim() == "") {
    alert("Digite costo producto");
    $("#npt_venta_costo_producto").focus();
    return false;
  } else if (valida_venta_valor_venta.trim() == "") {
    alert("Digite valor venta");
    $("#npt_venta_valor_venta").focus();
    return false; // fin validacion formulario nuevo
  } else {
    //ejecutar Si todo fue validado
    $("#mdl_new_gestion").modal("hide");
    let registro = recolectaDatosMdlNuevaGestion();
    guardarNuevaGestion(registro);
    //actualizaPantallaPrincipal();
    recargaElementosEntorno();
  }
});


// boton poner espera la gestion
$("#btn_poner_en_espera").click(function () {
  //VALIDACION DE DATOS DEL MODAL NUEVO
  let valida_nombre_producto = $("#npt_venta_nombre_producto").val();
  let valida_nombre_proveedor = $("#npt_venta_nombre_proveedor").val();
  let valida_venta_costo_producto = $("#npt_venta_costo_producto_base").val();
  let valida_venta_valor_venta = $("#npt_venta_valor_venta_base").val();
  let valida_vendedor_id = $("#npt_vendedor_id").val();
  $("#npt_venta_tipo").val("DOMI");

  // compara datos de variables contra vacio y muestra un alert
  if (valida_vendedor_id.trim() == "") {
    alert("elija vendedor");
    $("#slct_vendedor").focus();
    return false;
  } else if (valida_nombre_producto.trim() == "") {
    alert("Digitar nombre producto.");
    $("#npt_venta_nombre_producto").focus();
    return false;
  } else if (valida_nombre_proveedor.trim() == "") {
    alert("Digite nombre proveedor");
    $("#npt_venta_nombre_proveedor").focus();
    return false;
  } else if (valida_venta_costo_producto.trim() == "") {
    alert("Digite costo producto");
    $("#npt_venta_costo_producto").focus();
    return false;
  } else if (valida_venta_valor_venta.trim() == "") {
    alert("Digite valor venta");
    $("#npt_venta_valor_venta").focus();
    return false; // fin validacion formulario nuevo
  } else {
    //ejecutar Si todo fue validado
    $("#mdl_new_gestion").modal("hide");
    let registro = recolectaDatosMdlNuevaGestion();
    guardarNuevaGestionEnEspera(registro);
    //actualizaPantallaPrincipal();
    recargaElementosEntorno();
  }
});





// boton enviar domicilio
$("#btn_enviar_domi").click(function () {
  //VALIDACION DE DATOS DEL MODAL NUEVO
  let valida_nombre_producto = $("#npt_venta_nombre_producto").val();
  let valida_nombre_proveedor = $("#npt_venta_nombre_proveedor").val();
  let valida_venta_costo_producto = $("#npt_venta_costo_producto_base").val();
  let valida_venta_valor_venta = $("#npt_venta_valor_venta_base").val();
  let valida_vendedor_id = $("#npt_vendedor_id").val();
  $("#npt_venta_tipo").val("DOMI");

  // compara datos de variables contra vacio y muestra un alert
  if (valida_vendedor_id.trim() == "") {
    alert("elija vendedor");
    $("#slct_vendedor").focus();
    return false;
  } else if (valida_nombre_producto.trim() == "") {
    alert("Digitar nombre producto.");
    $("#npt_venta_nombre_producto").focus();
    return false;
  } else if (valida_nombre_proveedor.trim() == "") {
    alert("Digite nombre proveedor");
    $("#npt_venta_nombre_proveedor").focus();
    return false;
  } else if (valida_venta_costo_producto.trim() == "") {
    alert("Digite costo producto");
    $("#npt_venta_costo_producto").focus();
    return false;
  } else if (valida_venta_valor_venta.trim() == "") {
    alert("Digite valor venta");
    $("#npt_venta_valor_venta").focus();
    return false; // fin validacion formulario nuevo
  } else {
    //ejecutar Si todo fue validado
    $("#mdl_new_gestion").modal("hide");
    let registro = recolectaDatosMdlNuevaGestion();
    guardarNuevaGestion(registro);
    trasladaMdlNewDomi(registro);
    //actualizaPantallaPrincipal();
    recargaElementosEntorno();
  }
});

function recolectaDatosMdlNuevaGestion() {
  let registro = {
    venta_nombre_producto: $("#npt_venta_nombre_producto").val(),
    venta_nombre_proveedor: $("#npt_venta_nombre_proveedor").val(),
    venta_costo_producto: $("#npt_venta_costo_producto_base").val(),
    venta_valor_venta: $("#npt_venta_valor_venta_base").val(),
    venta_utilidad: $("#npt_venta_utilidad_base").val(),
    user_id: $("#npt_vendedor_id").val(),
    turno_id: $("#npt_turno_id_modal").val(),
    venta_tipo: $("#npt_venta_tipo").val(),
  };
  return registro;
}

function trasladaMdlNewDomi(registro) {
  limpiarModalDomicilios(); // viene de domi_new.js
  $("#mdl_domicilios").modal("show");
  $("#bloque_factura").hide();
  $("#npt_valor_producto").val(registro.venta_valor_venta);
  $("#npt_valor_producto_base").val(registro.venta_valor_venta);

  // atributo para desactivar el input de valor producto desde la gestion.
  $("#npt_valor_producto").prop("disabled", true);
  $("#npt_factura").val("gestion");

  // limpieza general del modal:
  //oculta o muestra campos al inicio
  $("#btn_domi_interno").show();
  $("#btn_domi_interno").removeClass("btn-secondary");
  $("#btn_domi_interno").addClass("btn-primary");
  $("#btn_domi_externo").show();
  $("#btn_domi_externo").removeClass("btn-secondary");
  $("#btn_domi_externo").addClass("btn-primary");
  $("#bloque_inyectologia").hide();
  $("#bloque_transportador").hide();
  $("#bloque_domi_externo, #bloque_valor_domi_externo").hide();
  $("#bloque_hora_salida").hide();
  $("#bloque_observaciones").hide();
  //limpia los campos
  $(
    "#npt_factura,#npt_valor_domi_externo,#npt_valor_producto,#npt_hora_salida,#npt_observaciones"
  ).css("background-color", "");
  $("#slct_barrio").select2("val", "0"); //select
  $("#npt_barrio_id").val("");
  $("#npt_barrio_comuna").val("");
  $("#npt_barrio_recomendacion").val("");
  // $("#npt_factura").val("");
  $("#slct_domi_externo").val("0"); //select
  $("#npt_domi_externo_id").val("0");
  $("#npt_btn_domi_interno").val("0");
  $("#npt_valor_domi_externo").val("");
  $("#npt_valor_domi_externo_base").val("0");
  $("#npt_btn_domi_externo").val("0");
  $("#slct_transportador").val("0"); //select
  $("#npt_transportador_id").val("0");
  // $("#npt_valor_producto").val("");
  $("#npt_hora_salida").val("0");
  $("#npt_hora_llegada").val("0");
  $("#npt_inyectologia").val("");
  $("#npt_observaciones").val("");
  $("#npt_confirm_btn").val("0");
  
  //*! desactivado por que estaba dando error al borrar este input clave.
  //$("#npt_turno_id_actual").val("");

  //muestra el modal nuevo domicilio
  $("#mdl_domicilios").modal("show");
}

function guardarNuevaGestion(registro) {
  $.ajax({
    type: "POST",
    url: "gestion_mdl.php?accion=guardar_nueva_gestion",
    data: registro,

    success: function (msg) {
      $("#tbl_gestiones").DataTable().ajax.reload();
    },

    error: function () {
      alert("problema en: guardarNuevaGestion()");
    },
  });
}


function guardarNuevaGestionEnEspera(registro) {
  $.ajax({
    type: "POST",
    url: "gestion_mdl.php?accion=guardar_nueva_gestion_en_espera",
    data: registro,

    success: function (msg) {
      $("#tbl_gestiones_en_espera").DataTable().ajax.reload();
    },

    error: function () {
      alert("problema en: guardarNuevaGestion()");
    },
  });
}



// FIN CICLO AGREGAR NUEVA gestion
