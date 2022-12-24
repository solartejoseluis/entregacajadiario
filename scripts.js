  // INICIA DATATABLES
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
    });
    // FIN DATATABLES


    // CARGA Y CONSULTA DEL SELECT2

    $(document).ready(function() {
      $('#slct-prueba1').select2({
        languaje: "es",
        ajax: {
          type: 'GET',
          url: "getPrueba1.php",
          dataType: 'json',
          delay: 100,
          data: function(params) {
            return {
              //barrio_id: params.term,
              barrio_nombre: params.term
            }
          },
          processResults: function(data) {
            var results = [];
            $.each(data, function(index, item) {
              results.push({
                id: item.barrio_id,
                text: item.barrio_nombre
              })
            });
            return { results };
          },
          cache: true,
        },
        placeholder: 'Buscar un Barrio',
        minimumInputLength: 2
      });
    });
    //COLOCA EL VALOR SELECCIONADO EN EL SELECT
    $('#slct-prueba1').on('select2:select', function(e) {
        var data = e.params.data;
        console.log(data);
      }),
      //  FIN CARGA Y CONSULTA SELECT2


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

    //TOMA EL VALOR DEL SELECT Y PONERLO EN INPUT
    $("#slct-user").change(function() {
      $('#npt-user_id').val($(this).val());
    });
    // EVENTOS DE BOTONES
    $('#btn-Add').click(function() {
      $('#btnConfirmAdd').show();
      $('#btnConfirmEdit').hide();
      limpiarFormulario();
      $("#mdlVentas").modal('show');
    });

    //MOSTRAR LA FECHA ACTUAL EN EL INPUT
    $('#horaActual').click(function() {
      let hour = actualDate();
      $('#npt-domi_hora_salida').val(hour);
    });


    $('#btnConfirmAdd').click(function() {
      // REALIZA GUARDAR NUEVO REGISTRO

      //VALIDACION DE DATOS DEL MODAL NUEVO
      //pasa el valor de campo del formulario a variable
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
        return false;
      } else {
        //ejecutar Si todo fue validado
        $("#mdlVentas").modal('hide');
        let registro = recolectarDatosFormulario();
        guardarRegistro(registro);
        //alert("ok Validado");
      }
    });
    // FIN VALIDACION DE FORMULARIO

    $('#btnConfirmEdit').click(function() {
      //GUARDA LOS DATOS MODIFICADOS
      $("#mdlVentas").modal('hide');
      let registro = recolectarDatosFormulario();
      modificarRegistro(registro);
    });



    $('#tblVentas tbody').on('click', 'button.btnEdit', function() {
    //ACCIONA BOTON EDITAR REGISTRO DEL DATATABLES
      //$('#btnConfirmEdit').show();
      let registro = listadoVentas.row($(this).parents('tr')).data();
      recuperarRegistro(registro.venta_id);
    });

    $('#tblVentas tbody').on('click', 'button.btnDel', function() {
      //ACCIONA BOTON BORRAR REGISTRO DEL DATATABLES
      if (confirm("¿Confirma la Eliminación?")) {
        let registro = listadoVentas.row($(this).parents('tr')).data();
        borrarRegistro(registro.venta_id);
      }
    });

    // INTERACCIONES CON EL FORMULARIO MODAL

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

    function recolectarDatosFormulario() {
    // RECOLECTA DATOS DEL FRM Y CREA OBJETO registro
    // DESTINO DE DATOS: GRABAR NUEVA VENTA / CARGAR FRM EDITAR
      let registro = {
        venta_id: $('#npt-venta_id').val(),
        venta_nombre_producto: $('#npt-venta_nombre_producto').val(),
        venta_nombre_proveedor: $('#npt-venta_nombre_proveedor').val(),
        venta_costo_producto: $('#npt-venta_costo_producto').val(),
        venta_valor_venta: $('#npt-venta_valor_venta').val(),
        user_id: $('#npt-user_id').val(),
        venta_utilidad: $('#npt-venta_utilidad').val(),
      };
      return registro;
    }


    // MUESTRA LA HORA ACTUAL
    function actualDate() {
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      return time;
    };

    // COMUNICARSE CON EL SERVIDOR VIA AJAX

    function guardarRegistro(registro) {
      // GUARDA REGISTRO Y ACTUALIZA DATATABLES
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

    function borrarRegistro(domi_id) {
      // BORRA REGISTRO Y ACTUALIZA DATATABLES
      $.ajax({
        type: 'GET',
        url: 'venta_data.php?accion=borrar_venta&venta_id=' + venta_id,
        data: '',
        success: function(msg) {
          listadoVentas.ajax.reload();
        },
        error: function() {
          alert("Problema en borrarRegistro");
        }
      });
    }

    function recuperarRegistro(domi_id) {
    // EJECUTA CONSULTA CON venta_id Y CARGA FRM EDICION
      $.ajax({
        type: 'GET',
        url: 'venta_data.php?accion=consultar_venta&venta_id=' + venta_id,
        data: '',
        success: function(datos) {
        $('#npt-venta_id').val(datos[0].venta_id);
        $('#npt-venta_nombre_producto').val(datos[0].venta_nombre_producto);
        $('#npt-venta_nombre_proveedor').val(datos[0].venta_nombre_proveedor);
        $('#npt-venta_costo_producto').val(datos[0].venta_costo_producto);
        $('#npt-venta_valor_venta').val(datos[0].venta_valor_venta);
        $('#npt-user_id').val(datos[0].user_id);
        $('#npt-venta_utilidad').val(datos[0].venta_utilidad);
        $("#mdlEditVentas").modal('show');
        },
        error: function() {
          alert("Problema en recuperarRegistro");
        }
      });
    }

    function modificarRegistro(registro) {
      $.ajax({
        type: 'POST',
        url: 'venta_data.php?accion=modificar_venta&venta_id=' + registro.venta_id,
        data: registro,
        success: function(msg) {
          listadoVentas.ajax.reload();
        },
        error: function() {
          alert("Problema modificando");
        }
      });
    }

  });