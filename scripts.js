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
        { "data": "user_id" }, //nombre vendedor
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
    //coloca el valor seleccionado en el select
    $('#slct-prueba1').on('select2:select', function(e) {
        var data = e.params.data;
        console.log(data);
      }),
      //  FIN CARGA Y CONSULTA SELECT2


      //Contenido del Select Barrio
      $(document).ready(function() {
        $.ajax({
          type: "POST",
          url: "getBarrio.php",
          success: function(response) {
            $('.selectBarrio select').html(response).fadeIn();
          }
        });
      });


    //Contenido del Select Usuarios
    $(document).ready(function() {
      $.ajax({
        type: "POST",
        url: "getUser.php",
        success: function(response) {
          $('.selectUser select').html(response).fadeIn();
        }
      });
    });
    // Contenido del Select Transportador
    $(document).ready(function() {
      $.ajax({
        type: "POST",
        url: "getTransportador.php",
        success: function(response) {
          $('.selectTransportador select').html(response).fadeIn();
        }
      });
    });
    //tomar el valor del select y ponerlo en input
    $("#slct-barrio").change(function() {
      $('#npt-barrio_id').val($(this).val());
    });
    $("#slct-trans").change(function() {
      $('#npt-trans_id').val($(this).val());
    });
    $("#slct-user").change(function() {
      $('#npt-user_id').val($(this).val());
    });
    // EVENTOS DE BOTONES
    $('#btn-Add').click(function() {
      $('#btnConfirmAdd').show();
      //$('#btnConfirmEdit').hide();
      limpiarFormulario();
      $("#mdlVentas").modal('show');
    });

    //MOSTRAR LA FECHA ACTUAL EN EL INPUT
    $('#horaActual').click(function() {
      let hour = actualDate();
      $('#npt-domi_hora_salida').val(hour);
    });


    $('#btnConfirmAdd').click(function() {
      //validar formulario emergente y enviarlo
      let valida_nombre_producto = $('#npt-venta_nombre_producto').val();
      let valida_nombre_proveedor = $('#npt-venta_nombre_proveedor').val();
      let valida_venta_costo_producto = $('#npt-venta_costo_producto').val();
      let valida_venta_valor_venta = $('#npt-venta_valor_venta').val();
      let valida_user_id = $('#npt-user_id').val();
      let valida_venta_utilidad = $('#npt-venta_utilidad').val();
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
      } else if (valida_user_id.trim() == '') {
        alert('elija vendedor');
        $('#slct-user').focus();
        return false;
      } else if (valida_venta_utilidad.trim() == '') {
        alert('Revisar utilidad');
        $('#npt-venta_utilidad').focus();
        return false;
      } else {
        //ejecutar con todo validado
        $("#mdlVentas").modal('hide');
        let registro = recuperarDatosFormulario();
        agregarRegistro(registro);
        //alert("ok Validado");
      }
    });
    // FIN VALIDACION DE FORMULARIO

    $('#btnConfirmEdit').click(function() {
      $("#mdlVentas").modal('hide');
      let registro = recuperarDatosFormulario();
      modificarRegistro(registro);
    });

    $('#tblVentas tbody').on('click', 'button.btnEdit', function() {
      //$('#btnConfirmEdit').show();
      let registro = listadoVentas.row($(this).parents('tr')).data();
      recuperarRegistro(registro.domi_id);
    });

    $('#tblVentas tbody').on('click', 'button.btnDel', function() {
      if (confirm("¿Confirma la Eliminación?")) {
        let registro = listadoVentas.row($(this).parents('tr')).data();
        borrarRegistro(registro.domi_id);
      }
    });
    // INTERACTUAR CON EL FORMULARIO MODAL

    function limpiarFormulario() {
      $('#npt-venta_id').val('');
      $('#npt-venta_nombre_producto').val('');
      $('#npt-venta_nombre_proveedor').val('');
      $('#npt-venta_costo_producto').val('');
      $('#npt-venta_valor_venta').val('');
      $('#npt-user_nombre').val('');
      $('#slct-user').val('0');
      $('#npt-venta_utilidad').val('');
    }

    function recuperarDatosFormulario() {
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
    function agregarRegistro(registro) {
      $.ajax({
        type: 'POST',
        url: 'venta_data.php?accion=agregar_venta',
        data: registro,
        success: function(msg) {
          listadoVentas.ajax.reload();
        },
        error: function() {
          alert("problema en: agregarRegistro");
        }
      });
    }

    function borrarRegistro(domi_id) {
      $.ajax({
        type: 'GET',
        url: 'venta_data.php?accion=borrar_domicilio&domi_id=' + domi_id,
        data: '',
        success: function(msg) {
          listadoVentas.ajax.reload();
        },
        error: function() {
          alert("Problema Borrando");
        }
      });
    }

    function recuperarRegistro(domi_id) {
      $.ajax({
        type: 'GET',
        url: 'venta_data.php?accion=consultar_domicilio&domi_id=' + domi_id,
        data: '',
        success: function(datos) {
          $('#nptEdit-domi_id').val(datos[0].domi_id);
          $('#nptEdit-barrio_nombre').val(datos[0].barrio_nombre);
          $('#nptEdit-trans_nombre').val(datos[0].trans_nombre);
          $('#nptEdit-domi_valor').val(datos[0].domi_valor);
          $('#nptEdit-domi_hora_salida').val(datos[0].domi_hora_salida);
          $('#nptEdit-user_nombre').val(datos[0].user_nombre);
          $('#nptEdit-domi_observacion').val(datos[0].domi_observacion);
          $("#mdlEditDomicilios").modal('show');
        },
        error: function() {
          alert("Problema recuperando");
        }
      });
    }

    function modificarRegistro(registro) {
      $.ajax({
        type: 'POST',
        url: 'venta_data.php?accion=modificar_domicilio&domi_id=' + registro.domi_id,
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