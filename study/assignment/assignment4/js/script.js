$(function(){
   //layer-popup close 
   $(".layer-popup header .btn-close").click(function(){
        $(this).parent().parent().hide();
        $("#dim-layer").hide();
    });

    //00401
    $("input#direct[type='checkbox']").on("change", function(){
        if($(this).is(":checked")){
            $(".event dl.table-row dd input.direct").show();
        } else{
            $(".event dl.table-row dd input.direct").hide();
        }
    });
    //".event dl.table-row dd input.direct"


    $(".tabs2 li:first").addClass("on");
		$(".tabs2 li a").prepend("<span class='sr-only'></span>");
		$(".tabs2 li:first a").find(".sr-only").text("선택됨, ");
    $(".tabcont:first").show();
    $(".tabs2 li").click(function(e){
        e.preventDefault();                          
         $(".tabs2 li").removeClass("on");
				 $(".tabs2 li a").find(".sr-only").text("");
         $(this).addClass("on").find("a .sr-only").text("선택됨, ");
         $(".tabcont").hide();
         var activeTab = $(this).attr("rel");
         $("#" + activeTab).fadeIn();

         if(!$(this).attr("rel")){
            $(this).addClass("on");
            $(".tabcont").show();
         }
    });

});

