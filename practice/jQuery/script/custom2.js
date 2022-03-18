$('.show-btn').click(function(){
  $('.container div').slideDown()
});
$('.hide-btn').click(function(){
  $('.container div').slideUp()
});
$('.toggle-btn').click(function(){
  // toggle()은 두가지 기능을 한번에
  $('.container div').slideToggle()
});

$('.show-btn2').click(function(){
  // 500 = 0.5초 (1초 = 1000ms)
  $('.container2 div').fadeIn(500)
});
$('.hide-btn2').click(function(){
  $('.container2 div').fadeOut('slow')
});
$('.toggle-btn2').click(function(){
  // toggle()은 두가지 기능을 한번에
  $('.container2 div').fadeToggle()
});

// addClass('여기안 클래스명에는 .을 쓰지 않는다')
$('.add-btn').click(function(){
  $('.container3 div').addClass('active')
})
$('.remove-btn').click(function(){
  $('.container3 div').removeClass('active')
})
$('.toggle-btn3').click(function(){
  $('.container3 div').toggleClass('active')
})