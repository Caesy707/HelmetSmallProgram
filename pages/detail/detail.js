/*
 * @Author: your name
 * @Date: 2021-11-03 15:20:04
 * @LastEditTime: 2022-02-26 22:33:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \安全帽检测\pages\detail\detail.js
 */
// pages/detail/detail.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navheight: '', //动态计算导航栏的高度
        topstatus: '', //导航栏的上边距
        listselfInfo: {
            // name: "程镇",
            // jobNumber: "20125022041",
            // department: "工程技术部",
            // violation: "未带安全帽",
            // telephone: "13027920034",
            // numberCapture: "3次",
            // time: "2021-12-09",
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let navheight = app.globalData.realheight
        let navtop = app.globalData.topstatus
        this.setData({
            navheight: navheight,
            topstatus: navtop
        })
        console.log(options.Id)
        var id = options.Id
        var list = wx.getStorageSync('ViolentAllList')
        console.log(list)
        list.forEach((value, index) => {
            // console.log(value.id)
            if (options.Id == value.id) {
                this.setData({
                    listselfInfo: value
                })
                console.log(this.data.listselfInfo)
            }
        })
    },
    ToNavigtorBack() {
        var pagenum = 1
        wx.redirectTo({
            url: '/pages/list/list?pagenum=' + pagenum
        })
    }
})