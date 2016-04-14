$(function(){
    $(window).load(function(){
      $('#work-grid').mixItUp({
        selectors: {
          target: '.work-item',
          filter: '.subnav-btn'
        }
        });
    });
});
