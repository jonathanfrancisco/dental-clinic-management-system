import React from 'react';
import {Modal, Form, Input,Row, Col, DatePicker, Select} from 'antd';
const {Option} = Select;

const CreateAccountModalForm = Form.create()(
   class extends React.Component {

      state = {
         confirmDirty: false
       };

      handleConfirmBlur = (e) => {
         const value = e.target.value;
         this.setState({ confirmDirty: this.state.confirmDirty || !!value });
       }

      compareToFirstPassword = (rule, value, callback) => {
         const form = this.props.form;
         if (value && value !== form.getFieldValue('password')) {
           callback('Two passwords that you enter is inconsistent!');
         } else {
           callback();
         }
       }
     

      validateToNextPassword = (rule, value, callback) => {
         const form = this.props.form;
         if (value && this.state.confirmDirty) {
           form.validateFields(['confirm_password'], { force: true });
         }
         callback();
      }
     

      render() {
         const {visible, onCancel, onCreate, form} = this.props;
         const { getFieldDecorator } = form;
         return (
            <Modal
               visible={visible}
               title="Create a new account"
               cancelButtonProps={{type: 'danger'}}
               okText="Create"
               onCancel={onCancel}
               onOk={onCreate}
            >
            <Form layout="vertical">
               
               <Row gutter={8}>
                  <Col span={8}>
                     <Form.Item label="Firstname">
                        {getFieldDecorator('first_name', {
                           rules: [{ required: true, message: 'Firstname is required' }],
                        })(
                        <Input />
                        )}
                     </Form.Item>
                  </Col>
                  <Col span={8}>
                     <Form.Item label="Middlename">
                        {getFieldDecorator('middle_name')(
                        <Input />
                        )}
                     </Form.Item>
                  </Col>
                  <Col span={8}>
                     <Form.Item label="Lastname">
                        {getFieldDecorator('last_name', {
                           rules: [{ required: true, message: 'Lastname is required' }],
                        })(
                        <Input />
                        )}
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={8}>
                  <Col span={12}>
                     <Form.Item label="Address">
                        {getFieldDecorator('address', {
                           rules: [{ required: true, message: 'Address is required' }],
                        })(
                        <Input />
                        )}
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item label="Birthday">
                        {getFieldDecorator('birthday', {
                           rules: [{ required: true, message: 'Birthday is required' }],
                        })(
                        <DatePicker format="MMMM DD, YYYY" style={{width: '100%'}} />
                        )}
                     </Form.Item>
                  </Col>
               </Row>      
                
               <Row gutter={8}>
                  <Col span={12}>
                     <Form.Item label="Username">
                        {getFieldDecorator('username', {
                           rules: [{ required: true, message: 'Username is required' }],
                        })(
                        <Input />
                        )}
                     </Form.Item>
                  </Col>

                  <Col span={12}>
                     <Form.Item label="Role">
                        {getFieldDecorator('role', {
                           rules: [{ required: true, message: 'Role is required' }],
                           initialValue: 'dentalaide'
                        })(
                        <Select>
                           <Option value="dentalaide">Dental Aide</Option>
                           <Option value="dentist">Dentist</Option>
                        </Select>
                        )}
                     </Form.Item>
                  </Col>


                
               </Row>       
               <Row gutter={8}>
                  <Col span={12}>
                     <Form.Item label="Password">
                        {getFieldDecorator('password', {
                           rules: [
                              { required: true, message: 'Password is required' },
                              {validator: this.validateToNextPassword}
                           ],
                        })(
                        <Input.Password />
                        )}
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item label="Confirm Password">
                        {getFieldDecorator('confirm_password', {
                           rules: [
                              { required: true, message: 'Please confirm your password' },
                              { validator: this.compareToFirstPassword}
                           ],
                        })(
                        <Input.Password />
                        )}
                     </Form.Item>
                  </Col>
               </Row>
                           
            </Form>
            </Modal>
         );
      }
   }
);

export default CreateAccountModalForm;

 
//  class CollectionsPage extends React.Component {
//    state = {
//      visible: false,
//    };
 
//    showModal = () => {
//      this.setState({ visible: true });
//    }
 
//    handleCancel = () => {
//      this.setState({ visible: false });
//    }
 
//    handleCreate = () => {
//      const form = this.formRef.props.form;
//      form.validateFields((err, values) => {
//        if (err) {
//          return;
//        }
 
//        console.log('Received values of form: ', values);
//        form.resetFields();
//        this.setState({ visible: false });
//      });
//    }
 
//    saveFormRef = (formRef) => {
//      this.formRef = formRef;
//    }
 
//    render() {
//      return (
//        <div>
//          <Button type="primary" onClick={this.showModal}>New Collection</Button>
//          <CollectionCreateForm
//            wrappedComponentRef={this.saveFormRef}
//            visible={this.state.visible}
//            onCancel={this.handleCancel}
//            onCreate={this.handleCreate}
//          />
//        </div>
//      );
//    }
//  }
 