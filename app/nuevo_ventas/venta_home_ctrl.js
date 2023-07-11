document.addEventListener("DOMContentLoaded", function () {
  datatablesDomiInternoPorSalir();
  datatablesDomiInternoEnCurso();

  var turno_id = "";
  var user_id = "";

  function cargarAcceso() {
    $.ajax({
      type: "POST",
      async: false, // hacer que sea asincronico para sarle tiempo a ajax para cargar variable
      url: "venta_home_mdl.php?accion=consultar_acceso",
      data: "",
      success: function (datos) {
        $("#npt_turno_id_actual").val(datos[0].turno_id);
        $("#npt_user_id_actual").val(datos[0].user_id);
        //He tomado el valor del input
        turno_id = $("#npt_turno_id_actual").val();
        user_id = $("#npt_user_id_actual").val();
      },
      error: function () {
        alert("Problema en cargar acceso");
      },
    });
  }

  // carga tabla domicilio interno por salir
  function datatablesDomiInternoPorSalir() {
    let listadoDomiInternoPorSalir = $("#tbl_domi_interno_por_salir").DataTable(
      {
        ajax: {
          url: "venta_home_mdl.php?accion=listar_domi_interno_por_salir",
          dataSrc: "",
          data: "",
        },
        columns: [
          { data: "barrio_nombre" },
          { data: "user_nombre" },
          { data: "valor_venta" },
          { data: "hora_salida" },
          { data: "hora_llegada" },
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
        // order: [[3, "desc"]],
        language: {
          url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
        },
        searching: false,
        paging: false,
        destroy: true,
      }
    );
  }

  // carga tabla domicilio interno en curso
  function datatablesDomiInternoEnCurso() {
    let listadoDomiInternoEncurso = $("#tbl_domi_interno_en_curso").DataTable({
      ajax: {
        url: "venta_home_mdl.php?accion=listar_domi_interno_en_curso",
        dataSrc: "",
        data: "",
      },
      columns: [
        { data: "barrio_nombre" },
        { data: "user_nombre" },
        { data: "valor_venta" },
        { data: "hora_salida" },
        { data: "hora_llegada" },
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
      order: [[3, "desc"]],
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

  //-----------------------------
  //CICLO AGREGAR GESTION
  //-----------------------------
  $("#menu_nueva_gestion, #btn_nueva_gestion").click(function () {
    limpiarModalGestiones();
    $("#mdl_ventas").modal("show");
  });

  function limpiarModalGestiones() {
    $(
      "#npt_venta_nombre_producto, #npt_venta_id, #npt_venta_nombre_producto, #npt_venta_nombre_proveedor, #npt_venta_costo_producto,#npt_venta_valor_venta,#npt_venta_utilidad"
    ).css("background-color", "");

    $("#npt_venta_id").val("");
    $("#npt_venta_nombre_producto").val("");
    $("#npt_venta_nombre_proveedor").val("");
    $("#npt_venta_costo_producto").val("");
    $("#npt_venta_costo_producto_base").val("");
    $("#npt_venta_valor_venta").val("");
    $("#npt_venta_valor_venta_base").val("");
    $("#npt_venta_utilidad").val("");
    $("#npt_venta_utilidad_base").val("");
    $("#slct_vendedor").val("0");
    $("#npt_vendedor_id").val("");
    $("#npt_turno_id_actual").val("300");
  }

  // validaciones al digitar
  $("#npt_venta_nombre_producto").keyup(function () {
    $("#npt_venta_nombre_producto").css("background-color", "#dbe5f0");
    $("#npt_venta_nombre_producto").val($(this).val().toUpperCase());
  });

  $("#npt_venta_nombre_proveedor").keyup(function () {
    $("#npt_venta_nombre_proveedor").css("background-color", "#dbe5f0");
    $("#npt_venta_nombre_proveedor").val($(this).val().toUpperCase());
  });

  $("#npt_venta_costo_producto").on("blur", function () {
    $("#npt_venta_costo_producto").css("background-color", "#dbe5f0");
    const value = this.value.replace(/\$|\./g, "");
    var valor_base01 = this.value;
    //conversion del valor al formato moneda con parseFloat
    this.value = parseFloat(value).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
    $("#npt_venta_costo_producto_base").val(valor_base01);
  });

  // validacion en el input valor venta

  $("#npt_venta_valor_venta").on("blur", function () {
    $("#npt_venta_valor_venta").css("background-color", "#dbe5f0");
    const value = this.value.replace(/\$|\./g, "");
    var valor_base02 = this.value;
    //conversion del valor al formato moneda con parseFloat
    this.value = parseFloat(value).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
    // cargar en un input oculto el valor de value
    $("#npt_venta_valor_venta_base").val(valor_base02);

    // calculo de la utilidad
    let costo = $("#npt_venta_costo_producto_base").val();
    let valor_venta = $("#npt_venta_valor_venta_base").val();
    let utilidad = parseFloat(valor_venta) - parseFloat(costo);
    $("#npt_venta_utilidad_base").val(utilidad);
    let utilidad_formato = utilidad.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
    $("#npt_venta_utilidad").val(utilidad_formato);
    valor_base01 = 0;
    valor_base02 = 0;
  });

  // validacion solo deja ingresar numeros al input
  $(document).ready(function () {
    $("#npt_venta_costo_producto, #npt_venta_valor_venta").on(
      "input",
      function (evt) {
        $(this).val(
          $(this)
            .val()
            .replace(/[^0-9]/g, "")
        );
      }
    );
  });

  // fin operaciones en modal Nueva Gestión

  // confirma agregar gestion
  $("#btn_confirm_add").click(function () {
    //VALIDACION DE DATOS DEL MODAL NUEVO
    let valida_nombre_producto = $("#npt_venta_nombre_producto").val();
    let valida_nombre_proveedor = $("#npt_venta_nombre_proveedor").val();
    let valida_venta_costo_producto = $("#npt_venta_costo_producto_base").val();
    let valida_venta_valor_venta = $("#npt_venta_valor_venta_base").val();
    let valida_vendedor_id = $("#npt_vendedor_id").val();
    let valida_venta_utilidad = $("#npt_venta_utilidad_base").val();
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
    } else if (valida_vendedor_id.trim() == "") {
      alert("elija vendedor");
      $("#slct_vendedor").focus();
      return false;
    } else if (valida_venta_utilidad.trim() == "") {
      alert("Revisar utilidad");
      $("#npt_venta_utilidad").focus();
      return false; // fin validacion formulario nuevo
    } else {
      //ejecutar Si todo fue validado
      $("#mdl_ventas").modal("hide");
      let registro = recolectaDatosMdlNuevaGestion();
      guardarRegistro(registro);
      // cargaPantallaPrincipal();
    }
  });

  function recolectaDatosMdlNuevaGestion() {
    let registro = {
      venta_nombre_producto: $("#npt_venta_nombre_producto").val(),
      venta_nombre_proveedor: $("#npt_venta_nombre_proveedor").val(),
      venta_costo_producto: $("#npt_venta_costo_producto_base").val(),
      venta_valor_venta: $("#npt_venta_valor_venta_base").val(),
      venta_utilidad: $("#npt_venta_utilidad_base").val(),
      vendedor_id: $("#npt_vendedor_id").val(),
      turno_id_actual: $("#npt_turno_id_actual").val(),
    };
    return registro;
  }

  function guardarRegistro(registro) {
    $.ajax({
      type: "POST",
      url: "venta_home_mdl.php?accion=guardar_venta",
      data: registro,

      // success: function (msg) {
      //   // listadoVentas.ajax.reload();
      //   $("#tblVentas").DataTable().ajax.reload();
      //   cargaPantallaPrincipal();
      // },

      error: function () {
        alert("problema en: guardarRegistro");
      },
    });
  }

  // FIN CICLO AGREGAR NUEVA gestion

  //----------------------
  //CICLO EDITAR REGISTRO
  //----------------------
  function recuperarRegistro(venta_id) {
    $.ajax({
      type: "GET",
      url: "venta_home_mdl.php?accion=consultar_venta&venta_id=" + venta_id,
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

  // //TOMA EL VALOR DEL SELECT Y PONERLO EN INPUT
  // $("#slctEdit-user").change(function () {
  //   $("#nptEdit-user_id").val($(this).val());
  // });

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

  //----------------------
  // CICLO BORRAR REGISTRO
  //----------------------
  function borrarRegistro(venta_id) {
    // BORRA REGISTRO Y ACTUALIZA DATATABLES
    $.ajax({
      type: "GET",
      url: "venta_home_mdl.php?accion=borrar_venta&venta_id=" + venta_id,
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
  // fin ciclo borrar registro

  //-------------------------------
  //CICLO CERRAR TURNO
  //-------------------------------
  $("#menu_cerrar_turno").click(function () {
    limpiarDatosFormularioCerrar();
    $("#mdl_cerrar_turno").modal("show");
  });

  function limpiarDatosFormularioCerrar() {
    //$('#npt_turno_id').val('');
    $("#npt_turno_saldo_caja").val("");
    $("#npt_turno_total_utilidad").val("");
    $("#npt_turno_total_entrega").val("");
    $("#npt_turno_descuadre").val("");
  }

  //----------------------
  //CALCULO UTILIDAD
  //----------------------
  $("#npt_turno_saldo_caja").focusout(function () {
    $.ajax({
      type: "GET",
      url: "venta_home_mdl.php?accion=consultar_utilidad_turno",
      data: { turno_id: turno_id },
      success: function (datos) {
        let valorCero = 0;
        let totalUtilidad = 0;
        $("#npt_turno_total_utilidad").val(datos[0].utilidad_turno);
        if ($("#npt_turno_total_utilidad").val() === "") {
          alert("Aviso:la utilidad de este turno es CERO");
          $("#npt_turno_total_utilidad").val(valorCero);
          totalUtilidad = valorCero;
        } else {
          totalUtilidad = $("#npt_turno_total_utilidad").val();
        }
        let totalSaldo = $("#npt_turno_saldo_caja").val();
        //let entrega =
        //parseFloat(totalSaldo.replace(/\$|\./g, "")) +
        //parseFloat(totalUtilidad.replace(/\$|\./g, ""));
        let entrega = parseFloat(totalSaldo) + parseFloat(totalUtilidad);
        $("#npt_turno_total_entrega").val(entrega);
      },
      error: function () {
        alert("Problema en cargar datos utilidad turno");
      },
    });
  });

  $("#btn_confirma_cerrar_turno").click(function () {
    //VALIDACION DE DATOS DEL MODAL
    let valida_saldo_caja = $("#npt_turno_saldo_caja").val();
    let valida_descuadre = $("#npt_turno_descuadre").val();
    // compara datos de variables contra vacio y muestra un alert
    if (valida_saldo_caja.trim() == "") {
      alert("digite valor saldo.");
      $("#npt_turno_saldo_caja").focus();
      return false;
    } else if (valida_descuadre.trim() == "") {
      alert("Digite Valor De Descuadre");
      $("#npt_turno_descuadre").focus();
      return false;
    } else {
      let registro = recolectarDatosFormularioCerrar();
      guardarRegistroCerrar(registro);
      $("#mdl_cerrar_turno").modal("hide");
      comprobarCierreDelTurno();
      $("#mdl_cerrar_final").modal("show");
    }
  });

  function recolectarDatosFormularioCerrar() {
    let registro = {
      //turno_id_actual: $("#npt_turno_id_actual").val(),
      turno_saldo_caja: $("#npt_turno_saldo_caja").val(),
      turno_total_utilidad: $("#npt_turno_total_utilidad").val(),
      turno_total_entrega: $("#npt_turno_total_entrega").val(),
      turno_descuadre: $("#npt_turno_descuadre").val(),
    };
    return registro;
  }

  function guardarRegistroCerrar(registro) {
    $.ajax({
      type: "POST",
      url:
        "venta_home_mdl.php?accion=guardar_cierre_turno&turno_id=" + turno_id,
      data: registro,
      success: function (msg) {},
      error: function () {
        alert("problema en: guardar Cierre turno");
      },
    });
  }
  // FIN CICLO CERRAR TURNO

  //-------------------------------
  //CICLO FINALIZA CERRAR
  //-------------------------------
  $("#btn_final_turno").click(function () {
    $("#mdl_cerrar_final").modal("hide");
    alert("El Turno Ha sido Cerrado");
    $(location).attr("href", "../01_login/login_view.html");
  });

  function comprobarCierreDelTurno() {
    $.ajax({
      type: "GET",
      url: "venta_home_mdl.php?accion=consultar_turno_cerrado",
      data: { turno_id: turno_id },
      success: function (datos) {
        $("#npt_final_saldo_caja").val(datos[0].turno_saldo_caja);
        $("#npt_final_total_utilidad").val(datos[0].turno_total_utilidad);
        $("#npt_final_total_entrega").val(datos[0].turno_total_entrega);
        $("#npt_final_descuadre").val(datos[0].turno_descuadre);
      },
      error: function () {
        alert("problema en: guardar Cierre turno");
      },
    });
  }
  // FIN CICLO FINALIZAR CERRAR

  //CalculaUtilidad Modal EDITAR GESTION
  $("#nptEdit_venta_valor_venta").focusout(function () {
    let costo = $("#nptEdit_venta_costo_producto_base").val();
    let valor_venta = $("#nptEdit_venta_valor_venta").val();
    let utilidad =
      parseFloat(valor_venta.replace(/\$|\./g, "")) -
      parseFloat(costo.replace(/\$|\./g, ""));
    $("#nptEdit_venta_utilidad").val(utilidad);
  });

  $("#nptEdit_venta_costo_producto").focusout(function () {
    let costo = $("#nptEdit_venta_costo_producto").val();
    let valor_venta = $("#nptEdit_venta_valor_venta").val();
    let utilidad =
      parseFloat(valor_venta.replace(/\$|\./g, "")) -
      parseFloat(costo.replace(/\$|\./g, ""));
    $("#nptEdit_venta_utilidad").val(utilidad);
  });

  //-----------------------------
  //CICLO menu: mis gestiones / detalle de productos
  //-----------------------------
  $("#menu_gestiones_mes_vendedor").click(function () {
    // limpiarFormulario();
    // listadoVentas = "";
    $("#mdl_gestiones_mes_vendedor").modal("show");
    // $("#mdl_gestiones_del_mes").DataTable().ajax.reload();
    ejecutar_datatables_mes_vendedor();
  });

  function ejecutar_datatables_mes_vendedor() {
    // Datatables Mes/Vendedor
    var listado_gestiones_mes_vendedor = $(
      "#tbl_gestiones_mes_vendedor"
    ).DataTable({
      ajax: {
        url: "venta_home_mdl.php?accion=listar_ventas_mes_vendedor",
        dataSrc: "",
        data: { turno_id: turno_id, user_id: user_id },
      },
      columns: [
        { data: "venta_id" },
        { data: "FECHA" },
        { data: "DIA" },
        { data: "HORA" },
        { data: "venta_nombre_producto" },
        { data: "venta_nombre_proveedor" },
        { data: "venta_costo_producto" },
        { data: "venta_valor_venta" },
        { data: "venta_utilidad" },
      ],
      columnDefs: [],
      order: [[1, "asc"]],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },
      fixedHeader: true,
      scrollY: "400px",
      scrollCollapse: true,
      paging: false,
      destroy: true,
    });
    // fin datatables mes/vendedor
  }

  //-----------------------------
  //CICLO menu: mis gestiones/ agrupadas por dia
  //-----------------------------
  $("#menu_gestiones_agrupadas_por_dia").click(function () {
    $("#mdl_gestiones_agrupadas_por_dia").modal("show");
    ejecutar_datatables_gestiones_agrupadas_por_dia();
  });

  function ejecutar_datatables_gestiones_agrupadas_por_dia() {
    // datatables gestiones/dia
    var listado_gestiones_agrupadas_por_dia = $(
      "#tbl_gestiones_agrupadas_por_dia"
    ).DataTable({
      ajax: {
        url: "venta_home_mdl.php?accion=listar_ventas_agrupadas_por_dia_vendedor",
        dataSrc: "",
        data: { turno_id: turno_id, user_id: user_id },
      },
      columns: [
        { data: "FECHA" },
        { data: "DIA" },
        { data: "UTILIDAD" },
        { data: "NUM_GESTIONES" },
      ],
      columnDefs: [],
      order: [[0, "asc"]],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },

      fixedHeader: true,
      scrollY: "400px",
      scrollCollapse: true,
      paging: false,
      destroy: true,
    });
    // fin datatables gestiones dia
  }

  //-----------------------------
  //menu: productos /  gestiones del mes todos
  //-----------------------------
  $("#menu_gestiones_mes_todos").click(function () {
    // limpiarFormulario();
    // listadoVentas = "";
    $("#mdl_gestiones_mes_todos").modal("show");
    // $("#mdl_gestiones_del_mes").DataTable().ajax.reload();
    ejecutar_datatables_mes_todos();
  });

  function ejecutar_datatables_mes_todos() {
    // datatables mes/todos
    var listado_gestiones_mes_vendedor = $(
      "#tbl_gestiones_mes_todos"
    ).DataTable({
      ajax: {
        url: "venta_home_mdl.php?accion=listar_ventas_mes_todos",
        dataSrc: "",
        data: { turno_id: turno_id, user_id: user_id },
      },
      columns: [
        { data: "venta_id" },
        { data: "FECHA" },
        { data: "DIA" },
        { data: "HORA" },
        { data: "venta_nombre_producto" },
        { data: "venta_nombre_proveedor" },
        { data: "venta_costo_producto" },
        { data: "venta_valor_venta" },
        { data: "user_nombre" },
        { data: "venta_utilidad" },
      ],
      columnDefs: [],
      order: [[1, "asc"]],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },
      fixedHeader: true,
      scrollY: "400px",
      scrollCollapse: true,
      paging: false,
      destroy: true,
    });
    // fin datatables mes todos
  }

  // CARGA LA FECHA ACTUAL y CUADRO PRINCIPAL DE PAGINA
  // function getTime() {
  //   var today = moment();

  //   time = today.format("LT");
  //   //date = today.format('dddd, MMMM, YYYY');
  //   date = today.format("LL");
  //   document.getElementById("hoy_moment").innerHTML =
  //     `<br>` +
  //     `<h1 class='large'>${time}</h1>` +
  //     `<span class='dark'>${date}</span>`;
  // }
  // setInterval(function () {
  //   getTime();
  // }, 1000);

  // function mesActual() {
  //   let mes_actual = moment().format("MMMM-YYYY");
  //   $("#mes_actual1").html(mes_actual);
  // }

  //-----------------------------
  //CICLO AGREGAR DOMICILIO
  //-----------------------------
  $("#menu_nuevo_domicilio, #btn_nuevo_domicilio").click(function () {
    limpiarModalDomicilios();
    $("#btn_domi_interno").show();
    $("#btn_domi_interno").removeClass("btn-secondary");
    $("#btn_domi_interno").addClass("btn-primary");
    $("#btn_domi_externo").show();
    $("#btn_domi_externo").removeClass("btn-secondary");
    $("#btn_domi_externo").addClass("btn-primary");
    $("#bloque_transportador").hide();
    $("#bloque_domi_externo, #bloque_valor_domi_externo").hide();
    $("#mdl_domicilios").modal("show");
  });

  function limpiarModalDomicilios() {
    $(
      "#npt_factura,#npt_valor_domi_externo,#npt_valor_producto,#npt_hora_salida,#npt_observaciones"
    ).css("background-color", "");
    $("#slct_barrio").select2("val", "0"); //select
    $("#npt_barrio_id").val("");
    $("#npt_factura").val("");
    $("#slct_domi_externo").val("0"); //select
    $("#npt_domi_externo_id").val("0");
    $("#npt_btn_domi_interno").val("0");
    $("#npt_valor_domi_externo").val("");
    $("#npt_valor_domi_externo_base").val("0");
    $("#npt_btn_domi_externo").val("0");
    $("#slct_transportador").val("0"); //select
    $("#npt_transportador_id").val("0");
    $("#npt_valor_producto").val("");
    $("#npt_hora_salida").val("0");
    $("#npt_hora_llegada").val("0");
    $("#check_inyectologia[type='checkbox']").prop({ checked: false });
    $("#npt_observaciones").val("");
    $("#npt_confirm_btn").val("0");
    $("#npt_turno_id_actual").val("300");
  }

  // validaciones al digitar

  // validacion solo deja ingresar numeros al input
  $(document).ready(function () {
    $("#npt_factura, #npt_valor_domi_externo, #npt_valor_producto").on(
      "input",
      function (evt) {
        $(this).val(
          $(this)
            .val()
            .replace(/[^0-9]/g, "")
        );
      }
    );
  });

  $("#npt_factura").on("blur", function () {
    $("#npt_factura").css("background-color", "#dbe5f0");
  });

  $("#npt_valor_producto").on("blur", function () {
    $("#npt_valor_producto").css("background-color", "#dbe5f0");
    const value = this.value.replace(/\$|\./g, "");
    if (value === "") {
      // validacion para evitar que se muestre NaN en el input al quitar foco
      return false;
    } else {
      //Las validaciones que necesitas hacer
      let valor_base = this.value;
      //conversion del valor al formato moneda con parseFloat
      this.value = parseFloat(value).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      });
      $("#npt_valor_producto_base").val(valor_base);
    }
  });

  $("#npt_valor_domi_externo").on("blur", function () {
    $("#npt_valor_domi_externo").css("background-color", "#dbe5f0");
    const value = this.value.replace(/\$|\./g, "");
    if (value === "") {
      // validacion para evitar que se muestre NaN en el input al quitar foco
      return false;
    } else {
      //Las validaciones que necesitas hacer
      let valor_base = this.value;
      //conversion del valor al formato moneda con parseFloat
      this.value = parseFloat(value).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      });
      $("#npt_valor_domi_externo_base").val(valor_base);
    }
  });

  //Carga el select de barrios.
  $(document).ready(function () {
    //activa el Select2 en el modal
    $("#slct_barrio").select2({
      dropdownParent: $("#mdl_domicilios"),
      width: "85%",
    });
    // carga de los datos
    $.ajax({
      type: "POST",
      url: "select_barrio_mdl.php",
      success: function (response) {
        $(".selectBarrio select").html(response).fadeIn();
      },
    });
  });
  // asigna valor select barrio al input
  $("#slct_barrio").change(function () {
    $("#npt_barrio_id").val($(this).val());
  });

  //Carga el select de transportador.
  $(document).ready(function () {
    $.ajax({
      type: "POST",
      url: "select_transportador_mdl.php",
      success: function (response) {
        $(".selectTransportador select").html(response).fadeIn();
      },
    });
  });
  // asigna valor del select transportador al input
  $("#slct_transportador").change(function () {
    $("#npt_transportador_id").val($(this).val());
  });

  //carga el select domi externo
  $(document).ready(function () {
    $.ajax({
      type: "POST",
      url: "select_domi_externo_mdl.php",
      success: function (response) {
        $(".selectDomiExterno select").html(response).fadeIn();
      },
    });
  });
  // asigna valor select domi externo al input
  $("#slct_domi_externo").change(function () {
    $("#npt_domi_externo_id").val($(this).val());
  });

  //carga el select vendedores
  $(document).ready(function () {
    $.ajax({
      type: "POST",
      url: "select_vendedor_mdl.php",
      success: function (response) {
        $(".selectVendedor select").html(response).fadeIn();
      },
    });
  });
  // asigna valor select vendedor al input
  $("#slct_vendedor").change(function () {
    $("#npt_vendedor_id").val($(this).val());
  });

  // boton domi interno
  $("#btn_domi_interno").click(function () {
    $("#btn_domi_interno").removeClass("btn-primary");
    $("#btn_domi_interno").addClass("btn-secondary");
    $("#btn_domi_externo").hide();
    $("#bloque_domi_externo, #bloque_valor_domi_externo").hide();
    $("#bloque_transportador").show();
    $("#npt_btn_domi_interno").val("1");
    $("#npt_confirm_btn").val("1");
  });
  // boton domi externo
  $("#btn_domi_externo").click(function () {
    $("#btn_domi_externo").removeClass("btn-primary");
    $("#btn_domi_externo").addClass("btn-secondary");
    $("#btn_domi_interno").hide();
    $("#bloque_transportador").hide();
    $("#bloque_domi_externo, #bloque_valor_domi_externo").show();
    $("#npt_btn_domi_externo").val("1");
    $("#npt_confirm_btn").val("1");
  });

  // rellena hora salida
  $("#btn_hora_salida").on("click", function () {
    let hora_actual = moment().format("HH:mm");
    $("#npt_hora_salida").val(hora_actual);
  });
  // fin ciclo agregar domicilio

  // confirma agregar domicilio
  $("#btn_guardar_nuevo_domicilio").click(function () {
    //VALIDACION DE DATOS DEL MODAL NUEVO
    let valida_barrio_id = $("#npt_barrio_id").val();
    let valida_factura = $("#npt_factura").val();
    let valida_confirm_btn = $("#npt_confirm_btn").val();
    let valida_btn_domi_interno = $("#npt_btn_domi_interno").val();
    let valida_btn_domi_externo = $("#npt_btn_domi_externo").val();
    let valida_domi_externo_id = $("#npt_domi_externo_id").val();
    let valida_valor_domi_externo = $("#npt_valor_domi_externo").val();
    let valida_transportador_id = $("#npt_transportador_id").val();
    let valida_valor_producto = $("#npt_valor_producto").val();
    let valida_hora_salida = $("#npt_hora_salida").val();
    // let valida_inyectologia = $("#npt_inyectologia").val();
    // let valida_observaciones = $("#npt_observaciones").val();

    // compara datos de variables contra vacio y muestra un alert
    if (valida_barrio_id.trim() == "") {
      alert("elija un barrio.");
      $("#slct_barrio").focus();
      return false;
    } else if (valida_factura.trim() == "") {
      alert("digita factura.");
      $("#npt_factura").focus();
      return false;
    } else if (valida_confirm_btn.trim() != "1") {
      alert("elige Botón domi interno o externo");
      return false;
    } else if (
      valida_btn_domi_interno.trim() == "1" &&
      valida_transportador_id.trim() == ""
    ) {
      //alert para validar campo vacio
      alert("elija transportador.");
      $("#slct_transportador").focus();
      return false;
    } else if (
      valida_btn_domi_externo.trim() == "1" &&
      valida_domi_externo_id.trim() == ""
    ) {
      alert("elija trasportador domi externo.");
      $("#slct_domi_externo").focus();
      return false;
    } else if (
      valida_btn_domi_externo.trim() == "1" &&
      valida_valor_domi_externo.trim() == ""
    ) {
      alert("elija valor domi externo");
      $("#npt_valor_domi_externo").focus();
      return false;
    } else if (valida_valor_producto.trim() == "") {
      alert("digite valor venta");
      $("#npt_valor_producto").focus();
      return false;
    } else if (valida_hora_salida.trim() == "") {
      alert("marque hora de salida");
      $("#npt_hora_salida").focus();
      return false;
    } else {
      //ejecutar Si todo fue validado
      $("#mdl_domicilios").modal("hide");
      let registro = recolectaDatosMdlNuevoDomi();
      guardarDomicilio(registro);
      // cargaPantallaPrincipal();
    }
  });

  function recolectaDatosMdlNuevoDomi() {
    let registro = {
      barrio_id: $("#npt_barrio_id").val(),
      numero_factura: $("#npt_factura").val(),
      btn_domi_interno: $("#npt_btn_domi_interno").val(),
      trans_interno_id: $("#npt_transportador_id").val(),
      btn_domi_externo: $("#npt_btn_domi_externo").val(),
      trans_externo_id: $("#npt_domi_externo_id").val(),
      valor_domi_externo: $("#npt_valor_domi_externo_base").val(),
      valor_venta: $("#npt_valor_producto_base").val(),
      hora_salida: $("#npt_hora_salida").val(),
      hora_llegada: $("#npt_hora_llegada").val(),
      inyectologia: $("#check_inyectologia").val(),
      observaciones: $("#npt_observaciones").val(),
      turno_id: $("#npt_turno_id_actual").val(),
    };
    return registro;
  }

  function guardarDomicilio(registro) {
    $.ajax({
      type: "POST",
      url: "venta_home_mdl.php?accion=guardar_domicilio",
      data: registro,

      success: function (msg) {
        $("#tbl_domicilio_interno").DataTable().ajax.reload();
      },

      error: function () {
        alert("problema en: guardarDomicilio");
      },
    });
  }

  // FIN CICLO AGREGAR NUEVA gestion
  //----------------------
  // CONTROL  SIDEBAR
  //----------------------
  $("#contenido_navbar").on("click", "button.btn_open", function () {
    $("#mySidebar").width("250px");
    $("#contenido").css({ marginLeft: "250px" });
    $("#contenido_navbar button.btn_open").hide();
  });

  $("#mySidebar").on("click", "button.btn_close", function () {
    $("#mySidebar").width("0px");
    $("#contenido").css({ marginLeft: "0px" });
    $("#contenido_navbar button.btn_open").show();
  });

  $("#link_venta_acumulada").click(function () {
    $("#mdl_venta_acumulada").modal("show");
  });

  // fin control sidebar
}); // cierre del addEventListener del inicio de pagina
