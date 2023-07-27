// -------------------------------------
// ciclo mostrar domicilios entregados
// -------------------------------------

$("#btn_domi_entregados").on("click", function () {
  $("#mdl_domi_entregados").modal("show");
  datatablesDomiEntregados();
});

function datatablesDomiEntregados() {
  let listado = $("#tbl_domi_entregados").DataTable({
    ajax: {
      url: "venta_home_mdl.php?accion=listar_domi_entregados",
      dataSrc: "",
      data: "",
    },
    columns: [
      { data: "barrio_nombre" },
      { data: "user_nombre" },
      { data: "domi_externo_nombre" },
      { data: "valor_domi_externo" },
      { data: "valor_venta" },
      { data: "numero_factura" },
      { data: "hora_salida" },
      { data: "hora_llegada" },
      { data: "inyectologia" },
      { data: "observaciones" },
      { data: "turno_id" },
    ],
    columnDefs: [
      // {
      //   targets: 13,
      //   defaultContent:
      //     "<button class='btn btn-primary btn-sm btnVerDomiEntregado' id='btn_ver_domi_entregado'><i class='fa-solid fa-pen'></i></button>",
      //   data: null,
      // },
    ],
    order: [[6, "asc"]],
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
    info: true,
    searching: true,
    paging: false,
    destroy: true,
  });
}
