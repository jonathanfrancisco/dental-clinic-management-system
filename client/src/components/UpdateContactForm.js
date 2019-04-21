import React from 'react';
import {Form, Input, Row, Col, Button} from 'antd';

const UpdateContactForm = Form.create()(
   class extends React.Component {

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

      handleSubmit = (e) => {
         e.preventDefault();
         this.props.form.validateFields((err, values) => {
            if(err)
               return
            console.log(values);
            this.props.onUpdateContactNumber(values);
         });
      }

      render() {
         const {getFieldDecorator} = this.props.form;
         return (
            <Form onSubmit={this.handleSubmit}>
               <Form.Item style={{marginBottom: 0}}label="Contact Number">
                  {getFieldDecorator('contact_number', {
                     rules: [
                      { validator: this.validateContactNumber }, 
                     ],
                     initialValue: this.props.contactNumber
                  })(<Input style={{width: '75%'}} />)}
               </Form.Item>
               <Button htmlType="submit" style={{textAlign: 'right'}}>Update Contact</Button>
            </Form>
         );
      }
   }
);


export default UpdateContactForm;