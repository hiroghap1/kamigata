jQuery(function ($) {
  $('.keyvisual').slick({
    autoplay: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
  });
  
  setTimeout(function () {
    $('.overray').addClass('fade');
    $('html,body').removeClass('fixed');
    
    setTimeout(function(){
      $('header').addClass('index');
    },1000);
  }, 750);
});
