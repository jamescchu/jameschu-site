// $(function() {
//     $(window).load(function() {
//         var $grid = $('.work-content').isotope({
//             // options
//             itemSelector: '.work-item',
//             layoutMode: 'fitRows'
//         });
//
//         $('.jc-ln-list').on('click', '.jc-ln-item', function() {
//             $('.jc-ln-list .jc-ln-item').removeClass('active');
//             $(this).addClass('active');
//             var filterValue = $(this).attr('data-filter');
//             $grid.isotope({
//                 filter: filterValue
//             });
//         });
//     });
// });
// NOT WORKING OMFGAJFLDJFJLAFDJLALSJDAJL
var iso = new Isotope( '.work-content', {
  itemSelector: '.work-item',
  layoutMode: 'fitRows'
});

var filtersElem = document.querySelectorAll('.jc-ln-item');
for (var i = 0; i < filtersElem.length; i ++) {
  var current = filtersElem[i];
  current.addEventListener( 'click', function( event ) {
    var filterValue = event.target.getAttribute('data-filter');
    // use matching filter function
    iso.arrange({ filter: filterValue });
  });
}
// var filtersElem = document.querySelector('.jc-ln-list');
// filtersElem.addEventListener( 'click', function( event ) {
//   if ( !apollo.hasClass( event.target, '.jc-ln-item')) {
//     return;
//   }
//   var filterValue = event.target.getAttribute('data-filter');
//   // use matching filter function
//   iso.arrange({ filter: filterValue });
// });

// var filterGroups = document.querySelectorAll('.jc-ln-list');
// for (var i = 0, len = filterGroups.length; i < len; i++) {
//   var filterGroup = filterGroups[i];
//   toggleFilter(filterGroup);
// }
//
// function toggleFilter(filterGroup) {
//   filterGroup.addEventListener('click', function(event) {
//     if ( !matchesSelector( event.target, '.jc-ln-item' ) ) {
//       return;
//     }
//     filterGroup.querySelector('.active').classList.remove('active');
//     event.target.classList.add('active');
//   });
// }
