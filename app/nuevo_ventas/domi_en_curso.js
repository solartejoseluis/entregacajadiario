  // carga tabla domicilio interno en curso
  function datatablesDomiEnCurso() {
    let listadoDomiInternoEncurso = $("#tbl_domi_en_curso").DataTable({
      ajax: {
        url: "venta_home_mdl.php?accion=listar_domi_en_curso",
        dataSrc: "",
        data: "",
      },
      columns: [
        { data: "barrio_nombre" },
        { data: "user_nombre" },
        { data: "domi_externo_nombre" },
        { data: "valor_venta" },
        { data: "hora_salida" },
        { data: "inyectologia" },
        { data: null, orderable: false },
      ],
      columnDefs: [
        {
          targets: 6,
          defaultContent:
            "<button class='btn btn-primary btn-sm btnVerDomiInterno' id='btn_ver_domi_interno'><i class='fa-solid fa-pen'></i></button>",
          data: null,
        },
      ],
      order: [[4, "asc"]],
      info: false,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },
      searching: false,
      paging: false,
      destroy: true,
    });
  }

  // FIN DATATABLES

  //boton Editar
  $("#tblVentas tbody").on("click", "button.btnEdit", function () {
    let registroEdit = listadoDomiInterno.row($(this).parents("tr")).data();
    recuperarRegistro(registroEdit.venta_id);
  });

  //boton borrar
  $("#tblVentas tbody").on("click", "button.btnDel", function () {
    //ACCIONA BOTON BORRAR REGISTRO DEL DATATABLES
    if (confirm("¿Confirma la Eliminación?")) {
      let registro = listadoDomiInterno.row($(this).parents("tr")).data();
      borrarRegistro(registro.venta_id);
    }
  });

