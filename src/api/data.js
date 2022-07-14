/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-04-02 06:10:49
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-15 23:10:49
 */
import request from "../util/axios"

export function selectPlayer(data){
    return request({
        url:"/data/selectPlayer",
        method: 'post',
        data:data,
    })
}

export function selectRanking(data){
    return request({
        url:"/data/selectRanking",
        method: 'post',
        data:data,
    })
}

export function selectMatchByTeam(params){
    return request({
        url:"/data/selectMatchByTeam",
        method: 'post',
        params:params,
    })
}

export function selctNumberawards(){
    return request({
        url:"/data/selctNumberawards",
        method: 'get',
    })
}

export function SMSverification(params){
    return request({
        url:"/user/SMSverification",
        method: 'post',
        params:params
    })
}

export function insertUser(data){
    return request({
        url:"/user/insertUser",
        method: 'post',
        data:data
    })
}

export function selectUserByName(data){
    return request({
        url:"/user/selectUserByName",
        method: 'post',
        data:data
    })
}

export function searchByMatch(data){
    return request({
        url:"/data/searchByMatch",
        method: 'post',
        data:data
    })
}