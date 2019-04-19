import React from 'react';
import {
   Tooltip, Drawer, Form, Button, Col, Row, Input, DatePicker,
} from 'antd';
import moment from 'moment';


 const RegisterDrawer = Form.create()(
   class extends React.Component {
   state = { visible: false };
 
   showDrawer = () => {
     this.setState({
       visible: true,
     });
   };
 
   onClose = () => {
     this.setState({
       visible: false,
     });
     this.props.form.resetFields();
   };

   handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if(err)
            return
         console.log(values);
         this.onClose();
      });
   }
 
   render() {
     const { getFieldDecorator } = this.props.form;
     return (
         <React.Fragment>
            
            <a onClick={this.showDrawer} target="_blank" rel="noopener noreferrer">Register</a>
            <Drawer
               title="Register New Patient Account"
               placement="right"
               width={520}
               onClose={this.onClose}
               visible={this.state.visible}
            >
               <Form onSubmit={this.handleSubmit}>
                  <Row gutter={16}>
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
                     <Col span={12}>
                        <Form.Item label="Address">
                           {getFieldDecorator('address', {
                              rules: [{ required: true, message: 'Address is required' }],
                           })(<Input />)}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Email Address">
                           {getFieldDecorator('email_address', {
                              rules: [{ required: true, message: 'Email Address is required' }],
                           })(<Input />)}
                        </Form.Item>
                     </Col>
                     <Col span={24}>
                        <Form.Item label="Patient Code">
                           {getFieldDecorator('patient_code', {
                              rules: [{ required: true, message: 'Patient Code is required and must be valid' }],
                           })(<Tooltip title="Patient Code given by the clinic"><Input /></Tooltip>)}
                        </Form.Item>
                     </Col>
                  </Row>
                  <Button hidden htmlType="submit"></Button>
               </Form>
               <div
                  style={{
                     position: 'absolute',
                     left: 0,
                     bottom: 0,
                     width: '100%',
                     borderTop: '1px solid #e9e9e9',
                     padding: '10px 16px',
                     background: '#fff',
                     textAlign: 'right',
                  }}
               >
                  <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                     Cancel
                  </Button>
                  <Button onClick={this.handleSubmit} type="primary">
                     Register
                  </Button>
               </div>
            </Drawer>
       </React.Fragment>
     );
   }
});
 

 export default RegisterDrawer;