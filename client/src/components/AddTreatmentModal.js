import React from 'react';
import {Modal, Form, Input, InputNumber, Row, Col, DatePicker, Select, Button, Icon, Radio} from 'antd';
import axios from 'axios';

const AddTreatmentModal = Form.create()(
   class extends React.Component {

      state = {
         visible: false,
         treatedBySelectOptions: [],
         paymentType: '',
         totalAmountToPay: NaN
       };

      componentDidMount() {
         axios.get('/api/users')
         .then((response) => {
            if(response.status === 200)
               this.setState({treatedBySelectOptions: response.data.users});
         })
         .catch((err) => {
            console.log(err);
         });
      }

      handleSubmit = (e) => {
         e.preventDefault();
         this.props.form.validateFields((err, values) => {
            if(err)
               return
            // this.props.onCreate(values);
            this.hideModal();
         });
      }

      handlePaymentTypeChange = (e) => {
         this.setState({paymentType: e.target.value});
      }

      showModal = () => {
         this.setState({visible: true});
      }

      hideModal = () => {
         this.setState({visible: false, totalAmountToPay: NaN});
         this.props.form.resetFields();
      }

      render() {
         const {form} = this.props;
         const { getFieldDecorator } = form;
         return (
            <React.Fragment>
               <a onClick={this.showModal}><Icon type="plus" /> Add</a>
               <Modal
                  visible={this.state.visible}
                  title="Add New Treatment"
                  okText="Add"
                  onCancel={this.hideModal}
                  onOk={this.handleSubmit}
               >
               <Form layout="vertical" onSubmit={this.handleSubmit}>
                  <Row gutter={8}>
                     <Col span={12}>
                        <Form.Item label="Description">
                           {getFieldDecorator('description', {
                              rules: [{ required: true, message: 'Description is required.' }],
                           })(
                           <Input />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Tooth Affected No.">
                           {getFieldDecorator('tooth_affected_no', {
                              initialValue: ''
                           })(
                              <Select>
                                 <Select.Option value=''>N/A</Select.Option>
                                 <Select.OptGroup label="Adult Teeth">
                                    <Select.Option value="LR_32">LR_32</Select.Option>
                                 </Select.OptGroup>
                                 <Select.OptGroup label="Child Teeth">
                                    <Select.Option value="LR_J">LR_J</Select.Option>
                                 </Select.OptGroup>
                              </Select>
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Date Treated">
                           {getFieldDecorator('date_treated', {
                              rules: [{required: true, message: 'Date Treated is required.'}]
                           })(
                              <DatePicker format="MMMM DD, YYYY" style={{width: '100%'}} />
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Treated By">
                           {getFieldDecorator('treated_by', {
                              rules: [{required: true, message: 'Treated By is required.'}]
                           })(
                              <Select>
                                 {
                                    this.state.treatedBySelectOptions.map((option) => {
                                       return <Select.Option value={option.id}>{option.name}</Select.Option>
                                    })
                                 }
                                 
                              </Select>
                           )}
                        </Form.Item>
                     </Col>
                     <Col span={24}>
                        <Form.Item label="Payment Type">
                           {getFieldDecorator('payment_type', {
                              rules: [{required: true, message: 'Payment Type is required.'}]
                           })(
                              <Radio.Group onChange={this.handlePaymentTypeChange} value={this.state.paymentType}>
                                 <Radio value="in-full">In-full</Radio>
                                 <Radio value="installment">Installment</Radio>
                                 <Radio value="no-charge">No Charge</Radio>
                              </Radio.Group>
                           )}
                        </Form.Item>
                     </Col>

                     {
                        this.state.paymentType === 'in-full' ? (
                           <Col span={24}>
                              <Form.Item label="Total Amount To Pay">
                                 {getFieldDecorator('total_amount_to_pay', {
                                    rules: [{ required: true, message: 'Total Amount To Pay is required.' }],
                                 })(
                                 <InputNumber min={1} style={{width: '100%'}} />
                                 )}
                              </Form.Item>
                           </Col> ) 
                           : this.state.paymentType === 'installment' ? (
                              <React.Fragment>
                              <Col span={12}>
                                 <Form.Item label="Total Amount To Pay">
                                    {getFieldDecorator('total_amount_to_pay', {
                                       rules: [{ required: true, message: 'Total Amount To Pay is required.' }],
                                    })(
                                    <InputNumber style={{width: '100%'}} min={1} onChange={(value) => this.setState({totalAmountToPay: value})} />
                                    )}
                                 </Form.Item>
                              </Col> 
                              <Col span={12}>
                                 <Form.Item label="Initial Payment">
                                    {getFieldDecorator('amount_paid', {
                                       rules: [{ required: true, message: 'Initial Payment is required.' }],
                                    })(
                                    <InputNumber style={{width: '100%'}} min={1} max={this.state.totalAmountToPay-1} />
                                    )}
                                 </Form.Item>
                              </Col> 
                           </React.Fragment>) : null
                     }


                  </Row>
                  <Button hidden htmlType="submit"></Button>
               </Form>
               </Modal>
            </React.Fragment>
         );
      }
   }
);

export default AddTreatmentModal;