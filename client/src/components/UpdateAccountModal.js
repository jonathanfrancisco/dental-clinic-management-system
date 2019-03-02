import React from 'react';
import {Modal, Form, Input,Row, Col, DatePicker, Select, Button, Icon} from 'antd';
import moment from 'moment';
const {Option} = Select;

const UpdateAccountModal = Form.create()(
   class extends React.Component {

      state = {
         confirmDirty: false,
         visible: false
       };

      handleSubmit = (e) => {
         e.preventDefault();
         this.props.form.validateFields((err, values) => {
            if(err)
               return
            this.props.onUpdate(this.props.account.id, values);
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

      compareToFirstPassword = (rule, value, callback) => {
         const form = this.props.form;
         if (value && value !== form.getFieldValue('password')) {
           callback('Two passwords that you enter is inconsistent!');
         } 
         else if(form.getFieldValue('password') && !value) {
            console.log('Hmmmm??');
            callback('Please confirm your password');
         }
         else {
           callback();
         }
       }
     

      validateToNextPassword = (rule, value, callback) => {
         const form = this.props.form;
         if (value) {
         //   form.validateFields(['confirm_password'], { force: true });
         }
         callback();
      }


      render() {
         const {form, account} = this.props;
         const { getFieldDecorator } = form;
         return (
            <React.Fragment>
               <Button onClick={this.showModal}><Icon type="form" /></Button>
               <Modal
                  visible={this.state.visible}
                  title="Update Account"
                  okText="Update"
                  onCancel={this.hideModal}
                  onOk={this.handleSubmit}
               >
               <Form layout="vertical" onSubmit={this.handleSubmit}>
                  <Row gutter={8}>
                     <Col span={8}>
                        <Form.Item label="Firstname">
                           {getFieldDecorator('first_name', {
                              rules: [{ required: true, message: 'Firstname is required' }],
                              initialValue: account.first_name
                           })(
                           <Input />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={8}>
                        <Form.Item label="Middlename">
                           {getFieldDecorator('middle_name', {
                              initialValue: account.middle_name
                           })(
                           <Input />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={8}>
                        <Form.Item label="Lastname">
                           {getFieldDecorator('last_name', {
                              rules: [{ required: true, message: 'Lastname is required' }],
                              initialValue: account.last_name
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
                              initialValue: account.address
                           })(
                           <Input />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Birthday">
                           {getFieldDecorator('birthday', {
                              rules: [{ required: true, message: 'Birthday is required' }],
                              initialValue: moment(account.birthday)
                           })(
                           <DatePicker format="MMMM DD, YYYY" style={{width: '100%'}} />
                           )}
                        </Form.Item>
                     </Col>
                  </Row>      
                  
                  <Row gutter={8}>
                     <Col span={12}>
                        <Form.Item label="Username">
                           {getFieldDecorator('username', {
                              rules: [{ required: true, message: 'Username is required' }],
                              initialValue: account.username
                           })(
                           <Input />
                           )}
                        </Form.Item>
                     </Col>

                     <Col span={12}>
                        <Form.Item label="Role">
                           {getFieldDecorator('role', {
                              rules: [{ required: true, message: 'Role is required' }],
                              initialValue: account.role
                           })(
                           <Select>
                              <Option value="dentalaide">Dental Aide</Option>
                              <Option value="dentist">Dentist</Option>
                           </Select>
                           )}
                        </Form.Item>
                     </Col>
                  </Row>       
                  <Row gutter={8}>
                     <Col span={12}>
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
                     <Col span={12}>
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
                  <Button hidden htmlType="submit"></Button>
               </Form>
               </Modal>
            </React.Fragment>
         );
      }
   }
);

export default UpdateAccountModal;