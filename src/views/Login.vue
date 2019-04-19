<template>
  <div class="login">
    <canvas id="Mycanvas"></canvas>
    <div class="loginBox">
        <van-tabs  swipeable>
            <form autocomplete="off" ref="formdd" @submit.prevent="onSubmit" action="https://www.baidu.com">
                <van-tab v-for="(item,index) in tabs" :title=item.title :key="item.title">
                    <div class="formItem">
                        <div class="inpBox">
                           <i  :class=tabs[index].icon01 ></i>
                            <input type="text" v-model= formMessage[tabs[index].icon01] /> 
                        </div>
                        
                        <div class="errBox">这是一则提示</div>
                    </div>
                    <div class="formItem">
                        <div class="inpBox">
                            <i  :class=tabs[index].icon02></i>
                            <input type="text" v-model= formMessage[tabs[index].icon02] />
                            <van-button type="info" round id="msgBtn" v-if= "index == 1">{{btnmsg}}</van-button>
                        </div>
                        <div class="errBox">这是一则提示</div>
                    </div>
                </van-tab>
                <van-button native-type="submit" round id="loginBtn">登录</van-button>
            </form>
        </van-tabs>
    </div>
  </div>
</template>


<style lang="stylus">
	html,body{
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}
	.login {
		width: 100%;
		height: 100%;
        position: relative;
        z-index: 9;
        background-image: url(../../public/images/login_bac.jpg);
        background-repeat: no-repeat;
        background-position: 0px 0px;
        background-size: 100% 100%;
        display: flex;
        justify-content:center;
        align-items:center;
	}
	#Mycanvas {
        width: 100%;
        height: 100%;
		/*background: url(../../public/images/login_bac.jpg) 50% 50% no-repeat;*/
        background: inherit;
        -webkit-filter: blur(10px);
        -moz-filter: blur(10px);
        -ms-filter: blur(10px);
        -o-filter: blur(10px);
        filter: blur(10px);
		position: absolute;
		z-index: -10;
		top: 0;
		left: 0;
	}
    .loginBox {
        width: 100%;
        margin: 0 4%;
        padding: 5%;
        background: #fff;
        border-radius: 15px;
        .van-tabs--line .van-tabs__wrap {
            height: auto;
        }
        .van-tabs__line {
            height: 5px;
            background-color: #40a9ff;
        }
        .van-tabs__nav {
            background:transparent;
        }
        .van-tabs__nav--line {
            padding-bottom: 0.6rem;
        }
        .van-hairline--top-bottom::after {
            border-width:0;
        }
    }
    #loginBtn {
        width:100%;
        height:75px;
        background-image: linear-gradient(to right , #1890ff 10%,#69c0ff 100%);
        color: #fff;
        font-size: 14PX;/*no*/
    }
    .formItem {
        position:relative;
        margin: 0 0 48px;
        
    }

    .inpBox {
        display: flex;
        justify-content: space-between;
    }

    .formItem input {
        display: inline-block;
        box-sizing: border-box;
        border-radius:12px;
        width: 100%;
        padding: 6px 50px 6px 75px;
        height: 75px;
        font-size: 16px;
        border:1px solid #ededed;
    }

    .formItem input:not(.input-disabled):hover {
        border-color: #40a9ff;
        border-right-width: 1px!important;
        box-shadow: 0 0 5px #40a9ff;
    }

    .formItem .iconfont {
        position: absolute;
        top: 25%;
        left:20px;
    }
    
    .van-tab__pane:last-of-type .formItem:last-of-type input{
        width:55%;
        left: 0px;
    }
    
    #msgBtn {
        height: 2rem;
        width: 30%;
    }
    
    .errBox {
        color: #FF0033;
        text-align: left;
        padding: 4px 0;
        font-size: 14PX;
        display:none;
    }

    .van-tabs__content {
        padding-top: 1.8rem;
    }
</style>
<script>

