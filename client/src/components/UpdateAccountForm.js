import React from 'react';
import {message, Form, Input,Row, Col, DatePicker, Select, Button} from 'antd';
import moment from 'moment';
import axios from 'axios';
const {Option} = Select;

const UpdateAccountForm = Form.create()(
   class extends React.Component {

      state= {
         selectedRole: ''
      };

      handleSubmit = (e) => {
         e.preventDefault();
         this.props.form.validateFields((err, values) => {
            if(err)
               return
            this.props.onUpdate(values);
         });
      }

      validateEmailFormat =(email) => {
         var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return re.test(String(email).toLowerCase());
     }

      validateEmail = async (rule, value, callback) => {
         const form = this.props.form;
         if(this.validateEmailFormat(value)) {
            if(value) {
               await axios.post(`/api/users/${value}/validateEmail`)
               .then((response) => {
                  if(response.status === 200) {
                     if(!response.data.isValid && response.data.email !== this.props.account.emailaddress)
                        callback('Email Address already used!');
                     else
                        callback();
                  }
               })
               .catch((err) => {
                  console.log(err);
                  message.error('Internal server error!');
               });
            }
         }
         else if(!this.validateEmailFormat(value) && value !== '')  {
            callback('Invalid Email Address format')
         }
         callback();         
      }

      handleSelectRoleChange = (value) => {
         this.setState({selectedRole: value});
      }

      render() {
         const {account} = this.props;
         const {form} = this.props;
         const { getFieldDecorator } = form;
         const roleSelect = account.role === 'patient' ? (
            <Select disabled>
               <Option value="dentalaide">Dental Aide</Option>
               <Option value="dentist">Dentist</Option>
            </Select>
         ) : (
            <Select onChange={this.handleSelectRoleChange}>
               <Option value="dentalaide">Dental Aide</Option>
               <Option value="dentist">Dentist</Option>
            </Select>
         );
         return (
            <React.Fragment>
               <Form layout="vertical" onSubmit={this.handleSubmit}>
                  <Row gutter={8}>
                     <Col span={12}>
                        <Form.Item label="Name">
                           {getFieldDecorator('name', {
                              rules: [{ required: true, message: 'Name is required' }],
                              initialValue: account.name || ''
                           })(
                           <Input />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Address">
                           {getFieldDecorator('address', {
                              rules: [{ required: true, message: 'Address is required' }],
                              initialValue: account.address || ''
                           })(
                           <Input />
                           )}
                        </Form.Item>
                     </Col>
                  </Row>
                  <Row gutter={8}>                  
                     <Col span={12}>
                        <Form.Item label="Birthday">
                           {getFieldDecorator('birthday', {
                              rules: [{ required: true, message: 'Birthday is required' }],
                              initialValue: moment(account.birthday) || ''
                           })(
                           <DatePicker disabledDate={(current) => current && current > moment()} format="MMMM DD, YYYY" style={{width: '100%'}} />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}> 
                     {
                        account.role === 'patient' ? (
                           <Form.Item label="Email Address">
                              {getFieldDecorator('emailaddress', {
                                 rules: [
                                    { required: true, message: 'Email Address is required. ' },
                                    { validator: this.validateEmail}
                                 ],
                                 initialValue: account.emailaddress || ''
                              })(
                              <Input />
                              )}
                           </Form.Item>
                        ) 
                        : (
                           <Form.Item label="Role">
                           {getFieldDecorator('role', {
                              rules: [{ required: true, message: 'Role is required' }],
                              initialValue: account.role || ''
                           })( 
                              roleSelect
                           )}
                        </Form.Item>
                        ) 
                     }
                     </Col>
                     
                     { (account.role === 'dentist' && this.state.selectedRole !== 'dentalaide') || this.state.selectedRole === 'dentist' ? (
                           <Col span={24}>
                              <Form.Item label="Email Address">
                                    {getFieldDecorator('emailaddress', {
                                       rules: [{ required: true, message: 'Email Address is required' }],
                                       initialValue: account.emailaddress || ''
                                    })(
                                 <Input />
                                 )}
                              </Form.Item>
                           </Col>
                     ) : null}
             

                  </Row>      
                  <Button htmlType="submit">Update</Button>
               </Form>
   
            </React.Fragment>
         );
      }
   }
);

export default UpdateAccountForm;