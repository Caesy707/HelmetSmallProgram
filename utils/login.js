/*
 * @Author: your name
 * @Date: 2021-12-03 11:09:19
 * @LastEditTime: 2021-12-03 11:15:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \安全帽检测\utils\login.js
 */

export default ({
    getUserProfilelogin,
    getlogin
})

async function getUserProfilelogin() {
    wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
            this.setData({
                userInfo: res.userInfo,
                rawData: res.rawData,
                iv: res.iv,
                signature: res.signature,
                encryptedData: res.encryptedData,
                hasUserInfo: true,
                IsManage: true,
                IsUser: false,
                IsOther: false,
            })
            wx.setStorageSync('userInfo', res.userInfo)
            wx.setStorageSync("rawData", rawData)
            wx.setStorageSync("signature", signature)
            wx.setStorageSync("encryptedData", encryptedData)
            wx.setStorageSync("iv", iv)
            console.log(e)
            let userInfo = wx.getStorageInfoSync('userInfo')
            let rawData = wx.getStorageInfoSync("rawData")
            let signature = wx.getStorageInfoSync("signature")
            let encryptedData = wx.getStorageInfoSync("iv")
            let iv = this.data.iv
            console.log(rawData, typeof(rawData))
            console.log(userInfo)
            if (userInfo) {
                // 1. 小程序通过wx.login()获取code
                debugger;
                wx.login({
                    success: function(login_res) {
                        //获取用户信息
                        debugger;
                        console.log(login_res)
                            // 2. 小程序通过wx.request()发送code到开发者服务器
                        wx.request({
                            url: 'http://182.61.36.50:5000/user/login',
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            data: {
                                code: login_res.code, //临时登录凭证
                                rawData: rawData, //用户非敏感信息
                                signature: signature, //签名
                                encrypteData: encryptedData, //用户敏感信息
                                iv: iv //解密算法的向量
                            },
                            success: function(res) {
                                debugger;
                                console.log(res)
                                if (res.data.code == 20000) {
                                    // 7.小程序存储skey（自定义登录状态）到本地
                                    console.log(res)
                                    wx.setStorageSync('userInfo', userInfo);
                                    wx.setStorageSync('skey', res.data.data);
                                } else {
                                    console.log('服务器异常');
                                }
                            },
                            fail: function(error) {
                                //调用服务端登录接口失败
                                debugger;
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
                this.setData({
                    hasUserInfo: true,
                    userInfo: userInfo
                })
            }

        }
    })
}
//不通过授权，直接用code换token
async function getlogin() {
    let userInfo = wx.getStorageInfoSync('userInfo')
    let rawData = wx.getStorageInfoSync("rawData")
    let signature = wx.getStorageInfoSync("signature")
    let encryptedData = wx.getStorageInfoSync("iv")
    let iv = this.data.iv
    console.log(rawData, typeof(rawData))
    console.log(userInfo)
    if (userInfo) {
        // 1. 小程序通过wx.login()获取code
        debugger;
        wx.login({
            success: function(login_res) {
                //获取用户信息
                debugger;
                console.log(login_res)
                    // 2. 小程序通过wx.request()发送code到开发者服务器
                wx.request({
                    url: 'http://182.61.36.50:5000/user/login',
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        code: login_res.code, //临时登录凭证
                        rawData: rawData, //用户非敏感信息
                        signature: signature, //签名
                        encrypteData: encryptedData, //用户敏感信息
                        iv: iv //解密算法的向量
                    },
                    success: function(res) {
                        debugger;
                        console.log(res)
                        if (res.data.code == 20000) {
                            // 7.小程序存储skey（自定义登录状态）到本地
                            console.log(res)
                            wx.setStorageSync('userInfo', userInfo);
                            wx.setStorageSync('skey', res.data.data);
                        } else {
                            console.log('服务器异常');
                        }
                    },
                    fail: function(error) {
                        //调用服务端登录接口失败
                        debugger;
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
        this.setData({
            hasUserInfo: true,
            userInfo: userInfo
        })
    }
}