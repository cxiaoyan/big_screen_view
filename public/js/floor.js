/* global $ */
(function () {
  // 中间floor信息
  var temp = 0
  function getPercent (num, total) {
    num = parseFloat(num)
    total = parseFloat(total)
    if (isNaN(num) || isNaN(total)) {
      return 0
    }
    return total <= 0 ? 0 : Math.round(num / total * 100)
  }
  var floorDetail = function () {
    $.ajax({
      url: 'https://admindata.alibaba-inc.com/rpc/datav/getSpace.jsonp',
      type: 'GET',
      dataType: 'jsonp',
      success: function (res) {
        if (res && res.success) {
          var data = res.content || []
          var arrPercent = []

          temp = temp > data.length - 1 ? 0 : temp
          data.map(function (item) {
            arrPercent.push(getPercent(item.meetingRoomUsedCnt, item.meetingRoomCnt))
          })
          arrPercent.map(function (item, index) {
            if (item > 50) {
              $('.busy-icon').eq(index).addClass('busy')
            } else {
              $('.busy-icon').eq(index).removeClass('busy')
            }
          })
          $('#content-detail').html('')
          $('#content-title').html(data[temp].buildingName || '')
          $('.building-wrap li').removeClass('scale').eq(temp).addClass('scale')
          data[temp].meetingRoomCnt && $(`<li class="content-detail-left">会议室:${data[temp].meetingRoomCnt}间</li>`).appendTo('#content-detail')
          data[temp].meetingRoomUsedCnt && $(`<li class="content-detail-right">使用中会议室:${data[temp].meetingRoomUsedCnt}间</li>`).appendTo('#content-detail')
          data[temp].studioRoomCnt && $(`<li class="content-detail-left">项目室:${data[temp].studioRoomCnt}间</li>`).appendTo('#content-detail')

          data[temp].studioRoomUsedCnt && $(`<li class="content-detail-right">使用中项目室:${data[temp].studioRoomUsedCnt}间</li>`).appendTo('#content-detail')
          data[temp].workposCnt && $(`<li class="content-detail-left">工位:${data[temp].workposCnt}个</li>`).appendTo('#content-detail')
          data[temp].workposUsedCnt && $(`<li class="content-detail-right">已分配工位:${data[temp].workposUsedCnt}个</li>`).appendTo('#content-detail')
          temp++
        } else {
          console.log(res.errorMsg)
        }
      },
      fail: function (error) {
        console.log(JSON.stringify(error))
      }
    })
  }
  floorDetail()
  setInterval(function () {
    floorDetail()
  }, 10000)
})()
