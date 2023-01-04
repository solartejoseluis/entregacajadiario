
 //-----------------------
 // INICIA DATATABLES
 //-----------------------
 document.addEventListener("DOMContentLoaded", function() {
     let listadoVentas = $("#tblVentas").DataTable({
         "ajax": {
             url: "venta_data.php?accion=listar_ventas",
             dataSrc: ""
         },
         "columns": [
             { "data": "venta_id" },
             { "data": "venta_nombre_producto" },
             { "data": "venta_nombre_proveedor" },
             { "data": "venta_costo_producto" },
             { "data": "venta_valor_venta" },
             { "data": "user_nombre" }, //nombre vendedor
             { "data": "venta_utilidad" },
             { "data": null, "orderable": false },
             { "data": null, "orderable": false }
         ],
         "columnDefs": [{
                 targets: 7,
                 "defaultContent": "<button class='btn btn-primary btnEdit'><i class='fa-solid fa-pen'></i></button>",
                 data: null
             },

             {
                 targets: 8,
                 "defaultContent": "<button  class='btn btn-danger btnDel'><i class='fa fa-trash-o fa-lg'></i></button>",
                 data: null
             }
         ],
         "language": {
             "url": "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
         },
     });


     // *******************
     // FIN DATATABLES
     // *******************



     //-----------------------------
     // CARGAS EN PANTALLA PRINCIPAL
     //-----------------------------

     function cargaPantallaPrincipal() {
         cargarDatosUtilidadVendedor1();
         cargarDatosUtilidadVendedor2();
         cargarDatosUtilidadVendedor3();
         cargarDatosUtilidadVendedor4();
         cargarDatosUtilidadTurno();
     };


     // CARGA LA FECHA ACTUAL y CUADRO PRINCIPAL DE PAGINA
     $(document).ready(function() {
         let hoy = actualDate();
         document.getElementById('hoy').innerHTML = hoy;
         cargaPantallaPrincipal();
     });

     //MOSTRAR LA FECHA ACTUAL
     function actualDate() {
         let today = new Date();
         let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
         //options.timeZone = 'UTC';
         //options.timeZoneName = 'short';
         let now = today.toLocaleString('es-CO', options);
         //console.log(now);
         return now;
     }

     // CARGA DATOS VENDEDOR 1
     function cargarDatosUtilidadVendedor1() {
         $.ajax({
             type: 'GET',
             url: 'venta_data.php?accion=consultar_utilidad_vendedor1',
             data: '',
             success: function(datos) {
                 $('#utilidadVendedor1').html(datos[0].utilidad_vendedor1);
                 $('#ventasVendedor1').html(datos[0].ventas_vendedor1);
             },
             error: function() {
                 alert("Problema en consultarUtilidadVendedor1");
             }
         });
     };


     // CARGA DATOS VENDEDOR 2
     function cargarDatosUtilidadVendedor2() {
         $.ajax({
             type: 'GET',
             url: 'venta_data.php?accion=consultar_utilidad_vendedor2',
             data: '',
             success: function(datos) {
                 $('#utilidadVendedor2').html(datos[0].utilidad_vendedor2);
                 $('#ventasVendedor2').html(datos[0].ventas_vendedor2);
             },
             error: function() {
                 alert("Problema en consultarUtilidadVendedor2");
             }
         });
     };

     // CARGA DATOS VENDEDOR 3
     function cargarDatosUtilidadVendedor3() {
         $.ajax({
             type: 'GET',
             url: 'venta_data.php?accion=consultar_utilidad_vendedor3',
             data: '',
             success: function(datos) {
                 $('#utilidadVendedor3').html(datos[0].utilidad_vendedor3);
                 $('#ventasVendedor3').html(datos[0].ventas_vendedor3);
             },
             error: function() {
                 alert("Problema en consultarUtilidadVendedor3");
             }
         });
     };

     // CARGA DATOS VENDEDOR 4
     function cargarDatosUtilidadVendedor4() {
         $.ajax({
             type: 'GET',
             url: 'venta_data.php?accion=consultar_utilidad_vendedor4',
             data: '',
             success: function(datos) {
                 $('#utilidadVendedor4').html(datos[0].utilidad_vendedor4);
                 $('#ventasVendedor4').html(datos[0].ventas_vendedor4);
             },
             error: function() {
                 alert("Problema en consultarUtilidadVendedor4");
             }
         });
     };


     // CARGA DATOS UTILIDAD TURNO
     function cargarDatosUtilidadTurno() {
         $.ajax({
             type: 'GET',
             url: 'venta_data.php?accion=consultar_utilidad_turno',
             data: '',
             success: function(datos) {
                 $('#utilidadTurno').html(datos[0].utilidad_turno);
                 $('#ventasTurno').html(datos[0].ventas_turno);
             },
             error: function() {
                 alert("Problema en consultarUtilidadTurno");
             }
         });
     };

     //***************************************
     //  FIN CARGA EN PANTALLA PRINCIPAL
     //***************************************


     //-----------------------------
     //CICLO AGREGAR NUEVA VENTA
     //-----------------------------

     $('#btn-Add').click(function() {
         limpiarFormulario();
         $("#mdlVentas").modal('show');
     });

     function limpiarFormulario() {
         $('#npt-venta_id').val('');
         $('#npt-venta_nombre_producto').val('');
         $('#npt-venta_nombre_proveedor').val('');
         $('#npt-venta_costo_producto').val('');
         $('#npt-venta_valor_venta').val('');
         $('#npt-user_id').val('');
         $('#slct-user').val('0');
         $('#npt-venta_utilidad').val('');
     }


     $('#btnConfirmAdd').click(function() {
         //VALIDACION DE DATOS DEL MODAL NUEVO
         let valida_nombre_producto = $('#npt-venta_nombre_producto').val();
         let valida_nombre_proveedor = $('#npt-venta_nombre_proveedor').val();
         let valida_venta_costo_producto = $('#npt-venta_costo_producto').val();
         let valida_venta_valor_venta = $('#npt-venta_valor_venta').val();
         let valida_user_id = $('#npt-user_id').val();
         let valida_venta_utilidad = $('#npt-venta_utilidad').val();
         // compara datos de variables contra vacio y muestra un alert
         if (valida_nombre_producto.trim() == '') {
             alert('revisar nombre producto.');
             $('#npt-venta_nombre_producto').focus();
             return false;
         } else if (valida_nombre_proveedor.trim() == '') {
             alert('Revisar nombre proveedor');
             $('#npt-venta_nombre_proveedor').focus();
             return false;
         } else if (valida_venta_costo_producto.trim() == '') {
             alert('revisar costo');
             $('#npt-venta_costo_producto').focus();
             return false;
         } else if (valida_venta_valor_venta.trim() == '') {
             alert('Revisar valor venta');
             $('#npt-venta_valor_venta').focus();
             return false;
         } else if (valida_user_id.trim() == '0') {
             alert('elija vendedor');
             $('#slct-user').focus();
             return false;
         } else if (valida_venta_utilidad.trim() == '') {
             alert('Revisar utilidad');
             $('#npt-venta_utilidad').focus();
             return false; // fin validacion formulario nuevo
         } else {
             //ejecutar Si todo fue validado
             $("#mdlVentas").modal('hide');
             let registro = recolectarDatosFormularioNuevo();
             guardarRegistro(registro);
             cargaPantallaPrincipal();
             //alert("ok Validado");
         }
     });


     //TOMA EL VALOR DEL SELECT Y PONERLO EN INPUT
     $("#slct-user").change(function() {
         $('#npt-user_id').val($(this).val());
     });

     function recolectarDatosFormularioNuevo() {
         let registro = {
             venta_id: $('#npt-venta_id').val(),
             venta_nombre_producto: $('#npt-venta_nombre_producto').val(),
             venta_nombre_proveedor: $('#npt-venta_nombre_proveedor').val(),
             venta_costo_producto: $('#npt-venta_costo_producto').val(),
             venta_valor_venta: $('#npt-venta_valor_venta').val(),
             user_nombre: $('#npt-user_nombre').val(),
             user_id: $('#npt-user_id').val(),
             venta_utilidad: $('#npt-venta_utilidad').val(),
         };
         return registro;
     }

     function guardarRegistro(registro) {
         $.ajax({
             type: 'POST',
             url: 'venta_data.php?accion=guardar_venta',
             data: registro,
             success: function(msg) {
                 listadoVentas.ajax.reload();
             },
             error: function() {
                 alert("problema en: guardarRegistro");
             }
         });
     }

     //****************************
     // FIN CICLO AGREGAR NUEVA VENTA
     //****************************

     //------------------------
     //CICLO EDITAR REGISTRO
     //------------------------

     $('#tblVentas tbody').on('click', 'button.btnEdit', function() {
         let registroEdit = listadoVentas.row($(this).parents('tr')).data();
         recuperarRegistro(registroEdit.venta_id);
     });


     function recuperarRegistro(venta_id) {
         $.ajax({
             type: 'GET',
             url: 'venta_data.php?accion=consultar_venta&venta_id=' + venta_id,
             data: '',
             success: function(datos) {
                 $('#nptEdit-venta_id').val(datos[0].venta_id);
                 $('#nptEdit-venta_nombre_producto').val(datos[0].venta_nombre_producto);
                 $('#nptEdit-venta_nombre_proveedor').val(datos[0].venta_nombre_proveedor);
                 $('#nptEdit-venta_costo_producto').val(datos[0].venta_costo_producto);
                 $('#nptEdit-venta_valor_venta').val(datos[0].venta_valor_venta);
                 $('#nptEdit-user_nombre').val(datos[0].user_nombre);
                 $('#nptEdit-user_id').val(datos[0].user_id);

                 $('#slctEdit-user').val(datos[0].user_id);

                 $('#nptEdit-venta_utilidad').val(datos[0].venta_utilidad);
                 $("#mdlEditVentas").modal('show');
             },
             error: function() {
                 alert("Problema en recuperarRegistro");
             }
         });
     }


     //TOMA EL VALOR DEL SELECT Y PONERLO EN INPUT
     $("#slctEdit-user").change(function() {
         $('#nptEdit-user_id').val($(this).val());
     });


     $('#btnConfirmEdit').click(function() {
         //GUARDA LOS DATOS MODIFICADOS
         $("#mdlEditVentas").modal('hide');
         let registro = recolectarDatosFormularioEdit();
         modificarRegistro(registro);
     });


     function recolectarDatosFormularioEdit() {
         let registro = {
             venta_id: $('#nptEdit-venta_id').val(),
             venta_nombre_producto: $('#nptEdit-venta_nombre_producto').val(),
             venta_nombre_proveedor: $('#nptEdit-venta_nombre_proveedor').val(),
             venta_costo_producto: $('#nptEdit-venta_costo_producto').val(),
             venta_valor_venta: $('#nptEdit-venta_valor_venta').val(),
             user_nombre: $('#nptEdit-user_nombre').val(),
             user_id: $('#nptEdit-user_id').val(),
             venta_utilidad: $('#nptEdit-venta_utilidad').val(),
         };
         return registro;
     }


     function modificarRegistro(registro) {
         $.ajax({
             type: 'POST',
             url: 'venta_data.php?accion=modificar_venta&venta_id=' + registro.venta_id,
             data: registro,
             success: function(msg) {
                 listadoVentas.ajax.reload();
                 cargaPantallaPrincipal();
             },
             error: function() {
                 alert("Problema modificando");
             }
         });
     }

     // ***************************
     // FIN CICLO EDITAR REGISTRO
     //****************************


     //------------------------
     // CICLO BORRAR REGISTRO
     //------------------------
     $('#tblVentas tbody').on('click', 'button.btnDel', function() {
         //ACCIONA BOTON BORRAR REGISTRO DEL DATATABLES
         if (confirm("¿Confirma la Eliminación?")) {
             let registro = listadoVentas.row($(this).parents('tr')).data();
             borrarRegistro(registro.venta_id);
         }
     });


     function borrarRegistro(venta_id) {
         // BORRA REGISTRO Y ACTUALIZA DATATABLES
         $.ajax({
             type: 'GET',
             url: 'venta_data.php?accion=borrar_venta&venta_id=' + venta_id,
             data: '',
             success: function(msg) {
                 listadoVentas.ajax.reload();
                 cargaPantallaPrincipal();

             },
             error: function() {
                 alert("Problema en borrarRegistro");
             }
         });
     }

     // ***************************
     // FIN CICLO BORRAR REGISTRO
     // ***************************


     //------------------------
     // OPERACIONES EN EL MODAL
     //------------------------

     //CARGA EL SELECT VENDEDORES
     $(document).ready(function() {
         $.ajax({
             type: "POST",
             url: "getUser.php",
             success: function(response) {
                 $('.selectUser select').html(response).fadeIn();
             }
         });
     });

     //CALCULAR UTILIDAD EN EL MODAL
     $('#npt-venta_valor_venta').focusout(function calculoUtilidad() {
         let costo = $('#npt-venta_costo_producto').val();
         let valor_venta = $('#npt-venta_valor_venta').val();
         let utilidad = parseFloat(valor_venta.replace(/\$|\./g, "")) - parseFloat(costo.replace(/\$|\./g, ""));
         $('#npt-venta_utilidad').val(utilidad);

     });

     // CAMBIAR AL FORMATO MONEDA
     $('#input.nombre').on('blur', function() {
         const value = this.value.replace(/\,/g, '');
         this.value = parseFloat(value).toLocaleString('es-CO', {
             style: 'currency',
             currency: 'COP',
             maximumFractionDigits: 0,
             minimumFractionDigits: 0
         });
     });

     $('input.precioCliente').on('blur', function() {
         const value = this.value.replace(/\,/g, '');
         this.value = parseFloat(value).toLocaleString('es-CO', {
             style: 'currency',
             currency: 'COP',
             maximumFractionDigits: 0,
             minimumFractionDigits: 0
         });
     });

     $('input.utilidad').on('change', function() {
         const value = this.value.replace(/\,/g, '');
         this.value = parseFloat(value).toLocaleString('es-CO', {
             style: 'currency',
             currency: 'COP',
             maximumFractionDigits: 0,
             minimumFractionDigits: 0
         });
     });

     //*************************
     // FIN OPERACIONES EN EL MODAL
     //*************************
 });