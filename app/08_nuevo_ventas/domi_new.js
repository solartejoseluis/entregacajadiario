//-----------------------------
//CICLO AGREGAR DOMICILIO
//-----------------------------
$("#menu_nuevo_domicilio, #btn_nuevo_domicilio").click(function () {
  limpiarModalDomicilios();
  $("#mdl_domicilios").modal("show");
  revisarExistenciaGestionWait01();
  cargaSelectAgregarGestionWait01();
});

function limpiarModalDomicilios() {
  //oculta o muestra campos al inicio
  $("#btn_guardar_nuevo_domicilio").hide();
  $("#btn_enviar_ya_domicilio").hide();
  $("#bloque_total_venta").hide();

  $("#btn_domi_interno").show();
  $("#btn_domi_interno").removeClass("btn-secondary");
  $("#btn_domi_interno").addClass("btn-primary");
  $("#btn_domi_externo").show();
  $("#btn_domi_externo").removeClass("btn-secondary");
  $("#btn_domi_externo").addClass("btn-primary");

  $("#bloque_agregar_gestion_si_no").hide();
  $("#bloque_agregar_gestion_si_no_02").hide();
  $("#bloque_agregar_gestion_wait_01").hide();
  $("#bloque_agregar_gestion_wait_02").hide();
  // $("#bloque_total_venta").hide();
  $("#bloque_inyectologia").hide();
  $("#bloque_transportador").hide();
  $("#bloque_domi_externo, #bloque_valor_domi_externo").hide();
  $("#bloque_hora_salida").hide();
  $("#bloque_observaciones").hide();
  //limpia los campos
  $("#npt_factura,#npt_valor_domi_externo,#npt_valor_producto,#npt_hora_salida,#npt_observaciones").css("background-color", "");
  $("#slct_barrio").select2("val", "0"); //select
  $("#npt_barrio_id").val("");
  $("#npt_barrio_comuna").val("");
  $("#npt_barrio_recomendacion").val("");
  $("#npt_factura").val("");
  $("#slct_agregar_gestion_wait").val("0");
  $("#slct_domi_externo").val("0"); //select
  $("#npt_domi_externo_id").val("0");
  $("#npt_btn_domi_interno").val("0");
  $("#npt_valor_domi_externo").val("");
  $("#npt_valor_domi_externo_base").val("0");
  $("#npt_btn_domi_externo").val("0");
  $("#slct_transportador").val("0"); //select
  $("#npt_transportador_id").val("0");
  $("#npt_valor_producto").val("");
  $("#npt_valor_producto_base").val(0);
  $("#npt_valor_gestion_wait_01").val(0);
  $("#npt_valor_gestion_wait_02").val(0);
  $("#npt_hora_salida").val("0");
  $("#npt_hora_llegada").val("0");
  $("#npt_inyectologia").val("");
  $("#npt_observaciones").val("");
  $("#npt_confirm_btn").val("0");
  // $("#npt_turno_id_actual").val("");
  $("#bloque_factura").show();
  //pone actributo que activa el input
  $("#npt_valor_producto").prop("disabled", null);
}

function revisarExistenciaGestionWait01() {
  $.ajax({
    type: "POST",
    url: "domi_new_mdl.php?accion=revisar_existencia_gestion_wait01",
    data: "",
    success: function (datos) {
      let registro = (datos[0].venta_tipo);
      if (registro == 'WAIT') {
        $("#bloque_agregar_gestion_si_no").show();
        $("#btn_domi_interno").hide();
        $("#btn_domi_externo").hide();
      } else {
        $("#btn_domi_interno").show();
        $("#btn_domi_interno").removeClass("btn-secondary");
        $("#btn_domi_interno").addClass("btn-primary");
        $("#btn_domi_externo").show();
        $("#btn_domi_externo").removeClass("btn-secondary");
        $("#btn_domi_externo").addClass("btn-primary");
      }
    },
    error: function () {
      alert("problema en: revisar existencia gestion wait 01");
    },
  });
}

