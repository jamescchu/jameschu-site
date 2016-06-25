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
var iso = new Isotope('.work-content', {
    itemSelector: '.work-item',
    layoutMode: 'fitRows'
});

var filtersElem = document.querySelectorAll('.jc-ln-item');
for (var i = 0; i < filtersElem.length; i++) {
    var filterGroup = filtersElem[i];
    filterGroup.addEventListener('click', function(event) {
        if (!matchesSelector(event.target, 'a')) {
          return;
        }
        var filterValue = event.target.getAttribute('data-filter');
        iso.arrange({
            filter: filterValue
        });
    });
}

var filterGroups = document.querySelectorAll('.jc-ln-list');
for (var i = 0, len = filterGroups.length; i < len; i++) {
  var filterGroup = filterGroups[i];
  toggleFilter(filterGroup);
}

function toggleFilter(filterGroup) {
  filterGroup.addEventListener('click', function(event) {
    if (!matchesSelector(event.target, 'a')) {
      return;
    }
    filterGroup.querySelector('.active').classList.remove('active');
    event.target.classList.add('active');
  });
}
