import React, { Component } from 'react'
//引入antd-mobile相关组件
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'
//引入logo图片
import Logo from '../../components/Logo'
const ListItem = List.Item
export default class Register extends Component {
  state = {
    userName: '',
    pwd: ''
  }
  //收集表单数据
  handleChange = (dataName, val) => {
    this.setState({
      [dataName]: val
    })
  }
  //用户登录
  login = () => {
    console.log(this.state);
  }
  //已有账户,点击跳往登录页面
  toRegister = () => {
    this.props.history.replace('/register')
  }
  render() {
    return (
      <div>
        <NavBar>JOB &nbsp;&nbsp; Hunter</NavBar>
        <Logo />
        <WingBlank>
          <List>
            <WhiteSpace/>
            <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('userName', val)}}>用户名:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='请输入密码'  onChange={val => {this.handleChange('pwd', val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.login}>登 &nbsp;&nbsp; 录</Button>
            <WhiteSpace/>
            <Button type='ghost' onClick={this.toRegister}>没有账户，去注册</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}