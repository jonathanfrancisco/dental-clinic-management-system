import React from 'react';
import {Form, Modal, Row, Col, Input, Button, Icon, DatePicker, Select} from 'antd';
import moment from 'moment';

const {Option} = Select;

const UpdatePersonalInfoModal = Form.create()(
   class extends React.Component {

      state = {
         visible: false
       };

      handleSubmit = (e) => {
         e.preventDefault();
         this.props.form.validateFields((err, values) => {
            if(err)
               return
            this.props.onUpdate(this.props.patient.code, values);
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

      
      validateContactNumber = (rule, value, callback) => {

         const myRegex = /^(09|\+639)\d{9}$/;
       
         if(!value)
            callback();
         else if(isNaN(parseInt(value)) || (myRegex.exec(value) == null && (value.length < 11 || value.length > 11))) { 
            console.log(value.length);
            callback('Invalid Contact Number');
         }
         else 
            callback();
            
      }

      render() {
         const {form} = this.props;
         const { getFieldDecorator } = form;
         return (
            <React.Fragment>
               <Button onClick={this.showModal} type="default"><Icon type="edit" /> Update Info</Button>
               <Modal
                  visible={this.state.visible}
                  title="Update Patient's Personal Info"
                  okText="Update"
                  onCancel={this.hideModal}
                  onOk={this.handleSubmit}
               >
               <Form layout="vertical" onSubmit={this.handleSubmit}>
               <Row gutter={8}>
                     <Col span={24}>
                        <Form.Item label="Name">
                           {getFieldDecorator('name', {
                              rules: [{ required: true, message: 'Name is required' }],
                              initialValue: this.props.patient.name
                           })(
                           <Input />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Address">
                           {getFieldDecorator('address', {
                              rules: [{ required: true, message: 'Address is required' }],
                              initialValue: this.props.patient.address
                           })(
                           <Input />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Birthday">
                           {getFieldDecorator('birthday', {
                              rules: [{ required: true, message: 'Birthday is required' }],
                              initialValue: moment(this.props.patient.birthday)
                           })(
                           <DatePicker disabledDate={(current) => current && current < moment()} format="MMMM DD, YYYY" style={{width: '100%'}} />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Occupation">
                           {getFieldDecorator('occupation', {
                              initialValue: this.props.patient.occupation || ''
                           })(
                           <Input />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Civil Status">
                           {getFieldDecorator('civil_status', {
                              initialValue: this.props.patient.civil_status || ''
                           })(
                           <Select>
                              <Option value="single">Single</Option>
                              <Option value="married">Married</Option>
                              <Option value="widowed">Widowed</Option>
                              <Option value="separated">Separated</Option>
                           </Select>
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={24}>
                        <Form.Item label="Contact Number">
                           {getFieldDecorator('contact_number', {
                              initialValue: this.props.patient.contact_number || '',
                              rules: [
                                 {validator: this.validateContactNumber}
                              ]
                           })(
                              <Input />
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

export default UpdatePersonalInfoModal;