var contentDiv = document.getElementById('content');
var startDiv = document.getElementById('start');
var mainDiv = document.getElementById('main');
var scoreDiv = document.getElementById('score');
var suspendDiv = document.getElementById('suspend');
var continueDiv = document.getElementById('continue');
var settlementDIV = document.getElementById('settlement');
var score = 0;
var contentClass = contentDiv.currentStyle ? contentDiv.currentStyle : window.getComputedStyle(contentDiv, null);
var stageSizeX = parseInt(contentClass.width);
var stageSizeY = parseInt(contentClass.height);


var plane = function (centerX, centerY, planeModel, speed) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.sizeX = planeModel.width;
    this.sizeY = planeModel.height;
    this.imgSrc = planeModel.imgSrc;
    this.boomSrc = planeModel.boomSrc;
    this.boomTime = planeModel.boomTime;
    this.speed = speed;
    this.hp = planeModel.hp;

    this.currentX = this.centerX - this.sizeX / 2;
    this.currentY = this.centerY - this.sizeY / 2;
}


plane.prototype.draw = function () {
    this.imgNode = new Image();
    this.imgNode.src = this.imgSrc;
    this.imgNode.style.top = this.centerY - this.sizeY / 2 + 'px';
    this.imgNode.style.left = this.centerX - this.sizeX / 2 + 'px';
    this.imgNode.style.position = 'absolute';
    mainDiv.appendChild(this.imgNode);

}
var planeS = {
    width: 34,
    height: 24,
    imgSrc: '/img/enemy-plane-s.png',
    boomSrc: '/img/enemy-plane-s-boom.gif',
    boomTime: 100,
    hp: 1
}

var planeM = {
    width: 46,
    height: 60,
    imgSrc: '/img/enemy-plane-m.png',
    boomSrc: '/img/enemy-plane-m-boom.gif',
    boomTime: 100,
    hp: 5
}
var planeL = {  
    width: 110,
    height: 164,
    imgSrc: '/img/enemy-plane-l.png',
    boomSrc: '/img/enemy-plane-l-boom.gif',
    boomTime: 100,
    hp: 15
}
var ourplane={
    width: 66,
    height: 80,
    imgSrc: '/img/our-plane.gif',
    boomSrc: '/img/our-plane-boom.gif',
    boomTime: 100,
    hp: 1

}
var bulletX={
    width:6,
    height:14,
    imgSrc:'/img/our-bullet.png',
    
}








plane.prototype.check = function () {
    this.isBottomRange=this.currentY>(stageSizeY-this.sizeY)
    this.isTopRange=this.currentY < 0;
}
plane.prototype.move = function () {
    this.currentY += this.speed;
    this.centerY = this.currentY + this.sizeY/2;
	this.imgNode.style.top = this.currentY + 'px';
    this.check();
}

