//------------------------
// CARGA DE SELECTS
//------------------------

//CARGA EL SELECT TURNO FECHA
$(document).ready(function () {
  $.ajax({
    type: "POST",
    url: "getTurnoFecha.php",
    success: function (response) {
      $(".selectTurnoFecha select").html(response).fadeIn();
    },
  });
});

//TOMA EL VALOR DEL SELECT TURNO FECHA Y PONERLO EN INPUT
$("#slct_turno_fecha").change(function () {
  $("#npt_fecha_anterior").val($(this).val());
  $("#npt_jornada_id_anterior").val("");
  $("#slct_jornada").val("0");
});

//CARGA EL SELECT DE JORNADA
$(document).ready(function () {
  $.ajax({
    type: "POST",
    url: "getJornada_anterior.php",
    success: function (response) {
      $(".selectJornada select").html(response).fadeIn();
    },
  });
});

//TOMA EL VALOR DEL SELECT JORNADA Y PONERLO EN INPUT
$("#slct_jornada").change(function () {
  $("#npt_jornada_id_anterior").val($(this).val());
});

// ***************************
// FINAL CARGA DE SELECTS
// ***************************
