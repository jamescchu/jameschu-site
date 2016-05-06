$(function() {
    $(window).load(function() {
        var $grid = $('.work-content').isotope({
            // options
            itemSelector: '.work-item',
            percentPosition: true,
            layoutMode: 'fitRows'
        });

        $('.jc-ln-list').on('click', '.jc-ln-item', function() {
            $('.jc-ln-list .jc-ln-item').removeClass('active');
            $(this).addClass('active');
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({
                filter: filterValue
            });
        });
    });
});
