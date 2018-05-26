;+function($){
	 $.fn.gpBanner = function(banner_selector,options){
        new Banner(banner_selector,options,this);
        //无new调用
    }
	 function Banner(banner_selector,options){ 
        this.init(banner_selector,options);
    }
	 Banner.prototype = {
        constructor:Banner,
        init:function(banner_selector,options){
            this.index = 0;
            this.bannerWrapper = $(banner_selector);
            this.animate = options.animaten ? options.animate : "fade";
            //判断动画类型
            this.bannerItem = this.bannerWrapper.children();
            this.bannerNum = this.bannerItem.length;
            //获取子集元素长度
            this.btnPrev = $(options.prevBtn)
            this.btnNext = $(options.nextBtn)
            this.btnPrev
            .on("click",{turn:"prev"},$.proxy(this.change_index,this))
            .on("click",$.proxy(this.animation,this))
            //改变按钮的this指向
            this.btnNext
            .on("click",{turn:"next"},$.proxy(this.change_index,this))
            .on("click",$.proxy(this.animation,this))
        },
        change_index:function(event){
            var turnList = {
                "prev":function(){
                    this.prev = this.index;
                    if(this.index  == 0){
                        this.index = this.bannerNum - 1;
                    }else{
                        this.index --;
                    }
                }.bind(this),
                "next":function(){
                    this.prev = this.index;
                    if(this.index == this.bannerNum - 1){
                        this.index = 0;
                    }else{
                        this.index ++;
                    }
                }.bind(this),
                "toIndex":function(){
                    this.prev = this.index;
                    this.index = $(event.target).index();
                }.bind(this)
            }
            turnList[event.data.turn]();
            //选择执行函数
        },
        animation:function(event){
            if(this.prev == this.index) return;           
            var animationList = {
                "slide":function(){
                    animationList.slideFadeInit();
                     //调用封装好的slidefadeinit方法
                    this.bannerItem.eq(this.index)
                    .addClass("gp6-active")
                    //添加class属性
                    .css({
                        display:"none"
                    })
                    .slideDown()
                    .siblings()
                    .removeClass("gp6-active");
                    //移除class
                    
                }.bind(this),
                "fade":function(){
                    animationList.slideFadeInit();
                    //调用封装好的slidefadeinit方法
                    this.bannerItem.eq(this.index)
                    .addClass("gp6-active")
                    .css({
                        display:"none"
                    })
                    .fadeIn()
                    .siblings()
                    .removeClass("gp6-active");           
                }.bind(this),      
                "slideFadeInit":function(){
                    this.bannerItem.eq(this.prev)
                    .css({
                        zIndex:1
                    })
                    .siblings()
                    .css({
                        zIndex:""
                    })
                }.bind(this)
                //改变层级
            }
            animationList[this.animate]()]
        }
    }
}(jQuery);
