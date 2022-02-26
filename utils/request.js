import request from "request.js";
/*
 * @Author: your name
 * @Date: 2021-11-08 21:07:35
 * @LastEditTime: 2022-02-26 23:42:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \安全帽检测\utils\request.js
 */

import requestMethod from "./requestMethod.js";
// 暴露函数接口
export default ({
    getSelfInfo, //获取个人信息接口
    getViolentList, //获取违规信息接口
    getVioSearchInfo, // 获取违规页搜索信息接口
    getVioSelectInfo, // 获取违规页筛选信息接口
    deleteVioInfo, //删除违规列表信息接口
    getFacePhote, //获取一个用户的所有人脸
    getFaceList, //获取人脸信息列表数据
    deleteFaceInfo, //删除人脸列表信息接口
    judgeFacePhoto, //审核人脸接口
    newUserinfo, //新建人脸用户信息
    newFacePhoto, //新建人脸照片
    getUseAllFace, //获取所有人脸
    faceSearch, //人脸搜索
    selectflagfacelist, //人脸页状态筛选
});


//获取个人信息接口
async function getSelfInfo(openid) {
    var data = {
        openid: openid
    }
    return new Promise((resolve, reject) => {
        requestMethod.requestGetToken(data, "/user/info").then(res => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
//获取违规所有记录接口（接完）
async function getViolentList(size, num) {
    var data = {
        "pagesize": size, //页面大小
        "pagenum": num, //页面数
    }
    return new Promise((resolve, reject) => {
        requestMethod.requestGetToken(data, "/record/all").then(res => {
            console.log(res);
            resolve(res)
        }).catch((err) => {
            console.log(err);
            reject(err)
        })
    })
}
// 获取违规页搜索信息接口（接完）
async function getVioSearchInfo(keyword, pageSize, pageNum) {
    var data = {
        "keyword": keyword,
        "pagesize": pageSize,
        "pagenum": pageNum
    }
    return new Promise((resolve, reject) => {
        requestMethod.requestGetToken(data, "/record/search").then(res => {
            console.log(res)
            resolve(res)
        }).catch(err => {
            console.log(err)
            reject(err)
        })
    })
}

// 获取违规页筛选信息接口（接完）
async function getVioSelectInfo(data) {
    var data = data
    return new Promise((resolve, reject) => {
        requestMethod.requestGetToken(data, "/record/department").then(res => {
            console.log(res)
            resolve(res)
        }).catch(err => {
            console.log(err)
            reject(err)
        })
    })
}

//删除违规页筛选信息接口（接完）
async function deleteVioInfo(id) {
    var data = {
            id: id
        } //传数组id
    return new Promise((resolve, reject) => {
        requestMethod.requestDelete(data, "/record").then(res => {
            console.log(res)
            resolve(res)
        }).catch(err => {
            console.log(err)
            reject(err)
        })
    })
}
//获取一个用户的所有人脸（接完）
async function getFacePhote(data) {
    var data = data
    return new Promise((resolve, reject) => {
        requestMethod.requestGetToken(data, "/facelib/openid").then(res => {
            console.log(res)
            resolve(res)
        }).catch(err => {
            console.log(err)
            reject(err)
        })
    })
}
//获取人脸列表页数据（接完，需要数据处理）
async function getFaceList(size, num) {
    var data = {
        "pagesize": size, //页面大小
        "pagenum": num, //页面数
    }
    return new Promise((resolve, reject) => {
        requestMethod.requestGetToken(data, "/facelib/all").then(res => {
            console.log(res)
            if (res.data.data.list.length == 0) {
                wx.stopPullDownRefresh({
                    success: () => {
                        wx.showToast({
                            title: '无数据了！',
                            icon: 'error',
                            duration: 1000
                        })
                    }
                })
            }
            resolve(res)
        }).catch(err => {
            console.log(err)
            reject(err)
        })
    })
}

//新建用户信息接口
async function newUserinfo(data) {
    var data = data
    return new Promise((resolve, reject) => {
        requestMethod.requestPut(data, "/user").then(res => {
            console.log(res)
            resolve(res)
        }).catch(err => {
            console.log(err)
            reject(err)
        })
    })
}

//新建人脸接口
async function newFacePhoto(openid, files) {
    var data = {
        openid: openid,
        files: files
    }
    return new Promise((resolve, reject) => {
        requestMethod.requestPost(data, "/facelib").then(res => {
            resolve(res)
        }).catch(err => {
            console.log(err)
            reject(err)
        })
    })
}
//获取用户所有人脸
async function getUseAllFace(openid) {
    var data = {
        openid: openid
    }
    return new Promise((resolve, reject) => {
        requestMethod.requestGetToken(data, "/facelib/openid").then(res => {
            resolve(res)
        }).catch(err => {
            console.log(err)
            reject(err)
        })
    })
}


//人脸搜索接口
async function faceSearch(keyword, pagesize, pagenum) {
    var data = {
        pagenum: pagenum,
        pagesize: pagesize,
        keyword: keyword
    }
    return new Promise((resolve, reject) => {
        requestMethod.requestGetToken(data, '/facelib/search').then(res => {
            resolve(res)
        }).catch(err => {
            console.log(err)
            reject(err)
        })
    })
}
//删除人脸信息接口
async function deleteFaceInfo(data) {
    var data = data
    return new Promise((resolve, reject) => {
        requestMethod.requestDelete(data, "/facelib").then(res => {
            console.log(res)
            resolve(res)
        }).catch(err => {
            console.log(err)
            reject(err)
        })
    })
}

//审核人脸照片接口
async function judgeFacePhoto(id, flag) {
    //flag 0待审核，1审核通过，2审核不通过
    var data = {
        id: id,
        flag: flag
    }
    return new Promise((resolve, reject) => {
        requestMethod.requestPost(data, "/facelib/flag").then(res => {
            console.log(res)
            resolve(res)
        }).catch(err => {
            console.log(err)
            reject(err)
        })
    })
}

//人脸页状态筛选
async function selectflagfacelist(data) {
    return new Promise((resolve, reject) => {
        requestMethod.requestGetToken(data, "/facelib/flag").then(res => {
            console.log(res)
            resolve(res)
        }).catch(err => {
            console.log(err)
            reject(err)
        })
    })
}