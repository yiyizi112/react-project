import { http } from '@/utils'
import { makeAutoObservable } from 'mobx'


class UserStore{
    //初始化
    userInfo = {}    

    constructor(){
        makeAutoObservable(this)
    }

    //定义方法
    getUserInfo =async () => {
        const res = await http.get('user/profile')
        this.userInfo = res.data
    }

}

export default UserStore


