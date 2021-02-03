export default function draw() {
    var canvas=document.querySelector('canvas')
    if(!canvas)return;
    var ctx=canvas.getContext('2d')
    ctx.scale(canvas.width/1000,canvas.height/1000)
    // 背景
    ctx.fillStyle='#f5efe3'
    ctx.fillRect(0,0,1000,1000)
    
    // 头发
    ctx.beginPath()
    ctx.fillStyle='#272727'
    ctx.arc(480,360,350,0,6.28)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(480,740,330,-.3,3,true)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(210,140,96,0,6.18)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(800,110,100,0,6.18)
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(135,200)
    ctx.lineTo(111,200)
    ctx.lineTo(150,208)
    ctx.fill()
    
    ctx.beginPath()
    ctx.moveTo(152,780)
    ctx.quadraticCurveTo(160,830,200,850)
    ctx.quadraticCurveTo(188,818,200,795)
    ctx.quadraticCurveTo(220,830,270,868)
    ctx.quadraticCurveTo(280,830,290,825)
    ctx.quadraticCurveTo(320,900,418,900)
    ctx.quadraticCurveTo(360,820,460,850)
    ctx.quadraticCurveTo(530,880,535,950)
    ctx.quadraticCurveTo(640,880,655,810)
    ctx.quadraticCurveTo(700,860,705,870)
    ctx.quadraticCurveTo(750,820,760,700)
    ctx.quadraticCurveTo(800,760,792,760)
    ctx.quadraticCurveTo(820,690,795,640)
    ctx.fill()

    // 红带
    ctx.beginPath()
    ctx.fillStyle='#bb3829'
    ctx.moveTo(690,80)
    ctx.quadraticCurveTo(720,23,785,193)
    ctx.quadraticCurveTo(720,103,700,90)
    ctx.fill()

    ctx.moveTo(803,211)
    ctx.quadraticCurveTo(858,308,945,285)
    ctx.quadraticCurveTo(908,318,916,340)
    ctx.quadraticCurveTo(858,343,825,293)
    ctx.fill()

    ctx.moveTo(825,313)
    ctx.quadraticCurveTo(848,358,881,380)
    ctx.quadraticCurveTo(939,400,955,480)
    ctx.quadraticCurveTo(930,499,925,549)
    ctx.quadraticCurveTo(919,459,875,427)
    ctx.quadraticCurveTo(842,407,830,380)
    ctx.fill()

    ctx.fill()
    ctx.moveTo(139,282)
    ctx.quadraticCurveTo(107,317,30,344)
    ctx.quadraticCurveTo(70,352,67,392)
    ctx.quadraticCurveTo(110,384,130,359)
    ctx.fill()

    ctx.moveTo(130,359)
    ctx.quadraticCurveTo(70,424,50,507)
    ctx.quadraticCurveTo(70,514,85,542)
    ctx.quadraticCurveTo(102,460,134,400)
    ctx.fill()

    // 脸
    ctx.beginPath()
    ctx.fillStyle='#e5c8b6'
    ctx.moveTo(257,112)
    ctx.quadraticCurveTo(130,260,164,657)
    ctx.quadraticCurveTo(160,790,457,834)
    ctx.quadraticCurveTo(700,820,770,642)
    ctx.quadraticCurveTo(812,434,690,102)
    ctx.fill()

    // 耳朵-左
    ctx.beginPath()
    ctx.lineWidth=1
    ctx.fillStyle='#e5c8b6'
    ctx.moveTo(780,527)
    ctx.quadraticCurveTo(820,392,889,462)
    ctx.quadraticCurveTo(940,566,845,639)
    ctx.quadraticCurveTo(800,650,784,639)
    ctx.quadraticCurveTo(774,632,769,642)
    ctx.stroke()
    ctx.fill()
    ctx.beginPath()
    ctx.fillStyle='#d3a894'
    ctx.moveTo(795,539)
    ctx.quadraticCurveTo(848,422,880,497)
    ctx.bezierCurveTo(900,554,830,632,789,597)
    ctx.quadraticCurveTo(804,565,795,539)
    ctx.stroke()
    ctx.fill()
    ctx.beginPath()
    ctx.strokeStyle='#27272727'
    ctx.moveTo(819,497)
    ctx.lineWidth=2
    ctx.quadraticCurveTo(880,490,860,565)
    ctx.moveTo(807,519)
    ctx.bezierCurveTo(850,524,837,580,795,585)
    ctx.stroke()

    // 耳朵-右
    ctx.beginPath()
    ctx.lineWidth=1
    ctx.strokeStyle='#272727'
    ctx.fillStyle='#e5c8b6'
    ctx.moveTo(157,469)
    ctx.bezierCurveTo(60,385,50,650,164,647)
    ctx.stroke()
    ctx.fill()

    ctx.beginPath()
    ctx.lineWidth=2
    ctx.strokeStyle='#272727'
    ctx.fillStyle='#d3a894'
    ctx.moveTo(152,522)
    ctx.bezierCurveTo(100,420,50,607,155,620)
    ctx.stroke()
    ctx.fill()

    ctx.beginPath()
    ctx.strokeStyle='#27272727'
    ctx.moveTo(155,519)
    ctx.quadraticCurveTo(150,572,157,629)
    ctx.moveTo(149,514)
    ctx.quadraticCurveTo(120,500,99,552)
    ctx.moveTo(150,519)
    ctx.quadraticCurveTo(122,512,140,594)
    ctx.stroke()


    
    // 右耳上下方头发补齐
    ctx.fillStyle='#272727'
    ctx.beginPath()
    ctx.moveTo(130,359)
    ctx.quadraticCurveTo(124,460,156,509)
    ctx.lineTo(157,475)
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(150,647)
    ctx.quadraticCurveTo(150,660,150,762)
    ctx.lineTo(162,648)
    ctx.fill()

    // 额头标记
    ctx.beginPath()
    ctx.fillStyle='#bc372b'
    ctx.moveTo(417,225)
    ctx.quadraticCurveTo(444,275,397,294)
    ctx.quadraticCurveTo(394,349,442,334)
    ctx.quadraticCurveTo(480,310,437,289)
    ctx.quadraticCurveTo(419,290,427,312)
    ctx.quadraticCurveTo(447,300,442,317)
    ctx.quadraticCurveTo(410,330,409,309)
    ctx.quadraticCurveTo(417,257,450,290)
    ctx.fill()

    // 刘海
    ctx.beginPath()
    ctx.fillStyle='#272727'
    ctx.moveTo(237,85)
    ctx.lineTo(159,314)
    ctx.lineTo(212,324)
    ctx.quadraticCurveTo(210,275,215,270)
    ctx.lineTo(224,310)
    ctx.quadraticCurveTo(244,322,272,317)
    ctx.quadraticCurveTo(270,270,282,254)
    ctx.quadraticCurveTo(277,289,302,319)
    ctx.quadraticCurveTo(334,322,364,305)
    ctx.lineTo(365,250)
    ctx.lineTo(369,305)
    ctx.lineTo(419,312)
    ctx.quadraticCurveTo(410,202,434,149)
    ctx.quadraticCurveTo(424,215,465,309)
    ctx.lineTo(497,309)
    ctx.quadraticCurveTo(462,245,470,215)
    ctx.quadraticCurveTo(482,269,515,309)
    ctx.quadraticCurveTo(572,292,645,312)
    ctx.quadraticCurveTo(644,280,627,259)
    ctx.quadraticCurveTo(650,277,655,305)
    ctx.quadraticCurveTo(684,320,719,317)
    ctx.quadraticCurveTo(727,299,722,284)
    ctx.quadraticCurveTo(737,295,729,314)
    ctx.lineTo(764,309)
    ctx.lineTo(699,95)
    ctx.fill()

    // 眉毛
    ctx.beginPath()
    ctx.fillStyle='#272727'
    ctx.moveTo(474,344)
    ctx.quadraticCurveTo(600,260,687,365)
    ctx.quadraticCurveTo(605,287,482,360)
    ctx.quadraticCurveTo(474,355,474,344)
    ctx.fill()
    ctx.moveTo(372,340)
    ctx.quadraticCurveTo(250,260,180,384)
    ctx.quadraticCurveTo(280,294,364,362)
    ctx.quadraticCurveTo(377,355,372,340)
    ctx.fill()

    // 眼睛-黑底
    ctx.beginPath()
    ctx.fillStyle='#272727'
    ctx.moveTo(186,515)
    ctx.bezierCurveTo(180,362,370,335,367,504)
    ctx.bezierCurveTo(380,702,170,660,186,515)
    ctx.fill()
    ctx.moveTo(494,522)
    ctx.bezierCurveTo(489,350,700,330,699,512)
    ctx.bezierCurveTo(720,682,480,662,494,522)
    ctx.fill()

    // 眼睛-阴影灰
    ctx.beginPath()
    ctx.fillStyle='#c8c9c7'
    ctx.moveTo(212,450)
    ctx.bezierCurveTo(235,390,330,390,342,455)
    ctx.fill()
    ctx.moveTo(514,472)
    ctx.bezierCurveTo(540,425,600,355,672,450)
    ctx.fill()

    // 眼睛-眼球白
    ctx.beginPath()
    ctx.fillStyle='#fff'
    ctx.moveTo(199,517)
    ctx.bezierCurveTo(186,390,350,365,355,502)
    ctx.bezierCurveTo(376,652,200,680,199,517)
    ctx.fill()
    ctx.moveTo(504,510)
    ctx.bezierCurveTo(510,395,680,370,690,510)
    ctx.bezierCurveTo(705,664,480,655,504,510)
    ctx.fill()

    // 眼睛-眼珠棕
    ctx.beginPath()
    ctx.fillStyle='#b55227'
    ctx.arc(272,550,42,0,6.18)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(552,550,42,0,6.18)
    ctx.fill()

    // 眼睛-眼珠黑
    ctx.beginPath()
    ctx.fillStyle='#272727'
    ctx.arc(272,550,20,0,6.18)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(552,550,20,0,6.18)
    ctx.fill()

    // 眼睛-眼珠白光
    ctx.beginPath()
    ctx.strokeStyle='#fff'
    ctx.lineWidth=5
    ctx.moveTo(245,557)
    ctx.lineTo(259,553)
    ctx.moveTo(527,555)
    ctx.lineTo(536,552)
    ctx.stroke()

    // 鼻子
    ctx.beginPath()
    ctx.strokeStyle='#27272727'
    ctx.lineWidth=3
    ctx.arc(422,607,10,2,5.6,false)
    ctx.stroke()

    // 嘴巴
    ctx.beginPath()
    ctx.fillStyle='#6c241c'
    ctx.moveTo(192,659)
    ctx.quadraticCurveTo(417,717,717,657)
    ctx.bezierCurveTo(625,820,260,820,192,659)
    ctx.fill()

    // 牙齿
    ctx.beginPath()
    ctx.fillStyle='#fff'
    ctx.moveTo(192,659)
    ctx.lineTo(219,697)
    ctx.quadraticCurveTo(235,715,265,700)
    ctx.quadraticCurveTo(274,717,310,727)
    ctx.quadraticCurveTo(344,724,350,690)
    ctx.bezierCurveTo(357,740,430,740,444,694)
    ctx.bezierCurveTo(450,747,550,737,540,687)
    ctx.quadraticCurveTo(604,724,624,672)
    ctx.quadraticCurveTo(417,700,192,659)
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(717,657)
    ctx.quadraticCurveTo(690,660,660,666)
    ctx.quadraticCurveTo(654,674,674,687)
    ctx.quadraticCurveTo(640,667,620,716)
    ctx.quadraticCurveTo(577,687,554,740)
    ctx.quadraticCurveTo(480,710,470,774)
    ctx.quadraticCurveTo(404,710,377,760)
    ctx.quadraticCurveTo(324,710,300,750)
    ctx.quadraticCurveTo(254,700,244,724)
    ctx.bezierCurveTo(320,800,620,820,718,657)
    ctx.fill()

    // 身体
    ctx.beginPath()
    ctx.fillStyle='#e5c8b6'
    ctx.moveTo(220,1000)
    ctx.bezierCurveTo(197,840,750,850,747,1000)
    ctx.fill()
    // 衣服
    ctx.beginPath()
    ctx.fillStyle='#b73f31'
    ctx.moveTo(320,1000)
    ctx.quadraticCurveTo(310,944,327,900)
    ctx.lineTo(384,890)
    ctx.quadraticCurveTo(364,954,387,1000)
    ctx.lineTo(320,1000)
    ctx.moveTo(537,1000)
    ctx.quadraticCurveTo(560,917,574,888)
    ctx.lineTo(637,906)
    ctx.quadraticCurveTo(635,947,627,1000)
    ctx.fill()
    // 金边
    ctx.beginPath()
    ctx.strokeStyle='#f4c944'
    ctx.lineWidth=6
    ctx.moveTo(320,1000)
    ctx.quadraticCurveTo(310,944,327,900)
    ctx.moveTo(384,890)
    ctx.quadraticCurveTo(364,954,387,1000)
    ctx.moveTo(537,1000)
    ctx.quadraticCurveTo(560,917,574,890)
    ctx.moveTo(637,906)
    ctx.quadraticCurveTo(635,947,627,1000)
    ctx.stroke()

    // 项圈
    ctx.beginPath()
    ctx.strokeStyle='#f4c944'
    ctx.lineWidth=20
    ctx.moveTo(357,904)
    ctx.bezierCurveTo(367,830,557,840,584,897)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(583,894)
    ctx.lineWidth=22
    ctx.bezierCurveTo(584,994,357,980,357,903)
    ctx.stroke()
    // 脖子
    ctx.beginPath()
    ctx.fillStyle='#e5c8b6'
    ctx.moveTo(547,890)
    ctx.lineTo(387,890)
    ctx.quadraticCurveTo(417,887,400,824)
    ctx.quadraticCurveTo(427,830,457,834)
    ctx.quadraticCurveTo(507,831,540,824)
    ctx.quadraticCurveTo(540,860,547,890)
    ctx.fill()


    ctx.fillStyle='#000'
    ctx.font='60px serif'
    ctx.fillText('糖',847,888)
    ctx.fillStyle='#f4c944'
    ctx.font='20px serif'
    ctx.fillText('21.02.02',847,928)

    

    





    
}