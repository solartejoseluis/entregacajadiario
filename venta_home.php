<!doctype html>
<!-- ENTREGA DIARIA DROGUERIA SURICENTRO -->
<html lang="es">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Entrega Diaria</title>
  <!-- CDN boostrap 5.2.2 css -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
  <!-- CDN datatables 1.12.1 css -->
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/zf/dt-1.12.1/datatables.min.css" />
  <!-- select2 css-->
  <!-- <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" /> -->
    <!-- estilos de la pagina -->
  <!-- <link href="css/signin.css" rel="stylesheet"> -->
</head>

<body>
  <div class="container-fluid mb-3" id="contenido">
    <div class="row">
      <div class="col-6">
        <h1>ENTREGA DE CAJA DIARIA</h1>
        <h3 id="hoy"></h3>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <h3>CUADRO DE VENDEDORES</h3>
        <table class="table table-sm table-bordered table-hover border-primary">
          <thead>
            <tr>
              <th scope="col">CUADRO VENDEDORES</th>
              <th scope="col">YULY</th>
              <th scope="col">LORENA</th>
              <th scope="col">KAROL</th>
              <th scope="col">MARINO</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr>
              <th scope="row">Num - Gestiones</th>
              <td><p id="ventasVendedor1"></p></td>
              <td><p id="ventasVendedor2"></p></td>
              <td><p id="ventasVendedor3"></p></td>
              <td><p id="ventasVendedor4"></p></td>
            </tr>
            <tr>
              <th scope="row">Utilidad Hoy</th>
              <td><p id="utilidadVendedor1" class="moneda"></p></td>
              <td><p id="utilidadVendedor2"></p></td>
              <td><p id="utilidadVendedor3"></p></td>
              <td><p id="utilidadVendedor4"></p></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-6">
        <h3>CUADRO DE TOTALES</h3>
                <table class="table table-sm table-bordered table-hover border-primary">
          <tbody class="table-group-divider">
            <tr>
              <th scope="row">SALDO CAJA TURNO</th>
              <td><p id="p_saldo_caja_principal"></p></td>
            </tr>
            <tr>
              <th scope="row">TOTAL UTILIDAD</th>
              <td><p id="p_utilidad_turno"></p></td>
            </tr>
            <tr>
              <th scope="row">NUMERO DE VENTAS</th>
              <td><p id="p_turno_numero_ventas"></p></td>
            </tr>
            <tr>
              <th scope="row">TOTAL A ENTREGAR</th>
              <td><p id="p_total_entrega"></p></td>
            </tr>
            <tr>
              <th scope="row">DESCUADRE TURNO</th>
              <td><p id="p_descuadre"></p></td>
            </tr>
          </tbody>
        </table>
        <button type="button" class="btn btn-primary" id="btn_add" data-bs-toggle="modal">NUEVA VENTA <i class="fa-solid fa-circle-plus"></i></button>
        <button type="button" class="btn btn-danger" id="btn_cerrar_turno" data-bs-toggle="modal">CERRAR TURNO <i class="fa-solid fa-circle-plus"></i></button>
      </div>
    </div>




  <div class="container-fluid" id="tabla">
    <div class="row">
      <div class="col-12">
        <table class="table" id="tblVentas">
          <thead>
            <tr>
              <td>ID</td>
              <td>PRODUCTO</td>
              <td>PROVEEDOR</td>
              <td>PRECIO COSTO</td>
              <td>PRECIO VENTA</td>
              <td>VENDEDOR</td>
              <td>UTILIDAD</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>

  </div>

  <!-- -------------------------->
  <!-- INICIA MODAL NUEVA VENTA-->
  <!-- ------------------------->
  <div class="modal fade" data-bs-backdrop="static"  tabindex="-1" id="mdlVentas">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">NUEVA VENTA</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="frmNuevaVenta">
            <!-- VENTAS_ID -->
            <div class="row">
              <input type="hidden" class="form-control" id="npt-venta_id">
            </div>
            <!-- NUEVO PRODUCTO -->
            <div class="row mb-3">
              <div class="col-md-3 ms-auto">
                <label for="npt-venta_nombre_producto" class="col-form-label">Producto:</label>
              </div>
              <div class="col-md-9 ms-auto">
                <input type="text" class="form-control" id="npt-venta_nombre_producto" placeholder="Digite Nombre del producto" onKeyUp="document.getElementById(this.id).value=document.getElementById(this.id).value.toUpperCase()">
              </div>
            </div>
            <!-- NUEVO PROVEEDOR -->
            <div class="row mb-3">
              <div class="col-md-3 ms-auto">
                <label for="npt-venta_nombre_proveedor" class="col-form-label">Proveedor:</label>
              </div>
              <div class="col-md-9 ms-auto">
                <input type="text" class="form-control" id="npt-venta_nombre_proveedor" placeholder="Digite Nombre proveedor" onKeyUp="document.getElementById(this.id).value=document.getElementById(this.id).value.toUpperCase()">
              </div>
            </div>
            <!-- NUEVO COSTO PRODUCTO -->
            <div class="row mb-3">
              <div class="col-md-3 ms-auto">
                <label for="npt-venta_costo_producto" class="col-form-label">Costo Prod:</label>
              </div>
              <div class="col-md-9 ms-auto">
                <input type="text" class="form-control" id="npt-venta_costo_producto" placeholder="Digite Costo de producto" >
              </div>
            </div>
            <!-- NUEVO VALOR VENTA -->
            <div class="row mb-3">
              <div class="col-md-3 ms-auto">
                <label for="npt-venta_valor_venta" class="col-form-label"> Valor Venta:</label>
              </div>
              <div class="col-md-9 ms-auto">
                <input type="text" class="form-control" id="npt-venta_valor_venta" placeholder="Digite valor venta">
              </div>
            </div>
            <!--  NUEVO VENDEDOR -->
            <div class="row mb-3">
              <div class="col-md-3 ms-auto">
                <label for="slct-user" class="col-form-label">Vendedor:</label>
              </div>
              <div class="col-md-9 ms-auto">
                <input type="hidden" class="form-control" id="npt-user_id">
                <div class="selectUser">
                  <select class="form-select" id="slct-user"></select>
                </div>
              </div>
            </div>
            <!-- NUEVA UTILIDAD -->
            <div class="row mb-3">
              <div class="col-md-3 ms-auto">
                <label for="npt-venta_utilidad" class="col-form-label">Utilidad:</label>
              </div>
              <div class="col-md-9 ms-auto">
                <input type="text" class="form-control" id="npt-venta_utilidad" disabled>
              </div>
            </div>
          </form>
          <!-- FIN FORM DEL MODAL -->
        </div>
        <!-- FOOTER DEL MODAL -->
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary" id="btn_confirm_add">Confirma Agregar</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <!-- <button type="submit" class="btn btn-primary" id="btn_confirm_edit">Confirma Modificar</button> -->
        </div>
      </div>
    </div>
  </div>
  <!-- ********************* -->
  <!-- FIN MODAL NUEVA VENTA -->
  <!-- ********************* -->


  <!-- ------------------------- -->
  <!-- INICIA MODAL EDITAR VENTA-->
  <!-- ------------------------- -->
  <div class="modal fade" data-bs-backdrop="static" id="mdlEditVentas" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- cabecera del modal de edicion -->
        <div class="modal-header">
          <h1 class="modal-title fs-5">EDITAR REGISTRO</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <!-- cuerpo del modal de edicion -->
        <div class="modal-body">
          <form id="frmEditVentas">
            <!-- EDITAR VENTAS_ID -->
            <div class="row">
              <input type="hidden" class="form-control" id="nptEdit-venta_id">
            </div>
            <!-- EDITAR PRODUCTO -->
            <div class="row mb-3">
              <div class="col-md-3 ms-auto">
                <label for="nptEdit-venta_nombre_producto" class="col-form-label">Producto:</label>
              </div>
              <div class="col-md-9 ms-auto">
                <!-- <input type="text" class="form-control" id="nptEdit-venta_nombre_producto" placeholder="Digite Nombre del producto"> -->
                <input type="text" class="form-control" id="nptEdit-venta_nombre_producto" placeholder="Digite Nombre del producto" onKeyUp="document.getElementById(this.id).value=document.getElementById(this.id).value.toUpperCase()">

              </div>
            </div>
            <!--  EDITAR PROVEEDOR -->
            <div class="row mb-3">
              <div class="col-md-3 ms-auto">
                <label for="nptEdit-venta_nombre_proveedor" class="col-form-label">Proveedor:</label>
              </div>
              <div class="col-md-9 ms-auto">
                <!-- <input type="text" class="form-control" id="nptEdit-venta_nombre_proveedor" placeholder="Digite Nombre proveedor"> -->
                <input type="text" class="form-control" id="nptEdit-venta_nombre_proveedor" placeholder="Digite Nombre proveedor" onKeyUp="document.getElementById(this.id).value=document.getElementById(this.id).value.toUpperCase()">

              </div>
            </div>
            <!-- EDITAR COSTO PRODUCTO -->
            <div class="row mb-3">
              <div class="col-md-3 ms-auto">
                <label for="nptEdit-venta_costo_producto" class="col-form-label">Costo Prod:</label>
              </div>
              <div class="col-md-9 ms-auto">
                <input type="text" class="form-control" id="nptEdit-venta_costo_producto" placeholder="Digite Costo de producto">
              </div>
            </div>
            <!-- EDITAR VALOR VENTA -->
            <div class="row mb-3">
              <div class="col-md-3 ms-auto">
                <label for="nptEdit-venta_valor_venta" class="col-form-label"> Valor Venta:</label>
              </div>
              <div class="col-md-9 ms-auto">
                <input type="text" class="form-control" id="nptEdit-venta_valor_venta" placeholder="Digite valor venta">
              </div>
            </div>
            <!--  EDITAR VENDEDOR -->
            <div class="row mb-3">
              <div class="col-md-3 ms-auto">
                <label for="nptEdit-user_nombre" class="col-form-label">Vendedor:</label>
              </div>
              <div class="col-md-9 ms-auto">
                <input type="hidden" class="form-control" id="nptEdit-user_id">
                <div class="selectUser">
                  <!-- <input class="form-control" id="nptEdit-user_nombre"> -->
                  <select class="form-select" id="slctEdit-user"></select>
                </div>
              </div>
            </div>
            <!-- EDITAR UTILIDAD -->
            <div class="row mb-3">
              <div class="col-md-3 ms-auto">
                <label for="nptEdit-venta_utilidad" class="col-form-label">Utilidad:</label>
              </div>
              <div class="col-md-9 ms-auto">
                <input type="text" class="form-control" id="nptEdit-venta_utilidad" disabled>
              </div>
            </div>
          </form>
        </div> <!-- final modal body editar-->
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary" id="btn_confirm_edit">Confirma Modificar</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- ************************* -->
  <!-- FIN MODAL EDITAR REGISTRO -->
  <!-- ************************* -->

  <!-- -------------------------->
  <!-- INICIA MODAL CERRAR TURNO-->
  <!-- ------------------------->
  <div class="modal fade" data-bs-backdrop="static"  tabindex="-1" id="mdl_cerrar_turno">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">CERRAR TURNO</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="frmCerrarTurno">
            <!-- SALDO DE CAJA PRINCIPAL -->
            <div class="row mb-3">
              <div class="col-md-3 ms-auto">
                <label for="npt_turno_saldo_caja" class="col-form-label">Saldo De Caja Principal:</label>
              </div>
              <div class="col-md-9 ms-auto">
                <input type="text" class="form-control" id="npt_turno_saldo_caja" placeholder="Digite saldo de caja">
              </div>
            </div>

            <!--  TOTAL UTILIDAD -->
            <div class="row mb-3">
              <div class="col-md-3 ms-auto">
                <label for="npt_turno_total_utilidad" class="col-form-label">Total Utilidad del Turno:</label>
              </div>
              <div class="col-md-9 ms-auto">
                <input type="text" class="form-control" id="npt_turno_total_utilidad" disabled>
              </div>
            </div>
            <!--  TOTAL ENTREGA -->
            <div class="row mb-3">
              <div class="col-md-3 ms-auto">
                <label for="npt_turno_total_entrega" class="col-form-label">Total Entrega:</label>
              </div>
              <div class="col-md-9 ms-auto">
                <input type="text" class="form-control" id="npt_turno_total_entrega" disabled>
              </div>
            </div>

            <!-- DESCUADRE -->
            <div class="row mb-3">
              <div class="col-md-3 ms-auto">
                <label for="npt_turno_descuadre" class="col-form-label">Valor de Descuadre:</label>
              </div>
              <div class="col-md-9 ms-auto">
                <input type="text" class="form-control" id="npt_turno_descuadre" placeholder="Digite valor descuadre">
              </div>
            </div>



          </form>
          <!-- FIN FORM DEL MODAL -->
        </div>
        <!-- FOOTER DEL MODAL -->
        <div class="modal-footer">
          <button type="submit" class="btn btn-danger" id="btn_confirm_cerrar_turno">Confirma Cerrar Turno</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <!-- <button type="submit" class="btn btn-primary" id="btn_confirm_edit">Confirma Modificar</button> -->
        </div>
      </div>
    </div>
  </div>
  <!-- ********************* -->
  <!-- FIN MODAL CERRAR TURNO -->
  <!-- ********************* -->

  <!-- ------- -->
  <!-- SCRIPTS -->
  <!-- ------- -->

  <!-- CDN jquery 3.6.1 js -->
  <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
  <!-- CDN bootstrap 5.2.2 js -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
  <!-- CDN datatables 1.12.1 js -->
  <script src="https://cdn.datatables.net/v/zf/dt-1.12.1/datatables.min.js"></script>
  <!-- Font Awesome -->
  <!-- <script src="https://kit.fontawesome.com/382e1ebb20.js" crossorigin="anonymous"></script> -->
  <!-- select2 js-->
  <!-- <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script> -->
  <!-- <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/i18n/es.js"></script> -->
  <!-- scripts de la aplicacion -->
  <script src="js/scripts.js"></script>
</body>