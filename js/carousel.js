function Carousel(obj){
  this.eleInners = obj.eleInners || null; //默认可自定义的容器高为300
  this.eleDots = obj.eleDots || null; //容器的比例
  this.liImgs = this.eleInners.getElementsByTagName('li');
  this.liDots = this.eleDots.children;
  this.elePrev = obj.elePrev || null;
  this.eleNext = obj.eleNext || null;

  this.start = obj.start || false; //是否自动播放, 默认不自动播放
  this.setAutoTimer = null; //自动播放定时器
  this.TIME_DURATION = obj.duration || 3000; //自动播放定时器间隔

  this.LI_WIDTH = this.liImgs[0].offsetWidth;
  this.index = 0;
  this.circle = 0;
  this.init();
}
Carousel.prototype = {
  constructor: Carousel, //构造函数指向原函数
  init:function(){
    //首先是克隆
    this.eleInners.appendChild(this.liImgs[0].cloneNode(true));

    //生成小点点
    for(let i= 0,len = this.liImgs.length -1;i<len;i++){
        let li = document.createElement('li');
        // li.innerHTML = i+1;
        li.setAttribute("id",i+1) ;//set id
        this.eleDots.appendChild(li)
    }
    //第一个点高亮
    this.liDots[0].className = 'cur';
    if(this.start){
      this.setAutoTimer = setInterval(this.autoplay.bind(this),this.TIME_DURATION)
    }
    this.bindEvent();

  },

  animate:function(obj,targetPlace){
      clearInterval(obj.timer);
      obj.timer = setInterval(function(){
          //判断移动的位置是向左移动还是向右移动
          var speed = obj.offsetLeft > targetPlace ? -15:15;
          var result = targetPlace - obj.offsetLeft;
          //只要移动的差值大于speed，那么就一直让obj.style.left 改变
          if(Math.abs(result) > Math.abs(speed)){
              obj.style.left = obj.offsetLeft + speed +'px'
          }else{
              //否则如果已经移动的，obj.offsetleft与要移动的位置十分接近了，
              obj.style.left = targetPlace+'px';
              clearInterval(obj.timer);
          }
      },10)

  },

  //向左的autoplay
  autoplay:function (){
      this.index++;
      if(this.index > this.liImgs.length -1){
          this.eleInners.style.left = 0;//赶快跳回去
          this.index = 1;//找到第二张图片
      }
      this.animate(this.eleInners, -this.index * this.LI_WIDTH);
      this.circle++;

      if(this.circle >= this.liImgs.length -1){
          this.circle = 0;//circle回到第一个点
      }
      for(var i= 0,len = this.liDots.length;i<len;i++){
          this.liDots[i].className ='';

      }
      this.liDots[this.circle].className = 'cur'
  },
  //向右移动
  moveright:function (){
      this.index--;
      if(this.index <0){
          this.eleInners.style.left = -(this.liImgs.length -2)* this.LI_WIDTH + 'px';
          this.index = this.liImgs.length -2;//找到倒数第二张图片

      }
      this.animate(this.eleInners, -this.index * this.LI_WIDTH);
      this.circle --;

      if(this.circle < 0){
          this.circle = this.liImgs.length - 2;//circle回到最后一个点
      }
      for(var i= 0,len = this.liDots.length;i<len;i++){
          this.liDots[i].className ='';
      }
      this.liDots[this.circle].className = 'cur'
  },
  bindEvent: function() { //绑定事件
    let $this = this;
    //        鼠标移入，清除定时器
    $this.eleInners.addEventListener('mouseenter',function(event){
        clearInterval($this.setAutoTimer)
    });
    //        鼠标移出，开启定时器
    $this.eleInners.addEventListener('mouseleave',function(event){
      if($this.start){
        $this.setAutoTimer = setInterval($this.autoplay.bind($this),$this.TIME_DURATION)
      }
    });
    //        点击dots
    $this.eleDots.addEventListener('click',function(event){
      console.log('clicked')
        clearInterval($this.setAutoTimer);
        var target = event.target;
        var currentTarget = event.currentTarget;
        $this.index = Number(target.getAttribute('id')) - 0 - 1;
        $this.circle = $this.index ;
        for(var i= 0,len = $this.liDots.length;i<len;i++){
            $this.liDots[i].className ='';
        }
        $this.liDots[$this.circle].className = 'cur'
        $this.animate($this.eleInners, - $this.index * $this.LI_WIDTH);
    })
  //   $this.elePrev.addEventListener('click',function(event){
  //       clearInterval($this.setAutoTimer)
  //       $this.moveright();
  //       if(this.start){
  //         this.setAutoTimer = setInterval(this.autoplay.bind(this),this.TIME_DURATION)
  //       }
  //   })
  //   $this.eleNext.addEventListener('click',function(event){
  //       clearInterval($this.setAutoTimer)
  //       $this.autoplay();
  //       if(this.start){
  //         this.setAutoTimer = setInterval(this.autoplay.bind(this),this.TIME_DURATION)
  //       }
  // })
}

}