function revisarExistenciaGestionWait02() {
  $.ajax({
    type: "POST",
    url: "domi_new_mdl.php?accion=revisar_existencia_gestion_wait02",
    data: "",
    success: function (datos02) {
      let registro = (datos02[0].venta_tipo);
      if (registro == 'WAIT') {
        $("#bloque_agregar_gestion_si_no_02").show();
        $("#btn_domi_interno").hide();
        $("#btn_domi_externo").hide();
        $("#npt_existe_gestion_wait").val("1");
      } else {
        // $("#btn_domi_interno").show();
        // $("#btn_domi_interno").removeClass("btn-secondary");
        // $("#btn_domi_interno").addClass("btn-primary");
        // $("#btn_domi_externo").show();
        // $("#btn_domi_externo").removeClass("btn-secondary");
        // $("#btn_domi_externo").addClass("btn-primary");
      }
    },
    error: function () {
      alert("problema en: revisar existencia gestion wait 02");
    },
  });
}

function revisarExistenciaGestionWaitEnNpt() {
  let dato = $("#npt_existe_gestion_wait").val();
  if (dato !== 'WAIT') {
    $("#btn_domi_interno").show();
    $("#btn_domi_interno").removeClass("btn-secondary");
    $("#btn_domi_interno").addClass("btn-primary");
    $("#btn_domi_externo").show();
    $("#btn_domi_externo").removeClass("btn-secondary");
    $("#btn_domi_externo").addClass("btn-primary");
  }
}


// FORMATO Y VALIDACION AUTOMATICO AL DIGITAR

