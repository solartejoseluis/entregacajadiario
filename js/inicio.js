// CARGA LA FECHA ACTUAL
$(document).ready(function() {
    let hoy = actualDate();
    document.getElementById('hoy').innerHTML = hoy;
    let fecha_hoy = new Date();
    //fecha_hoy.toISOString().split('T')[0];
    $('#npt_fecha').val(fecha_hoy.toISOString().split('T')[0]);
});

function actualDate() {
    let today = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //options.timeZone = 'UTC';
    //options.timeZoneName = 'short';
    let now = today.toLocaleString('es-CO', options);
    //console.log(now);
    return now;
}


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


//CARGA EL SELECT JORNADAS
$(document).ready(function() {
    $.ajax({
        type: "POST",
        url: "getJornada.php",
        success: function(response) {
            $('.selectJornada select').html(response).fadeIn();
        }
    });
});


//Pasa valor del select al input
$("#slct_responsable").change(function() {
    $('#npt_responsable_id').val($(this).val());
});
$("#slct_jornada").change(function() {
    $('#npt_jornada_id').val($(this).val());
});



$('#btn_ingreso').click(function() {
    // recoger los datos de los inputs
let registro = recolectarDatosInicio();
guardarRegistroInicio(registro);
abrirVentas();
alert('final');
});

function recolectarDatosInicio(){
    let registro = {
        fecha_actual: $('#npt_fecha').val(),
        jornada_id: $('#npt_jornada_id').val(),
        responsable_id: $('#npt_responsable_id').val(),
    };
    return registro;
};


// guardar los datos en la tabla TURNOS
function guardarRegistroInicio(registro) {
    $.ajax({
        type: 'POST',
        url: 'venta_data.php?accion=guardar_inicio',
        data: registro,
        success: function(msg) {
            //abrirVentas();

        },
        error: function() {
            alert("problema en: guardarRegistroInicio");
        }
    });
}


function abrirVentas() {
    //window.open("venta_home.html", "_blank");
    window.location.href="http://localhost/entregacajadiario/venta_home.html";
};



function limpiarInicio() {
    $('#npt_responsable_id').val('');
    $('#slct_responsable').val('0');
    $('#npt_jornada_id').val('');
    $('#slct_jornada').val('0');
};