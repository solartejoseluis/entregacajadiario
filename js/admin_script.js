//-----------------------
// INICIA DATATABLES
//-----------------------
document.addEventListener("DOMContentLoaded", function() {
  let resumen = $("#tbl_admin").DataTable({
    "ajax": {
      url: "admin_ctrl.php?accion=listar_resumen",
      dataSrc: ""
    },
    "columns": [
      //{"data":"turno_id"},
      {"data":"turno_fecha_creado"},
      {"data":"jornada_nombre"},
      {"data":"user_nombre"},
      {"data":"turno_saldo_caja"},
      {"data":"turno_total_utilidad"},
      {"data":"turno_total_entrega"}, //nombre vendedor
      {"data":"turno_descuadre"},
      {"data":null,"orderable":false}
    ],
    "columnDefs": [{
        targets: 7,
        "defaultContent": "<button class='btn btn-primary btn-sm btnVer'>/<i class='fa-solid fa-pen'></i></button>",
        data: null
    }],
    "language":{
      "url": "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
  });
  // *******************
  // FIN DATATABLES
  // *******************

 $('#tbl_admin tbody').on('click','button.btnVer',function(){
    let registro = resumen.row($(this).parents('tr')).data();

  $("#mdl_ver_venta").modal('show');
    cargarDatosUtilidadVendedor1(registro.turno_id);
    cargarDatosUtilidadVendedor2(registro.turno_id);
    cargarDatosUtilidadVendedor3(registro.turno_id);
    cargarDatosUtilidadVendedor4(registro.turno_id);
    utilidadTurno(registro.turno_id);
    resumen.ajax.reload();
    //datatableslistarVentasDia();
    //resumen.ajax.reload();
  });

 $('#btnCerrar').on('click',function(){
  //let registro = resumen.row($(this).parents('tr')).data();
  //resumen.ajax.reload();
  $("#mdl_ver_venta").modal('hide');
  });

  //-----------------------------
  // CARGAS EN PANTALLA PRINCIPAL
  //-----------------------------

  // CARGA LA FECHA ACTUAL y CUADRO PRINCIPAL DE PAGINA
  $(document).ready(function() {
    let hoy = actualDate();
    document.getElementById('hoy').innerHTML = hoy;
    //cargaPantallaPrincipal();
  });

  //MOSTRAR LA FECHA ACTUAL
  function actualDate() {
    let today = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //options.timeZone = 'UTC';
    //options.timeZoneName = 'short';
    let now = today.toLocaleString('es-CO', options);
    //console.log(now);
    return now;
  };

  function consultarDatosTurnoActual(turno_id) {
    $.ajax({
      type: 'POST',
      url: 'admin_ctrl.php?accion=consultarDatosTurnoActual&turno_id=' + turno_id,
      data: '',
      success: function(datos) {
        $('#npt_turno_id_actual').val(datos[0].turno_id_actual);
        $('#npt_user_nombre').html(datos[0].user_nombre);
        $('#npt_user_apellido').html(datos[0].user_apellido);
        $('#npt_jornada_nombre').html(datos[0].jornada_nombre);
        //$('#utilidadVendedor1').html(datos[0].utilidad_vendedor1);
      },
      error: function() {
        alert("Problema en consultar datos turno actual");
      }
    });
  };

  // CARGA DATOS VENDEDOR 1
  function cargarDatosUtilidadVendedor1(turno_id){
    $.ajax({
      type: 'GET',
      url: 'admin_ctrl.php?accion=consultar_utilidad_vendedor1&turno_id=' + turno_id,
      data: '',
      success: function(datos) {
        $('#utilidadVendedor1').html(datos[0].utilidad_vendedor1);
        $('#ventasVendedor1').html(datos[0].ventas_vendedor1);
      },
      error: function() {
        alert("Problema en consultarUtilidadVendedor1");
      }
    });
  };


  // CARGA DATOS VENDEDOR 2
  function cargarDatosUtilidadVendedor2(turno_id){
    $.ajax({
      type: 'GET',
      url: 'admin_ctrl.php?accion=consultar_utilidad_vendedor2&turno_id=' + turno_id,
      data: '',
      success: function(datos) {
        $('#utilidadVendedor2').html(datos[0].utilidad_vendedor2);
        $('#ventasVendedor2').html(datos[0].ventas_vendedor2);
      },
      error: function() {
        alert("Problema en consultarUtilidadVendedor2");
      }
    });
  };

  // CARGA DATOS VENDEDOR 3
  function cargarDatosUtilidadVendedor3(turno_id) {
    $.ajax({
      type: 'GET',
      url: 'admin_ctrl.php?accion=consultar_utilidad_vendedor3&turno_id=' + turno_id,
      data: '',
      success: function(datos) {
        $('#utilidadVendedor3').html(datos[0].utilidad_vendedor3);
        $('#ventasVendedor3').html(datos[0].ventas_vendedor3);
      },
      error: function() {
        alert("Problema en consultarUtilidadVendedor3");
      }
    });
  };

  // CARGA DATOS VENDEDOR 4
  function cargarDatosUtilidadVendedor4(turno_id) {
    $.ajax({
      type: 'GET',
      url: 'admin_ctrl.php?accion=consultar_utilidad_vendedor4&turno_id=' + turno_id,
      data: '',
      success: function(datos) {
        $('#utilidadVendedor4').html(datos[0].utilidad_vendedor4);
        $('#ventasVendedor4').html(datos[0].ventas_vendedor4);
      },
      error: function() {
        alert("Problema en consultarUtilidadVendedor4");
      }
    });
  };


  // PRUEBAS CON UTILIDAD


  // CARGA DATOS TOTAL UTILIDAD TURNO
  function utilidadTurno(turno_id) {
    $.ajax({
      type: 'GET',
      url: 'admin_ctrl.php?accion=consultar_utilidad_turno&turno_id=' + turno_id,
      data: '',
      success: function(datos) {
        $('#p_utilidad_turno').html(datos[0].utilidad_turno);
        $('#p_turno_numero_ventas').html(datos[0].ventas_turno);
        //$('#npt_turno_id').val(datos[0].turno_id);
      },
      error: function() {
        alert("Problema en cargar datos utilidad turno");
      }
    });
  };

  //***************************************
  //  FIN CARGA EN PANTALLA PRINCIPAL
  //***************************************



// inicia Datatables del Modal

  function datatableslistarVentasDia(){
  let listadoVentasDia = $("#tblVentasDia").DataTable({
    "ajax": {
      url: "admin_ctrl.php?accion=listar_ventas_dia",
      dataSrc: ""
    },
    "columns": [
      { "data": "venta_id" },
      { "data": "venta_nombre_producto" },
      { "data": "venta_nombre_proveedor" },
      { "data": "venta_costo_producto" },
      { "data": "venta_valor_venta" },
      { "data": "user_nombre" }, //nombre vendedor
      { "data": "venta_utilidad" },
      //{ "data": null, "orderable": false },
      //{ "data": null, "orderable": false }
    ],

    "columnDefs": [
    ],
    "language": {
      "url": "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
  });
};

// Fin datatables del modal


}); // CIERRE DEL DATATABLES