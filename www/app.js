// document.addEventListener('init', function(event) {
//   var page = event.target;

//   if (page.id === 'index.html') {
//     initAds();
//   }
// });

window.onload = function() {
  document.addEventListener('deviceready', initAds);
};
 