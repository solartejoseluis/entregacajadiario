//----------------------
//CICLO EDITAR gestion
//----------------------
function recuperarRegistro(registro) {
  $.ajax({
    type: "GET",
    url: "gestion_mdl.php?accion=consultar_venta&venta_id=" + registro.venta_id,
    data: "",
    success: function (datos) {
      $("#nptEdit_venta_id").val(datos[0].venta_id);
      $("#nptEdit_vendedor_nombres").val(datos[0].user_nombre);
      $("#slctEdit_vendedor").val(datos[0].user_id);
      $("#nptEdit_vendedor_id").val(datos[0].user_id);
      $("#nptEdit_venta_nombre_producto").val(datos[0].venta_nombre_producto);
      $("#nptEdit_venta_nombre_proveedor").val(datos[0].venta_nombre_proveedor);
      $("#nptEdit_venta_costo_producto").val(datos[0].venta_costo_producto);
      $("#nptEdit_venta_costo_producto_base").val(
        datos[0].venta_costo_producto
      );
      $("#nptEdit_venta_valor_venta").val(datos[0].venta_valor_venta);
      $("#nptEdit_venta_valor_venta_base").val(datos[0].venta_valor_venta);
      $("#nptEdit_venta_utilidad").val(datos[0].venta_utilidad);
      $("#mdl_edit_gestion").modal("show");
    },
    error: function () {
      alert("Problema en recuperarRegistro");
    },
  });
}

//carga el select vendedores
$(document).ready(function () {
  $.ajax({
    type: "POST",
    url: "select_vendedor_mdl.php",
    success: function (response) {
      $(".selectVendedor select").html(response).fadeIn();
    },
  });
});
// asigna valor select vendedor al input
$("#slctEdit_vendedor").change(function () {
  $("#nptEdit_vendedor_id").val($(this).val());
});

$("#slctEdit-user").change(function () {
  $("#nptEdit-user_id").val($(this).val());
});

// validaciones y formato al digital

// cambia de color el fondo y Convierte a mayusculas
$("#slctEdit_vendedor").on("change", function () {
  $("#slctEdit_vendedor").css("background-color", "#dbe5f0");
});
$("#nptEdit_venta_nombre_producto").on("keyup", function () {
  $("#nptEdit_venta_nombre_producto").val($(this).val().toUpperCase());
});
$("#nptEdit_venta_nombre_producto").on("change", function () {
  $("#nptEdit_venta_nombre_producto").css("background-color", "#dbe5f0");
});
$("#nptEdit_venta_nombre_proveedor").on("keyup", function () {
  $("#nptEdit_venta_nombre_proveedor").val($(this).val().toUpperCase());
});
$("#nptEdit_venta_nombre_proveedor").on("change", function () {
  $("#nptEdit_venta_nombre_proveedor").css("background-color", "#dbe5f0");
});


// solo deja ingresar numeros al input
$(document).ready(function () {
  $("#nptEdit_venta_costo_producto, #nptEdit_venta_valor_venta").on(
    "input",
    function (evt) {
      $(this).val(
        $(this)
          .val()
          .replace(/[^0-9]./g, "")
      );
    }
  );
});

$("#nptEdit_venta_costo_producto").on("change", function () {
  const value = this.value.replace(/\$|\./g, "");
  // validacion para evitar que se muestre NaN en el input al quitar foco
  if (value === "") {
    return false;
  } else {
  $("#nptEdit_venta_costo_producto").css("background-color", "#dbe5f0");
    //pasar el valor solo numeros al npt_base
    let valor_base = this.value;
    $("#nptEdit_venta_costo_producto_base").val(valor_base);
    //conversion del valor al formato moneda con parseFloat
    // this.value = parseFloat(value).toLocaleString("es-CO", {
    //   style: "currency",
    //   currency: "COP",
    //   maximumFractionDigits: 0,
    //   minimumFractionDigits: 0,
    // });
  }
});

$("#nptEdit_venta_valor_venta").on("change", function () {
  const value = this.value.replace(/\$|\./g, "");
  if (value === "") {
    // validacion para evitar que se muestre NaN en el input al quitar foco
    return false;
  } else {
  $("#nptEdit_venta_valor_venta").css("background-color", "#dbe5f0");
    //pasar el valor solo numeros al npt_base
    let valor_base = this.value;
    $("#nptEdit_venta_valor_venta_base").val(valor_base);
    //conversion del valor al formato moneda con parseFloat
    // this.value = parseFloat(value).toLocaleString("es-CO", {
    //   style: "currency",
    //   currency: "COP",
    //   maximumFractionDigits: 0,
    //   minimumFractionDigits: 0,
    // });
  }
});

//calculo de la  utilidad modal edicion
$("#nptEdit_venta_costo_producto ,#nptEdit_venta_valor_venta").on(
  "change",
  function () {
  let nptEditVentaValorVenta = $("#nptEdit_venta_valor_venta").val();
  let nptEditVentaCostoProducto = $("#nptEdit_venta_costo_producto").val();
    // const value = this.value.replace(/\$|\./g, "");
    if (nptEditVentaValorVenta === "" || nptEditVentaCostoProducto === "") {
      // validacion para evitar que se muestre NaN en el input al quitar foco
      return false;
    } else {
      // calculo de la utilidad
      let costo = $("#nptEdit_venta_costo_producto_base").val();
      let valor_venta = $("#nptEdit_venta_valor_venta_base").val();
      let utilidad = parseFloat(valor_venta) - parseFloat(costo);
      $("#nptEdit_venta_utilidad_base").val(utilidad);
      $("#nptEdit_venta_utilidad").val(utilidad);
      //dar formato  al valor y mostrarlo en el input utilidad
      let utilidad_formato = utilidad.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      });
      $("#nptEdit_venta_utilidad").val(utilidad_formato);
      $("#nptEdit_venta_utilidad").css("background-color", "#dbe5f0");
      valor_base01 = 0;
      valor_base02 = 0;
    }
  }
);

// BOTON GUARDA MODIFICACIONES
$("#btn_confirm_edit").click(function () {
  //GUARDA LOS DATOS MODIFICADOS
  $("#mdl_edit_gestion").modal("hide");
  let registro = recolectarDatosFrmGestiones();
  modificarRegistro(registro);
});

function recolectarDatosFrmGestiones() {
  let registro = {
    venta_id: $("#nptEdit_venta_id").val(),
    user_id: $("#nptEdit_vendedor_id").val(),
    venta_nombre_producto: $("#nptEdit_venta_nombre_producto").val(),
    venta_nombre_proveedor: $("#nptEdit_venta_nombre_proveedor").val(),
    venta_costo_producto: $("#nptEdit_venta_costo_producto_base").val(),
    venta_valor_venta: $("#nptEdit_venta_valor_venta_base").val(),
    user_nombre: $("#nptEdit_user_nombre").val(),
    venta_utilidad: $("#nptEdit_venta_utilidad_base").val(),
  };
  return registro;
}

function modificarRegistro(registro) {
  $.ajax({
    type: "POST",
    url: "gestion_mdl.php?accion=modificar_venta&venta_id=" + registro.venta_id,
    data: registro,
    success: function (msg) {
      // listadoVentas.ajax.reload();
      $("#tbl_gestiones").DataTable().ajax.reload();
    },
    error: function () {
      alert("Problema modificando");
    },
  });
}
// FIN CICLO EDITAR gestion
