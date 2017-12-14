if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
  var version = parseFloat(RegExp.$1)
  if (version > 2.3) {
    var phoneScale = parseInt(window.screen.width) / 640
    document.write('<meta name="viewport" content="width=640, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">')
  }else {
    document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">')
  }
}else {
  document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">')
}

/*********************************************
requestAnimationFrame
**********************************************/
(function () {
  var lastTime = 0
  var vendors = ['ms', 'moz', 'webkit', 'o']
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
    || window[vendors[x] + 'CancelRequestAnimationFrame']
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime()
      var timeToCall = Math.max(0, 16 - (currTime - lastTime))
      var id = window.setTimeout(function () { callback(currTime + timeToCall); },
        timeToCall)
      lastTime = currTime + timeToCall
      return id
  }

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id)
  }
}())
/*********************************************
drawFrame 在canvas上绘制img
**********************************************/
function drawFrame (ctx, image, width, height, num) {
  var offsetY = 0,
    offsetX = 0
  ctx.clearRect(offsetX, offsetY, width, height)
  ctx.drawImage(image, offsetX, offsetY, width, height, 0, 0, width, height)
}

/*********************************************
rightNow 获取当前时间
**********************************************/
function rightNow () {
  if (window['performance'] && window['performance']['now']) {
    return window['performance']['now']()
  } else {
    return +(new Date())
  }
}

var isloading = true
function handleLoadStart (event) {
  document.getElementById('loading_text').innerHTML = Math.floor(queue.progress * 100) + '%'
  if (isloading) {
    // _smq.push(['pageview','/loading','loading']); 
    isloading = false
  }
}
function handleComplete () {
  // s1_canvas()
  // _smq.push(['pageview','/intro','intro1'])
}

/*********************************************
function LoadingBar 进度条加载
 **********************************************/

function LoadingBar (id) {
  this.loadbar = $('#' + id)
  this.percentEle = $('.percent', this.loadbar)
  this.percentNumEle = $('.percentNum', this.loadbar)
  this.max = 100
  this.currentProgress = 0
}
LoadingBar.prototype = {
  constructor: LoadingBar,
  setMax: function (maxVal) {
    this.max = maxVal
  },
  setProgress: function (val) {
    if (val >= this.max) {
      val = this.max
    }
    this.currentProgress = parseInt((val / this.max) * 100) + '%'
    this.percentEle.width(this.currentProgress)
    this.percentNumEle.text(this.currentProgress)
  }
}
