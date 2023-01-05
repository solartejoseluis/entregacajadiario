
// CARGA  HORA ACTUAL
$(document).ready(function() {
    limpiarFormularioTurno();
    let hoy = actualDate();
    document.getElementById('hoy').innerHTML = hoy; // la inserta en el elemento html con el id="hoy" fecha larga
    let fecha_hoy = new Date();
    // inserta la fecha en un input oculto y la formatea ISO. yyyy-mm-dd
    $('#npt_fecha').val(fecha_hoy.toISOString().split('T')[0]);
    //alert(fecha_hoy.toISOString().split('T')[0]);
});


function limpiarFormularioTurno() {
    $('#npt_fecha').val('');
    $('#npt_jornada_id').val('');
    $('#npt_responsable_id').val('');
    $('#slct_user').val('0');
    $('#slct_responsable').val('0');
    $('#slct_jornada').val('0');
};

function actualDate() {
    let today = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //options.timeZone = 'UTC';
    //options.timeZoneName = 'short';
    let now = today.toLocaleString('es-CO', options);
    //console.log(now);
    return now;
};



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


  $('#btn_crear_turno').click(function() {
    //VALIDACION DE DATOS DEL MODAL NUEVO
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
     // fin validacion formulario nuevo
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
  }

  function guardarRegistroTurno(registro) {
    $.ajax({
      type: 'POST',
      url: 'venta_data.php?accion=guardar_turno',
      data: registro,
      success: function(msg) {
        //listadoVentas.ajax.reload();
        alert('preparando abrir ventana');
        // abrirVentana();
      },
      error: function() {
        alert("problema en: guardar Turno");
      }
    });
  }


// function abrirVentana() {
//     //window.open("venta_home.html", "_blank");
//     window.location.href="http://localhost/entregacajadiario/venta_home.html";
//     alert('final del script');
// };
