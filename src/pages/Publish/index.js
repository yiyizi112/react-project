import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
  } from 'antd'
  import { PlusOutlined } from '@ant-design/icons'
  import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
  import './index.scss'
  import ReactQuill from 'react-quill'
  import 'react-quill/dist/quill.snow.css'
  import { useStore } from '@/store'
  import {observer} from 'mobx-react-lite'
  import {useEffect, useRef, useState} from 'react'
  import { http } from '@/utils'

  const { Option } = Select
  
  const Publish = () => {
    const { channelStore } = useStore()
    const [fileList, setFileList] = useState()
   
    //图片缓存仓库
    const cacheImgList = useRef([])
    const onUploadChange = ({fileList}) => {
        // console.log(result)
        const formatList = fileList.map(file => {
            if(file.response){
                return{
                    url: file.response.data.url
                }
            }
            return file 
        })

        setFileList(formatList)
        cacheImgList.current = formatList
    }


    //切换图片数量
    const [imgCount, setImgCount] = useState(1)
    const radioChange = ((e) => {
        // console.log()
        const rawImg = e.target.value
        setImgCount(rawImg)
        //把图片交给fileList
        if(rawImg === 1){
            const img = cacheImgList.current[0]
            setFileList([img])
        } else if(rawImg === 3){
            setFileList(cacheImgList.current)
        }
    })
      
    //编辑文章
    const [params]  = useSearchParams()
    const id = params.get('id')

    //数据回填  id调用接口
    const form = useRef(null)
    useEffect(() => {
        const loadDetail = async () => {
            const res = await http.get(`/mp/articles/${id}`)
            // console.log(res.data)
            form.current.setFieldsValue({... res.data, type:res.data.cover.type})
            // console.log(res)
            const formatImgList =  res.data.cover.images.map(url => {
                return {
                    url
                 }
            })
            setFileList( formatImgList )
            //暂存列表里存一份
            cacheImgList.current = formatImgList
        }

        if(id){
            loadDetail()
            // console.log(form.current)
        }
    }, [id])

    //提交表单
    const navigate = useNavigate()
    const onFinish = async (values) => {
        // console.log(values)
        const { channel_id, content, title, type} = values
        const params = {
            channel_id,
            content,
            title,
            type,
            cover: {
                type:type,
                images:fileList.map(item => item.url)
            }
        }
        if(id){
            await http.put(`/mp/articles?${id}?draft=false`, params)
        }else{
            await http.post('/mp/articles?draft=false', params)
        }
        //跳转列表 
        navigate('/article')
        message.success(id? '更新成功':'发布成功')

    }


    return (
      <div className="publish">
        <Card
          title={
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <Link to="/home">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{id? '编辑文章':'发布文章'}</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ type: 1 }}
            onFinish={onFinish}
            ref={form}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '请输入文章标题' }]}
            >
              <Input placeholder="请输入文章标题" style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="频道"
              name="channel_id"
              rules={[{ required: true, message: '请选择文章频道' }]}
            >
              <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                {channelStore.channelList.map((channel) => (<Option value={channel.name}  key={channel.id} >{channel.name}</Option>))}
                
              </Select>
            </Form.Item>
  
            <Form.Item label="封面">
              <Form.Item name="type">
                <Radio.Group onChange={radioChange}>
                  <Radio value={1}>单图</Radio>
                  <Radio value={3}>三图</Radio>
                  <Radio value={0}>无图</Radio>
                </Radio.Group>
              </Form.Item>
              {imgCount > 0 && (<Upload
                    name="image"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList
                    action="http://geek.itheima.net/v1_0/upload"
                    fileList={fileList}
                    onChange={onUploadChange}
                    multiple={imgCount > 1}
                    maxCount={imgCount}
                    >
                    <div style={{ marginTop: 8 }}>
                        <PlusOutlined />
                    </div>
                </Upload>)}
            </Form.Item>
            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '请输入文章内容' }]}
            >
                <ReactQuill theme='snow' />
            </Form.Item>
  
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button size="large" type="primary" htmlType="submit" >
                {id? '更新文章':'发布文章'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  
  export default observer(Publish)