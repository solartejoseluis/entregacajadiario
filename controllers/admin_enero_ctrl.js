//-----------------------
// INICIA DATATABLES ADMIN
//-----------------------
document.addEventListener("DOMContentLoaded", function () {
    let resumen = $("#tbl_admin").DataTable({
        "ajax": {
            url: "../models/admin_enero_mdl.php?accion=listar_resumen",
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
        "paging": false
    });
    // *******************
    // FIN DATATABLES
    // *******************

    $('#tbl_admin tbody').on('click', 'button.btnVer', function () {
        let registro = resumen.row($(this).parents('tr')).data();
        consultarDatosTurnoActual(registro.turno_id);
        cargarDatosUtilidadVendedor1(registro.turno_id);
        cargarDatosUtilidadVendedor2(registro.turno_id);
        cargarDatosUtilidadVendedor3(registro.turno_id);
        cargarDatosUtilidadVendedor4(registro.turno_id);
        utilidadTurno(registro.turno_id);
        listarVentasDia(registro.turno_id);
        $("#mdl_ver_venta").modal('show');
        //resumen.ajax.reload();
    });



    //-----------------------------
    // CARGAS EN EL MODAL
    //-----------------------------

    // CARGA LA FECHA ACTUAL y CUADRO PRINCIPAL DE PAGINA
    // $(document).ready(function () {
    //     let hoy = actualDate();
    //     document.getElementById('hoy').innerHTML = hoy;
    //     //cargaPantallaPrincipal();
    // });

    // CARGA LA FECHA ACTUAL y CUADRO PRINCIPAL DE PAGINA
// function getTime() {
//   var today = moment(),
//       time = today.format('LT'),
//       //date = today.format('dddd, MMMM, YYYY');
//       date = today.format('LL');
  
//   document.getElementById('hoy_moment').innerHTML =
//   `<br>` + 
//   `<h1 class='large'>${time}</h1>` +
//   `<span class='dark'>${date}</span>`
// };
// setInterval (function() {
//   getTime();
// }, 1000);



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
            url: '../models/admin_mdl.php?accion=consultarDatosTurnoActual&turno_id=' + turno_id,
            data: '',
            success: function (datos) {
                $('#npt_user_nombre').html(datos[0].user_nombre);
                $('#npt_user_apellido').html(datos[0].user_apellido);
                $('#npt_turno_fecha_creado').html(datos[0].turno_fecha_creado);
                $('#npt_jornada_nombre').html(datos[0].jornada_nombre);
                $('#p_turno_saldo_caja').html(datos[0].turno_saldo_caja);
                $('#p_turno_total_entrega').html(datos[0].turno_total_entrega);
                $('#p_turno_descuadre').html(datos[0].turno_descuadre);
            },
            error: function () {
                alert("Problema en consultar datos turno actual");
            }
        });
    };

    // CARGA DATOS VENDEDOR 1
    function cargarDatosUtilidadVendedor1(turno_id) {
        $.ajax({
            type: 'GET',
            url: '../models/admin_mdl.php?accion=consultar_utilidad_vendedor1&turno_id=' + turno_id,
            data: '',
            success: function (datos) {
                $('#utilidadVendedor1').html(datos[0].utilidad_vendedor1);

                $('#ventasVendedor1').html(datos[0].ventas_vendedor1);
            },
            error: function () {
                alert("Problema en consultarUtilidadVendedor1");
            }
        });
    };


    // CARGA DATOS VENDEDOR 2
    function cargarDatosUtilidadVendedor2(turno_id) {
        $.ajax({
            type: 'GET',
            url: '../models/admin_mdl.php?accion=consultar_utilidad_vendedor2&turno_id=' + turno_id,
            data: '',
            success: function (datos) {
                $('#utilidadVendedor2').html(datos[0].utilidad_vendedor2);

                $('#ventasVendedor2').html(datos[0].ventas_vendedor2);
            },
            error: function () {
                alert("Problema en consultarUtilidadVendedor2");
            }
        });
    };

    // CARGA DATOS VENDEDOR 3
    function cargarDatosUtilidadVendedor3(turno_id) {
        $.ajax({
            type: 'GET',
            url: '../models/admin_mdl.php?accion=consultar_utilidad_vendedor3&turno_id=' + turno_id,
            data: '',
            success: function (datos) {
                $('#utilidadVendedor3').html(datos[0].utilidad_vendedor3);

                $('#ventasVendedor3').html(datos[0].ventas_vendedor3);
            },
            error: function () {
                alert("Problema en consultarUtilidadVendedor3");
            }
        });
    };

    // CARGA DATOS VENDEDOR 4
    function cargarDatosUtilidadVendedor4(turno_id) {
        $.ajax({
            type: 'GET',
            url: '../models/admin_mdl.php?accion=consultar_utilidad_vendedor4&turno_id=' + turno_id,
            data: '',
            success: function (datos) {
                $('#utilidadVendedor4').html(datos[0].utilidad_vendedor4);

                $('#ventasVendedor4').html(datos[0].ventas_vendedor4);
            },
            error: function () {
                alert("Problema en consultarUtilidadVendedor4");
            }
        });
    };


    // CARGA DATOS TOTAL UTILIDAD TURNO
    function utilidadTurno(turno_id) {
        $.ajax({
            type: 'GET',
            url: '../models/admin_mdl.php?accion=consultar_utilidad_turno&turno_id=' + turno_id,
            data: '',
            success: function (datos) {
                $('#p_utilidad_turno').html(datos[0].utilidad_turno);

                $('#p_turno_numero_ventas').html(datos[0].ventas_turno);
                //$('#npt_turno_id').val(datos[0].turno_id);
            },
            error: function () {
                alert("Problema en cargar datos utilidad turno");
            }
        });
    };

    // CARGA DATOS VENTAS DEL DIA
    function listarVentasDia(turno_id) {
        $.ajax({
            type: 'GET',
            url: '../models/admin_mdl.php?accion=listar_venta_seleccionada&turno_id=' + turno_id,
            data: '',
            success: function (datos) {
                $.each(datos, function () {
                    $('#myTable > tbody').append(
                        '<tr>' +
                        '<td>' + this.venta_id + '</td>' +
                        '<td>' + this.venta_fecha + '</td>' +
                        '<td>' + this.venta_nombre_producto + '</td>' +
                        '<td>' + this.venta_nombre_proveedor + '</td>' +
                        '<td>' + this.venta_costo_producto + '</td>' +
                        '<td>' + this.venta_valor_venta + '</td>' +
                        '<td>' + this.user_nombre + '</td>' +
                        '<td>' + this.venta_utilidad + '</td>' +
                        '</tr>'
                    );
                });
                //$("#mdl_ver_venta").modal('show');
            },
            error: function () {
                alert(" problema e listar ventas dia");
            }
        });
    };


    // BOTON CERRAR
    $('#btnCerrar').on('click', function () {
        //let registro = resumen.row($(this).parents('tr')).data();
        //resumen.ajax.reload();
        location.reload();
        $("#mdl_ver_venta").modal('hide');
    });
    // FIN BOTON CERRAR



    //***************************************
    //  FIN CARGA EN EL MODAL
    //***************************************

}); // CIERRE DEL DATATABLES