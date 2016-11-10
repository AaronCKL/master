/* 代码整理：大头网 www.datouwang.com */
jQuery.fn.extend({
	
	slideFocus: function(){
		var This = $(this);//$(this)	当前 HTML 元素
		var sWidth = $(This).width(),
			len    =$(This).find('ul li').length,
			index  = 0,
			Timer;
        //我的理解 this一直在变 谁调用它 this就指向谁。$(This)已经是#focus，不会在变，后面的index(this)是指鼠标经过的地方是this.
		// btn event
		var btn = "<div class='btn'>";
		for(var i=0; i < len; i++) {
			btn += "<span></span>";
		};
		btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
		$(This).append(btn);
		$(This).find('.btn span').eq(0).addClass('on');
		$(This).find('.btn span').mouseover(function(){
			index = $(This).find('.btn span').index(this);
			Tony(index);
		});
      var touch = {};
	  var min=30;
      $(This).on('touchstart', function(e) {
       var touches = e.originalEvent.touches[0];//touches[0]改为originalEvent.touches[0]，touches[0]有bug
                touch.x1 = touches.pageX;
                touch.y1 = touches.pageY;
				clearInterval(Timer);
			show($(This).find('.preNext'));
        
      }).on('touchmove', function(e){
                var touches = e.originalEvent.touches[0];
                touch.x2 = touches.pageX;
                touch.y2 = touches.pageY;
      }).on('touchend', function(e){
		  hide($(This).find('.preNext'));
			Timer=setInterval(function(){
				Tony(index);
				index++;
				if(len == index){index = 0;}
			}, 2000)
                if((touch.x2 && Math.abs(touch.x1 - touch.x2) > min) ||//abs() 方法可返回数的绝对值。
                 (touch.y2 && Math.abs(touch.y1 - touch.y2) > min)){
                    var dir = swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2);
                    moveTo(dir);
                }
                touch = {};
            });    
		$(This).find('.next').click(function(){
			index++;
			if(index == len){index = 0;}
			Tony(index);
		});

		$(This).find('.pre').click(function(){
			index--;
			if(index == -1){index = len - 1;}
			Tony(index);
		});
		 function moveTo(dir){
                if(dir == 'Right')
				{
                 index++;
			     if(index == len){index = 0;}
			      Tony(index);
                }else if(dir == 'Left')
				{
                   index--;
			       if(index == -1){index = len - 1;}
			      Tony(index);
                }
        };
        function swipeDirection(x1, x2, y1, y2){
            return x1 - x2 > 0 ? 'Left' : 'Right';
        };

		// start setInterval		
		$(This).find('ul').css("width",sWidth * (len));
		$(This).hover(function(){
			clearInterval(Timer);
			show($(This).find('.preNext'));
		},function(){
			hide($(This).find('.preNext'));
			Timer=setInterval(function(){
				Tony(index);
				index++;
				if(len == index){index = 0;}
			}, 2000)
		}).trigger("mouseleave");

		function Tony(index){
			var new_width = -index * sWidth;
			$(This).find('ul').stop(true,false).animate({'left' : new_width},300);
			$(This).find('.btn span').stop(true,false).eq(index).addClass('on').siblings().removeClass('on');
		};
		//siblings()返回所有同胞元素
       //jQuery stop() 方法用于停止动画或效果，在它们完成之前。
       //stop() 方法适用于所有 jQuery 效果函数，包括滑动、淡入淡出和自定义动画。
		//stop(true)等价于stop(true,false): 停止被选元素的所有加入队列的动画。
        //全部停止
       //stop(true,true):停止被选元素的所有加入队列的动画，但允许完成当前动画。
        //完成当前动画后停止
       //stop()等价于stop(false,false):停止被选元素当前的动画，但允许完成以后队列的所有动画。
       //stop(false,true):立即结束当前的动画到最终效果，然后完成以后队列的所以动画
	   //比前一个多了立即
		// show hide
		function show(obj){ $(obj).stop(true,false).fadeIn();}
		function hide(obj){ $(obj).stop(true,false).fadeOut();}
	}
});