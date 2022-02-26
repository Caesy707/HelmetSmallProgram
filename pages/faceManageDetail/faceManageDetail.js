/*
 * @Author: your name
 * @Date: 2021-11-09 11:17:54
 * @LastEditTime: 2022-02-26 22:26:34
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
        list.forEach((value, index) => {
                if (options.id == value.id) {
                    console.log(value)
                    this.setData({
                        listselfInfo: value
                    })
                }
            })
            //拿到用户id，发起请求个人详情的接口
    },
    ToNavigtorBack() {
        var pagenum = 1
        wx.redirectTo({
            url: '/pages/faceManage/faceManage?pagenum=' + pagenum
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