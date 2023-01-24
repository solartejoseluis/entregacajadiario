// INICIA DATATABLES
document.addEventListener("DOMContentLoaded", function () {
  let resumen = $("#tabla_reabrir").DataTable({
    ajax: {
      url: "../models/turno_admin_mdl.php?accion=listar_resumen",
      dataSrc: "",
    },
    columns: [
      { data: "turno_id" },
      { data: "turno_fecha_creado" },
      { data: "jornada_nombre" },
      { data: "user_nombre" },
      { data: "turno_saldo_caja" },
      { data: "turno_total_utilidad" },
      { data: "turno_total_entrega" }, //nombre vendedor
      { data: "turno_descuadre" },
      { data: null, orderable: false },
    ],
    columnDefs: [
      {
        targets: 8,
        defaultContent:
          "<button class='btn btn-primary btn-sm boton_ver'>/<i class='fa-solid fa-pen'></i></button>",
        data: null,
      },
    ],
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
        "paging": false
  });
  // FIN DATATABLES

  // CARGAR FECHA
  $(document).ready(function () {
    let hoy1 = moment().format("LL");
    document.getElementById("hoy1").innerHTML = hoy1;
    //cargaPantallaPrincipal();
  });

  $('#tabla_reabrir tbody').on('click', 'button.boton_ver', function () {
    let registro = resumen.row($(this).parents('tr')).data();
    // alert(registro.turno_id);
    crearVariableSesionDelTurno(registro.turno_id);
  });

  function crearVariableSesionDelTurno(turno_id) {
    $.ajax({
      type: 'GET',
      url: '../models/turno_admin_mdl.php?accion=cargar_turno_id_anterior&turno_id=' + turno_id,
      data: '',
      success: function (msg) {
      $(location).attr("href", "../views/venta_admin_view.html");
        },
      error: function () {
        alert("Problema en crear variable sesion turno");
      }
    });
  }


}); // cierre del datatables