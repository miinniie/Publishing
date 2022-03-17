// jQeury기본 구문
// $('선택자').함수(function(){
//   $('선택자').메서드(); 
// })

// 최초에 >> css는 function이 없다
$('p').css({'display':'none'});

//사용자가 누르면
$('.show-btn').click(function(){
    $('p').css({'display':'block'})
});



//사용자가 누르면
$('.hide-btn').click(function(){
    $('p').css({'display':'none'})
})

// mouse를 click
$('.show-btn2').click(function(){
    $('div').show()
})
$('.hide-btn2').click(function(){
    $('div').hide()
})

// mouse를 mouseenter/leave
$('.btn').mouseenter(function(){
    $('.new-box').show()
})
$('.btn').mouseleave(function(){
    $('.new-box').hide()
})