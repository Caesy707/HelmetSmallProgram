/*
 * @Author: your name
 * @Date: 2021-11-09 11:17:54
 * @LastEditTime: 2022-02-25 22:14:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \安全帽检测\pages\faceManageDetail\faceManageDetail.js
 */
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: "",
        navheight: '', //动态计算导航栏的高度
        topstatus: '', //导航栏的上边距
        listselfInfo: {
            // "name": "程镇",
            // "jobNumber": "20125022041",
            // "department": "工程技术部",
            // "violation": "未带安全帽",
            // "telephone": "13027920034",
            // "time": "2021-12-09",
            // "numberCapture": "3次"
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
        console.log(options.id)
        var id = options.id
        var list = wx.getStorageSync('faceManageList')
        console.log(list)
        list.forEach((value, index) => {
                console.log("value", value.id)
                console.log("option", options.id)
                if (options.id == value.id) {
                    console.log(value)
                    this.setData({
                        listselfInfo: value
                    })
                    console.log(this.data.listselfInfo)
                }
            })
            //拿到用户id，发起请求个人详情的接口
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },
    ToNavigtorBack() {
        wx.redirectTo({
            url: '/pages/faceManage/faceManage'
        })
    },
    clickpassButton() {
        var id = this.data.id
        wx.showToast({
            title: '已通过',
            icon: 'success',
            duration: 1500
        })
        this.se
            //请求通过按钮接口
    },
    clickunpassButton() {
        var id = this.data.id
        wx.showToast({
            title: '已驳回',
            icon: 'error',
            duration: 1500
        })
        this.se
            //请求驳回按钮接口
    }
})