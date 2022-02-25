/*
 * @Author: your name
 * @Date: 2021-11-08 21:07:35
 * @LastEditTime: 2022-02-25 14:25:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \安全帽检测\utils\requeir.js
 */
import request from "./request";
// let API = 'https://example.com/ajax/'
let CommonAPI = 'https://dachuang.bitaxes.com'
var app = getApp()
    // 暴露函数接口
export default ({
    requestGetToken,
    requestDelete,
    requestPut,
    requestPost
})
// 数据的请求发送
function requestGetToken(data, url) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: CommonAPI + url,
            data: data,
            method: 'GET',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                console.log(res)
                console.log(res.data.code)
                var dataCode = res.data.code //用来判断请求接口的状态
                if (dataCode == "20000") {
                    console.log("请求成功")
                    resolve(res)
                } else {
                    wx.showToast({
                        title: res.data.data,
                        icon: 'error',
                        duration: 1000
                    })
                }
                resolve(res)
            },
            fail(err) { reject(err) }
        })
    })
}

function requestDelete(data, url) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: CommonAPI + url,
            data: data,
            method: 'DELETE',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
                    // 'Content-Type': 'multipart/form-data'
            },
            success(res) {
                console.log(res)
                console.log(res.data.code)
                var dataCode = res.data.code //用来判断请求接口的状态
                if (dataCode == "20000") {
                    console.log("请求成功")
                    resolve(res)
                } else {
                    wx.showToast({
                        title: res.data.data,
                        icon: 'error',
                        duration: 1000
                    })
                }
                resolve(res)
            },
            fail(err) { reject(err) }
        })
    })
}

function requestPut(data, url) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: CommonAPI + url,
            data: data,
            method: 'PUT',
            header: {
                // 'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type': 'application/json'
            },
            success(res) {
                console.log(res)
                console.log(res.data.code)
                var dataCode = res.data.code //用来判断请求接口的状态
                if (dataCode == "20000") {
                    console.log("请求成功")
                    resolve(res)
                } else {
                    wx.showToast({
                        title: res.data.data,
                        icon: 'error',
                        duration: 1000
                    })
                }
                resolve(res)
            },
            fail(err) { reject(err) }
        })
    })
}

function requestPost(data, url) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: CommonAPI + url,
            data: data,
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                console.log(res)
                console.log(res.data.code)
                var dataCode = res.data.code //用来判断请求接口的状态
                if (dataCode == "20000") {
                    console.log("请求成功")
                    resolve(res)
                } else {
                    wx.showToast({
                        title: res.data.data,
                        icon: 'error',
                        duration: 1000
                    })
                }
                resolve(res)
            },
            fail(err) { reject(err) }
        })
    })
}