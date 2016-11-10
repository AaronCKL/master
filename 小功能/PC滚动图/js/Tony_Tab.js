/* ����������ͷ�� www.datouwang.com */
jQuery.fn.extend({
	
	slideFocus: function(){
		var This = $(this);//$(this)	��ǰ HTML Ԫ��
		var sWidth = $(This).width(),
			len    =$(This).find('ul li').length,
			index  = 0,
			Timer;
        //�ҵ���� thisһֱ�ڱ� ˭������ this��ָ��˭��$(This)�Ѿ���#focus�������ڱ䣬�����index(this)��ָ��꾭���ĵط���this.
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
       var touches = e.originalEvent.touches[0];//touches[0]��ΪoriginalEvent.touches[0]��touches[0]��bug
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
                if((touch.x2 && Math.abs(touch.x1 - touch.x2) > min) ||//abs() �����ɷ������ľ���ֵ��
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
		//siblings()��������ͬ��Ԫ��
       //jQuery stop() ��������ֹͣ������Ч�������������֮ǰ��
       //stop() �������������� jQuery Ч���������������������뵭�����Զ��嶯����
		//stop(true)�ȼ���stop(true,false): ֹͣ��ѡԪ�ص����м�����еĶ�����
        //ȫ��ֹͣ
       //stop(true,true):ֹͣ��ѡԪ�ص����м�����еĶ�������������ɵ�ǰ������
        //��ɵ�ǰ������ֹͣ
       //stop()�ȼ���stop(false,false):ֹͣ��ѡԪ�ص�ǰ�Ķ���������������Ժ���е����ж�����
       //stop(false,true):����������ǰ�Ķ���������Ч����Ȼ������Ժ���е����Զ���
	   //��ǰһ����������
		// show hide
		function show(obj){ $(obj).stop(true,false).fadeIn();}
		function hide(obj){ $(obj).stop(true,false).fadeOut();}
	}
});