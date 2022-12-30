

     // CARGA LA FECHA ACTUAL
     $(document).ready(function() {
         let hoy = actualDate();
         document.getElementById('hoy').innerHTML = hoy;
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

