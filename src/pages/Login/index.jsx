import { Card, Form, Input, Checkbox, Button } from "antd"
import logo from '@/assets/logo.png'
import './index.scss'
export function Login(){
    
        return(
            <div className='login'>
                <Card className="login-container">
                    <img className="login-logo" src={logo} alt='' />
                    <Form >
                        <Form.Item>
                            <Input size="large" placeholder="请输入手机号"/>
                        </Form.Item>

                        <Form.Item>
                            <Input.Password size="large" placeholder="请输入密码"/>
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