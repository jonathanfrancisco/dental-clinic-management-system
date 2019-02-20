import React from 'react';
import {
   Form, Icon, Input, Button, Modal
 } from 'antd';
 
 class NormalLoginForm extends React.Component {

   handleSubmit = (e) => {
      e.preventDefault();
         this.props.form.validateFields((err, values) => {
            if (!err) {
               const result = this.props.handleLogin(values);
               if(result.errors)
                  Modal.error({
                     title: 'System Message',
                     content: 'Incorrect username or password!',
                  });
            }  
      });
   }

   render() {
     const { getFieldDecorator } = this.props.form;
     return (
         <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
               {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
               })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
               )}
            </Form.Item>
            <Form.Item>
               {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your password!' }],
               })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
               )}
            </Form.Item>
            <Form.Item>
               <Button block type="primary" htmlType="submit" className="login-form-button">
                  <Icon type="login" />
                  Log in
               </Button>
            </Form.Item>
         </Form>
     );
   }
}
 
const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm;