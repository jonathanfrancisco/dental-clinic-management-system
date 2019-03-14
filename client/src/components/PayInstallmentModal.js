import React from 'react';
import {Modal, Form, InputNumber, DatePicker, Row, Col, Button, Icon} from 'antd';
import axios from 'axios';

const PayInstallmentModal = Form.create()(
   class extends React.Component {

      state = {
         visible: false
       };

      handleSubmit = (e) => {
         e.preventDefault();
         this.props.form.validateFields((err, values) => {
            if(err)
               return
            values.current_balance_before = parseInt(this.props.currentBalance);
            this.props.onPay(this.props.treatmentId, values);
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

      checkBalance = (rule, value, callback) => {
         const {form} = this.props;
         const {currentBalance} = this.props;;
         if( (value > currentBalance) || (value < 1 && currentBalance)) 
            callback('Cannot be lower or greater than current balance');
         else
            callback();
      }

      render() {
         const {form} = this.props;
         const { getFieldDecorator } = form;
         return (
            <React.Fragment>
               <a disabled={this.props.disabled} onClick={this.showModal} target="_blank" rel="noopener noreferrer">Pay Installment</a>
               <Modal
                  visible={this.state.visible}
                  title="Pay Installment"
                  okText="Pay"
                  onCancel={this.hideModal}
                  onOk={this.handleSubmit}
               >
               <Form layout="vertical" onSubmit={this.handleSubmit}>
                  <Row gutter={8}>
                     <Col span={12}>
                        <Form.Item label="Amount Paid">
                           {getFieldDecorator('amount_paid', {
                              rules: [
                                 { required: true, message: 'Amount Paid is required.' },
                                 { validator: this.checkBalance}
                              ],
                           })(
                           <InputNumber style={{width: '100%'}} min={1} />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Date Paid">
                           {getFieldDecorator('date_paid', {
                              rules: [{ required: true, message: 'Date Paid is required.' }],
                           })(
                           <DatePicker format="MMMM DD, YYYY" style={{width: '100%'}} />
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

export default PayInstallmentModal;