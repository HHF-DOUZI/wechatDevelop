// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    isSearch:true,
    isClear:false,
    val:'',
  },

  getInput:function (e) {
    this.setData({
      val:e.detail.value
    })
    if(this.data.val.length > 0){
      this.setData({
        isSearch:false,
        isClear:true,
      })
    }else{
      this.setData({
        isSearch:true,
        isClear:false,
      })
    }
  },

  clearTap:function () {
    this.setData({
      val:'',
      isSearch:true,
      isClear:false,
    })
  },

  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
  }
})
