import React from 'react';
import {Modal, Form,Row, Col, Button, Input} from 'antd';


const SendCustomMessageModal = Form.create()(
   class extends React.Component {

      state = {
         visible: false
      };

      handleSubmit = (e) => {
         e.preventDefault();
         this.props.form.validateFields((err, values) => {
            if(err)
               return
            this.props.sendCustomMessage(values.message);
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
         return (
            <React.Fragment>
             <Button disabled={this.props.disabled} onClick={this.showModal} style={{marginRight: 8}} type="primary">Send Custom Message</Button>
               <Modal
                  visible={this.state.visible}
                  title="Send Custom Message"
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

export default SendCustomMessageModal;