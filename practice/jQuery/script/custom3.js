$('.menu li').mouseenter(function(){
  // this 는 ''없이 사용
  // 여기서 this는  li를 지칭함
  // children 안에도 자식요소 꼭 지정해줘야함
  //stop()은 이전 애니메이션을 담는 큐를 삭제해버림
  $(this).children('.sub-menu').stop().slideDown()
})
$('.menu li').mouseleave(function(){
  $(this).children('.sub-menu').stop().slideUp()
})

$('.btn span').click(function(){
  $(this).addClass('active')
  // 같은 sibling층의 형제들은 없앤다
  $(this).siblings('span').removeClass('active')
})