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
  $("#npt_turno_id_actual").val("300");
  $("#npt_venta_tipo").val("");
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
    turno_id: $("#npt_turno_id_actual").val(),
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
  $("#npt_factura").val("NO");
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

// FIN CICLO AGREGAR NUEVA gestion
