//----------------------------------
//CICLO VER/EDITAR DOMI por SALIR
//----------------------------------

function listarRegistroDomiPorSalir(registro) {
  $.ajax({
    type: "GET",
    url:
      "domixsalir_mdl.php?accion=consultar_domi_por_salir&domicilio_id=" +
      registro.domicilio_id,
    data: "",
    success: function (datos) {
      $("#npt_edit_domicilio_id").val(datos[0].domicilio_id);
      $("#slct_edit_barrio").val(datos[0].barrio_id);
      $("#npt_edit_barrio_id").val(datos[0].barrio_id);
      $("#npt_edit_factura").val(datos[0].numero_factura);
      $("#slct_edit_transportador").val(datos[0].trans_interno_id);
      $("#npt_edit_transportador_id").val(datos[0].trans_interno_id);
      $("#slct_edit_trans_externo").val(datos[0].trans_externo_id);
      $("#npt_edit_trans_externo_id").val(datos[0].trans_externo_id);
      $("#npt_edit_valor_domi_externo").val(datos[0].valor_domi_externo);
      $("#npt_edit_valor_domi_externo_base").val(datos[0].valor_domi_externo);
      $("#npt_edit_valor_producto").val(datos[0].valor_venta);
      $("#npt_edit_valor_producto_base").val(datos[0].valor_venta);
      $("#npt_edit_hora_salida").val(datos[0].hora_salida);
      $("#npt_edit_inyectologia").val(datos[0].inyectologia);
      $("#npt_edit_observaciones").val(datos[0].observaciones);
      $("#npt_edit_turno_id").val(datos[0].turno_id);
      $("#mdl_edit_domi_interno_por_salir").modal("show");
    },
    error: function () {
      alert("Problema en recuperar");
    },
  });
}

// AL CAMBIAR PASA EL VALOR DE SELECT AL INPUT
$("#slct_edit_barrio").change(function () {
  $("#npt_edit_barrio_id").val($(this).val());
});

$("#slct_edit_trans_externo").change(function () {
  $("#npt_edit_trans_externo_id").val($(this).val());
});

$("#slct_edit_transportador").change(function () {
  $("#npt_edit_transportador_id").val($(this).val());
});

$("#npt_edit_valor_domi_externo").change(function () {
  $("#npt_edit_valor_domi_externo_base").val($(this).val());
});

$("#npt_edit_valor_producto").change(function () {
  $("#npt_edit_valor_producto_base").val($(this).val());
});

//BOTON INYECTOLOGIA
$("#bloque_edit_inyectologia").on(
  "click",
  "#btn_edit_inyectologia",
  function () {
    $("#npt_edit_inyectologia").val("SI");
  }
);
$("#bloque_edit_inyectologia").on(
  "click",
  "#btn_edit_inyectologia_cancel",
  function () {
    $("#npt_edit_inyectologia").val("");
  }
);

$("#btn_modificar_domi").on("click", function () {
  $("#mdl_domi_por_salir").modal("hide");
  let registro = recolectarEditDomi();
  modificarDomicilio(registro);
});

  // rellena hora salida
  $("#btn_edit_hora_salida").on("click", function () {
    let hora_actual = moment().format("HH:mm");
    $("#npt_edit_hora_salida").val(hora_actual);
  });
  $("#btn_edit_hora_salida_cancel").on(
  "click",
  function () {
    $("#npt_edit_hora_salida").val("0");
  }
);

function recolectarEditDomi() {
  let registro = {
    domicilio_id: $("#npt_edit_domicilio_id").val(),
    barrio_id: $("#npt_edit_barrio_id").val(),
    numero_factura: $("#npt_edit_factura").val(),
    trans_interno_id: $("#npt_edit_transportador_id").val(),
    trans_externo_id: $("#npt_edit_trans_externo_id").val(),
    valor_domi_externo: $("#npt_edit_valor_domi_externo_base").val(),
    valor_venta: $("#npt_edit_valor_producto_base").val(),
    hora_salida: $("#npt_edit_hora_salida").val(),
    inyectologia: $("#npt_edit_inyectologia").val(),
    observaciones: $("#npt_edit_observaciones").val(),
    turno_id: $("#npt_edit_turno_id").val(),
  };
  return registro;
}

function modificarDomicilio(registro) {
  $.ajax({
    type: "POST",
    url:
      "domixsalir_mdl.php?accion=modificar_domicilio&domicilio_id=" +
      registro.domicilio_id,
    dataSrc: "",
    data: registro,
    success: function (msg) {
      location.reload();
    },
    error: function () {
      alert("Problema modificando");
    },
  });
}
