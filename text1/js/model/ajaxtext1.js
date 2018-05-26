define(["jquery"],function(){
	$.ajax({
		type:"get",
		dataType:"jsonp",
		url:"http://mce.meilishuo.com/jsonp/get/3?offset=0&frame=1&trace=0&limit=10&endId=0&pid=106888&_=1526528205879",
		success:function(res){
			//console.log(res.data.list.length);
			var html = document.getElementById("box");
			for(var i = 0;i < res.data.list.length;i++){
				var str = `<div class="bodybox">
				<img  src="${res.data.list[i].image}"/>
				<p><span>¥<span>${res.data.list[i].price}</span></span></p>
				<div class="txt">
					<button id="${res.data.list[i].adID}">优选</button>
					<span class="explain">
						${res.data.list[i].title}
					</span>
					</div>	
				</div>`;
				html.innerHTML+=str				
			}
		
			
		
		},
		error:function(){
			alert("请求失败");
		}
		
	});
})
//创建依赖