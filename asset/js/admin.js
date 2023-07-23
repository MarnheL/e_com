// side-bar
var el = document.getElementById("wrapper");
var toggleButton = document.getElementById("menu-toggle");

toggleButton.onclick = function () {
    el.classList.toggle("toggled");
};
// side-bar

// Date picker
(function() {
    $('input[name="daterange"]').daterangepicker();
  });
// Date picker


// print
const printBtn = document.getElementById('print');

printBtn.addEventListener('click', function() {
  print();
})