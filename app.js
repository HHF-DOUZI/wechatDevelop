// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.signin({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var that = this;
            wx.request({   // 你的服务器携带res.code去请求微信服务器获取openId和session_key
                method: 'GET',
                url: this.globalData.serverApi + "/mobileApi/user/checkBind?code="+res.code, 
                header: {
                    'content-type': 'application/json'
                },
                success (res) {  
                    if(res.data.code == 301){
                        //未登录
                        var openId = res.data.openId;
                        wx.reLaunch({
                          url: '/pages/login/login?openId='+openId     
                        })
                    }else if(res.data.code == 1){
                        //已登录
                        that.globalData.userInfo = res.data.userInfo;
                        that.globalData.token = res.data.token;
                        var menuList = res.data.menuList;
                        wx.setStorageSync('menuList', menuList);
                    }else if(res.data.code == 0){
                        //获取openId失败 
                        wx.showToast({
                          title: res.data.msg,
                          icon: 'none',
                          duration: 2000
                        })
                    }
                    
                    // 由于 checkBind 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (that.checkBindCallback) {
                      that.checkBindCallback(res)
                    }
                }
            })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
