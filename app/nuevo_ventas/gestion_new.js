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

  // Validaciones al digitar
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

     success: function (msg) {
        $("#tbl_gestiones").DataTable().ajax.reload();
     },

      error: function () {
        alert("problema en: guardarRegistro");
      },
    });
  }

  // FIN CICLO AGREGAR NUEVA gestion