// solo deja ingresar numeros al input
$(document).ready(function () {
  $("#npt_factura, #npt_valor_domi_externo, #npt_valor_producto").on(
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

$("#npt_factura").on("change", function () {
  $("#npt_factura").css("background-color", "#dbe5f0");
});

$("#npt_valor_producto").on("change", function () {
  const value = this.value.replace(/\$|\./g, "");
  if (value === "") {
    // validacion para evitar que se muestre NaN en el input al quitar foco
    return false;
  } else {
    $("#npt_valor_producto").css("background-color", "#dbe5f0");
    let valor_base = this.value;
    $("#npt_valor_producto_base").val(valor_base);

    //conversion del valor al formato moneda con parseFloat
    this.value = parseFloat(value).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  }
});

$("#npt_total_venta").on("change", function () {
  const value = this.value.replace(/\$|\./g, "");
  if (value === "") {
    // validacion para evitar que se muestre NaN en el input al quitar foco
    return false;
  } else {
    $("#npt_total_venta").css("background-color", "#dbe5f0");
    let valor_base = this.value;
    $("#npt_total_venta_base").val(valor_base);

    //conversion del valor al formato moneda con parseFloat
    this.value = parseFloat(value).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  }
});

$("#npt_valor_domi_externo").on("change", function () {
  const value = this.value.replace(/\$|\./g, "");
  if (value === "") {
    // validacion para evitar que se muestre NaN en el input al quitar foco
    return false;
  } else {
    $("#npt_valor_domi_externo").css("background-color", "#dbe5f0");
    //Las validaciones que necesitas hacer
    let valor_base = this.value;
    $("#npt_valor_domi_externo_base").val(valor_base);
    //conversion del valor al formato moneda con parseFloat
    this.value = parseFloat(value).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  }
});

//Carga el select de barrios.
$(document).ready(function () {
  //activa el Select2 en el modal
  $("#slct_barrio").select2({
    dropdownParent: $("#mdl_domicilios"),
    width: "85%",
  });
  // carga de los datos
  $.ajax({
    type: "POST",
    url: "select_barrio_mdl.php",
    success: function (response) {
      $(".selectBarrio select").html(response).fadeIn();
    },
  });
});

// asigna valor select barrio al input
$("#slct_barrio").on("change", function () {
  $("#npt_barrio_id").val($(this).val());
  let barrioId = $("#npt_barrio_id").val();
  if (barrioId !== "0") {
    cargarComuna(barrioId);
  }
});

// carga automaticamente el input comuna
function cargarComuna(barrio_id) {
  $.ajax({
    type: "GET",
    url: "domi_new_mdl.php?accion=cargar_comuna&barrio_id=" + barrio_id,
    data: "",
    success: function (datos) {
      $("#npt_barrio_comuna").val(datos[0].barrio_comuna);
      $("#npt_barrio_recomendacion").val(datos[0].barrio_recomendacion);
    },
    error: function () {
      alert("Problema en recuperar");
    },
  });
}

//Carga el select de transportador.
$(document).ready(function () {
  $.ajax({
    type: "POST",
    url: "select_transportador_mdl.php",
    success: function (response) {
      $(".selectTransportador select").html(response).fadeIn();
    },
  });
});
// asigna valor del select transportador al input
$("#slct_transportador").change(function () {
  $("#npt_transportador_id").val($(this).val());
  $("#slct_transportador").css("background-color", "#dbe5f0");
});

//carga el select domi externo
$(document).ready(function () {
  $.ajax({
    type: "POST",
    url: "select_domi_externo_mdl.php",
    success: function (response) {
      $(".selectDomiExterno select").html(response).fadeIn();
    },
  });
});
// asigna valor select domi externo al input
$("#slct_domi_externo").change(function () {
  $("#npt_domi_externo_id").val($(this).val());
  $("#slct_domi_externo").css("background-color", "#dbe5f0");
});

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
$("#slct_vendedor").change(function () {
  $("#npt_vendedor_id").val($(this).val());
  $("#slct_vendedor").css("background-color", "#dbe5f0");
});


// asigna valor de slct gestiones wait 01 al input


function cargaSelectAgregarGestionWait01() {
  $.ajax({
    type: "POST",
    url: "select_gestiones_en_espera_mdl.php?accion=carga_slct_gestiones_wait_01",
    success: function (response) {
      $(".selectAgregarGestionWait01 select").html(response).fadeIn()
    },
  });
}

$(".selectAgregarGestionWait01 select").change(function () {
  $("#npt_agregar_gestion_wait_01").val($(this).val());
  $(".selectAgregarGestionWait01 select").css("background-color", "#dbe5f0");

});


// boton si agregar gestion
$("#btn_si_agregar_gestion").click(function () {
  // $("#btn_domi_interno").removeClass("btn-primary");
  // $("#btn_domi_interno").addClass("btn-secondary");
  $("#bloque_agregar_gestion_si_no").hide();
  $("#btn_domi_interno").hide();
  $("#btn_domi_externo").hide();

  $("#bloque_agregar_gestion_wait_01").show();
  // $("#bloque_total_venta").show();
  // $("#bloque_domi_externo, #bloque_valor_domi_externo").hide();
  // $("#bloque_inyectologia").show();
  // $("#bloque_transportador").show();
  // $("#bloque_hora_salida").show();
  // $("#bloque_observaciones").show();
  // $("#npt_btn_domi_interno").val("1");
  $("#npt_agregar_gestion").val("si");
});

// boton no agregar gestion
$("#btn_no_agregar_gestion").click(function () {
  // $("#btn_domi_interno").removeClass("btn-primary");
  // $("#btn_domi_interno").addClass("btn-secondary");
  $("#btn_domi_interno").show();
  $("#btn_domi_externo").show();
  $("#bloque_agregar_gestion_wait_01").hide();
  $("#bloque_agregar_gestion_wait_02").hide();
  $("#bloque_agregar_gestion_si_no").hide();
  // $("#bloque_domi_externo, #bloque_valor_domi_externo").hide();
  // $("#bloque_inyectologia").show();
  // $("#bloque_transportador").show();
  // $("#bloque_hora_salida").show();
  // $("#bloque_observaciones").show();
  // $("#npt_btn_domi_interno").val("1");
  $("#npt_agregar_gestion").val("NO");
});



function cargaSlctAgregarGestionWait02() {
  $.ajax({
    type: "POST",
    url: "select_gestiones_en_espera_mdl.php?accion=carga_slct_gestiones_wait_02",
    success: function (response) {
      $(".selectAgregarGestionWait02 select").html(response).fadeIn();
      $(".selectAgregarGestionWait02 select").css("background-color", "#dbe5f0");
    },
  });
};

// asigna valor de slct gestiones wait 02 al input
$(".selectAgregarGestionWait02 select").change(function () {
  $("#npt_agregar_gestion_wait_02").val($(this).val());
  $(".selectAgregarGestionWait02 select").css("background-color", "#dbe5f0");
});

// boton si agregar gestion 02
$("#btn_si_agregar_gestion_02").click(function () {
  // $("#btn_domi_interno").removeClass("btn-primary");
  $("#btn_domi_interno").hide();
  $("#btn_domi_externo").hide();
  $("#bloque_agregar_gestion_wait_02").show();
  $("#bloque_agregar_gestion_si_no_02").hide();
  // $("#bloque_domi_externo, #bloque_valor_domi_externo").hide();
  // $("#bloque_inyectologia").show();
  // $("#bloque_transportador").show();
  // $("#bloque_hora_salida").show();
  // $("#bloque_observaciones").show();
  // $("#npt_btn_domi_interno").val("1");
  $("#npt_agregar_gestion_02").val("si");
});

// boton no agregar gestion 02
$("#btn_no_agregar_gestion_02").click(function () {
  // $("#btn_domi_interno").removeClass("btn-primary");
  // $("#btn_domi_interno").addClass("btn-secondary");
  $("#btn_domi_interno").show();
  $("#btn_domi_externo").show();
  $("#bloque_agregar_gestion_wait_01").hide();
  $("#bloque_agregar_gestion_wait_02").hide();
  $("#bloque_agregar_gestion_si_no_02").hide();
  // $("#bloque_domi_externo, #bloque_valor_domi_externo").hide();
  // $("#bloque_inyectologia").show();
  // $("#bloque_transportador").show();
  // $("#bloque_hora_salida").show();
  // $("#bloque_observaciones").show();
  // $("#npt_btn_domi_interno").val("1");
  $("#npt_agregar_gestion_02").val("NO");
});

// boton domi interno
$("#btn_domi_interno").click(function () {
  $("#btn_domi_interno").removeClass("btn-primary");
  $("#btn_domi_interno").addClass("btn-secondary");
  $("#btn_domi_externo").hide();
  $("#bloque_domi_externo, #bloque_valor_domi_externo").hide();
  $("#bloque_inyectologia").show();
  $("#bloque_transportador").show();
  $("#btn_guardar_nuevo_domicilio").show();
  $("#btn_enviar_ya_domicilio").show();
  $("#bloque_hora_salida").show();
  $("#bloque_observaciones").show();
  $("#npt_btn_domi_interno").val("1");
  $("#npt_confirm_btn").val("1");
});

// boton domi externo
$("#btn_domi_externo").click(function () {
  $("#btn_domi_externo").removeClass("btn-primary");
  $("#btn_domi_externo").addClass("btn-secondary");
  $("#btn_domi_interno").hide();
  $("#bloque_inyectologia").hide();
  $("#bloque_transportador").hide();
  $("#btn_guardar_nuevo_domicilio").show();
  $("#btn_enviar_ya_domicilio").show();
  $("#bloque_hora_salida").show();
  $("#bloque_observaciones").show();
  $("#bloque_domi_externo, #bloque_valor_domi_externo").show();
  $("#npt_btn_domi_externo").val("1");
  $("#npt_confirm_btn").val("1");
});

// Rellena hora salida
$("#btn_hora_salida").on("click", function () {
  let hora_actual = moment().format("HH:mm");
  $("#npt_hora_salida").val(hora_actual);
});

// Botones de control de inyectologia
$("#bloque_inyectologia").on("click", "#btn_inyectologia", function () {
  $("#npt_inyectologia").val("SI");
});
$("#bloque_inyectologia").on("click", "#btn_inyectologia_cancel", function () {
  $("#npt_inyectologia").val("");
});

// boton guardar nuevo domicilio
$("#btn_guardar_nuevo_domicilio").click(function () {
  //VALIDACION DE CAMPOS VACIOS
  let valida_barrio_id = $("#npt_barrio_id").val();
  let valida_factura = $("#npt_factura").val();
  let valida_confirm_btn = $("#npt_confirm_btn").val();
  let valida_btn_domi_interno = $("#npt_btn_domi_interno").val();
  let valida_btn_domi_externo = $("#npt_btn_domi_externo").val();
  let valida_domi_externo_id = $("#npt_domi_externo_id").val();
  let valida_valor_domi_externo = $("#npt_valor_domi_externo").val();
  let valida_transportador_id = $("#npt_transportador_id").val();
  let valida_valor_producto = $("#npt_valor_producto").val();
  let valida_hora_salida = $("#npt_hora_salida").val();
  // let valida_inyectologia = $("#npt_inyectologia").val();
  // let valida_observaciones = $("#npt_observaciones").val();

  // compara datos de variables contra vacio y muestra un alert
  if (valida_barrio_id.trim() == "") {
    alert("elija un barrio.");
    $("#slct_barrio").focus();
    return false;
  } else if (valida_factura.trim() == "") {
    alert("digita factura.");
    $("#npt_factura").focus();
    return false;
  } else if (valida_valor_producto.trim() == "") {
    alert("digite valor venta");
    $("#npt_valor_producto").focus();
    return false;
  } else if (valida_confirm_btn.trim() != "1") {
    alert("elige Botón domi interno o externo");
    return false;
  } else if (
    valida_btn_domi_interno.trim() == "1" &&
    valida_transportador_id.trim() == "0"
  ) {
    //alert para validar campo vacio
    alert("elija transportador.");
    $("#slct_transportador").focus();
    return false;
  } else if (
    valida_btn_domi_externo.trim() == "1" &&
    valida_domi_externo_id.trim() == "0"
  ) {
    alert("elija trasportador domi externo.");
    $("#slct_domi_externo").focus();
    return false;
  } else if (
    valida_btn_domi_externo.trim() == "1" &&
    valida_valor_domi_externo.trim() == ""
  ) {
    alert("elija valor domi externo");
    $("#npt_valor_domi_externo").focus();
    return false;
  }
  // else if (valida_hora_salida.trim() == "") {
  //   alert("marque hora de salida");
  //   $("#npt_hora_salida").focus();
  //   return false;
  // } 
  else {
    //ejecutar Si todo fue validado
    $("#mdl_domicilios").modal("hide");
    let registro = recolectaDatosMdlNuevoDomi();
    guardarDomicilio(registro);
    // cargaPantallaPrincipal();
  }
});

// boton enviar ya domicilio
$("#btn_enviar_ya_domicilio").click(function () {
  //VALIDACION DE CAMPOS VACIOS
  let valida_barrio_id = $("#npt_barrio_id").val();
  let valida_factura = $("#npt_factura").val();
  let valida_confirm_btn = $("#npt_confirm_btn").val();
  let valida_btn_domi_interno = $("#npt_btn_domi_interno").val();
  let valida_btn_domi_externo = $("#npt_btn_domi_externo").val();
  let valida_domi_externo_id = $("#npt_domi_externo_id").val();
  let valida_valor_domi_externo = $("#npt_valor_domi_externo").val();
  let valida_transportador_id = $("#npt_transportador_id").val();
  let valida_valor_producto = $("#npt_valor_producto").val();
  let valida_hora_salida = $("#npt_hora_salida").val();
  // let valida_inyectologia = $("#npt_inyectologia").val();
  // let valida_observaciones = $("#npt_observaciones").val();
  // compara datos de variables contra vacio y muestra un alert
  if (valida_barrio_id.trim() == "") {
    alert("elija un barrio.");
    $("#slct_barrio").focus();
    return false;
  } else if (valida_factura.trim() == "") {
    alert("digita factura.");
    $("#npt_factura").focus();
    return false;
  } else if (valida_valor_producto.trim() == "") {
    alert("digite valor venta");
    $("#npt_valor_producto").focus();
    return false;
  } else if (valida_confirm_btn.trim() != "1") {
    alert("elige Botón domi interno o externo");
    return false;
  } else if (
    valida_btn_domi_interno.trim() == "1" &&
    valida_transportador_id.trim() == "0"
  ) {
    //alert para validar campo vacio
    alert("elija transportador.");
    $("#slct_transportador").focus();
    return false;
  } else if (
    valida_btn_domi_externo.trim() == "1" &&
    valida_domi_externo_id.trim() == "0"
  ) {
    alert("elija trasportador domi externo.");
    $("#slct_domi_externo").focus();
    return false;
  } else if (
    valida_btn_domi_externo.trim() == "1" &&
    valida_valor_domi_externo.trim() == ""
  ) {
    alert("elija valor domi externo");
    $("#npt_valor_domi_externo").focus();
    return false;
  }

  // else if (
  //   valida_hora_salida.trim() == "") {
  //   alert("marque hora de salida");
  //   $("#npt_hora_salida").focus();
  //   return false;
  // } 

  else {
    //ejecutar Si todo fue validado
    $("#mdl_domicilios").modal("hide");
    let registro = recolectaDatosMdlNuevoDomi();
    enviaYaDomicilio(registro);
    // cargaPantallaPrincipal();
  }
});

function recolectaDatosMdlNuevoDomi() {
  let registro = {
    barrio_id: $("#npt_barrio_id").val(),
    numero_factura: $("#npt_factura").val(),
    btn_domi_interno: $("#npt_btn_domi_interno").val(),
    trans_interno_id: $("#npt_transportador_id").val(),
    btn_domi_externo: $("#npt_btn_domi_externo").val(),
    trans_externo_id: $("#npt_domi_externo_id").val(),
    valor_domi_externo: $("#npt_valor_domi_externo_base").val(),
    valor_venta: $("#npt_valor_producto_base").val(),
    hora_salida: $("#npt_hora_salida").val(),
    hora_llegada: $("#npt_hora_llegada").val(),
    inyectologia: $("#npt_inyectologia").val(),
    observaciones: $("#npt_observaciones").val(),
    turno_id: $("#npt_turno_id_actual").val(),
    gestion_01: $("#npt_valor_gestion_wait_01").val(),
    gestion_02: $("#npt_valor_gestion_wait_02").val(),
  };
  return registro;
}

function guardarDomicilio(registro) {
  $.ajax({
    type: "POST",
    url: "domi_new_mdl.php?accion=guardar_domicilio",
    data: registro,

    success: function (msg) {
      location.reload();
    },

    error: function () {
      alert("problema en: guardar_domicilio");
    },
  });
}

function enviaYaDomicilio(registro) {
  $.ajax({
    type: "POST",
    url: "domi_new_mdl.php?accion=envia_ya_domicilio",
    data: registro,

    success: function (msg) {
      location.reload();
    },

    error: function () {
      alert("problema en: envia ya domicilio");
    },
  });
}

$("#btn_agregar_gestion_wait_01").click(function () {
  let venta_id = $("#npt_agregar_gestion_wait_01").val();
  modificarGestionWait(venta_id);
  cargarValorVentaWait01(venta_id);
  revisarExistenciaGestionWait02();
  cargaSlctAgregarGestionWait02();
  revisarExistenciaGestionWaitEnNpt();

  // ajustes de visibilidad del modal
  $("#slct_agregar_gestion_wait_01").prop("disabled", true);
  $("#btn_agregar_gestion_wait_01").hide();
  $("#tbl_gestiones_en_espera").DataTable().ajax.reload();
  $("#tbl_gestiones").DataTable().ajax.reload();
})


function modificarGestionWait(venta_id) {
  // con update actualiza valor de venta_tipo al valor ''DOMI' (cambia 'WAIT') 
  $.ajax({
    type: "POST",
    url: "domi_new_mdl.php?accion=modificar_gestion_wait&venta_id=" + venta_id,
    success: function () {
    }
  });
}

function cargarValorVentaWait01(venta_id) {
  // aqui va una consulta con ajax que retorna el valor de venta_valor_venta
  $.ajax({
    type: "POST",
    url: "domi_new_mdl.php?accion=cargar_valor_venta_wait_01&venta_id=" + venta_id,
    success: function (datos) {
      $("#npt_valor_gestion_wait_01").val(datos[0].venta_valor_venta);
    }
  });
}

function cargarValorVentaWait02(venta_id) {
  // aqui va una consulta con ajax que retorna el valor de venta_valor_venta para poderlo restar
  $.ajax({
    type: "POST",
    url: "domi_new_mdl.php?accion=cargar_valor_venta_wait_02&venta_id=" + venta_id,
    success: function (datos) {
      $("#npt_valor_gestion_wait_02").val(datos[0].venta_valor_venta);
    }
  });
}

function calculaTotalVenta() {
  let valorProductoBase = $("#npt_valor_producto_base").val();
  let valorWait01 = $("#npt_valor_gestion_wait_01").val();
  let valorWait02 = $("#npt_valor_gestion_wait_02").val();
  let valor_total = Number(valorProductoBase) + Number(valorWait01) + Number(valorWait02);
  $("#npt_total_venta").val(valor_total);
}

$("#btn_agregar_gestion_wait_02").click(function () {
  let venta_id = $("#npt_agregar_gestion_wait_02").val();
  modificarGestionWait(venta_id);
  cargarValorVentaWait02(venta_id);


  // ajustes de visibilidad del modal 02
  $("#slct_agregar_gestion_wait_02").prop("disabled", true);
  $("#btn_agregar_gestion_wait_02").hide();
  $("#tbl_gestiones_en_espera").DataTable().ajax.reload();
  $("#tbl_gestiones").DataTable().ajax.reload();

  // pone visibles los botones de domi interno y externo
  $("#btn_domi_interno").show();
  $("#btn_domi_interno").removeClass("btn-secondary");
  $("#btn_domi_interno").addClass("btn-primary");
  $("#btn_domi_externo").show();
  $("#btn_domi_externo").removeClass("btn-secondary");
  $("#btn_domi_externo").addClass("btn-primary");
  //$("#bloque_total_venta").show();
})

// $(document).ready(function(){
//   calculaTotalVenta();
// })


// FIN CICLO agregar domicilios
