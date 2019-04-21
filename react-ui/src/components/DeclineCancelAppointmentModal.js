import React from 'react';
import {Modal, Form,Row, Col, Button, Input} from 'antd';
import moment from 'moment';


const DeclineCancelAppointmentModal = Form.create()(
   class extends React.Component {

      state = {
         visible: false
      };

      handleSubmit = (e) => {
         e.preventDefault();
         this.props.form.validateFields((err, values) => {
            if(err)
               return
            this.props.onDeclineCancel({
               id: this.props.appointment.id,
               date_time: this.props.appointment.date_time,
               name: this.props.appointment.name,
               contact_number: this.props.appointment.contact_number,
               type: this.props.type,
               reasonMessage: values.message
            });
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
    
      render() {
         const {form} = this.props;
         const { getFieldDecorator } = form;
         const title = this.props.type === 'decline' ? 'Appointment Decline Reason SMS' : 'Appointment Cancellation Reason SMS';
         const buttonText = this.props.type === 'decline' ? 'Decline Appointment' : 'Cancel Appointment';
         return (
            <React.Fragment>
               <a disabled={this.props.disabled} onClick={this.showModal} target="_blank" rel="noopener noreferrer">{buttonText}</a>
           
               <Modal
                  visible={this.state.visible}
                  title={title}
                  okText="Send"
                  onCancel={this.hideModal}
                  onOk={this.handleSubmit}
               >
               <Form layout="vertical" onSubmit={this.handleSubmit}>
                  <Row gutter={8}>
                     <Col span={24}>
                        <Form.Item label="Message">
                           {getFieldDecorator('message', {
                              rules: [
                                 { required: true, message: 'Message is required.' },
                              ],
                           })(
                           <Input.TextArea autosize={{minRows: 8, maxRows: 8}}/>
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

export default DeclineCancelAppointmentModal;