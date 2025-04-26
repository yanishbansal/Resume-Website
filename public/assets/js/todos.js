//var mongoose = require('mongoose');
//mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.cljzb.mongodb.net/Cluster0?retryWrites=true&w=majority',{useNewUrlParser: true});
//var todoItem=require('models/tododb.js');
// Check Off Specific Todos By Clicking
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

//Click on X to delete Todo
$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});
	event.stopPropagation();
});

	$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		//grabbing new todo text from input
		var todoText = $(this).val();
		//create a new li and add to ul
        //$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")
	     $(this).form.submit(); /// submition  is pending !!!!!!
         //todoItem.create({task:todoText},(err,cntnt)=>{console.log(cntnt);});
	     $(this).val("");
	}
});

$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
});