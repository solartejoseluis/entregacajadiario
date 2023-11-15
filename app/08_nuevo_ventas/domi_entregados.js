// -------------------------------------
// ciclo mostrar domicilios entregados
// -------------------------------------

$("#btn_domi_entregados").on("click", function () {
  $("#mdl_domi_entregados").modal("show");
  datatablesDomiEntregados();
});

function datatablesDomiEntregados() {
  turno_id = $("#npt_turno_id_actual").val();
  user_id = $("#npt_user_id_actual").val();
  let listado = $("#tbl_domi_entregados").DataTable({
    ajax: {
      url: "venta_home_mdl.php?accion=listar_domi_entregados&turno_id=" + turno_id,
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
      { data: "gestion_01" },
      { data: "gestion_02" },
      { data: "observaciones" },
      { data: "turno_id" },
    ],
    columnDefs: [
      {
        targets: 3,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
      {
        targets: 4,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
      {
        targets: 9,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
      {
        targets: 10,
        render: $.fn.dataTable.render.number(".", ",", 0, "$"),
      },
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
