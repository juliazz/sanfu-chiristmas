// if (is_weixin == 1) {
//   $('#s4 .share_weixin').show()
//   $('.rule_box .main img').eq(0).show()
// }else {
//   $('#s4 .share_weibo').show()
//   $('.rule_box .main img').eq(1).show()
// }
var playNum = 3
function getPlayNum (params) {
  $.ajax({
    url: "{:U('Index/saveInfo')}",
    type: 'post',
    dataType: 'json',
    success: function (data) {
      playNum = data
    },
    error: function () {
      alert('网络繁忙')
    // can_submit = true
    }
  })
}
// getPlayNum()
// 下载进度条
var loadbar = new LoadingBar('loadBar01')
var max = 200
loadbar.setMax(max)
var i = 0
var time = setInterval(function () {
  loadbar.setProgress(i)
  if (i == max) {
    s1_canvas()
    clearInterval(time)
    return
  }
  i += 10
}, 60)

// 切换首页
function s1_canvas () {
  TweenMax.to('#loading', 0.8, {'autoAlpha': 0})
  TweenMax.to('#s1', 0.8, {'autoAlpha': 1,onComplete: function () {}})
}
// 显示规则
$('#s1 .rule_btn').click(function (event) {
  $('.rule_box').fadeIn()
})
// 关闭规则
$('.rule_box .close_btn').click(function (event) {
  $('.rule_box').fadeOut()
})
// go游戏页面

$('#s1 .btn').click(function (event) {
  if (playNum <= 0) {
    alert('今日次数已用完，明日继续~')
    return
  }else {
    $('#alert').fadeIn()
  }
})
$('#alert .main .close').click(function (event) {
  $('#alert .jump').animate({top: '43px'}, function name (params) {
    $('#alert').fadeOut()
    show_s2()
  })
})
/* ================pk页面 ==================*/
// 显示s2
var s2_timer; // 定时器
function show_s2 () {
  TweenMax.to('#s1', 0.8, {'autoAlpha': 0})
  TweenMax.to('#s2', 0.8, {'autoAlpha': 1,onComplete: function () {
      playNum--
      s2_timer = setInterval(function () {
        settime(s2_timer) ;  }, 1000)
    // gameInit()
    }
  })
}
// 游戏计时
var countdown = 15
function settime (obj) {
  if (countdown == -1) {
    clearInterval(s2_timer)
    countdown = 15
    alert('时间到！记得及时提交分数哦！')
    isAward()
    return
  } else {
    $('.timer').text(countdown + 's')
    countdown--
  }
}
// 生成随机礼物列表
function giftList (params) {
  star = Math.round(Math.random())
  length = parseInt(Math.random() * 3 + 1)
  end = star + length
  giftNew = $('#giftAll ul li:gt(' + star + '):lt(' + end + ')').clone()
}
// 初始化游戏
function gameInit () {
  $('#share').fadeOut()
  $('#unWin').fadeOut()
  jumpNum = jumpNumRight = scoreNum = score = 0
  jumpEnd = true
  giftEnd = false
  giftEndRight = false
  clearInterval(s2_timer)
  s2_timer = setInterval(function () {
    settime(s2_timer);  }, 1000)
  playNum--
  $('#s2 .score').text('0分')
  $('#s2 .gift .left ul').empty()
  $('#s2 .gift .right ul').empty()
  giftList()
  $('#s2 .gift .left ul').append(giftNew)
}