var Enemy=function(){
    this.segments=[];
    this.generatedCount=0;
}
var randomNumber=function(min,max){
    return Math.round(Math.random()*(max-min))+min;
}
Enemy.prototype.create=function(){
    this.generatedCount++;
    if(this.generatedCount%15===0){
        this.newEnemy=new plane(randomNumber(planeL.width/2,stageSizeX-planeL.width/2),12,planeL,1)
    }else if(this.generatedCount%5===0){
        this.newEnemy=new plane(randomNumber(planeM.width/2,stageSizeX-planeM.width/2),12,planeM,randomNumber(2,3))
    }
    else{
        this.newEnemy=new plane(randomNumber(planeS.width/2,stageSizeX-planeS.width/2),12,planeS,randomNumber(3,5))
    }

    this.segments.push(this.newEnemy)
    this.newEnemy.draw();
}
Enemy.prototype.moveAllEnemy=function(){
    for(var i=0;i<this.segments.length;i++){
        this.segments[i].move();

        if(this.segments[i].isBottomRange){
            mainDiv.removeChild(this.segments[i].imgNode);
            this.segments.splice(i,1);
        }
        for (var j = 0; j < plane1.segment.length; j++) {
			
			
			if (this.segments[i].hp > 0) {
				var horizontalCollision = Math.abs(this.segments[i].centerX - plane1.segment[j].centerX) < (this.segments[i].sizeX/2 + plane1.segment[j].sizeX/2)
				var verticalCollision = Math.abs(this.segments[i].centerY - plane1.segment[j].centerY) < (this.segments[i].sizeY/2 + plane1.segment[j].sizeY/2)
				var checkBulletCollision = horizontalCollision && verticalCollision;
	
				if (checkBulletCollision) {
					score++;
					scoreDiv.innerHTML = score;
					this.segments[i].imgNode.src = this.segments[i].hitSrc ? this.segments[i].hitSrc : this.segments[i].boomSrc;
					this.segments[i].hp--;
					mainDiv.removeChild(plane1.segment[j].imgNode);
					plane1.segment.splice(j,1);
				}
            }
        }  
        
            var ourHorizontalCollision = Math.abs(this.segments[i].centerX - plane1.centerX) < (this.segments[i].sizeX/2 + plane1.sizeX/2)
            var ourVerticalCollision = Math.abs(this.segments[i].centerY - plane1.centerY) < (this.segments[i].sizeY/2 + plane1.sizeY/2)
            var checkOurCollision = ourHorizontalCollision && ourVerticalCollision;
            if (checkOurCollision) {
                this.segments[i].hp = 0;
                plane1.hp--;
            }

            if (this.segments[i].hp <= 0) {
                this.segments[i].imgNode.src = this.segments[i].boomSrc;
                this.segments[i].boomTime-=10;
                // 把飞机干掉
                if (this.segments[i].boomTime <= 0) {
                    mainDiv.removeChild(this.segments[i].imgNode);
                    this.segments.splice(i,1);
                }
            }
    }
}



var enemies=new Enemy();

var plane1 = new plane(stageSizeX/2, stageSizeY-ourplane.height/2, ourplane, 10);
plane1.draw();
mainDiv.onmousemove=function(ev){
    plane1.centerX=ev.clientX-contentDiv.offsetLeft;
    if(plane1.centerX<0){
        plane1.centerX=0;
    }
    if(plane1.centerX>stageSizeX){
        plane1.centerX=stageSizeX;
    }
    plane1.centerY=ev.clientY-contentDiv.offsetTop;
    if(plane1.centerY<0){
        plane1.centerY=0;
    }
    if(plane1.centerY>stageSizeY-plane1.sizeY/2){
       plane1.centerY=stageSizeY-plane1.sizeY/2;
    }
    plane1.currentX=plane1.centerX-plane1.sizeX/2;
    plane1.currentY=plane1.centerY-plane1.sizeY/2;

    plane1.imgNode.style.left=plane1.currentX+'px';
    plane1.imgNode.style.top=plane1.currentY+'px';
}
plane1.segment=[]

var Bullet=plane;


function creatNewBullet(){
    plane1.newBullet= new Bullet(plane1.centerX,plane1.centerY-plane1.sizeY/2,bulletX,-10);
    plane1.segment.push(plane1.newBullet);
    plane1.newBullet.draw();
}
function moveNewBullet(){
    for(var i=0;i<plane1.segment.length;i++){
        plane1.segment[i].move();
        if(plane1.segment[i].isTopRange){
            mainDiv.removeChild(plane1.segment[i].imgNode);
            plane1.segment.splice(i,1);
        }
    }
}
var gameOver=function(){
    plane1.imgNode.src=plane1.boomSrc;
    clearInterval(timeID);
    settlementDIV.style.display='block'
    document.querySelector('p#final-score').innerText=score;


}

var time=0;
var timeID;
var start = function () {
	//隐藏开始页面
	startDiv.style.display = 'none';
	//显示游戏页面
	mainDiv.style.display = 'block';
	// 
	suspendDiv.style.display = 'none';
	settlementDIV.style.display = 'none';
    timeID=setInterval(function(){
    time++;
    if(time%50===0){
        enemies.create();
    }
    enemies.moveAllEnemy();
   

    if (time%5 === 0) {
        creatNewBullet();
    }
    moveNewBullet();
    if(plane1.hp<=0){
        gameOver();
    }
},20)
}
var restart = function () {
	window.location.reload();
}

continueDiv.onclick = function (ev) {
	ev.stopPropagation();
	start();
};

mainDiv.onclick = function () {
	clearTimeout(timeID);
	suspendDiv.style.display = 'block';
}