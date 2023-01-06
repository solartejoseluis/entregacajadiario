<!doctype html>
<html lang="es">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Inicio</title>
  <!-- CDN boostrap 5.2.2 css -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
  <!-- estilos de la pagina -->
  <link href="css/login.css" rel="stylesheet">
</head>

<body class="text-center">
  <main class="form-signin w-100 m-auto">
<form>

<!-- IMAGEN -->
<img class="mb-4" src="img/logotipo_suricentro.png" alt="">
<h5 class="mb-3 fw-normal">Elija para crear el turno</h5>

<!-- FECHA DE HOY FORMATO LARGO -->
  <h3 id="hoy"></h3>

<!-- SELECT RESPONSABLE TURNO -->
<div class="row mb-3">
  <!-- titulo select responsable -->
  <div class="col-md-3 ms-auto">
    <label for="slct_responsable" class="col-form-label">Responsable:</label>
  </div>
  <!-- contenido select responsable -->
  <div class="col-md-9 ms-auto">
    <div class="selectResponsable">
      <select class="form-select" id="slct_responsable"></select>
    </div>
  </div>
</div>

<!-- SELECT JORNADA -->
<div class="row mb-3">
<!-- titulo select jornada -->
  <div class="col-md-3 ms-auto">
    <label for="slct_jornada" class="col-form-label">Jornada:</label>
  </div>
<!-- contenido select jornada -->
  <div class="col-md-9 ms-auto">
    <div class="selectJornada">
      <select class="form-select" id="slct_jornada"></select>
    </div>
  </div>
</div>

<!-- INPUTS QUE RECOGEN DATOS DEL FORMULARIO -->
  <input type="hidden" class="form-control" id="npt_fecha">
  <input type="hidden" class="form-control" id="npt_jornada_id">
  <input type="hidden" class="form-control" id="npt_responsable_id">


<!-- BOTON ENVIAR -->
<div class="row mb-3">
  <button class="w-100 btn btn-lg btn-success" id="btn_crear_turno">Crear Turno</button>
</div>

</form>
</main>
</body>


  <!-- ------- -->
  <!-- SCRIPTS -->
  <!-- ------- -->
  <!-- CDN jquery 3.6.1 js -->
  <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
  <!-- CDN bootstrap 5.2.2 js -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    <!-- scripts de la aplicacion -->
  <script src="js/turno_script.js"></script>
</html>