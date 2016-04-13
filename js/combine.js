$(function(){
    $(window).load(function(){

        var $container = $('.work-grid').isotope({
            itemSelector: '.work-item',
        });

        $('.subnav-content .subnav-item a').click(function() {
            $(this).find('active').removeClass('active');
            $(this).addClass('active');
            var filterValue = $(this).attr('data-filter');
            $container.isotope({ filter: filterValue });
        });

    });
});
