
    // CARGA INFORMACION EN PAGINA
    $(document).ready(function() {
        let hoy = actualDate();
        document.getElementById('hoy').innerHTML = hoy;
        //cargaPantallaPrincipal();
    });


    //MOSTRAR LA FECHA ACTUAL
    function actualDate() {
        let today = new Date();
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        //options.timeZone = 'UTC';
        //options.timeZoneName = 'short';
        let now = today.toLocaleString('es-CO', options);
        //console.log(now);
        return now;
    };


  //CARGA EL SELECT RESPONSABLE
  $(document).ready(function() {
      $.ajax({
          type: "POST",
          url: "getUser.php",
          success: function(response) {
              $('.selectResponsable select').html(response).fadeIn();
          }
      });
  });


  //CARGA EL SELECT DE JORNADA
  $(document).ready(function() {
      $.ajax({
          type: "POST",
          url: "getJornada.php",
          success: function(response) {
              $('.selectJornada select').html(response).fadeIn();
          }
      });
  });


        //TOMA EL VALOR DEL SELECT Y PONERLO EN INPUT
    $("#slctEdit-user").change(function() {
        $('#nptEdit-user_id').val($(this).val());
    });