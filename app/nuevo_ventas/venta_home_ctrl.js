document.addEventListener("DOMContentLoaded", function () {
  var turno_id = "";
  var user_id = "";

  $(document).ready(function () {
    //ajusta los modales para el select2
    // $.fn.modal.Constructor.prototype.enforceFocus = function () {};

    //solucion al problema del select2 en el modal
    $("#select_en_modal").select2({
      dropdownParent: $("#mdl_domicilios"),
    });
    //solucion al problemal del select2 en el modal
    $("#slct_barrio").select2({
      dropdownParent: $("#mdl_domicilios"),
      width: "85%",
    });

    //cargarAcceso();
    //ejecutarDatatables();
    //cargaPantallaPrincipal();
  });

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



  function ejecutarDatatables() {
    // INICIA DATATABLES
    var listadoVentas = $("#tblVentas").DataTable({
      ajax: {
        url: "venta_home_mdl.php?accion=listar_ventas",
        dataSrc: "",
        data: { turno_id: turno_id },
      },
      columns: [
        { data: "venta_id" },
        { data: "venta_nombre_producto" },
        { data: "venta_nombre_proveedor" },
        { data: "venta_costo_producto" },
        { data: "venta_valor_venta" },
        { data: "user_nombre" }, //nombre vendedor
        { data: "venta_utilidad" },
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
  //CICLO AGREGAR NUEVA GESTION
  //-----------------------------
  $("#menu_nueva_gestion, #btn_nueva_gestion").click(function () {
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

  // CICLO BORRAR REGISTRO
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

  //CALCULAR UTILIDAD EN EL MODAL
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

  //-------------------------------------
  // OPERACIONES EN MODAL NUEVA GESTION
  //-------------------------------------

  // VALIDACIONES EN EL MODAL NUEVA GESTION

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

  //CALCULAR UTILIDAD EN EL MODAL DE EDITAR NUEVA GESTION
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
    // INICIA DATATABLES
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
    // FIN DATATABLES DEL MODAL
  }

  //-----------------------------
  //CICLO menu: mis gestiones/ agrupadas por dia
  //-----------------------------
  $("#menu_gestiones_agrupadas_por_dia").click(function () {
    $("#mdl_gestiones_agrupadas_por_dia").modal("show");
    ejecutar_datatables_gestiones_agrupadas_por_dia();
  });

  function ejecutar_datatables_gestiones_agrupadas_por_dia() {
    // INICIA DATATABLES
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
    // FIN DATATABLES DEL MODAL
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
    // INICIA DATATABLES
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
    // FIN DATATABLES DEL MODAL
  }

  // CARGA LA FECHA ACTUAL y CUADRO PRINCIPAL DE PAGINA
  function getTime() {
    var today = moment();

    time = today.format("LT");
    //date = today.format('dddd, MMMM, YYYY');
    date = today.format("LL");
    document.getElementById("hoy_moment").innerHTML =
      `<br>` +
      `<h1 class='large'>${time}</h1>` +
      `<span class='dark'>${date}</span>`;
  }
  setInterval(function () {
    getTime();
  }, 1000);

  function mesActual() {
    let mes_actual = moment().format("MMMM-YYYY");
    $("#mes_actual1").html(mes_actual);
  }

  //-----------------------------
  //ciclo agregar nuevo domicilio
  //-----------------------------
  $("#menu_nuevo_domicilio").click(function () {
    limpiarFormulario();
    $("#mdl_domicilios").modal("show");
  });
  $("#btn_nuevo_domicilio").click(function () {
    limpiarFormulario();
    $("#mdl_domicilios").modal("show");
  });

  //Carga el select de barrios.
  $(document).ready(function () {
    $.ajax({
      type: "POST",
      url: "select_barrio_mdl.php",
      success: function (response) {
        $(".selectBarrio select").html(response).fadeIn();
      },
    });
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
  // asigna valor del select transportador al input
  $("#slct_transportador").change(function () {
    $("#npt_transportador_id").val($(this).val());
  });

  // asigna valor select barrio al input
  $("#select_barrio").change(function () {
    $("#npt_barrio_id").val($(this).val());
  });
  // asigna valor select domi externo al input
  $("#slct_domi_externo").change(function () {
    $("#input_domi_externo_id").val($(this).val());
  });

  let hora_actual = moment().format("HH:mm");
  $("#btn_hora_salida").click(function () {
    $("#input_hora_salida").val(hora_actual);
  });

  // Control del Sidebar
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

  //-----------------------------
  //Ciclo SIDEBAR
  //-----------------------------
  $("#link_venta_acumulada").click(function () {
    $("#mdl_venta_acumulada").modal("show");
  });

  // FINALIZA CICLO SIDEBAR
}); // cierre del addEventListener del inicio de pagina
