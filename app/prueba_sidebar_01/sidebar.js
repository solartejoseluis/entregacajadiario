// $("#openbtn").click(function () {
//   openNav();
// });

$("#openbtn").click( 
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("contenido").style.marginLeft = "250px";
  $("#openbtn").hide();
}
);

// function openNav() {
//   document.getElementById("mySidebar").style.width = "250px";
//   document.getElementById("contenido").style.marginLeft = "250px";
//   $("#openbtn").hide();
// }

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("contenido").style.marginLeft = "0";
  $("#openbtn").show();
}
