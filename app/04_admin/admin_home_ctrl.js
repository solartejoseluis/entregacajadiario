document.addEventListener("DOMContentLoaded", function() {

      $(document).ready(function() {
        ejecutarDatatables();
      });

      function ejecutarDatatables() {
        // seccion de  exportacion
        var buttonCommon = {
          exportOptions: {
            format: {
              body: function(data, row, column, node) {
                // Strip $ from salary column to make it numeric
                return column === 2 ?
                  data.replace(/[$,.]/g, '') :
                  data;
              }
            }
          }
        };

        var listado = $("#tbl_ventas").DataTable({
            ajax: {
              url: "admin_home_mdl.php?accion=listar_ventas",
              dataSrc: "",
              data: "",
            },
            columns: [
              { data: "mes" },
              { data: "año" },
              { data: "acumulado_utilidad" },
              { data: "cuenta_num_gestiones" },
              { data: null, orderable: false },
              { data: null, orderable: false },
              { data: null, orderable: false },
              { data: null, orderable: false },
            ],

            dom: 'Bfrtip',
            buttons: [
              $.extend(true, {}, buttonCommon, {
                  extend: 'copyHtml5',
                  exportOptions: {
                    columns: [0, 1, 2, 3]
                  },
                  }),
                $.extend(true, {}, buttonCommon, {
                  extend: 'excelHtml5',
                  exportOptions: {
                    columns: [0, 1, 2, 3]
                  },
                }),
                $.extend(true, {}, buttonCommon, {
                  extend: 'pdfHtml5',
                  exportOptions: {
                    columns: [0, 1, 2, 3]
                  }
                  })],

                columnDefs: [{
                    targets: 2,
                    render: $.fn.dataTable.render.number('.', ',', 0, '$')
                  },
                  {
                    targets: 4,
                    defaultContent: "<button class='btn btn-primary btn-sm btn_ver_turnos' id='btn_ver_turnos'>Turnos</button>",
                    data: null,
                  },

                  {
                    targets: 5,
                    defaultContent: "<button  class='btn btn-success btn-sm btn_ver_dias' id='btn_ver_dias'>Dias</button>",
                    data: null,
                  },
                  {
                    targets: 6,
                    defaultContent: "<button  class='btn btn-warning btn-sm btn_ver_gestiones'>Gestiones</button>",
                    data: null,
                  },
                  {
                    targets: 7,
                    defaultContent: "<button  class='btn btn-danger btn-sm btn_informe_mes'>Informe</button>",
                    data: null,
                  },
                ],
                language: {
                  url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
                }
              });

            // boton ver turnos
            $("#tbl_ventas tbody").on("click", "button.btn_ver_turnos", function() {
              let registro = listado.row($(this).parents("tr")).data();
              $("#mdl_ver_turnos").modal("show");
              datatables_todos_turnos(registro.mes_actual);
            });

            // boton ver dias
            $("#tbl_ventas tbody").on("click", "button.btn_ver_dias", function() {
              let registro = listado.row($(this).parents("tr")).data();
              $("#mdl_ver_dias").modal("show");
              datatables_todos_dias(registro.mes_actual);
            });

            // boton ver gestiones
            $("#tbl_ventas tbody").on("click", "button.btn_ver_gestiones", function() {
              let registro = listado.row($(this).parents("tr")).data();
              $("#mdl_ver_gestiones").modal("show");
              datatables_todos_gestiones(registro.mes_actual);
            });

            // boton informe mes
            $("#tbl_ventas tbody").on("click", "button.btn_informe_mes", function() {
              let registro = listado.row($(this).parents("tr")).data();
              $("#mdl_informe_mes").modal("show");
              datatables_informe_mes(registro.mes_actual);
            });
          }; // final funcion ejecutar datatables


          function datatables_todos_turnos(mes_actual) {


            var listado = $("#tbl_turnos").DataTable({
              ajax: {
                url: "admin_home_mdl.php?accion=listar_turnos_mes&mes_actual=" + mes_actual,
                dataSrc: "",
                data: "",
              },
              columns: [
                { data: "turno_id" },
                { data: "turno_fecha_creado" },
                { data: "dia_semana" },
                { data: "jornada_nombre" },
                { data: "user_nombre" },
                { data: "turno_saldo_caja" },
                { data: "turno_total_utilidad" },
                { data: "turno_total_entrega" },
                { data: "turno_descuadre" },
                { data: "hora_creado" },
                { data: "hora_cierre" },
                { data: null, orderable: false },
              ],
    
              columnDefs: [{
                  targets: 5,
                  createdCell: function(td) {
                    $(td).css('background-color', "#CAFC26");
                  },
                  render: $.fn.dataTable.render.number('.', ',', 0, '$')
                },
                {
                  targets: 6,
                  createdCell: function(td) {
                    $(td).css('background-color', "#CAFC26");
                  },
                  render: $.fn.dataTable.render.number('.', ',', 0, '$')
                },
                {
                  targets: 7,
                  render: $.fn.dataTable.render.number('.', ',', 0, '$')
                },
                {
                  targets: 8,
                  createdCell: function(td) {
                    $(td).css('background-color', "#CAFC26");
                  },
                  render: $.fn.dataTable.render.number('.', ',', 0, '$')
                },
                {
                  targets: 11,
                  defaultContent: "<button class='btn btn-primary btn-sm btn_ver_turnos' id='btn_ver_turnos' name='btn_ver_turnos'>Turnos</button>",
                  data: null,
                },
              ],
              order: [
                [0, 'asc']
              ],
              language: {
                url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
              },
              fixedHeader: {
                header: true,
                footer: true
              },
              searching: true,
              paging: false,
              //fixedHeader: true,
              //scrollY: "400px",
              //scrollCollapse: true,
              destroy: true,
            });

          } // fin funcion datatables todos los turnos


          function datatables_todos_dias(mes_actual) {
            var listado = $("#tbl_dias").DataTable({
              ajax: {
                url: "admin_home_mdl.php?accion=listar_dias_mes&mes_actual=" + mes_actual,
                dataSrc: "",
                data: "",
              },

              columns: [
                { data: "turno_fecha" },
                { data: "dia_semana" },
                { data: "suma_caja" },
                { data: "suma_total_utilidad" },
                { data: "acumulado_utilidad_gestiones" },
                { data: "suma_total_entrega" },
                { data: "suma_total_descuadre" },
                { data: "acumulado_descuadre" },
              ],
              columnDefs: [{
                  targets: 2,
                  render: $.fn.dataTable.render.number('.', ',', 0, '$')
                },
                {
                  targets: 3,
                  createdCell: function(td) {
                    $(td).css('background-color', "#CAFC26");
                  },
                  render: $.fn.dataTable.render.number('.', ',', 0, '$')
                },
                {
                  targets: 4,
                  createdCell: function(td) {
                    $(td).css('background-color', "#CAFC26");
                  },
                  render: $.fn.dataTable.render.number('.', ',', 0, '$')
                },
                {
                  targets: 5,
                  render: $.fn.dataTable.render.number('.', ',', 0, '$')
                },
                {
                  targets: 6,
                  createdCell: function(td) {
                    $(td).css('background-color', "#FCDE19");
                  },
                  render: $.fn.dataTable.render.number('.', ',', 0, '$')
                },
                {
                  targets: 7,
                  createdCell: function(td) {
                    $(td).css('background-color', "#FCDE19");
                  },
                  render: $.fn.dataTable.render.number('.', ',', 0, '$')
                },
              ],
              language: {
                url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
              },
              searching: true,
              paging: false,
              order: [
                [0, 'asc']
              ],
              destroy: true,
            });
          } // fin función datatables todos dias


          function datatables_todos_gestiones(mes_actual) {
            var listado = $("#tbl_gestiones").DataTable({
              ajax: {
                url: "admin_home_mdl.php?accion=listar_gestiones_mes&mes_actual=" + mes_actual,
                dataSrc: "",
                data: "",
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
              columnDefs: [{
                  targets: 6,
                  render: $.fn.dataTable.render.number('.', ',', 0, '$')
                },
                {
                  targets: 7,
                  render: $.fn.dataTable.render.number('.', ',', 0, '$')
                },
                {
                  targets: 9,
                  render: $.fn.dataTable.render.number('.', ',', 0, '$')
                },
              ],
              order: [
                [0, 'asc']
              ],
              language: {
                url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
              },
              fixedHeader: {
                header: true,
                footer: true,
              },
              searching: true,
              paging: false,
              //fixedHeader: true,
              //scrollY: "400px",
              //scrollCollapse: true,
              destroy: true,
            });
          }; // fin funcion datatables todos las gestiones


          function datatables_informe_mes(mes_actual) {

            // seccion de  exportacion
            var buttonCommon = {
              exportOptions: {
                format: {
                  body: function(data, row, column, node) {
                    return column === 3 ?
                      data.replace(/[$,.]/g, '') : data;
                  },

                }
              }
            };

            var listado = $("#tbl_informe_mes").DataTable({
              ajax: {
                url: "admin_home_mdl.php?accion=informe_mes&mes_actual=" + mes_actual,
                dataSrc: "",
                data: "",
              },

              dom: 'Bfrtip',
              buttons: [
                $.extend(true, {}, buttonCommon, {
                  extend: 'copyHtml5'
                }),
                $.extend(true, {}, buttonCommon, {
                  extend: 'excelHtml5',
                  exportOptions: {
                    columns: [0, 2, 3]
                  },
                }),
                $.extend(true, {}, buttonCommon, {
                  extend: 'pdfHtml5'
                })
              ],


              columns: [
                { data: "user_nombre" },
                { data: "acumulado_utilidad" },
                { data: "cuenta_num_gestiones" },
                { data: "valor_a_pagar" },
              ],
              columnDefs: [{
                  targets: 1,
                  render: $.fn.dataTable.render.number('.', ',', 0, '$')
                },
                {
                  targets: 1,
                  createdCell: function(td) {
                    $(td).css('background-color', "#CAFC26");
                  },
                  render: $.fn.dataTable.render.number('.', ',', 0, '$')
                },
                {
                  targets: 3,
                  createdCell: function(td) {
                    $(td).css('background-color', "#CAFC26");
                  },
                  render: $.fn.dataTable.render.number('.', ',', 0, '$')
                },
              ],
              language: {
                url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
              },
              searching: false,
              paging: false,
              order: [
                [1, 'desc']
              ],
              destroy: true,
            });
          } // fin función datatables todos dias



        }); //  final del addEventListener de inicio