$(function(){
    $(window).load(function(){
      $('#work-grid').mixItUp({
        selectors: {
          target: '.work-item',
          filter: '.subnav-btn'
        },
        animation: {
      		duration: 400,
      		effects: 'fade stagger(20ms)',
      		easing: 'ease'
      	}
        });
    });
});