// 中奖判断
function isAward (params) {
  $.ajax({
    url: "{:U('Index/saveInfo')}",
    type: 'post',
    dataType: 'json',
    success: function (data) {
      // 中奖
      if (data.status == 1) {
        award()
      }
      // 未中奖
      else if (data.status == 2) {
        noAward()
      } else {
        alert(data.msg)
      }
    // can_submit = true
    },
    error: function () {
      alert('网络繁忙')
    // can_submit = true
    }
  })
  // =============测试=====================
  // 中奖-------------------
  // $('#claim').fadeIn()
  // $('#claim .scoreTitle span').text(score)
  // $('#claim .score span').text(score)
  // $('#claim .btn_unClaim').show()
  // $('#claim .btn_Claim').hide()
  // 未中奖-------------------
  // (第一版)-------------------
  // $('#unWin').fadeIn()
  // $('#unWin .scoreTitle span').text(score)
  // // 扫二维码
  // $('#unWin .btn_unClaim').click(function name (params) {
  //   $('#code').fadeIn()
  // })
  // // 分享朋友圈
  // $('#unWin .btn_Claim').click(function name (params) {
  //   $('#share').fadeIn()
  // })
  // $('#share').click(function name (params) {
  //   gameInit()
  // })
  // （第二版）-----------------
  $('#unWin').fadeIn()
  $('#unWin .scoreTitle span').text(score)
  $('#unWin .btn_unClaim span').text(playNum)
  $('#unWin .btn_unClaim').click(function name (params) {
    if (playNum <= 0) {
      // 超过三次
      return
    }else {
      gameInit()
    }
  })
  $('#unWin .btn_Claim').click(function name (params) {
    $('#share').fadeIn()
    // 提交已玩次数
    $.ajax({
      url: "{:U('Index/saveInfo')}",
      type: 'post',
      dataType: 'json',
      // data: data,
      success: function (data) {},
      error: function () {
        alert('网络繁忙')
      }
    })
  })
}
// 中奖了
function award (params) {
  $('#claim').fadeIn()
  $('#claim .scoreTitle span').text(score)
  $('#claim .score span').text(score)
  // 判断是否兑换
  $.ajax({
    url: "{:U('Index/saveInfo')}",
    type: 'post',
    dataType: 'json',
    // data: data,
    success: function (data) {
      // 已兑换
      if (data.status == 1) {
        $('#claim .btn_unClaim').hide()
        $('#claim .btn_Claim').show()
      }else // 未兑换
      if (data.status == 2) {
        $('#claim .btn_Claim').show()
        $('#claim .btn_unClaim').hide()
      }
    },
    error: function () {
      alert('网络繁忙')
    }
  })
}
// 未中奖
function noAward (params) {
  $('#unWin').fadeIn()
  $('#unWin .scoreTitle span').text(score)
  $('#unWin .btn_unClaim span').text(playNum)
  $('#unWin .btn_unClaim').click(function name (params) {
    if (playNum <= 0) {
      // 超过三次
      return
    }else {
      gameInit()
    }
  })
  $('#unWin .btn_Claim').click(function name (params) {
    $('#share').fadeIn()
  })
// 分享朋友圈
/*  $('#unWin .btn_Claim').click(function name (params) {
   $('#share').fadeIn()
   $.ajax({
     url: "{:U('Index/saveInfo')}",
     type: 'post',
     dataType: 'json',
     // data: data,
     success: function (data) {
       // 分享成功
       if (data.status == 1) {
         gameInit()
       }
     },
     error: function () {
       alert('网络繁忙')
     }
   })
 }) */
}
// 跳的次数
var jumpNum = jumpNumRight = scoreNum = score = leftNow = 0
var giftsAll = $('#giftAll ul li')
var giftsAll = giftNew = []
var star,length,end
giftList()
var jumpEnd = true
var giftEnd = false
var giftEndRight = false
// // $('#s2 .gift .left ul').children().replaceWith(giftNew)
$('#s2 .gift .left ul').empty()
$('#s2 .gift .left ul').append(giftNew)

// ===================          左边点击          ==================
$('#s2 .gift .btn_left').click(function (event) {
  var lengthNow = $('#s2 .gift .left ul li').length
  // 左边没跳完和还没回原点的状态
  if (jumpEnd && !giftEnd) {
    jumpNum++
    jumpEnd = false
    scoreNum++
    score = scoreNum * 10
    $('#s2 .score').text(score + '分')
    giftEnd = lengthNow == jumpNum ? true : false
    // 左边跳完
    if (giftEnd) {
      giftList()
      giftEndRight = false
      jumpNumRight = 0
      // $('#s2 .gift .right ul').children().replaceWith(giftNew)
      $('#s2 .gift .right ul').empty()
      $('#s2 .gift .right ul').append(giftNew)
    }
    // 跳的动作
    $('#s2 .gift .people_left').animate({top: '87px'}, 'fast', function name (params) {
      $('#s2 .gift .left ul li:lt(' + jumpNum + ')').hide()
      $('#s2 .gift .people_left').animate({ top: '233px' }, 'fast', function name (params) {
        jumpEnd = true
      })
    })
  }
})
// =================            右边点击             ==================
$('#s2 .gift .btn_right').click(function (event) {
  var lengthNowRight = $('#s2 .gift .right ul li').length
  // 左边没跳完和还没回圆点的状态
  if (jumpEnd && !giftEndRight) {
    jumpNumRight++
    scoreNum++
    jumpEnd = false
    score = scoreNum * 10
    $('#s2 .score').text(score + '分')
    giftEndRight = lengthNowRight == jumpNumRight ? true : false
    // 左边跳完
    if (giftEndRight) {
      giftList()
      giftEnd = false
      jumpNum = 0
      // $('#s2 .gift .left ul').children().replaceWith(giftNew)
      $('#s2 .gift .left ul').empty()
      $('#s2 .gift .left ul').append(giftNew)
    }
    // 跳的动作
    $('#s2 .gift .people_right').animate({top: '87px'}, 'fast', function name (params) {
      $('#s2 .gift .right ul li:lt(' + jumpNumRight + ')').hide()
      $('#s2 .gift .people_right').animate({ top: '158px' }, 'fast', function name (params) {
        jumpEnd = true
      })
    })
  }
})
