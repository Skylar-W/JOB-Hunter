import React, { Component } from 'react'
//引入antd-mobile相关组件
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile'
//引入logo图片
import Logo from '../../components/Logo'
const ListItem = List.Item
export default class Register extends Component {
  state = {
    userName: '',
    pwd: '',
    pwd2: '',
    userType: ''
  }
  //收集表单数据
  handleChange = (dataName, val) => {
    this.setState({
      [dataName]: val
    })
  }
  //注册用户
  regAccount = () => {
    console.log(this.state);
  }
  //已有账户,点击跳往登录页面
  toLogin = () => {
    this.props.history.replace('/login')
  }
  render() {
    const {userType} = this.state
    return (
      <div>
        <NavBar>JOB &nbsp;&nbsp; Hunter</NavBar>
        <Logo />
        <WingBlank>
          <List>
            <WhiteSpace/>
            <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('userName', val)}}>用户名:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='请输入用密码'  onChange={val => {this.handleChange('pwd', val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='请确认密码'  onChange={val => {this.handleChange('pwd2', val)}}>确认密码:</InputItem>
            <WhiteSpace/>
            <ListItem>
              <span>用户类型:</span>&nbsp;&nbsp;
              <Radio checked={userType==='hunter'} onChange={() => {this.handleChange('userType', 'hunter')}}>大牛</Radio>&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={userType==='boss'} onChange={() => {this.handleChange('userType', 'boss')}}>老板</Radio>
            </ListItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.regAccount}>注 &nbsp;&nbsp; 册</Button>
            <WhiteSpace/>
            <Button type='ghost' onClick={this.toLogin}>已有账户，去登录</Button>
            {/* 测试代码 */}
            {/* <InputItem >用户名:</InputItem>
            <WhiteSpace/>
            <InputItem>密&nbsp;&nbsp;&nbsp;码:</InputItem>
            <WhiteSpace/>
            <InputItem>确认密码:</InputItem>
            <WhiteSpace/>
            <ListItem>
              <span>用户类型:</span>&nbsp;&nbsp;
              <Radio>大牛</Radio>&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio>老板</Radio>
            </ListItem>
            <WhiteSpace/>
            <Button type='primary'>注 &nbsp;&nbsp; 册</Button>
            <WhiteSpace/>
            <Button>已有账户</Button> */}
          </List>
        </WingBlank>
      </div>
    )
  }
}