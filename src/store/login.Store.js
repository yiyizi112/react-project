// login module

import { makeAutoObservable } from 'mobx'
import {http, setToken, getToken, removeToken} from '@/utils'
class LoginStore {
    //初始化的值
    token =  getToken() || ''
    //响应式处理
    constructor(){
        makeAutoObservable(this)
    }

    //定义action函数
    getToken = async ({ mobile, code }) => {
        //调用登录接口
        const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
            mobile, code
        })
        
        //存入token
        this.token = res.data.token
        //存入ls  localstore
        setToken(this.token)
    }
    loginOut = () => {
        this.token = ''
        removeToken()
    }
}



export default LoginStore