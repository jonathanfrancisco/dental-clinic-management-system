import React from 'react';
import {message, Modal, Form, Input,Row, Col, DatePicker, Select, Button, Icon} from 'antd';
import axios from 'axios';
import moment from 'moment';

const {Option} = Select;


const PatientCreateAppointmentModal = Form.create()(
   class extends React.Component {

      state = {
         visible: false,
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

          
      disabledDateTime = () => {
         return {
           disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 18, 19, 20, 21, 22, 23],
         };
       }

      
      render() {
         const {form} = this.props;
         const { getFieldDecorator } = form;

         return (
            <React.Fragment>
              <Button onClick={this.showModal} type="primary"><Icon type="plus"/>Create New Appointment</Button>
               <Modal
                  visible={this.state.visible}
                  title="Create a New Appointment"
                  okText="Create"
                  onCancel={this.hideModal}
                  onOk={this.handleSubmit}
               >
               <Form layout="vertical" onSubmit={this.handleSubmit}>
                  <Row gutter={8}>
                     <Col span={24}>
                        <Form.Item label="Date and Time">
                           {getFieldDecorator('date_time', {
                              rules: [{ required: true, message: 'Date and Time is required.' }],
                           })(
                              <DatePicker 
                                 disabledTime={this.disabledDateTime} 
                                 disabledDate={(current) => current && current < moment() || moment(current).day() === 0} 
                                 placeholder="Select date and time" style={{width: '100%'}} 
                                 showTime={
                                    {
                                       use12Hours: true, format: 'h:mm',
                                       defaultValue: moment('8:00', 'h:mm')
                                    }
                                 }
                                 format="MMMM DD, YYYY h:mm A" />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={24}>
                        <Form.Item label="Reason">
                           {getFieldDecorator('reason', {
                              rules: [{ required: true, message: 'Reason is required.' }],  
                           })(
                              <Input />
                           )}
                        </Form.Item>
                     </Col>
                        {getFieldDecorator('patient_id', {
                           rules: [{required: true, message: 'Patient name is required'}],
                           initialValue: this.props.patientId
                        })(
                           <Input hidden/>
                        )}
                  </Row>
                  <Button hidden htmlType="submit"></Button>
               </Form>
               </Modal>
            </React.Fragment>
         );
      }
   }
);

export default PatientCreateAppointmentModal;