export default {
	name : "Login",
	data() {
		return {
			models : [],
            tabs : [{
                    title:"账号登录",
                    icon01:"iconfont icon-yonghu",
                    icon02:"iconfont icon-mima",
                    id01: "username",
                    id02: "pwd"
                },{
                    title:"短信登录",
                    icon01:"iconfont icon-shouji",
                    icon02:"iconfont icon-youjian",
                    id01: "phone",
                    id02: "mescode"
                }],
            formMessage : {
                username: "",
                pwd: "",
                phone: "",
                mescode: ""
            },
            btnmsg : "发送验证码"
		}
	},
	methods: {
        checkform: function() {
            let str = document.querySelector(".van-tab--active").innerText;
            if(str == "账号登录") {
                if(!this.formMessage.username) {
                    document.querySelectorAll(".errBox")[0].innerText = "账号不能为空！";
                    document.querySelectorAll(".errBox")[0].style.display = "block";
                }else {
                    document.querySelectorAll(".errBox")[0].style.display = "none";
                }
                if(!this.formMessage.pwd) {
                console.log(this.formMessage.pwd)
                    document.querySelectorAll(".errBox")[1].innerText = "密码不能为空！";
                    document.querySelectorAll(".errBox")[1].style.display = "block";
                }else {
                console.log("aaaa")
                    document.querySelectorAll(".errBox")[1].style.display = "none";
                }
            }else {
                
            }
            
        },
        onSubmit: function() {
                this.checkform()
            return false;
        }
    },
    mounted(){
    	var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight,
        POINT = 10;

    var canvas = document.getElementById('Mycanvas');
    console.log(document.querySelector("body"));
    canvas.width = WIDTH,
        canvas.height = HEIGHT;
    var context = canvas.getContext('2d');
    context.strokeStyle = 'rgba(0,0,0,0.1)',
        context.strokeWidth = 5,
        context.fillStyle = 'rgba(255,255,255,0.6)';
    var circleArr = [];

    //线条：开始xy坐标，结束xy坐标，线条透明度
    function Line(x, y, _x, _y, o) {
        this.beginX = x,
            this.beginY = y,
            this.closeX = _x,
            this.closeY = _y,
            this.o = o;
    }
    //点：圆心xy坐标，半径，每帧移动xy的距离
    function Circle(x, y, r, moveX, moveY) {
        this.x = x,
            this.y = y,
            this.r = r,
            this.moveX = moveX,
            this.moveY = moveY;
    }
    //生成max和min之间的随机数
    function num(max, _min) {
        var min = arguments[1] || 0;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    // 绘制原点
    function drawCricle(cxt, x, y, r, moveX, moveY) {
        var circle = new Circle(x, y, r, moveX, moveY)
        cxt.beginPath()
        cxt.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI)
        cxt.closePath()
        cxt.fill();
        return circle;
    }
    //绘制线条
    function drawLine(cxt, x, y, _x, _y, o) {
        var line = new Line(x, y, _x, _y, o)
        cxt.beginPath()
        cxt.strokeStyle = 'rgba(255,255,255,' + o + ')'
        cxt.moveTo(line.beginX, line.beginY)
        cxt.lineTo(line.closeX, line.closeY)
        cxt.closePath()
        cxt.stroke();

    }
    //每帧绘制
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for(var i = 0; i < POINT; i++) {
            drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r);
        }
        for(var i = 0; i < POINT; i++) {
            for(var j = 0; j < POINT; j++) {
                if(i + j < POINT) {
                    var A = Math.abs(circleArr[i + j].x - circleArr[i].x),
                        B = Math.abs(circleArr[i + j].y - circleArr[i].y);
                    var lineLength = Math.sqrt(A * A + B * B);
                    var C = 1 / lineLength * 7 - 0.009;
                    var lineOpacity = 0.05;
                    // var lineOpacity = C > 0.03 ? 0.03 : C;
                    if(lineOpacity > 0) {
                        drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i + j].x, circleArr[i + j].y, lineOpacity);
                    }
                }
            }
        }
    }
    //初始化生成原点
    function init() {
        circleArr = [];
        for(var i = 0; i < POINT; i++) {
            circleArr.push(drawCricle(context, num(WIDTH), num(HEIGHT), num(15, 2), num(10, -10) / 40, num(10, -10) / 40));
        }
        draw();
    }
    //调用执行
    // window.onload = function() {
        init();
        setInterval(function() {
            for(var i = 0; i < POINT; i++) {
                var cir = circleArr[i];
                cir.x += cir.moveX;
                cir.y += cir.moveY;
                if(cir.x > WIDTH) cir.x = 0;
                else if(cir.x < 0) cir.x = WIDTH;
                if(cir.y > HEIGHT) cir.y = 0;
                else if(cir.y < 0) cir.y = HEIGHT;
            }
            draw();
        }, 10);
    // }
    }
}
//定义画布宽高和生成点的个数
    
 </script>