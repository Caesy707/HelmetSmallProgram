/*
 * @Author: your name
 * @Date: 2021-11-03 15:12:15
 * @LastEditTime: 2022-02-25 22:00:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \安全帽检测\pages\index\index.js
 */
// index.js
// 获取应用实例
import request from "../../utils/request"
let app = getApp()

Page({
    data: {
        userInfo: {},
        rawData: "",
        signature: "",
        encryptedData: "",
        iv: "",
        IsManage: "",
        IsUser: "",
        IsOther: "",
        oneInfor: {},
        hasUserInfo: false,
        navheight: '', //动态计算导航栏的高度
        topstatus: '', //导航栏的上边距
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        canIUseGetUserProfile: false,
        canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
    },
    onLoad() {
        console.log('app', app)
        let navheight = app.globalData.realheight
        let navtop = app.globalData.topstatus
        this.setData({
            navheight: navheight,
            topstatus: navtop
        })
        console.log(navheight)
        var that = this
            //1.先判断本地是否有openid，要是没有就显示登录按钮，要是有就发送请求获取用户信息
        let openid = wx.getStorageSync('openid')
        if (openid) {
            request.getSelfInfo(openid).then(res => {
                if (res.data.code == 20000) {
                    console.log(res)
                        //1.先将重要信息存本地
                    let oneselfdata = JSON.stringify(res.data.data)
                    wx.setStorageSync('oneselfData', oneselfdata)
                        //2.单独拿出openid,方便使用
                    let openid = res.data.data.openid
                    wx.setStorageSync('openid', openid)
                        //3.利用data里面的role,判断是否用户0或者管理员1
                    let role = res.data.data.role
                    if (role == 1) {
                        console.log("管理员")
                        that.setData({
                            IsManage: true,
                            IsUser: false,
                            IsOther: false,
                        })
                    } else {
                        console.log("用户")
                        that.setData({
                            IsManage: false,
                            IsUser: true,
                            IsOther: false,
                        })
                    }
                } else {
                    //显示重新登录
                    wx.showToast({
                            title: res.data.code,
                            icon: 'loading',
                            duration: 1000,
                        }) //给出提示
                    that.setData({
                        IsManage: false,
                        IsUser: false,
                        IsOther: true,
                    })
                }
            })
        } else {
            this.setData({
                IsManage: false,
                IsUser: false,
                IsOther: true,
            })
        }
        //2.要是在请求中openid出错，则返回登录页面
    },
    //跳转信息采集页面
    ToNavigatorSelect(e) {
        console.log(e.currentTarget.dataset.index)
        var index = e.currentTarget.dataset.index
        if (index == 3) {
            wx.navigateTo({
                url: '/pages/InforManage/InforManage',
            })
        } else if (index == 1) {
            wx.navigateTo({
                url: '/pages/list/list',
            })
        } else if (index == 2) {
            wx.navigateTo({
                url: '/pages/faceManage/faceManage',
            })
        }
    },
    getUserProfile(e) {
        wx.getUserProfile({
            desc: '用于确定个人信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        })
    },
    //点击登录（点击立即登录，说明本地缓存没有token）
    clickRegister() {
        // 登录
        wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                this.setData({
                        userInfo: res.userInfo,
                        rawData: res.rawData,
                        iv: res.iv,
                        signature: res.signature,
                        encryptedData: res.encryptedData,
                    })
                    //将微信个人信息存储本地
                wx.setStorageSync('userInfo', res.userInfo)
                this.Register()
            }
        })
    },
    //登录操作
    Register(e) {
        var userInfo = this.data.userInfo //用户的个人信息
            //如果有用户信息，说明已经授权
            //用来判断用户微信是否授权，防止未授权的用户登录
        if (userInfo) {
            this.wxlogin() //发起login（），并获得openid
            this.setData({
                hasUserInfo: true,
                userInfo: userInfo
            })
        } else {
            console.log("未授权")
            wx.showToast({
                title: '未授权',
                icon: 'loading',
                duration: 1000,
            })
        }
    },
    wxlogin() {
        var that = this
        var userInfo = this.data.userInfo //用户的个人信息
        var rawData = this.data.rawData
        var signature = this.data.signature
        var encryptedData = this.data.encryptedData
        var iv = this.data.iv
            // 1. 小程序通过wx.login()获取code（用来请求openid）
        wx.login({
            success: function(login_res) {
                console.log(login_res)
                console.log(login_res.code)
                let newcode = login_res.code
                    // 2. 小程序通过wx.request()发送code到开发者服务器
                wx.request({
                    url: 'https://dachuang.bitaxes.com/user/login',
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                            // 'content-type': 'multipart/form-data'
                    },
                    data: {
                        code: newcode, //临时登录凭证
                        rawData: rawData, //用户非敏感信息
                        signature: signature, //签名
                        encrypteData: encryptedData, //用户敏感信息
                        iv: iv //解密算法的向量
                    },
                    success: function(res) {
                        console.log(res.data)
                        if (res.data.code == 20000) {
                            //1.先将重要信息存本地
                            let oneselfdata = JSON.stringify(res.data.data)
                            wx.setStorageSync('oneselfData', oneselfdata)
                                //2.单独拿出openid,方便使用
                            let openid = res.data.data.openid
                            wx.setStorageSync('openid', openid)
                                //3.利用data里面的role,判断是否用户0或者管理员1
                            let role = res.data.data.role
                            if (role == 1) {
                                console.log("管理员")
                                that.setData({
                                    IsManage: true,
                                    IsUser: false,
                                    IsOther: false,
                                })
                            } else {
                                console.log("用户")
                                that.setData({
                                    IsManage: false,
                                    IsUser: true,
                                    IsOther: false,
                                })
                            }
                        } else {
                            console.log('服务器异常');
                        }
                    },
                    fail: function(error) {
                        //调用服务端登录接口失败
                        wx.showToast({
                            title: '请重试',
                            icon: 'loading',
                            duration: 1000,
                        })
                        console.log(error);
                    }
                })
            }
        })
    }
})