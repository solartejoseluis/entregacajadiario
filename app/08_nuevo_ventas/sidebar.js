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
