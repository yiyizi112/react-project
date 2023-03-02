import { Card, Form, Input, Checkbox, Button, message } from "antd"
import logo from '@/assets/logo.png'
import './index.scss'
import {useStore} from '@/store'
import { useNavigate } from "react-router-dom"

export function Login() {
    const { loginStore } = useStore()
    const navigate = useNavigate()
    
    async function onFinish (values){
        console.log(values)
        try{
            await loginStore.getToken({
                mobile: values.username,
                code: values.password
            })
             
            //跳转首页
            navigate('/', { replace: true })
            //提示登录成功
            message.success('登录成功')
        } catch(e) {
            message.error(e.response)
        }
        
       
    }
    return (
        <div className='login'>
            <Card className="login-container">
                <img className="login-logo" src={logo} alt='' />
                <Form 
                    validateTrigger={['onBlur', 'onChange']}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号!',
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '请输入正确的手机号',
                                validateTrigger: 'onBlur'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                            {
                                len:6,
                                message:'请输入6位密码',
                                validateTrigger:'onBlur'

                            }
                        ]}
                    >
                        <Input.Password size="large" placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item>
                        <Checkbox className="login-checkbox-label">我已阅读相关法律条文</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )

}