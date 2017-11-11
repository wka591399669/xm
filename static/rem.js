rem();
function rem() {
  var fz = document.querySelector('html').offsetWidth / 7.5;
  document.querySelector('html').style.fontSize =
    fz <= 100 ? fz + 'px' : '100px';
}
window.onresize = function() {
  rem();
};
