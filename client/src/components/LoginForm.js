import React from 'react';
import {
   Form, Icon, Input, Button, Modal, Typography
 } from 'antd';

 const {Text} = Typography;
 
 class NormalLoginForm extends React.Component {

   handleSubmit = (e) => {
      e.preventDefault();
         this.props.form.validateFields((err, values) => {
            if (!err) {
               this.props.handleLogin(values)
               .then((response) => {
                  if(response.data.error) {
                     Modal.error({
                        title: 'System Message',
                        content: response.data.error,
                     });
                  }
               })
               .catch((err) => {
                  console.log('Error inside catch LoginForm',err);
                  Modal.error({
                     title: 'System Message',
                     content: 'Internal server error',
                  });
               });
            }  
      });
   }

   render() {
     const { getFieldDecorator } = this.props.form;
     return (
         <Form onSubmit={this.handleSubmit} className="login-form">
            <Text style={{color: 'black'}}>Username</Text>
            <Form.Item>
               {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
               })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
               )}
            </Form.Item>
            <Text style={{color: 'black'}}>Password</Text>
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