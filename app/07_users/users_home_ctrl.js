document.addEventListener("DOMContentLoaded", function () {
  //var turno_id = "";
  //var user_id = "";

  $(document).ready(function () {
    ejecutarDatatables();
  });

  function ejecutarDatatables() {
    var listadoUsers = $("#tblUsers").DataTable({
      ajax: {
        url: "users_home_mdl.php?accion=listar_usuarios",
        dataSrc: "",
        data:"",
      },
      columns: [
        { data: "user_id" },
        { data: "user_nombre" },
        { data: "user_apellido" },
        { data: "user_user" },
        { data: "user_password" },
        { data: "perfil_nombre" }, //nombre vendedor
        { data: "rol_vendedor_descripcion"},
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
    // Final Datatables Principal

    //boton Editar
    $("#tblUsers tbody").on("click", "button.btnEdit", function () {
      let registroEdit = listadoUsers.row($(this).parents("tr")).data();
      recuperarRegistro(registroEdit.user_id);
    });

    //boton borrar
    $("#tblUsers tbody").on("click", "button.btnDel", function () {
      if (confirm("¿Confirma la Eliminación?")) {
        let registro = listadoUsers.row($(this).parents("tr")).data();
        borrarRegistro(registro.user_id);
      }
    });
  }

  //-----------------------------
  //Ciclo Agregar Nuevo Usuario
  //-----------------------------
  $("#btn_add").click(function () {
    limpiarFormulario();
    $("#mdl_nuevo_usuario").modal("show");
  });

  function limpiarFormulario() {
    $("#npt_user_id").val("");
    $("#npt_user_nombre").val("");
    $("#npt_user_apellido").val("");
    $("#npt_user_user").val("");
    $("#npt_user_password").val("");
    $("#slct_perfil").val("0");
    $("#npt_perfil_id").val("");
    $("#slct_rol_vendedor").val("0");
    $("#npt_rol_vendedor_id").val("");
  }

  $("#btn_agrega").click(function () {
    //VALIDACION DE DATOS DEL MODAL NUEVO
    let valida_user_nombre = $("#npt_user_nombre").val();
    let valida_user_apellido = $("#npt_user_apellido").val();
    let valida_user_user = $("#npt_user_user").val();
    let valida_user_password = $("#npt_user_password").val();
    let valida_perfil_id = $("#npt_perfil_id").val();
    let valida_rol_vendedor_id = $("#npt_rol_vendedor_id").val();
    // compara datos de variables contra vacio y muestra un alert
    if (valida_user_nombre.trim() == "") {
      alert("revisa nombre de usuario");
      $("#npt_user_nombre").focus();
      return false;
    } else if (valida_user_apellido.trim() == "") {
      alert("Revisa apellido");
      $("#npt_user_apellido").focus();
      return false;
    } else if (valida_user_user.trim() == "") {
      alert("revisa usuario");
      $("#npt_user_user").focus();
      return false;
    } else if (valida_user_password.trim() == "") {
      alert("Revisa password");
      $("#npt_user_password").focus();
      return false;
    } else if (valida_perfil_id.trim() == "") {
      alert("elija Un Perfil");
      $("#slct_perfil").focus();
      return false;
    } else if (valida_rol_vendedor_id.trim() == "") {
      alert("Elija Rol Vendedor");
      $("#slct_rol_vendedor").focus();
      return false;
    } else {
      //ejecutar Si todo fue validado
      $("#mdl_nuevo_usuario").modal("hide");
      let registro = recolectarDatosFormularioNuevo();
      guardarRegistro(registro);
    } 
  });

  //TOMA EL VALOR DEL SELECT Y PONERLO EN INPUT
  $("#slct_perfil").change(function () {
    $("#npt_perfil_id").val($(this).val());
  });

  $("#slct_rol_vendedor").change(function () {
    $("#npt_rol_vendedor_id").val($(this).val());
  });

  function recolectarDatosFormularioNuevo() {
    let registro = {
      user_nombre: $("#npt_user_nombre").val(),
      user_apellido: $("#npt_user_apellido").val(),
      user_user: $("#npt_user_user").val(),
      user_password: $("#npt_user_password").val(),
      user_perfil: $("#npt_perfil_id").val(),
      user_vendedor: $("#npt_rol_vendedor_id").val()
    };
    return registro;
  }

  function guardarRegistro(registro) {
    $.ajax({
      type: "POST",
      url: "users_home_mdl.php?accion=guardar_nuevo_usuario",
      data: registro,
      success: function (msg) {
        $("#tblUsers").DataTable().ajax.reload();
      },
      error: function () {
        alert("problema en: guardarRegistro");
      },
    });
  }
  // Fin Ciclo Agregar Nuevo Usuario.


  //----------------------------------
  //CICLO EDITAR REGISTRO
//----------------------------------
  function recuperarRegistro(user_id) {
    $.ajax({
      type: "GET",
      url:
        "users_home_mdl.php?accion=consultar_usuario&user_id=" +
        user_id,
      data: "",
      success: function (datos) {
        $("#npt_edit_user_id").val(datos[0].user_id);
        $("#npt_edit_user_nombre").val(datos[0].user_nombre);
        $("#npt_edit_user_apellido").val(datos[0].user_apellido);
        $("#npt_edit_user_user").val(datos[0].user_user);
        $("#npt_edit_user_password").val(datos[0].user_password);
        $("#npt_edit_user_perfil").val(datos[0].perfil_id);
        $("#npt_edit_user_vendedor").val(datos[0].rol_vendedor_id);
        $("#slct_edit_perfil").val(datos[0].perfil_id);
        $("#slct_edit_rol_vendedor").val(datos[0].rol_vendedor_id);
         // mostrar el modal
        $("#mdl_edit_usuario").modal("show");
      },
      error: function () {
        alert("Problema en recuperarRegistro");
      },
    });
  }

  //TOMA EL VALOR DEL SELECT Y PONERLO EN INPUT
  $("#slct_edit_user_perfil").change(function () {
    $("#npt_edit_user_perfil").val($(this).val());
  });
  $("#slct_edit_rol_vendedor").change(function () {
    $("#npt_edit_rol_vendedor").val($(this).val());
  });

  $("#btn_confirm_edit").click(function () {
    $("#mdl_edit_usuario").modal("hide");
    let registro = recolectarDatosFormularioEdit();
    modificarRegistro(registro);
  });

  function recolectarDatosFormularioEdit() {
    let registro = {
      user_id: $("#npt_edit_user_id").val(),
      user_nombre: $("#npt_edit_user_nombre").val(),
      user_apellido: $("#npt_edit_user_apellido").val(),
      user_user: $("#npt_edit_user_user").val(),
      user_password: $("#npt_edit_user_password").val(),
      perfil_id: $("#npt_edit_user_perfil").val(),
      rol_vendedor_id: $("#npt_edit_rol_vendedor").val(),
    };
    return registro;
  }

  function modificarRegistro(registro) {
    $.ajax({
      type: "POST",
      url:
        "users_home_mdl.php?accion=modificar_usuario&user_id=" +
        registro.user_id,
      data: registro,
      success: function (msg) {
        $("#tblUsers").DataTable().ajax.reload();
      },
      error: function () {
        alert("Problema modificando");
      },
    });
  }
  // Fin ciclo editar usuario

  // CICLO BORRAR REGISTRO
  function borrarRegistro(user_id) {
    $.ajax({
      type: "GET",
      url:
        "users_home_mdl.php?accion=borrar_usuario&user_id=" + user_id,
      data: "",
      success: function (msg) {
        $("#tblUsers").DataTable().ajax.reload();
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

  //CARGA EL SELECT PERFILES
  $(document).ready(function () {
    $.ajax({
      type: "POST",
      url: "../00_selects/getPerfil.php",
      success: function (response) {
        $(".selectPerfil select").html(response).fadeIn();
      },
    });
  });

  //CARGA EL SELECT ROL_VENDEDOR
  $(document).ready(function () {
    $.ajax({
      type: "POST",
      url: "../00_selects/getRolVendedor.php",
      success: function (response) {
        $(".selectRolVendedor select").html(response).fadeIn();
      },
    });
  });

}); // cierre del addEventListener del inicio de pagina
