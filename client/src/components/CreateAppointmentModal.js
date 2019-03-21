import React from 'react';
import {message, Modal, Form, Input,Row, Col, DatePicker, Select, Button, Icon} from 'antd';
import axios from 'axios';
import moment from 'moment';

const {Option} = Select;


const CreateAppointmentModal = Form.create()(
   class extends React.Component {

      state = {
         visible: false,
         searchPatientInputData: []
      };


      handleSearch = (value) => {
         // ajax stuff
         axios.get('/api/patients', {
            params: {search: value}
         })
         .then((response) => {
            if(response.status === 200)         
               this.setState({searchPatientInputData: response.data.patients});
         })
         .catch((err) => {
            console.log(err);
            message.error('Something went wrong! Please, try again.');
         });
      }
   
      handleSearchChange = (value) => {
         this.props.form.setFieldsValue({patient_id: value});
      }
     

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

      range(start, end) {
         const result = [];
         for (let i = start; i < end; i++) {
           result.push(i);
         }
         return result;
       }
       

      disabledDateTime() {
         return {
           disabledHours: () => this.range(0, 24).splice(4, 20),
           disabledMinutes: () => this.range(30, 60),
           disabledSeconds: () => [55, 56],
         };
       }
     
      
      render() {
         const {form} = this.props;
         const { getFieldDecorator } = form;
         const options = this.state.searchPatientInputData.map(d => <Option key={d.id}>{d.name}</Option>)
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
                              <DatePicker disabledDate={(current) => current && current < moment()} placeholder="Select date and time" style={{width: '100%'}} showTime={{use12Hours: true, format: 'HH:mm'}} format="MMMM DD, YYYY hh:mm A" />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={24}>
                        <Form.Item label="Patient Name">
                           {getFieldDecorator('patient_id', {
                              rules: [{required: true, message: 'Patient name is required'}],
                           })(
                              <Select
                                 allowClear
                                 showSearch
                                 placeholder=""
                                 defaultActiveFirstOption={false}
                                 showArrow={false}
                                 filterOption={false}
                                 onSearch={this.handleSearch}
                                 onChange={this.handleChange}
                                 notFoundContent={null}
                              >
                                 {options}
                              </Select>
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
                  </Row>
                  <Button hidden htmlType="submit"></Button>
               </Form>
               </Modal>
            </React.Fragment>
         );
      }
   }
);

export default CreateAppointmentModal;