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
          url: "../models/selects/getUser.php",
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
          url: "../models/selects/getJornada.php",
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
