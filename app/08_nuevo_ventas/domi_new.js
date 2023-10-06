//-----------------------------
//CICLO AGREGAR DOMICILIO
//-----------------------------
$("#menu_nuevo_domicilio, #btn_nuevo_domicilio").click(function () {
  limpiarModalDomicilios();
  $("#mdl_domicilios").modal("show");
  // $("#bloque_agregar_gestion_si_no").show();
  // let registro = (datos[0].venta_tipo);
  revisarExistenciaGestionWait();

});

function limpiarModalDomicilios() {
  //oculta o muestra campos al inicio
  $("#btn_guardar_nuevo_domicilio").hide();
  $("#btn_enviar_ya_domicilio").hide();
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
  $("#bloque_total_venta").hide();
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

function revisarExistenciaGestionWait() {
  $.ajax({
    type: "POST",
    url: "domi_new_mdl.php?accion=revisar_existencia_gestion_wait",
    data: "",
    success: function (datos) {
      // let registro = listado.row($(this).parents("tr")).data();
      let registro = (datos[0].venta_tipo);
      // alert(registro);
      if (registro == 'WAIT') {
        $("#bloque_agregar_gestion_si_no").show();
        $("#btn_domi_interno").hide();
        $("#btn_domi_externo").hide();
      } else {

      }

    },
    error: function () {
      alert("problema en: revisar existencia gestion wait");
    },
  });
}


function revisarExistenciaGestionWait02() {
  $.ajax({
    type: "POST",
    url: "domi_new_mdl.php?accion=revisar_existencia_gestion_wait",
    data: "",
    success: function (datos) {
      let registro = (datos[0].venta_tipo);
      if (registro == 'WAIT') {
        $("#bloque_agregar_gestion_si_no_02").show();
        let wait= 'SI';
        return wait;
      }
    },
    error: function () {
      alert("problema en: revisar existencia gestion wait 02");
    },
  });
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

//carga slct gestiones wait 01
$(document).ready(function () {
  $.ajax({
    type: "POST",
    url: "select_gestiones_en_espera_mdl.php?accion=carga_slct_gestiones_wait_01",
    success: function (response) {
      $(".selectAgregarGestionWait01 select").html(response).fadeIn();
    },
  });
});
// asigna valor de slct gestiones wait 01 al input
$(".selectAgregarGestionWait01 select").change(function () {
  $("#npt_agregar_gestion_wait_01").val($(this).val());
  $(".selectAgregarGestionWait01 select").css("background-color", "#dbe5f0");
});




// boton si agregar gestion
$("#btn_si_agregar_gestion").click(function () {
  // $("#btn_domi_interno").removeClass("btn-primary");
  // $("#btn_domi_interno").addClass("btn-secondary");
  $("#btn_domi_interno").hide();
  $("#btn_domi_externo").hide();
  $("#bloque_agregar_gestion_wait_01").show();
  $("#bloque_agregar_gestion_si_no").hide();
  $("#bloque_total_venta").show();
  // $("#bloque_domi_externo, #bloque_valor_domi_externo").hide();
  // $("#bloque_inyectologia").show();
  // $("#bloque_transportador").show();
  // $("#bloque_hora_salida").show();
  // $("#bloque_observaciones").show();
  // $("#npt_btn_domi_interno").val("1");
  $("#npt_agregar_gestion").val("si");
});


//carga slct gestiones wait 02
// $(document).ready(function () {

//   $.ajax({
//     type: "POST",
//     url: "select_gestiones_en_espera_mdl.php",
//     success: function (response) {
//       $(".selectAgregarGestionWait02 select").html(response).fadeIn();
//     },
//   });
// });
// // asigna valor de slct gestiones wit 02 al input
// $(".selectAgregarGestionWait02 select").change(function () {
//   $("#npt_agregar_gestion_wait_02").val($(this).val());
//   $(".selectAgregarGestionWait02 select").css("background-color", "#dbe5f0");
// });


function cargaSlctAgregarGestionWait02() {
  $.ajax({
    type: "POST",
    url: "select_gestiones_en_espera_mdl.php?accion=carga_slct_gestiones_wait_02",
    success: function (response) {
      $(".selectAgregarGestionWait02 select").html(response).fadeIn();
      $("#npt_agregar_gestion_wait_02").val($(this).val());
      $(".selectAgregarGestionWait02 select").css("background-color", "#dbe5f0");
    },
  });
};


// asigna valor de slct gestiones wit 02 al input
$(".selectAgregarGestionWait02 select").change(function () {
  $("#npt_agregar_gestion_wait_02").val($(this).val());
  $(".selectAgregarGestionWait02 select").css("background-color", "#dbe5f0");
});



// boton si agregar gestion 02
$("#btn_si_agregar_gestion_02").click(function () {
  // $("#btn_domi_interno").removeClass("btn-primary");
  // $("#btn_domi_interno").addClass("btn-secondary");
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

// rellena hora salida
$("#btn_hora_salida").on("click", function () {
  let hora_actual = moment().format("HH:mm");
  $("#npt_hora_salida").val(hora_actual);
});

// botones de control de inyectologia
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
  } else if (valida_hora_salida.trim() == "") {
    alert("marque hora de salida");
    $("#npt_hora_salida").focus();
    return false;
  } else {
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
  } else if (valida_hora_salida.trim() == "") {
    alert("marque hora de salida");
    $("#npt_hora_salida").focus();
    return false;
  } else {
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
  };
  return registro;
}

function guardarDomicilio(registro) {
  $.ajax({
    type: "POST",
    url: "domi_new_mdl.php?accion=guardar_domicilio",
    data: registro,

    success: function (msg) {
      // $("#tbl_domi_por_salir").DataTable().ajax.reload();
      // $("#tbl_domi_en_curso").DataTable().ajax.reload();
      // actualizaPantallaPrincipal();
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
      // $("#tbl_domi_por_salir").DataTable().ajax.reload();
      // $("#tbl_domi_en_curso").DataTable().ajax.reload();
      // actualizaPantallaPrincipal();
      location.reload();
    },

    error: function () {
      alert("problema en: envia ya domicilio");
    },
  });
}

$("#btn_agregar_gestion_wait_01").click(function () {
  let venta_id = $("#npt_agregar_gestion_wait_01").val();
  agregarGestionWait(venta_id);
  $("#slct_agregar_gestion_wait_01").prop("disabled", true);
  $("#btn_agregar_gestion_wait_01").hide();
  $("#tbl_gestiones_en_espera").DataTable().ajax.reload();
  // rellena el npt_valor_total_base sumando las cantidades al momento:
  let valorProductoBase = $("#npt_valor_producto_base").val();
  // let valorGestionWait01 = $("#npt_valor_gestion_wait_01").val(1);
  let valorGestionWait01 = 1000;
  let valor_total = parseFloat(valorProductoBase)+ parseFloat(valorGestionWait01);

  $("#npt_total_venta").val(Number(valor_total));
  // revisa si quedan en existencia gestiones modo'WAIT' 
  let wait = revisarExistenciaGestionWait02();
  if (wait !== 'SI'){
  $("#btn_domi_interno").show();
  $("#btn_domi_externo").show();
  }
  // carga el slct gestion wait 2
  cargaSlctAgregarGestionWait02();
})


function agregarGestionWait(venta_id) {
  $.ajax({
    type: "POST",
    url: "domi_new_mdl.php?accion=modificar_gestion_wait&venta_id=" + venta_id,
    success: function (msg) {
    }
  });
}

$("#btn_agregar_gestion_wait_02").click(function () {
  let venta_id = $("#npt_agregar_gestion_wait_02").val();
  agregarGestionWait(venta_id);
  alert("boton 02 pulsado");
  // $("#slct_agregar_gestion_wait_01").prop("disabled", true);
  // $("#btn_agregar_gestion_wait_01").hide();
  // $("#bloque_agregar_gestion_si_no_02").show();
})


// FIN CICLO agregar domicilios
