//------------------------
// CARGA DE SELECTS
//------------------------

//CARGA EL SELECT TURNO FECHA
// $(document).ready(function () {
//   $.ajax({
//     type: "POST",
//     url: "getTurnoFecha.php",
//     success: function (response) {
//       $(".selectTurnoFecha select").html(response).fadeIn();
//     },
//   });
// });

// //TOMA EL VALOR DEL SELECT TURNO FECHA Y PONERLO EN INPUT
// $("#slct_turno_fecha").change(function () {
//   $("#npt_fecha_anterior").val($(this).val());
//   $("#npt_jornada_id_anterior").val("");
//   $("#slct_jornada").val("0");
// });

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



    // CARGA LA FECHA ACTUAL
    $(document).ready(function () {
        // let hoy = moment().toISOString().split('T')[0]; // en formato iso YYYY-MM-DD
        let ayer1 = moment().subtract(2, 'day').toISOString().split('T')[0]; // Ayer en formato iso YYYY-MM-DD
        let hoy1 = moment().format('LLL');
        //let hoy = moment().subtract(1, 'd').format('LLL');
        //let hoy = moment.locale();
        // document.getElementById('hoy_moment').innerHTML = hoy;
        document.getElementById('ayer1').innerHTML = ayer1;
        document.getElementById('hoy1').innerHTML = hoy1;
        //cargaPantallaPrincipal();
    });


// ***************************
// FINAL CARGA DE SELECTS
// ***************************
