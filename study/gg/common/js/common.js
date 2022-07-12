
$(function(){
  
  language_layer(); //해더 영역 랭귀지 레이어

})





/*
 * 해더 영역 랭귀지 레이어
*/
function language_layer(){
  var btn = $('#header_language_layer_btn')
  var cont = $('#header_language_layer_cont')
  var first = $('#header_language_layer_cont a:first')
  var last = $('#header_language_layer_cont a:last')
  btn.on('focus', function(){
    cont.show()
  })
  last.on('blur', function(){
    cont.hide()
  })
}



