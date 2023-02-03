document.addEventListener("DOMContentLoaded", function () {
//  var turno_id = "";
//  var user_id = "";

  $(document).ready(function () {
    ejecutarDatatables();
  });

  function ejecutarDatatables() {
    // INICIA DATATABLES
    var listado = $("#tblVentas").DataTable({
      ajax: {
        url: "../models/admin_meses_mdl.php?accion=listar_ventas",
        dataSrc: "",
        data: "",
      },
      columns: [
        { data: "mes" },
        { data: "año" },
        { data: "acumulado_utilidad" },
        { data: "cuenta_num_gestiones" },
        { data: null, orderable: false },
      ],
      columnDefs: [
        {
          targets: 4,
          defaultContent:
            "<button class='btn btn-primary btn-sm boton_ir' id='boton_ir'>/<i class='fa-solid fa-pen'></i></button>",
          data: null,
        },

      ],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },
      paging: false,
    });

    //boton ir
    $("#tblVentas tbody").on("click", "button.boton_ir", function () {
      let registro = listado.row($(this).parents("tr")).data();
      crearVariableDePaso(registro.mes);
      alert(JSON.stringify(registro.mes));
      //$(location).attr("href", "admin_dias_view.html");
    });

  function crearVariableDePaso(mes) {
    $.ajax({
      type: "GET",
      url: "../models/admin_meses_mdl.php?accion=crear_variable_de_paso&mes="+mes,
      data:"",
      success: function (datos) {
      alert('variable de paso creada');
      alert(datos[0].mes);
      },
      error: function () {
        alert("Problema en crear variable de paso");
      },
    });
  }
  }  // FIN FUNCION DATATABLES

}); // CIERRE  DEL DATATABLES
