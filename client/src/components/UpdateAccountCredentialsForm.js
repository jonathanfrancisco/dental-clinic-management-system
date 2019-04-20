import React from 'react';
import {Form, Input,Row, Col, Button, message} from 'antd';
import axios from 'axios';

const UpdateAccountCredentialsForm = Form.create()(
   class extends React.Component {

      handleSubmit = (e) => {
         e.preventDefault();
         this.props.form.validateFields(async (err, values) => {
            if(err)
               return
            await this.props.onUpdate(values);
            this.props.form.setFieldsValue({password: ''});
            this.props.form.setFieldsValue({confirm_password: ''});
            
         });
      }

      compareToFirstPassword = (rule, value, callback) => {
         const form = this.props.form;
         if (value && value !== form.getFieldValue('password')) {
           callback('Two passwords that you enter is inconsistent!');
         } 
         else if(form.getFieldValue('password') && !value) {
            callback('Please confirm your password');
         }
         else {
           callback();
         }
       }
     

      validateToNextPassword = (rule, value, callback) => {
         // const form = this.props.form;
         // if (value) {
         // //   form.validateFields(['confirm_password'], { force: true });
         // }
         callback();
      }

      validateUsername = async (rule, value, callback) => {
         const form = this.props.form;
         if(value)
            await axios.post(`/api/users/${value}/validate`)
            .then((response) => {
               if(response.status === 200) {
                  if(!response.data.isValid && response.data.username !== this.props.account.username)
                     callback('Username already taken!');
                  else
                     callback();
               }
            })
            .catch((err) => {
               console.log(err);
               message.error('Internal server error!');
            });
         else
            callback();
         
      }

      render() {
         const {account} = this.props;
         const {form} = this.props;
         const { getFieldDecorator } = form;
         return (
            <React.Fragment>
               <Form layout="vertical" onSubmit={this.handleSubmit}>
                  <Row gutter={8}>
                     <Col span={24}>
                        <Form.Item label="Username">
                           {getFieldDecorator('username', {
                              rules: [
                                 { required: true, message: 'Username is required' },
                                 { validator: this.validateUsername }
                              ],
                              initialValue: account.username || '',
                              
                           })(
                           <Input />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={24}>
                        <Form.Item label="New Password">
                           {getFieldDecorator('password', {
                              rules: [
                                 {validator: this.validateToNextPassword}
                              ],
                           })(
                           <Input.Password />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={24}>
                        <Form.Item label="Confirm New Password">
                           {getFieldDecorator('confirm_password', {
                              rules: [
                                 { validator: this.compareToFirstPassword}
                              ],
                           })(
                           <Input.Password />
                           )}
                        </Form.Item>
                     </Col>
                  </Row>     
                  <Button htmlType="submit">Update</Button>
               </Form>
            </React.Fragment>
         );
      }
   }
);

export default UpdateAccountCredentialsForm;