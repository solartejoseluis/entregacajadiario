document.addEventListener("DOMContentLoaded", function () {
  var turno_id = "";
  var user_id = "";

  $(document).ready(function () {
    ejecutarDatatables();
  });

  function ejecutarDatatables() {
    var listadoVentas = $("#tblVentas").DataTable({
      ajax: {
        url: "users_home_mdl.php?accion=listar_usuarios",
        dataSrc: "",
        data: { turno_id: turno_id },
      },
      columns: [
        { data: "user_id" },
        { data: "user_nombre" },
        { data: "user_apellido" },
        { data: "user_user" },
        { data: "user_password" },
        { data: "user_perfil" }, //nombre vendedor
        { data: "user_vendedor" },
        { data: null, orderable: false },
        { data: null, orderable: false },
      ],
      columnDefs: [
        {
          targets: 7,
          defaultContent:
            "<button class='btn btn-primary btn-sm btnEdit' id='btn_edit'>/<i class='fa-solid fa-pen'></i></button>",
          data: null,
        },

        {
          targets: 8,
          defaultContent:
            "<button  class='btn btn-danger btn-sm btnDel'>X<i class='fa fa-trash-o fa-lg'></i></button>",
          data: null,
        },
      ],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },
      paging: false,
    });
    // FIN DATATABLES

    //boton Editar
    $("#tblVentas tbody").on("click", "button.btnEdit", function () {
      let registroEdit = listadoVentas.row($(this).parents("tr")).data();
      recuperarRegistro(registroEdit.venta_id);
    });

    //boton borrar
    $("#tblVentas tbody").on("click", "button.btnDel", function () {
      //ACCIONA BOTON BORRAR REGISTRO DEL DATATABLES
      if (confirm("¿Confirma la Eliminación?")) {
        let registro = listadoVentas.row($(this).parents("tr")).data();
        borrarRegistro(registro.venta_id);
      }
    });
  }

  //-----------------------------
  //Ciclo Agregar Nuevo Usuario
  //-----------------------------
  $("#btn_add").click(function () {
    limpiarFormulario();
    $("#mdl_ventas").modal("show");
  });

  function limpiarFormulario() {
    $("#npt-venta_id").val("");
    $("#npt_venta_nombre_producto").val("");
    $("#npt_venta_nombre_proveedor").val("");
    $("#npt_venta_costo_producto").val("");
    $("#npt_venta_valor_venta").val("");
    $("#npt-user_id").val("");
    $("#slct_user").val("0");
    $("#npt_venta_utilidad").val("");
  }

  $("#btn_confirm_add").click(function () {
    //VALIDACION DE DATOS DEL MODAL NUEVO
    let valida_nombre_producto = $("#npt_venta_nombre_producto").val();
    let valida_nombre_proveedor = $("#npt_venta_nombre_proveedor").val();
    let valida_venta_costo_producto = $("#npt_venta_costo_producto").val();
    let valida_venta_valor_venta = $("#npt_venta_valor_venta").val();
    let valida_user_id = $("#npt-user_id").val();
    let valida_venta_utilidad = $("#npt_venta_utilidad").val();
    // compara datos de variables contra vacio y muestra un alert
    if (valida_nombre_producto.trim() == "") {
      alert("revisar nombre producto.");
      $("#npt_venta_nombre_producto").focus();
      return false;
    } else if (valida_nombre_proveedor.trim() == "") {
      alert("Revisar nombre proveedor");
      $("#npt_venta_nombre_proveedor").focus();
      return false;
    } else if (valida_venta_costo_producto.trim() == "") {
      alert("revisar costo");
      $("#npt_venta_costo_producto").focus();
      return false;
    } else if (valida_venta_valor_venta.trim() == "") {
      alert("Revisar valor venta");
      $("#npt_venta_valor_venta").focus();
      return false;
    } else if (valida_user_id.trim() == "0") {
      alert("elija vendedor");
      $("#slct_user").focus();
      return false;
    } else if (valida_venta_utilidad.trim() == "") {
      alert("Revisar utilidad");
      $("#npt_venta_utilidad").focus();
      return false; // fin validacion formulario nuevo
    } else {
      //ejecutar Si todo fue validado
      $("#mdl_ventas").modal("hide");
      let registro = recolectarDatosFormularioNuevo();
      guardarRegistro(registro);
      cargaPantallaPrincipal();
    }
  });

  //TOMA EL VALOR DEL SELECT Y PONERLO EN INPUT
  $("#slct_user").change(function () {
    $("#npt-user_id").val($(this).val());
  });

  function recolectarDatosFormularioNuevo() {
    let registro = {
      venta_id: $("#npt-venta_id").val(),
      venta_nombre_producto: $("#npt_venta_nombre_producto").val(),
      venta_nombre_proveedor: $("#npt_venta_nombre_proveedor").val(),
      venta_costo_producto: $("#npt_venta_costo_producto").val(),
      venta_valor_venta: $("#npt_venta_valor_venta").val(),
      user_nombre: $("#npt-user_nombre").val(),
      user_id: $("#npt-user_id").val(),
      venta_utilidad: $("#npt_venta_utilidad").val(),
      turno_id_actual: $("#npt_turno_id_actual").val(),
    };
    return registro;
  }

  function guardarRegistro(registro) {
    $.ajax({
      type: "POST",
      url: "venta_home_mdl.php?accion=guardar_venta",
      data: registro,
      success: function (msg) {
        // listadoVentas.ajax.reload();
        $("#tblVentas").DataTable().ajax.reload();
        cargaPantallaPrincipal();
      },
      error: function () {
        alert("problema en: guardarRegistro");
      },
    });
  }
  // FIN CICLO AGREGAR NUEVA VENTA


  //----------------------------------
  //CICLO EDITAR REGISTRO
//----------------------------------
  function recuperarRegistro(venta_id) {
    $.ajax({
      type: "GET",
      url:
        "venta_home_mdl.php?accion=consultar_venta&venta_id=" +
        venta_id,
      data: "",
      success: function (datos) {
        $("#nptEdit-venta_id").val(datos[0].venta_id);
        $("#nptEdit_venta_nombre_producto").val(datos[0].venta_nombre_producto);
        $("#nptEdit_venta_nombre_proveedor").val(
          datos[0].venta_nombre_proveedor
        );
        $("#nptEdit_venta_costo_producto").val(datos[0].venta_costo_producto);
        $("#nptEdit_venta_valor_venta").val(datos[0].venta_valor_venta);
        $("#nptEdit_user_nombre").val(datos[0].user_nombre);
        $("#nptEdit-user_id").val(datos[0].user_id);

        $("#slctEdit-user").val(datos[0].user_id);

        $("#nptEdit_venta_utilidad").val(datos[0].venta_utilidad);
        $("#mdl_edit_ventas").modal("show");
      },
      error: function () {
        alert("Problema en recuperarRegistro");
      },
    });
  }

  //TOMA EL VALOR DEL SELECT Y PONERLO EN INPUT
  $("#slctEdit-user").change(function () {
    $("#nptEdit-user_id").val($(this).val());
  });

  $("#btn_confirm_edit").click(function () {
    //GUARDA LOS DATOS MODIFICADOS
    $("#mdl_edit_ventas").modal("hide");
    let registro = recolectarDatosFormularioEdit();
    modificarRegistro(registro);
  });

  function recolectarDatosFormularioEdit() {
    let registro = {
      venta_id: $("#nptEdit-venta_id").val(),
      venta_nombre_producto: $("#nptEdit_venta_nombre_producto").val(),
      venta_nombre_proveedor: $("#nptEdit_venta_nombre_proveedor").val(),
      venta_costo_producto: $("#nptEdit_venta_costo_producto").val(),
      venta_valor_venta: $("#nptEdit_venta_valor_venta").val(),
      user_nombre: $("#nptEdit_user_nombre").val(),
      user_id: $("#nptEdit-user_id").val(),
      venta_utilidad: $("#nptEdit_venta_utilidad").val(),
    };
    return registro;
  }

  function modificarRegistro(registro) {
    $.ajax({
      type: "POST",
      url:
        "venta_home_mdl.php?accion=modificar_venta&venta_id=" +
        registro.venta_id,
      data: registro,
      success: function (msg) {
        // listadoVentas.ajax.reload();
        $("#tblVentas").DataTable().ajax.reload();
        cargaPantallaPrincipal();
      },
      error: function () {
        alert("Problema modificando");
      },
    });
  }
  // FIN CICLO EDITAR REGISTRO

  // CICLO BORRAR REGISTRO
  function borrarRegistro(venta_id) {
    // BORRA REGISTRO Y ACTUALIZA DATATABLES
    $.ajax({
      type: "GET",
      url:
        "venta_home_mdl.php?accion=borrar_venta&venta_id=" + venta_id,
      data: "",
      success: function (msg) {
        // listadoVentas.ajax.reload();
        $("#tblVentas").DataTable().ajax.reload();
        cargaPantallaPrincipal();
      },
      error: function () {
        alert("Problema en borrarRegistro");
      },
    });
  }
  // FIN CICLO BORRAR REGISTRO



  //------------------------
  // OPERACIONES EN EL MODAL
  //------------------------

  //CARGA EL SELECT VENDEDORES
  $(document).ready(function () {
    $.ajax({
      type: "POST",
      url: "../00_selects/getVendedor.php",
      success: function (response) {
        $(".selectUser select").html(response).fadeIn();
      },
    });
  });

}); // cierre del addEventListener del inicio de pagina
