$(function(){
    $(window).load(function(){
      $('#work-gallery').mixItUp({
        selectors: {
          target: '.work-item',
          filter: '.jc-ln-filter'
        },
        animation: {
      		duration: 400,
      		effects: 'fade stagger(20ms)',
      		easing: 'ease'
      	}
        });
    });
});
