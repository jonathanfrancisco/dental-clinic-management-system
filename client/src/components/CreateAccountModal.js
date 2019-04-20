import React from 'react';
import {Modal, Form, Input,Row, Col, DatePicker, Select, Button, Icon} from 'antd';
import moment from 'moment';
const {Option} = Select;

const CreateAccountModal = Form.create()(
   class extends React.Component {

      state = {
         confirmDirty: false,
         visible: false,
         selectedRole: ''
       };

      handleSubmit = (e) => {
         e.preventDefault();
         this.props.form.validateFields((err, values) => {
            if(err)
               return
            this.props.onCreate(values);
            this.hideModal();
         });
      }

      showModal = () => {
         this.setState({visible: true});
      }

      hideModal = () => {
         this.setState({visible: false});
         this.props.form.resetFields();
      }

      handleConfirmBlur = (e) => {
         const value = e.target.value;
         this.setState({ confirmDirty: this.state.confirmDirty || !!value });
       }

      handleSelectRoleChange = (value) => {
         this.setState({selectedRole: value});
      }

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


      render() {
         const {form} = this.props;
         const { getFieldDecorator } = form;
         return (
            <React.Fragment>
               <Button type="primary" onClick={this.showModal}><Icon type="usergroup-add" />
                  Create New User Account
               </Button>
               <Modal
                  visible={this.state.visible}
                  title="Create a New User Account"
                  okText="Create"
                  onCancel={this.hideModal}
                  onOk={this.handleSubmit}
               >
               <Form layout="vertical" onSubmit={this.handleSubmit}>
                  <Row>
                     <Col span={24}>
                        <Form.Item label="Name">
                           {getFieldDecorator('name', {
                              rules: [{ required: true, message: 'Name is required' }],
                           })(
                           <Input />
                           )}
                        </Form.Item>
                     </Col>
                  </Row>
                  <Row gutter={8}>
                     <Col span={12}>
                        <Form.Item label="Address">
                           {getFieldDecorator('address', {
                              rules: [{ required: true, message: 'Address is required' }],
                           })(
                           <Input />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Birthday">
                           {getFieldDecorator('birthday', {
                              rules: [{ required: true, message: 'Birthday is required' }],
                           })(
                           <DatePicker disabledDate={(current) => current && current > moment()} format="MMMM DD, YYYY" style={{width: '100%'}} />
                           )}
                        </Form.Item>
                     </Col>
                  </Row>      
                  
                  <Row gutter={8}>
                     <Col span={12}>
                        <Form.Item label="Username">
                           {getFieldDecorator('username', {
                              rules: [{ required: true, message: 'Username is required' }],
                           })(
                           <Input />
                           )}
                        </Form.Item>
                     </Col>

                     <Col span={12}>
                        <Form.Item label="Role">
                           {getFieldDecorator('role', {
                              rules: [{ required: true, message: 'Role is required' }],
                              initialValue: 'dentalaide'
                           })(
                           <Select onChange={this.handleSelectRoleChange}>
                              <Option value="dentalaide">Dental Aide</Option>
                              <Option value="dentist">Dentist</Option>
                           </Select>
                           )}
                        </Form.Item>
                     </Col>
                  </Row>       
                  <Row gutter={8}>
                     <Col span={12}>
                        <Form.Item label="Password">
                           {getFieldDecorator('password', {
                              rules: [
                                 { required: true, message: 'Password is required' },
                                 {validator: this.validateToNextPassword}
                              ],
                           })(
                           <Input.Password />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Confirm Password">
                           {getFieldDecorator('confirm_password', {
                              rules: [
                                 { required: true, message: 'Please confirm your password' },
                                 { validator: this.compareToFirstPassword}
                              ],
                           })(
                           <Input.Password />
                           )}
                        </Form.Item>
                     </Col>
                     
                     {this.state.selectedRole === 'dentist' ? (
                           <Col span={24}>
                           <Form.Item label="Email Address">
                              {getFieldDecorator('emailaddress', {
                                 rules: [
                                    { required: true, message: 'Email Address is required' },  
                                 ],
                              })(
                              <Input />
                              )}
                           </Form.Item>
                           </Col>
                     ) : null}

                  </Row>
                  <Button hidden htmlType="submit"></Button>
               </Form>
               </Modal>
            </React.Fragment>
         );
      }
   }
);

export default CreateAccountModal;