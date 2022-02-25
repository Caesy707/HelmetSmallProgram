/*
 * @Author: your name
 * @Date: 2021-11-03 15:12:15
 * @LastEditTime: 2022-02-25 21:58:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \安全帽检测\app.js
 */
// app.js
import request from "./utils/request.js";
import loginInfo from "./utils/login.js"
App({
    globalData: {
        pageName: "index",
        token: "",
        IsManage: "",
        IsUser: "",
        IsOther: "",
        userInfo: {},
        hasUserInfo: false,
        realheight: "",
        topstatus: ""
    },
    onLaunch() {
        var statusBarHeight
        let that = this
        var realheight
        wx.getSystemInfo({
            success: (res) => {
                console.log(res.statusBarHeight) //状态栏高度
                statusBarHeight = res.statusBarHeight
                const rect = wx.getMenuButtonBoundingClientRect()
                let top = rect.top
                let height = rect.height
                console.log(rect.top) //导航栏胶囊距离最顶部的高度
                realheight = (top - statusBarHeight) * 2 + height
            }
        })
        console.log('realheight', realheight)
        this.globalData.realheight = realheight
        this.globalData.topstatus = statusBarHeight
    }
    // onLaunch() {
    //     // 展示本地存储能力
    //     const logs = wx.getStorageSync('logs') || []
    //     logs.unshift(Date.now())
    //     wx.setStorageSync('logs', logs)
    //         //初始化小程序判断本地缓存是否有token
    //     this.judgeToken()
    // },
    // //获取用户信息，授权界面
    // getUserProfile(e) {
    //     // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    //     // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    //     wx.getUserProfile({
    //         desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    //         success: (res) => {
    //             this.setData({
    //                 userInfo: res.userInfo,
    //                 hasUserInfo: true
    //             })
    //             wx.setStorageSync('userInfo', res.userInfo)
    //         }
    //     })
    // },
    // //判断缓存中是不是有token
    // judgeToken() {
    //     var token = wx.getStorageSync('token')
    //     if (token) {
    //         //请求个人数据，并保存，然后判断token是否过期,如果过期了，就再用code换token
    //     } else {
    //         console.log("请点击立即登录")
    //     }
    // },
    // login(e) {
    //     console.log(e)
    //     const userInfo = this.data.userInfo
    //     console.log(userInfo)
    //     if (userInfo) {
    //         // 1. 小程序通过wx.login()获取code
    //         wx.login({
    //             success: function(login_res) {
    //                 //获取用户信息
    //                 wx.getUserProfile({
    //                     success: function(info_res) {
    //                         console.log(info_res)

    //                         // 2. 小程序通过wx.request()发送code到开发者服务器
    //                         wx.request({
    //                             url: 'http://localhost:5000/user/login',
    //                             method: 'POST',
    //                             header: {
    //                                 'content-type': 'application/x-www-form-urlencoded'
    //                             },
    //                             data: {
    //                                 code: login_res.code, //临时登录凭证
    //                                 rawData: info_res.rawData, //用户非敏感信息
    //                                 signature: info_res.signature, //签名
    //                                 encrypteData: info_res.encryptedData, //用户敏感信息
    //                                 iv: info_res.iv //解密算法的向量
    //                             },
    //                             success: function(res) {
    //                                 console.log(res)
    //                                 if (res.data.code == 20000) {
    //                                     // 7.小程序存储skey（自定义登录状态）到本地
    //                                     console.log(res)
    //                                     wx.setStorageSync('userInfo', userInfo);
    //                                     wx.setStorageSync('skey', res.data.data);
    //                                 } else {
    //                                     console.log('服务器异常');
    //                                 }
    //                             },
    //                             fail: function(error) {
    //                                 //调用服务端登录接口失败
    //                                 wx.showToast({
    //                                     title: '请重试',
    //                                     icon: 'loading',
    //                                     duration: 1000,
    //                                 })
    //                                 console.log(error);
    //                             }
    //                         })
    //                     }
    //                 })
    //             }
    //         })
    //         this.setData({
    //             hasUserInfo: true,
    //             userInfo: userInfo
    //         })
    //     }
    // },
})