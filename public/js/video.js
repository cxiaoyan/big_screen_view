/* global $ */
(function () {
  // 视频动画
  function vidioAnimate (parent) {
    var now = 0
    var next = 0

    setInterval(move, 5000)

    var ww = $('.area-switchover').width()

    function move () {
      next = (now + 1) % $('.video').length

      $(parent).find('.video').eq(next).css('left', ww)
      $(parent).find('.video').eq(now).animate({left: -ww})
      $(parent).find('.video').eq(next).animate({left: 0})

      $(parent).find('.buttons').removeClass('current-button')
      $(parent).find('.buttons').eq(next).addClass('current-button')

      now = next
      loadDate(next)
    }
  }
  function loadDate (next) {
    $.ajax({
      url: 'https://admindata.alibaba-inc.com/rpc/datav/getConsume.jsonp',
      type: 'GET',
      dataType: 'jsonp',
      success: function (res) {
        if (res && res.success) {
          var data = res.content || []

          data.map(function (item) {
            if ($('.video-js')[next].attributes['data-service'].value == item.serviceName) {
              $('#area-title').html(`今日${item.sType + item.serviceName}情况`)
              $('#numbers').html(`${item.consumeCnt}人`)
            }
          })
        } else {
          console.log(res.errorMsg)
        }
      },
      fail: function (error) {
        console.log(JSON.stringify(error))
      }
    })
  }
  var el = $('.area-switchover').get()
  loadDate(0)
  vidioAnimate(el)
})()
