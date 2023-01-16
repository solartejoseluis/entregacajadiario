

//------------------------
// CARGA DE SELECTS
//------------------------

//CARGA EL SELECT TURNO FECHA
  $(document).ready(function() {
      $.ajax({
          type: "POST",
          url: "getTurnoFecha.php",
          success: function(response) {
              $('.selectTurnoFecha select').html(response).fadeIn();
          }
      });
  });


//TOMA EL VALOR DEL SELECT TURNO FECHA Y PONERLO EN INPUT
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
