// INICIA DATATABLES
document.addEventListener("DOMContentLoaded", function () {
    let resumen = $("#tabla_reabrir").DataTable({
        "ajax": {
            url: "../models/turno_reabrir_mdl.php?accion=listar_resumen",
            dataSrc: ""
        },
        "columns": [
            { "data": "turno_id" },
            { "data": "turno_fecha_creado" },
            { "data": "jornada_nombre" },
            { "data": "user_nombre" },
            { "data": "turno_saldo_caja" },
            { "data": "turno_total_utilidad" },
            { "data": "turno_total_entrega" }, //nombre vendedor
            { "data": "turno_descuadre" },
            { "data": null, "orderable": false }
        ],
        "columnDefs": [{
            targets: 8,
            "defaultContent": "<button class='btn btn-primary btn-sm btnVer'>/<i class='fa-solid fa-pen'></i></button>",
            data: null
        }],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
        },
    });
    // FIN DATATABLES

// CARGAR FECHA
$(document).ready(function () {
  // let hoy = moment().toISOString().split('T')[0]; // en formato iso YYYY-MM-DD
  let ayer1 = moment().subtract(1, 'day').toISOString().split('T')[0]; // Ayer en formato iso YYYY-MM-DD
  let hoy1 = moment().format('LLL');
  //let hoy = moment().subtract(1, 'd').format('LLL');
  //let hoy = moment.locale();
  // document.getElementById('hoy_moment').innerHTML = hoy;
  //document.getElementById('ayer1').innerHTML = ayer1;
  document.getElementById('hoy1').innerHTML = hoy1;
  $('#ayer1').val(ayer1);
  //cargaPantallaPrincipal();
});

//CARGA EL SELECT DE JORNADA
// $(document).ready(function () {
//   $.ajax({
//     type: "POST",
//     url: "../models/selects/getJornada_anterior.php",
//     success: function (response) {
//       $(".selectJornada select").html(response).fadeIn();
//     },
//   });
// });

//TOMA EL VALOR DEL SELECT JORNADA Y PONERLO EN INPUT
// $("#slct_jornada").change(function () {
//   $("#npt_jornada_id_anterior").val($(this).val());
// });
})