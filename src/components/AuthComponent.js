//高阶组件
//传入的参数为组件
//通过一定的判断，返回新的组件

import {getToken} from '@/utils'
import { Navigate } from 'react-router-dom'

export function AuthComponent ({children}){
    const isToken =getToken()
    if (isToken) {
        return <>{children}</>
    } else {
        return <Navigate to='/login' replace/>
    }
}