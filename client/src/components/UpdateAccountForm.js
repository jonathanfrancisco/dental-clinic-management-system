import React from 'react';
import {Form, Input,Row, Col, DatePicker, Select, Button} from 'antd';
import moment from 'moment';
const {Option} = Select;

const UpdateAccountForm = Form.create()(
   class extends React.Component {

      handleSubmit = (e) => {
         e.preventDefault();
         this.props.form.validateFields((err, values) => {
            if(err)
               return
            this.props.onUpdate(values);
         });
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
            <Select >
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
                        <Form.Item label="Role">
                           {getFieldDecorator('role', {
                              rules: [{ required: true, message: 'Role is required' }],
                              initialValue: account.role || ''
                           })( 
                              roleSelect
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

export default UpdateAccountForm;