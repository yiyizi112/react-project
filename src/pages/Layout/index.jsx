import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, NavLink, useLocation, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'

const { Header, Sider } = Layout

const GeekLayout = () => {
    const {userStore, loginStore, channelStore} = useStore()
    useEffect(() => {userStore.getUserInfo()
                      channelStore.loadChannelList()}, [userStore,channelStore])

    
    function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
    }
    const items = [
        getItem(<NavLink to='/'>数据概览</NavLink>, '', <HomeOutlined />),
        getItem(<NavLink to='/article'>内容管理</NavLink>, 'article', <DiffOutlined />),
        getItem(<NavLink to='/publish'>发布文章</NavLink>, 'publish', <EditOutlined />)]

    //获取当前路径  
    const {pathname} = useLocation()
    const newpathname = pathname.replace('/', '')
    const [current,setCurrent] = useState(newpathname)
    const changeCurrent = (e) =>{setCurrent(e.key)} 
        
    //退出登录
    const navigate = useNavigate()
    const onConfirm = () =>{
      //删除token 跳回登录页面
      loginStore.loginOut()
      navigate('/login')
    }

    
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm 
              onConfirm={onConfirm}
              title="是否确认退出？" 
              okText="退出" 
              cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            onClick={changeCurrent}
            mode="inline"
            theme="dark"
            selectedKeys={[current]}
            style={{ height: '100%', borderRight: 0 }}
            items={items}
          />
            
            {/* <Menu.Item icon={<HomeOutlined />} key="1">
              数据概览
            </Menu.Item>
            const dateLook = {label: '数据概览', }
            <Menu.Item icon={<DiffOutlined />} key="2">
              内容管理
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="3">
              发布文章
            </Menu.Item> */}
            
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/*二级路由出口*/}
          <Outlet/>
            
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(GeekLayout)