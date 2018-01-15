import React,{Component} from 'react'
import { Button } from 'antd'
import { Row, Col,Form,Tooltip,Icon,Cascader,Select,Input } from 'antd'
import PostImg from './PostImg'
import pca from './pca.json'
import phone from './phone.json'

const FormItem = Form.Item
const { Option, OptGroup } = Select
class PostPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      confirmDirty: false,
      residences:[],
      imgUrl:''
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && this.state.imgUrl !== '') {
        console.log('Received values of form: ', values);
        values.image = this.state.imgUrl
        fetch('/post_data',{
          method:'POST',
          url:'/post_data',
          body:JSON.stringify(values)
        }).then((response)=>{
          console.log(response.status)
        })
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  checkImg = (rule, value, callback) => {
    const form = this.props.form
    if(this.state.imgUrl === ''){
      callback('请选择或裁剪图片');
    }
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  componentDidMount = () =>{
    let residences = this.state.residences
    let pushdata = (target,key) =>{
      if(!(key instanceof Array)){
        for(let j in key){
          target.push({
            value:j,
            label:j,
            children:new Array()
          })
          let state = target[target.length - 1]
          pushdata(state.children,key[j])
        }
      }else{
        try {
          for(let j of key){
            target.push({
              value:j,
              label:j,                
            })         
          }
        } catch (error) {
          console.log(error.message)
        }
      }
    }
    pushdata(residences,pca)
    this.setState({residences})
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render(){
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    return (
      <Row>
        <Col lg = {{span:12}} xs = {{span:24,offset:0}}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入姓名',
                }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="电话"
            >
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入电话号码' }],
              })(
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="地址"
            >
              {getFieldDecorator('location', {
                initialValue: ['北京市', '市辖区', '东城区'],
                rules: [{ type: 'array', required: true, message: '请选择住处' }],
              })(
                <Cascader options={this.state.residences} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机型号"
            >
              {getFieldDecorator('type', {
                initialValue: 'iphone7',
                rules: [{
                  required: true, message: '选择手机型号',
                }],
              })(
                <Select
                  onChange = {()=>{console.log('hello')}}
                >
                  {Object.keys(phone).map((group)=>{
                    return(
                      <OptGroup key = {group} label={group}>
                        {phone[group].map((option)=>{
                          return(
                            <Option key = {option.name} value = {option.name}>{option.name}</Option>
                          )
                        })}
                      </OptGroup>
                    )
                  })}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机型号"
            >
              {getFieldDecorator('image', {
                getValueFromEvent: this.normFile,
              })(
                <PostImg imgUrl = {(val) => {this.setState({imgUrl:val})}} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
            >
              <Button type="primary" htmlType="submit" className="full-button">
                提交
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    )
  }
}

PostPage = Form.create()(PostPage)
export default PostPage