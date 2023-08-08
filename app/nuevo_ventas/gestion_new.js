//-----------------------------
//CICLO AGREGAR GESTION
//-----------------------------
$("#menu_nueva_gestion, #btn_nueva_gestion").click(function () {
  limpiarModalGestiones();
  $("#mdl_ventas").modal("show");
});

function limpiarModalGestiones() {
  $(
    "#npt_venta_nombre_producto, #npt_venta_id, #npt_venta_nombre_producto, #npt_venta_nombre_proveedor, #npt_venta_costo_producto,#npt_venta_valor_venta,#npt_venta_utilidad"
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

// confirma agregar gestion
$("#btn_confirm_add").click(function () {
  //VALIDACION DE DATOS DEL MODAL NUEVO
  let valida_nombre_producto = $("#npt_venta_nombre_producto").val();
  let valida_nombre_proveedor = $("#npt_venta_nombre_proveedor").val();
  let valida_venta_costo_producto = $("#npt_venta_costo_producto_base").val();
  let valida_venta_valor_venta = $("#npt_venta_valor_venta_base").val();
  let valida_vendedor_id = $("#npt_vendedor_id").val();
  let valida_venta_utilidad = $("#npt_venta_utilidad_base").val();
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
    $("#mdl_ventas").modal("hide");
    let registro = recolectaDatosMdlNuevaGestion();
    guardarRegistro(registro);
  }
});

function recolectaDatosMdlNuevaGestion() {
  let registro = {
    venta_nombre_producto: $("#npt_venta_nombre_producto").val(),
    venta_nombre_proveedor: $("#npt_venta_nombre_proveedor").val(),
    venta_costo_producto: $("#npt_venta_costo_producto_base").val(),
    venta_valor_venta: $("#npt_venta_valor_venta_base").val(),
    venta_utilidad: $("#npt_venta_utilidad_base").val(),
    vendedor_id: $("#npt_vendedor_id").val(),
    turno_id_actual: $("#npt_turno_id_actual").val(),
  };
  return registro;
}

function guardarRegistro(registro) {
  $.ajax({
    type: "POST",
    url: "venta_home_mdl.php?accion=guardar_venta",
    data: registro,

    success: function (msg) {
      $("#tbl_gestiones").DataTable().ajax.reload();
    },

    error: function () {
      alert("problema en: guardarRegistro");
    },
  });
}

// FIN CICLO AGREGAR NUEVA gestion
