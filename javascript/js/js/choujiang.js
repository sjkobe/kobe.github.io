var pointer=document.getElementsByClassName("pointer");
var pg=document.getElementsByClassName("pg");

        var canClick = true;

        pointer.onclick = function() {
            if(canClick === true) {
                canClick = false;
                // 生成随机数
                var randomNumber = Math.floor(Math.random() * 100);
                //  	console.log(randomNumber);

                var grade;
                // 根据随机数转换成为对应的中奖等级
                if(randomNumber < 1) {
                    grade = {
                        code: 1,
                        text: "一等奖"
                    };
                } else if(randomNumber < 5) {
                    grade = {
                        code: 2,
                        text: "二等奖"
                    };
                } else if(randomNumber < 13) {
                    grade = {
                        code: 3,
                        text: "三等奖"
                    };
                } else if(randomNumber < 21) {
                    grade = {
                        code: 4,
                        text: "四等奖"
                    };
                } else if(randomNumber < 35) {
                    grade = {
                        code: 5,
                        text: "五等奖"
                    };
                } else if(randomNumber < 50) {
                    grade = {
                        code: 6,
                        text: "六等奖"
                    };
                } else {
                    grade = {
                        code: 7,
                        text: "感谢参与继续努力"
                    };
                }

                console.log(grade);

                // 计算出当前应该转的角度
                var currentAngle = 30 + (360 / 7) * (grade.code - 1);
                //      console.log(currentAngle);

                // 加上过渡效果
                turntable.style.transition = 'all 3s';
                turntable.style.transform = 'rotate(' + (currentAngle + 360 * 3) + 'deg)';

                // 等转完之后【悄悄】把角度减去三圈 要先干掉过渡
                setTimeout(function() {
                    turntable.style.transition = 'all 0s';
                    turntable.style.transform = 'rotate(' + currentAngle + 'deg)';
                    alert(grade.text);
                    canClick = true;
                }, 3000);
            }

        }
