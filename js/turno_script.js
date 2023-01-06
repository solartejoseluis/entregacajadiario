
// CARGA  HORA ACTUAL
$(document).ready(function() {
    limpiarFormularioTurno();
    //inserat fecha larga
    let hoy = actualDate();
    document.getElementById('hoy').innerHTML = hoy;
    //inserta fecha en formato iso
    let fecha_hoy = new Date();
    $('#npt_fecha').val(fecha_hoy.toISOString().split('T')[0]);
});


function limpiarFormularioTurno() {
    $('#npt_fecha').val('');
    $('#npt_jornada_id').val('');
    $('#npt_responsable_id').val('');
    $('#slct_responsable').val('0');
    $('#slct_jornada').val('0');
};

function actualDate() {
    let today = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let now = today.toLocaleString('es-CO', options);
    return now;
};


//------------------------
// CARGA DE SELECTS
//------------------------

//CARGA EL SELECT RESPONSABLE
  $(document).ready(function() {
      $.ajax({
          type: "POST",
          url: "getUser.php",
          success: function(response) {
              $('.selectResponsable select').html(response).fadeIn();
          }
      });
  });


//TOMA EL VALOR DEL SELECT RESPONSABLE Y PONERLO EN INPUT
    $("#slct_responsable").change(function() {
        $('#npt_responsable_id').val($(this).val());
    });


//CARGA EL SELECT DE JORNADA
  $(document).ready(function() {
      $.ajax({
          type: "POST",
          url: "getJornada.php",
          success: function(response) {
              $('.selectJornada select').html(response).fadeIn();
          }
      });
  });


//TOMA EL VALOR DEL SELECT JORNADA Y PONERLO EN INPUT
    $("#slct_jornada").change(function() {
        $('#npt_jornada_id').val($(this).val());
    });

// ***************************
// FINAL CARGA DE SELECTS
// ***************************
//------------------------
// INICIA CICLO CREAR TURNO
//------------------------


  $('#btn_crear_turno').click(function() {
    //valida los datos del modal turno
    let valida_responsable = $('#npt_responsable_id').val();
    let valida_jornada = $('#npt_jornada_id').val();
    // compara datos de variables contra vacio y muestra un alert
    if (valida_responsable.trim() == '') {
      alert('elija responsable.');
      $('#slct_responsable').focus();
      return false;
    } else if (valida_jornada.trim() == '') {
      alert('elija Jornada');
      $('#slct_jornada').focus();
      return false;
     // fin validacion
    } else {
      //ejecutar Si todo fue validado
      let registro = recolectarDatosFormularioTurno();
      guardarRegistroTurno(registro);
      //cargaPantallaPrincipal();
      //alert("ok Validado");
    }
  });




  function recolectarDatosFormularioTurno() {
    let registro = {
      turno_fecha_creado: $('#npt_fecha').val(),
      turno_jornada: $('#npt_jornada_id').val(),
      turno_responsable: $('#npt_responsable_id').val(),
    };
    return registro;
  };




  function guardarRegistroTurno(registro) {
    $.ajax({
      type: 'POST',
      url: 'venta_data.php?accion=guardar_turno',
      data: registro,
      success: function(msg) {
        //listadoVentas.ajax.reload();
        //alert('preparando abrir ventana');
        // abrirVentana();
      },
      error: function() {
        alert("problema en: guardar Turno");
      }
    });
  };

// ***************************
// FIN CICLO CREAR TURNO
// ***************************