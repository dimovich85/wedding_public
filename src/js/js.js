
// Прелоадер
$(document).ready(function(){
  setTimeout(function(){
    $('body').addClass('loaded');
  }, 1000);
  setTimeout(function(){
    $('.screen img').addClass('loaded');
  }, 2000);
  setTimeout(function(){
    $('.screen img').addClass('disabled');
    $('.screen').addClass('disabled');
  }, 2500);

});

// Scroll style
$(document).ready(function() {  
    $("html, body").niceScroll({
    	cursorborderradius: '10px',
    	cursorcolor: '#58ece0',
    	autohidemode: true,
    	cursorwidth: '5px',
    	cursorborder: 'none',
    	cursorminheight: '32',
    	railpadding: {right: 5},
    });
});

//Slider Portfolio
$('.slider_portfolio').slick({
	slidesToShow: 3,
    arrows: false,
    dots: true,
    responsive: [
    {
      breakpoint: 970,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
});
//Slider Feedback
$('.slider_feedback').slick({
    slidesToShow: 1,
    arrows: true,
    infinite: false,
    responsive: [
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 1,
        dots: true,
        arrows: false,
      }
    }
  ]

});

//Modal Windows

$('button.order').click(function(){
        $('figure.modal_windows').removeClass('closed');
        $('.callback').removeClass('closed');
});

$('button.connect').click(function(){
        $('figure.modal_windows').removeClass('closed');
        $('.callback').removeClass('closed');
});



$('img.closer').click(function(){
        $('figure.modal_windows').addClass('closed');
        $('.callback').addClass('closed');
        $('figure.video').addClass('closed');
});

// Slow Scroll
function scroll(id){
  var offset = 0;
  $('html, body').animate({
    scrollTop: $(id).offset().top - offset
  }, 500);
  return false;
}

// Video player

// Video set-init
jwplayer.key="EbuViul6gLHpNGijplNdGC3WTTRP4LcCcDTpMQ==";
jwplayer("video-player").setup({
  file: 'video/wedding.mp4',
  controls: true,
  width: '100%',
  height: '100%',
});

// Button play

$('.button_play').click(function(){
  $('#video-player').addClass('playing');
  $('i.close-video').addClass('playing');
  setTimeout(function(){
    $('#video-player').addClass('visible');
  }, 100);
  setTimeout(function(){
    jwplayer('video-player').play();
  }, 900);
});

// Button close

$('i.close-video').click(function(){
  jwplayer('video-player').stop();
  $('i.close-video').removeClass('playing');
  setTimeout(function(){
    $('#video-player').removeClass('visible');
  },100);
  setTimeout(function(){
    $('#video-player').removeClass('playing');
  },900);
});