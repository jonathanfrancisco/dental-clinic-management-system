import React from 'react';
import {Modal, Form, Input, Row, Col, Alert, Tooltip, message, notification} from 'antd';
import axios from 'axios';

const ForgotPasswordModal = Form.create()(
   class extends React.Component {

      state = {
         visible: false,
         sending: false
       };

      handleSubmit = (e) => {
         e.preventDefault();
         this.props.form.validateFields((err, values) => {
            if(err)
               return;
               this.setState({sending: true});
               axios.post(`/api/users/forgotPassword`, values)
               .then((response) => {
                  if(response.status === 200) {
                     this.hideModal();
                     notification['info']({
                        message: 'Reset Password Link Sent!',
                        description: 'A password link reset has been sent to your email. Kindly check your email inbox',
                        duration: 5
                     });
                  }
               })
               .catch((err) => {
                  console.log(err);
                  message.error('Internal server error!');
               });
         });
      }

    
      showModal = () => {
         this.setState({visible: true});
      }

      hideModal = () => {
         this.props.form.resetFields();
         this.setState({visible: false, sending: false});
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

      render() {
         const {form} = this.props;
         const { getFieldDecorator } = form;
         return (
            <React.Fragment>
               <a disabled={this.props.disabled} onClick={this.showModal} target="_blank" rel="noopener noreferrer">Forgot Password?</a>
               <Modal
                  visible={this.state.visible}
                  title="Reset Your Password"
                  okText="Send Reset Password Link"
                  onCancel={this.hideModal}
                  onOk={this.handleSubmit}
                  okButtonProps={{ loading: this.state.sending }}
               >
               {
                  
                  <Alert stylx={{marginBottom: 11}} type="info" showIcon message="A reset password link will be sent to your email address to reset your password using the provided new password." />
                 
               }
               <Form style={{marginTop: 11}} layout="vertical">
                  <Row>

                     <Col span={24}>
                       
                           <Form.Item label="Email Address">
                              <Tooltip title="Email Address used when you registered your account.">
                                 {getFieldDecorator('emailaddress', {
                                    rules: [
                                       { required: true, message: 'Email Address is required.' }
                                    ],
                                 })(
                                    <Input />
                                 )}
                              </Tooltip>          
                           </Form.Item>
                             
                     </Col>
                     <Col span={24}>
                              <Form.Item label="New Password">
                                 {getFieldDecorator('password', {
                                    rules: [
                                       {required: true, message: 'New password is required'},
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
                                       {required: true, message: 'Confirm your new password'},
                                       { validator: this.compareToFirstPassword}
                                    ],
                                 })(
                                 <Input.Password />
                                 )}
                              </Form.Item>
                           </Col>
                     
                  </Row>
               </Form>
               </Modal>
            </React.Fragment>
         );
      }
   }
);

export default ForgotPasswordModal;