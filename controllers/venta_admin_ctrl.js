//-----------------------
// INICIA DATATABLES
//-----------------------
document.addEventListener("DOMContentLoaded", function () {
  let listadoVentas = $("#tblVentas").DataTable({
    ajax: {
      url: "../models/venta_anterior_mdl.php?accion=listar_ventas",
      dataSrc: "",
    },
    columns: [
      { data: "venta_id" },
      { data: "venta_nombre_producto" },
      { data: "venta_nombre_proveedor" },
      { data: "venta_costo_producto" },
      { data: "venta_valor_venta" },
      { data: "user_nombre" }, //nombre vendedor
      { data: "venta_utilidad" },
      { data: null, orderable: false },
      { data: null, orderable: false },
    ],
    columnDefs: [
      {
        targets: 7,
        defaultContent:
          "<button class='btn btn-primary btn-sm btnEdit'>/<i class='fa-solid fa-pen'></i></button>",
        data: null,
      },

      {
        targets: 8,
        defaultContent:
          "<button  class='btn btn-danger btn-sm btnDel'>X<i class='fa fa-trash-o fa-lg'></i></button>",
        data: null,
      },
    ],
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
        "paging": false
  });

  // *******************
  // FIN DATATABLES
  // *******************

  //-----------------------------
  // CARGAS EN PANTALLA PRINCIPAL
  //-----------------------------

  function cargaPantallaPrincipal() {
    consultarDatosTurnoActual();
    cargarDatosUtilidadVendedor1();
    cargarDatosUtilidadVendedor2();
    cargarDatosUtilidadVendedor3();
    cargarDatosUtilidadVendedor4();
    utilidadTurno();
  }

  //CARGA LA FECHA ACTUAL y CUADRO PRINCIPAL DE PAGINA

  $(document).ready(function () {
    //let hoy = actualDate();
    cargaPantallaPrincipal();
  });

  //  MOSTRAR LA FECHA ACTUAL

  // function actualDate() {
  //   let today = new Date();
  //   let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  //   //options.timeZone = 'UTC';
  //   //options.timeZoneName = 'short';
  //   let now = today.toLocaleString('es-CO', options);
  //   //console.log(now);
  //   return now;
  // }

// CARGA LA FECHA ACTUAL y CUADRO PRINCIPAL DE PAGINA
function getTime() {
  var today = moment(),
      time = today.format('LT'),
      //date = today.format('dddd, MMMM, YYYY');
      date = today.format('LL');
  
  document.getElementById('hoy_moment').innerHTML =
  `<br>` + 
  `<h1 class='large'>${time}</h1>` +
  `<span class='dark'>${date}</span>`
};
setInterval (function() {
  getTime();
}, 1000);

  function consultarDatosTurnoActual() {
    $.ajax({
      type: "POST",
      url: "../models/venta_anterior_mdl.php?accion=consultarDatosTurnoActual",
      data: "",
      success: function (datos) {
        $("#npt_turno_id_anterior").val(datos[0].turno_id_anterior);
        $("#npt_user_nombre").html(datos[0].user_nombre);
        $("#npt_user_apellido").html(datos[0].user_apellido);
        $("#npt_jornada_nombre").html(datos[0].jornada_nombre);
        $("#fecha_del_turno").html(datos[0].turno_fecha_creado);
        //$('#utilidadVendedor1').html(datos[0].utilidad_vendedor1);
      },
      error: function () {
        alert("Problema en consultar datos turno actual");
      },
    });
  }

  // CARGA DATOS VENDEDOR 1
  function cargarDatosUtilidadVendedor1() {
    $.ajax({
      type: "GET",
      url: "../models/venta_anterior_mdl.php?accion=consultar_utilidad_vendedor1",
      data: "",
      success: function (datos) {
        $("#utilidadVendedor1").html(datos[0].utilidad_vendedor1);
        $("#ventasVendedor1").html(datos[0].ventas_vendedor1);
      },
      error: function () {
        alert("Problema en consultarUtilidadVendedor1");
      },
    });
  }

  // CARGA DATOS VENDEDOR 2
  function cargarDatosUtilidadVendedor2() {
    $.ajax({
      type: "GET",
      url: "../models/venta_anterior_mdl.php?accion=consultar_utilidad_vendedor2",
      data: "",
      success: function (datos) {
        $("#utilidadVendedor2").html(datos[0].utilidad_vendedor2);
        $("#ventasVendedor2").html(datos[0].ventas_vendedor2);
      },
      error: function () {
        alert("Problema en consultarUtilidadVendedor2");
      },
    });
  }

  // CARGA DATOS VENDEDOR 3
  function cargarDatosUtilidadVendedor3() {
    $.ajax({
      type: "GET",
      url: "../models/venta_anterior_mdl.php?accion=consultar_utilidad_vendedor3",
      data: "",
      success: function (datos) {
        $("#utilidadVendedor3").html(datos[0].utilidad_vendedor3);
        $("#ventasVendedor3").html(datos[0].ventas_vendedor3);
      },
      error: function () {
        alert("Problema en consultarUtilidadVendedor3");
      },
    });
  }

  // CARGA DATOS VENDEDOR 4
  function cargarDatosUtilidadVendedor4() {
    $.ajax({
      type: "GET",
      url: "../models/venta_anterior_mdl.php?accion=consultar_utilidad_vendedor4",
      data: "",
      success: function (datos) {
        $("#utilidadVendedor4").html(datos[0].utilidad_vendedor4);
        $("#ventasVendedor4").html(datos[0].ventas_vendedor4);
      },
      error: function () {
        alert("Problema en consultarUtilidadVendedor4");
      },
    });
  }

  // CARGA DATOS TOTAL UTILIDAD TURNO
  function utilidadTurno() {
    $.ajax({
      type: "GET",
      url: "../models/venta_anterior_mdl.php?accion=consultar_utilidad_turno",
      data: "",
      success: function (datos) {
        $("#p_utilidad_turno").html(datos[0].utilidad_turno);
        $("#p_turno_numero_ventas").html(datos[0].ventas_turno);
        //$('#npt_turno_id').val(datos[0].turno_id);
      },
      error: function () {
        alert("Problema en cargar datos utilidad turno");
      },
    });
  }

  //***************************************
  //  FIN CARGA EN PANTALLA PRINCIPAL
  //***************************************

  //-----------------------------
  //CICLO AGREGAR NUEVA VENTA
  //-----------------------------

  $("#btn_add").click(function () {
    limpiarFormulario();
    $("#mdl_ventas").modal("show");
  });

  function limpiarFormulario() {
    $("#npt-venta_id").val("");
    $("#npt_venta_nombre_producto").val("");
    $("#npt_venta_nombre_proveedor").val("");
    $("#npt_venta_costo_producto").val("");
    $("#npt_venta_valor_venta").val("");
    $("#npt-user_id").val("");
    $("#slct_user").val("0");
    $("#npt_venta_utilidad").val("");
  }

  $("#btn_confirm_add").click(function () {
    //VALIDACION DE DATOS DEL MODAL NUEVO
    let valida_nombre_producto = $("#npt_venta_nombre_producto").val();
    let valida_nombre_proveedor = $("#npt_venta_nombre_proveedor").val();
    let valida_venta_costo_producto = $("#npt_venta_costo_producto").val();
    let valida_venta_valor_venta = $("#npt_venta_valor_venta").val();
    let valida_user_id = $("#npt-user_id").val();
    let valida_venta_utilidad = $("#npt_venta_utilidad").val();
    // compara datos de variables contra vacio y muestra un alert
    if (valida_nombre_producto.trim() == "") {
      alert("revisar nombre producto.");
      $("#npt_venta_nombre_producto").focus();
      return false;
    } else if (valida_nombre_proveedor.trim() == "") {
      alert("Revisar nombre proveedor");
      $("#npt_venta_nombre_proveedor").focus();
      return false;
    } else if (valida_venta_costo_producto.trim() == "") {
      alert("revisar costo");
      $("#npt_venta_costo_producto").focus();
      return false;
    } else if (valida_venta_valor_venta.trim() == "") {
      alert("Revisar valor venta");
      $("#npt_venta_valor_venta").focus();
      return false;
    } else if (valida_user_id.trim() == "0") {
      alert("elija vendedor");
      $("#slct_user").focus();
      return false;
    } else if (valida_venta_utilidad.trim() == "") {
      alert("Revisar utilidad");
      $("#npt_venta_utilidad").focus();
      return false; // fin validacion formulario nuevo
    } else {
      //ejecutar Si todo fue validado
      $("#mdl_ventas").modal("hide");
      let registro = recolectarDatosFormularioNuevo();
      guardarRegistro(registro);
      cargaPantallaPrincipal();
      //alert("ok Validado");
    }
  });

  //TOMA EL VALOR DEL SELECT Y PONERLO EN INPUT
  $("#slct_user").change(function () {
    $("#npt-user_id").val($(this).val());
  });

  function recolectarDatosFormularioNuevo() {
    let registro = {
      venta_id: $("#npt-venta_id").val(),
      venta_nombre_producto: $("#npt_venta_nombre_producto").val(),
      venta_nombre_proveedor: $("#npt_venta_nombre_proveedor").val(),
      venta_costo_producto: $("#npt_venta_costo_producto").val(),
      venta_valor_venta: $("#npt_venta_valor_venta").val(),
      user_nombre: $("#npt-user_nombre").val(),
      user_id: $("#npt-user_id").val(),
      venta_utilidad: $("#npt_venta_utilidad").val(),
      // el sgte valor salio por consulta:
      turno_id_anterior: $("#npt_turno_id_anterior").val(),
    };
    return registro;
  }

  function guardarRegistro(registro) {
    $.ajax({
      type: "POST",
      url: "../models/venta_anterior_mdl.php?accion=guardar_venta",
      data: registro,
      success: function (msg) {
        listadoVentas.ajax.reload();
        cargaPantallaPrincipal();
      },
      error: function () {
        alert("problema en: guardarRegistro");
      },
    });
  }

  //****************************
  // FIN CICLO AGREGAR NUEVA VENTA
  //****************************

  //------------------------
  //CICLO EDITAR REGISTRO
  //------------------------

  $("#tblVentas tbody").on("click", "button.btnEdit", function () {
    let registroEdit = listadoVentas.row($(this).parents("tr")).data();
    recuperarRegistro(registroEdit.venta_id);
  });

  function recuperarRegistro(venta_id) {
    $.ajax({
      type: "GET",
      url:
        "../models/venta_anterior_mdl.php?accion=consultar_venta&venta_id=" + venta_id,
      data: "",
      success: function (datos) {
        $("#nptEdit-venta_id").val(datos[0].venta_id);
        $("#nptEdit_venta_nombre_producto").val(datos[0].venta_nombre_producto);
        $("#nptEdit_venta_nombre_proveedor").val(
          datos[0].venta_nombre_proveedor
        );
        $("#nptEdit_venta_costo_producto").val(datos[0].venta_costo_producto);
        $("#nptEdit_venta_valor_venta").val(datos[0].venta_valor_venta);
        $("#nptEdit_user_nombre").val(datos[0].user_nombre);
        $("#nptEdit-user_id").val(datos[0].user_id);

        $("#slctEdit-user").val(datos[0].user_id);

        $("#nptEdit_venta_utilidad").val(datos[0].venta_utilidad);
        $("#mdl_edit_ventas").modal("show");
      },
      error: function () {
        alert("Problema en recuperarRegistro");
      },
    });
  }

  //TOMA EL VALOR DEL SELECT Y PONERLO EN INPUT
  $("#slctEdit-user").change(function () {
    $("#nptEdit-user_id").val($(this).val());
  });

  $("#btn_confirm_edit").click(function () {
    //GUARDA LOS DATOS MODIFICADOS
    $("#mdl_edit_ventas").modal("hide");
    let registro = recolectarDatosFormularioEdit();
    modificarRegistro(registro);
  });

  function recolectarDatosFormularioEdit() {
    let registro = {
      venta_id: $("#nptEdit-venta_id").val(),
      venta_nombre_producto: $("#nptEdit_venta_nombre_producto").val(),
      venta_nombre_proveedor: $("#nptEdit_venta_nombre_proveedor").val(),
      venta_costo_producto: $("#nptEdit_venta_costo_producto").val(),
      venta_valor_venta: $("#nptEdit_venta_valor_venta").val(),
      user_nombre: $("#nptEdit_user_nombre").val(),
      user_id: $("#nptEdit-user_id").val(),
      venta_utilidad: $("#nptEdit_venta_utilidad").val(),
    };
    return registro;
  }

  function modificarRegistro(registro) {
    $.ajax({
      type: "POST",
      url:
        "../models/venta_anterior_mdl.php?accion=modificar_venta&venta_id=" +
        registro.venta_id,
      data: registro,
      success: function (msg) {
        listadoVentas.ajax.reload();
        cargaPantallaPrincipal();
      },
      error: function () {
        alert("Problema modificando");
      },
    });
  }

  // ***************************
  // FIN CICLO EDITAR REGISTRO
  //****************************

  //------------------------
  // CICLO BORRAR REGISTRO
  //------------------------
  $("#tblVentas tbody").on("click", "button.btnDel", function () {
    //ACCIONA BOTON BORRAR REGISTRO DEL DATATABLES
    if (confirm("??Confirma la Eliminaci??n?")) {
      let registro = listadoVentas.row($(this).parents("tr")).data();
      borrarRegistro(registro.venta_id);
    }
  });

  function borrarRegistro(venta_id) {
    // BORRA REGISTRO Y ACTUALIZA DATATABLES
    $.ajax({
      type: "GET",
      url: "../models/venta_anterior_mdl.php?accion=borrar_venta&venta_id=" + venta_id,
      data: "",
      success: function (msg) {
        listadoVentas.ajax.reload();
        cargaPantallaPrincipal();
      },
      error: function () {
        alert("Problema en borrarRegistro");
      },
    });
  }

  // ***************************
  // FIN CICLO BORRAR REGISTRO
  // ***************************

  //-----------------------------
  //CICLO CERRAR TURNO
  //-----------------------------

  $("#btn_cerrar_turno").click(function () {
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

  //CALCULAR UTILIDAD EN EL MODAL
  $("#npt_turno_saldo_caja").focusout(function calculoUtilidadCierre() {
    $.ajax({
      type: "GET",
      url: "../models/venta_anterior_mdl.php?accion=consultar_utilidad_turno",
      data: "",
      success: function (datos) {
        $("#npt_turno_total_utilidad").val(datos[0].utilidad_turno);
        //$('#npt_turno_id').val(datos[0].turno_id);
        //alert('prueba de funcionamiento');
        //$('#p_turno_numero_ventas').html(datos[0].ventas_turno);

        let totalSaldo = $("#npt_turno_saldo_caja").val();
        let totalUtilidad = $("#npt_turno_total_utilidad").val();
        let entrega =
          parseFloat(totalSaldo.replace(/\$|\./g, "")) +
          parseFloat(totalUtilidad.replace(/\$|\./g, ""));
        $("#npt_turno_total_entrega").val(entrega);
      },
      error: function () {
        alert("Problema en cargar datos utilidad turno");
      },
    });
  });

  $("#btn_confirm_cerrar_turno").click(function () {
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
      $("#mdl_cerrar_turno").modal('hide');
      //$(location).attr('href', 'login_view.html');
    }
  });

  function recolectarDatosFormularioCerrar() {
    let registro = {
      turno_id_anterior: $("#npt_turno_id_anterior").val(),
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
        "../models/venta_anterior_mdl.php?accion=guardar_cierre_turno&turno_id_anterior=" +
        registro.turno_id_anterior,
      data: registro,
      success: function (msg) {
        //listadoVentas.ajax.reload();
        //alert('Cierre de caja completado');
      },
      error: function () {
        alert("problema en: guardar Cierre turno");
      },
    });
  }
  // ***************************
  // FIN CICLO CERRAR TURNO
  // ***************************

  //------------------------
  // OPERACIONES EN EL MODAL
  //------------------------

  //CARGA EL SELECT VENDEDORES
  $(document).ready(function () {
    $.ajax({
      type: "POST",
      url: "../models/selects/getVendedor.php",
      success: function (response) {
        $(".selectUser select").html(response).fadeIn();
      },
    });
  });

  //CALCULAR UTILIDAD EN EL MODAL NUEVA VENTA
  $("#npt_venta_valor_venta").focusout(function calculoUtilidad() {
    let costo = $("#npt_venta_costo_producto").val();
    let valor_venta = $("#npt_venta_valor_venta").val();
    let utilidad =
      parseFloat(valor_venta.replace(/\$|\./g, "")) -
      parseFloat(costo.replace(/\$|\./g, ""));
    $("#npt_venta_utilidad").val(utilidad);
  });

  //CALCULAR UTILIDAD EN EL MODAL DE EDITAR
  $("#nptEdit_venta_valor_venta").focusout(function calculoUtilidad() {
    let costo = $("#nptEdit_venta_costo_producto").val();
    let valor_venta = $("#nptEdit_venta_valor_venta").val();
    let utilidad =
      parseFloat(valor_venta.replace(/\$|\./g, "")) -
      parseFloat(costo.replace(/\$|\./g, ""));
    $("#nptEdit_venta_utilidad").val(utilidad);
  });

  $("#nptEdit_venta_costo_producto").focusout(function calculoUtilidad() {
    let costo = $("#nptEdit_venta_costo_producto").val();
    let valor_venta = $("#nptEdit_venta_valor_venta").val();
    let utilidad =
      parseFloat(valor_venta.replace(/\$|\./g, "")) -
      parseFloat(costo.replace(/\$|\./g, ""));
    $("#nptEdit_venta_utilidad").val(utilidad);
  });

  // CAMBIAR AL FORMATO MONEDA
  $("#input.nombre").on("blur", function () {
    const value = this.value.replace(/\,/g, "");
    this.value = parseFloat(value).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  });

  $("input.precioCliente").on("blur", function () {
    const value = this.value.replace(/\,/g, "");
    this.value = parseFloat(value).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  });

  $("input.utilidad").on("change", function () {
    const value = this.value.replace(/\,/g, "");
    this.value = parseFloat(value).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  });

  //*************************
  // FIN OPERACIONES EN EL MODAL
  //*************************
}); // CIERRE  DEL DATATABLES
