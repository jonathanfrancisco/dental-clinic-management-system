import React from 'react';
import {
   Tooltip, Modal, Form, Button, Col, Row, Input, DatePicker, message, notification
} from 'antd';
import moment from 'moment';
import axios from 'axios';


 const RegisterModal = Form.create()(
   class extends React.Component {
   state = {
      visible: false,
      confirmDirty: false,
      registerLoading: false
   };
 
  

   compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }
  

   validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm_password'], { force: true });
      }
      callback();
   }

   validatePatientCode = async (rule, value, callback) => {
      const form = this.props.form;
      if(value)
         await axios.post(`/api/patients/${value}/validate`)
         .then((response) => {
            if(response.status === 200) {
               console.log(response.data.isValid);
               if(!response.data.isValid)
                  callback('Invalid patient code');
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

   validateUsername = async (rule, value, callback) => {
      const form = this.props.form;
      if(value)
         await axios.post(`/api/users/${value}/validate`)
         .then((response) => {
            if(response.status === 200) {
               if(!response.data.isValid)
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
                  if(!response.data.isValid)
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

   showModal = () => {
      this.setState({
        visible: true,
      });
    };
 
   hideModal = () => {
     this.setState({
       visible: false,
     });
     this.props.form.resetFields();
   };

   handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if(err)
            return;
         this.handleRegister(values);
        
      });
   }

   handleRegister = (values) => {
      this.setState({registerLoading: true});
      values.birthday = values.birthday.format('YYYY-MM-DD');
      axios.post('/api/users/register', values)
      .then((response) => {
         if(response.status === 200) {
            setTimeout(() => {
               this.hideModal();
               this.setState({registerLoading: false});
               notification['success']({
                  message: 'Registration Successful!',
                  description: 'You can now login through our portal to access services provided to you as a patient',
                  duration: 5
               });
            },1000);
         }
      })
      .catch((err) => {
         console.log(err);
         setTimeout(() => {
            this.hideModal();
            this.setState({registerLoading: false});
            notification['error']({
               message: 'Registration Error!',
               description: 'Something went wrong! Please, try again.',
               duration: 5
            });
         },1000);
      });
   }


   render() {
     const { getFieldDecorator } = this.props.form;
     return (
         <React.Fragment>
            <a onClick={this.showModal} target="_blank" rel="noopener noreferrer">Register</a>
            <Modal
               title="Register New Patient Account"
               visible={this.state.visible}
               okText="Register"
               onCancel={this.hideModal}
               onOk={this.handleSubmit}
               style={{ top: 20 }}
            >
               <Form onSubmit={this.handleSubmit}>
                  <Row gutter={16}>
                     <Col span={24}>
                        <Form.Item label="Patient Code">
                           <Tooltip title="Patient Code given by the clinic. This is used to link this account to your record in the clinic">
                           {getFieldDecorator('patient_code', {
                              rules: [
                                 { required: true, message: 'Patient Code is required and must be valid' },
                                 { validator: this.validatePatientCode }
                              ],
                           })(<Input />)}
                           </Tooltip>
                        </Form.Item>
                     </Col>
                     <Col span={24}>
                        <Form.Item label="Name">
                           {getFieldDecorator('name', {
                              rules: [{ required: true, message: 'Name is required' }],
                           })(<Input />)}
                        </Form.Item>
                     </Col>
                     <Col span={24}>
                        <Form.Item label="Birthday">
                           {getFieldDecorator('birthday', {
                              rules: [{ required: true, message: 'Birthday is required' }],
                           })( <DatePicker disabledDate={(current) => current && current > moment()} format="MMMM DD, YYYY" style={{width: '100%'}} />)}
                        </Form.Item>
                     </Col>
                     <Col span={24}>
                        <Form.Item label="Address">
                           {getFieldDecorator('address', {
                              rules: [{ required: true, message: 'Address is required' }],
                           })(<Input />)}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Username">
                           {getFieldDecorator('username', {
                              rules: [
                                 { required: true, message: 'Username is required' },
                                 { validator: this.validateUsername }
                              ],
                           })(<Input />)}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        
                        <Form.Item label="Email Address">
                           {getFieldDecorator('emailaddress', {
                              rules: [
                                 { required: true, message: 'Email Address is required' },
                                 { validator: this.validateEmail}
                           ],
                           })(<Input />)}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Password">
                           {getFieldDecorator('password', {
                              rules: [
                                 { required: true, message: 'Password is required' },
                                 {validator: this.validateToNextPassword}
                              ],
                              
                           })(<Input.Password />)}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Confirm Password">
                           {getFieldDecorator('confirm_password', {
                              rules: [
                                 { required: true, message: 'Please confirm your password' },
                                 { validator: this.compareToFirstPassword}
                              ],
                           })(<Input.Password />)}
                        </Form.Item>
                     </Col>
                  </Row>
                  <Button hidden htmlType="submit"></Button>
               </Form>
            </Modal>
       </React.Fragment>
     );
   }
});
 

 export default RegisterModal;