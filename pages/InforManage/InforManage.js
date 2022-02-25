/*
 * @Author: your name
 * @Date: 2021-11-03 15:33:12
 * @LastEditTime: 2022-02-25 22:12:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \安全帽检测\pages\InforManage\InforManage.js
 */
// pages/InforManage/InforManage.js
import request from "../../utils/request.js"
let app = getApp()
    //本地存储备注
    //inforCompleted:用来判断个人信息页是否填写完毕，最初渲染
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navheight: '', //动态计算导航栏的高度
        topstatus: '', //导航栏的上边距
        isContinuePhoto: false, //是否继续拍摄
        IsCheckPass: false,
        IsCheckunPass: false,
        IsSubmitSuccess: false,
        firstPage: false, //个人信息填写页
        secondPage: true, //拍摄页
        minSubmitPhoto: 6, //最少能提交的数目
        isSubmit: false, //用于处理提交按钮的css背景
        isdisable: false, //是否禁用个人填写页填写信息
        ApplyStatus: "", //页面状态
        departmentList: ['工程技术部', '安全质量部', '物资设备部', '经济管理部', '财务部', '综合办公室'], //部门列表
        selfInfo: {
            name: "",
            jobNumber: "",
            department: "",
            telephone: ""
        },
        oneBigImage: "",
        //用来存放20张头像图片
        imgList: [{
            'id': 1,
            'imgUrl': "",
            'isShowLogo': true
        }, {
            'id': 2,
            'imgUrl': "",
            'isShowLogo': true
        }, {
            'id': 3,
            'imgUrl': "",
            'isShowLogo': true
        }, {
            'id': 4,
            'imgUrl': "",
            'isShowLogo': true
        }, {
            'id': 5,
            'imgUrl': "",
            'isShowLogo': true
        }, {
            'id': 6,
            'imgUrl': "",
            'isShowLogo': true
        }, {
            'id': 7,
            'imgUrl': "",
            'isShowLogo': true
        }, {
            'id': 8,
            'imgUrl': "",
            'isShowLogo': true
        }, {
            'id': 9,
            'imgUrl': "",
            'isShowLogo': true
        }, {
            'id': 10,
            'imgUrl': "",
            'isShowLogo': true
        }, {
            'id': 11,
            'imgUrl': "",
            'isShowLogo': true
        }, {
            'id': 12,
            'imgUrl': "",
            'isShowLogo': true
        }, {
            'id': 13,
            'imgUrl': "",
            'isShowLogo': true
        }, {
            'id': 14,
            'imgUrl': "",
            'isShowLogo': true
        }, {
            'id': 15,
            'imgUrl': "",
            'isShowLogo': true
        }, {
            'id': 16,
            'imgUrl': "",
            'isShowLogo': true
        }, {
            'id': 17,
            'imgUrl': "",
            'isShowLogo': true
        }, {
            'id': 18,
            'imgUrl': "",
            'isShowLogo': true
        }, {
            'id': 19,
            'imgUrl': "",
            'isShowLogo': true
        }, {
            'id': 20,
            'imgUrl': "",
            'isShowLogo': true
        }, ]
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
        var that = this
            //页面加载判断跳到哪个页面
            //1.请求接口，根据openid判断审核状态 ApplyStatus，none
            //2.审核通过、审核进行中、审核不通过、未填写
            //3.需要拿到照片数组，提前渲染已经上传成功的照片
        let openid = wx.getStorageSync('openid')
        request.getUseAllFace(openid).then(res => {
            console.log(res.data.data)
            let reqlist = res.data.data
            for (var i = 0; i < reqlist.length; i++) {
                this.setData({
                    ['imgList[' + i + '].imgUrl']: reqlist[i].imgUrl,
                    ['imgList[' + i + '].id']: reqlist[i].id,
                    ['imgList[' + i + '].isShowLogo']: false
                })
            }
        })
        request.getSelfInfo(openid).then(res => {
                //1.拿到name: "",
                // jobNumber: "",
                // department: "",
                // telephone: ""
                console.log(res)
                if (res.data.code == 20000) {
                    console.log(res.data.data.name) //name
                    console.log(res.data.data.workId) //jobNumber
                    console.log(res.data.data.telphone) //telephone
                    console.log(res.data.data.groupId) //department
                    let department = that.returndepartment(res.data.data.groupId)
                    this.setData({
                        ['selfInfo.name']: res.data.data.name,
                        ['selfInfo.jobNumber']: res.data.data.workId,
                        ['selfInfo.department']: department,
                        ['selfInfo.telephone']: res.data.data.telphone
                    })
                }
            })
            // let ApplyStatus = this.data.ApplyStatus
        let ApplyStatus = wx.getStorageSync('ApplyStatus')
        if (ApplyStatus == 'success') {
            this.setData({
                IsCheckPass: true,
                IsCheckunPass: false,
                IsSubmitSuccess: false,
                firstPage: false, //个人信息填写页
                secondPage: false, //拍摄页
            })
        } else if (ApplyStatus == 'fail') {
            this.setData({
                IsCheckPass: false,
                IsCheckunPass: true,
                IsSubmitSuccess: false,
                firstPage: false, //个人信息填写页
                secondPage: false, //拍摄页
            })
        } else if (ApplyStatus == 'applying') {
            this.setData({
                IsCheckPass: false,
                IsCheckunPass: false,
                IsSubmitSuccess: true,
                firstPage: false, //个人信息填写页
                secondPage: false, //拍摄页
            })
        } else {
            //1.当个人信息页填写完成后，就直接进入拍摄页
            let inforCompleted = wx.getStorageSync('inforCompleted')
            if (inforCompleted == 'true') {
                this.setData({
                    IsCheckPass: false,
                    IsCheckunPass: false,
                    IsSubmitSuccess: false,
                    firstPage: false, //个人信息填写页
                    secondPage: true, //拍摄页
                })
            } else {
                this.setData({
                    IsCheckPass: false,
                    IsCheckunPass: false,
                    IsSubmitSuccess: false,
                    firstPage: true, //个人信息填写页
                    secondPage: false, //拍摄页
                })
            }
        }
    },
    //department转化
    returndepartment(num) {
        var department
        switch (num) {
            case "1":
                department = "工程技术部";
                break;
            case "2":
                department = "安全质量部";
                break;
            case "3":
                department = "物资设备部";
                break;
            case "4":
                department = "经济管理部";
                break;
            case "5":
                department = "财务部";
                break;
            case "6":
                department = "综合办公室";
                break;
        }
        return department
    },
    //导航栏的回退导航
    ToNavigtorBack() {
        wx.navigateTo({
            url: '/pages/index/index',
        })
    },
    //获取input内容
    getinputContent(e) {
        console.log(e)
        if (e.currentTarget.dataset.type == "name") {
            this.setData({
                ["selfInfo.name"]: e.detail.value
            })
        } else if (e.currentTarget.dataset.type == "jobNumber") {
            this.setData({
                ["selfInfo.jobNumber"]: e.detail.value
            })
        } else if (e.currentTarget.dataset.type == "department") {
            this.setData({
                ["selfInfo.department"]: e.detail.value
            })
        } else if (e.currentTarget.dataset.type == "telephone") {
            this.setData({
                ["selfInfo.telephone"]: e.detail.value
            })
        }
        console.log(this.data.selfInfo)
        wx.setStorageSync('filledSelfInfo', this.data.selfInfo)
    },
    //获取picker的内容
    getPickerContent(e) {
        if (e.currentTarget.dataset.type == "department") {
            var department = ""
            switch (e.detail.value) {
                case "1":
                    department = "工程技术部";
                    break;
                case "2":
                    department = "安全质量部";
                    break;
                case "3":
                    department = "物资设备部";
                    break;
                case "4":
                    department = "经济管理部";
                    break;
                case "5":
                    department = "财务部";
                    break;
                case "6":
                    department = "综合办公室";
                    break;
            }
            console.log(department)
            this.setData({
                ["selfInfo.department"]: department
            })
        }
        console.log(this.data.selfInfo)
    },
    //一、个人信息页
    //点击下一步按钮
    clickSureSubmit() {
        let openid = wx.getStorageSync('openid') //拿到openid
        var obj = this.data.selfInfo
        console.log(obj) //填写的信息
        var emptyProject = [] //存储空项，最后拼接用于提示
            //遍历obj的对象，如果obj中间有一个为空，就把空的pash到数组中，只有当数组长度为零的时候，才
            //说明没有空项
        for (let key in obj) {
            console.log("key:" + key + ", value:" + obj[key]);
            if (obj[key] == "") {
                emptyProject.push(key)
            }
        }
        //当数组长度为0，说明没有空项
        if (emptyProject.length == 0) {
            let data = {
                    "openid": openid,
                    "name": obj.name, //名字
                    "telphone": obj.telephone, //电话
                    "groupId": this.returngroupid(obj.department), //部门id
                    "workId": obj.jobNumber //工号
                }
                //1.发送请求
            request.newUserinfo(data).then(res => {
                console.log(res)
                if (res.data.code == 20000) {
                    //2.发出提示，无法修改
                    wx.showToast({
                            title: '成功',
                            icon: 'success',
                            duration: 1000,
                            mask: true
                        })
                        //3.在本地存一个参数，作用：在页面最初渲染
                    wx.setStorageSync('inforCompleted', 'true')
                        //4.跳转页面
                    this.setData({
                        IsCheckPass: false,
                        IsSubmitSuccess: false,
                        firstPage: false,
                        secondPage: true,
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        } else {
            //不为0，说明有空项
            wx.showToast({
                title: emptyProject[0] + '未填写',
                icon: "error",
                duration: 1500,
            })
        }
    },
    //根据部门转化groupid
    returngroupid(data) {
        let groupid = ""
        switch (data) {
            case "工程技术部":
                groupid = 1;
                break;
            case "安全质量部":
                groupid = 2;
                break;
            case "物资设备部":
                groupid = 3;
                break;
            case "经济管理部":
                groupid = 4;
                break;
            case "财务部":
                groupid = 5;
                break;
            case "综合办公室":
                groupid = 6;
                break;
        }
        return groupid
    },
    //二、拍摄页
    //返回上一步
    returnLastPage() {
        this.setData({
            firstPage: true,
            secondPage: false
        })
    },
    //提交按钮
    submitPhotoButtom() {
        let openid = wx.getStorageSync('openid')
        request.getUseAllFace(openid).then(res => {
            console.log(res)
            let facelist = res.data.data //数组
            let length = res.data.data.length
            let ApplyStatus = this.data.ApplyStatus
                //1.若小于照片数，弹出不允许跳的弹窗，若大于照片数允许跳转
                //2.遍历facelist数组里面的falg,注0：待审核，1：审核通过，2：审核未通过
                //3.待审核的条件:数组的falg中有且仅有一个为0
                //4.审核通过的条件：数组中falg全为1
                //5.审核不通过的条件：数组中有且仅有一个为2
            if (length < this.data.minSubmitPhoto) {
                wx.showToast({
                    title: '照片不足',
                    icon: 'error',
                    duration: 1000
                })
            } else {
                //控制页面
                for (var i = 0; i < length; i++) {
                    if (facelist[i].falg == 0) {
                        //有且仅有一个等于0
                        this.setData({
                            IsCheckunPass: false,
                            IsCheckPass: false, //检测通过
                            IsSubmitSuccess: true,
                            firstPage: false, //个人信息填写页
                            secondPage: false, //拍摄页
                            ApplyStatus: 'applying' //待审核
                        })
                        wx.setStorageSync('ApplyStatus', 'applying')
                        break //找到了就可以跳出循环
                    } else if (facelist[i].falg == 2) {
                        //有且仅有一个等于2
                        this.setData({
                            IsCheckunPass: true,
                            IsCheckPass: false, //检测通过
                            IsSubmitSuccess: false,
                            firstPage: false, //个人信息填写页
                            secondPage: false, //拍摄页
                            ApplyStatus: 'fail' //不通过
                        })
                        wx.setStorageSync('ApplyStatus', 'fail')
                        break //找到了就可以跳出循环
                    } else {
                        //通过
                        this.setData({
                            IsCheckunPass: false,
                            IsCheckPass: true, //检测通过
                            IsSubmitSuccess: false,
                            firstPage: false, //个人信息填写页
                            secondPage: false, //拍摄页
                            ApplyStatus: 'success' //通过
                        })
                        wx.setStorageSync('ApplyStatus', 'success')
                    }
                }
            }
        })
    },
    //调用拍摄照相机
    clickshooting() {
        var that = this
        let num = 0
        wx.chooseImage({
            success(res) {
                console.log(res)
                let openid = wx.getStorageSync('openid')
                const tempFilePaths = res.tempFilePaths
                    //压缩图片
                wx.compressImage({
                    src: tempFilePaths[0], // 图片路径
                    quality: 20, // 压缩质量
                    success(res) {
                        wx.uploadFile({
                            url: 'https://dachuang.bitaxes.com/facelib',
                            filePath: res.tempFilePath,
                            name: 'files',
                            formData: {
                                'openid': openid
                            },
                            header: {
                                'Content-Type': 'multipart/form-data'
                            },
                            success(res) {
                                console.log(res)
                                console.log(res.data)
                                let reqdata = JSON.parse(res.data)
                                console.log(reqdata.code)
                                if (reqdata.code == 20000) {
                                    let list = that.data.imgList
                                    for (let i = 0; i < list.length; i++) {
                                        if (list[i].imgUrl == "") {
                                            //拿到上传图片url
                                            list[i].imgUrl = tempFilePaths[0]
                                            list[i].isShowLogo = false
                                            that.setData({
                                                oneBigImage: tempFilePaths[0],
                                                isContinuePhoto: true
                                            })
                                            break
                                            console.log("that.data.oneBigImage", that.data.oneBigImage)
                                        } else {
                                            num++ //记录所有的url的数目
                                        }
                                    }
                                    //如果超过六个，就可以提交
                                    if (num >= that.data.minSubmitPhoto - 1) {
                                        that.setData({
                                            isSubmit: true
                                        })
                                    }
                                    console.log(list)
                                    that.setData({
                                        imgList: list
                                    })
                                } else {
                                    console.log(reqdata.code)
                                    console.log(reqdata.data)
                                    wx.showToast({
                                        title: '该图片已上传',
                                        icon: 'error',
                                        duration: 500
                                    })
                                }
                            }

                        })
                    }
                })
            }
        })
    },
    //提交成功页面
    //点击查看已提交信息
    //1.跳过去之前在函数中，把个人信息的页面填写好
    //2.并且把个人信息设置不能修改
    //3.把下一步给去掉
    ClickcheckSubmited() {
        this.setData({
            isdisable: true,
            IsCheckPass: false,
            IsSubmitSuccess: false,
            firstPage: true,
        })
    },
    //审核不通过页面
    // 1.显示下一步
    // 2.解控
    ClickpreApply() {
        this.setData({
            isdisable: false,
            IsCheckPass: false,
            IsSubmitSuccess: false,
            firstPage: true,
        })
    }
})