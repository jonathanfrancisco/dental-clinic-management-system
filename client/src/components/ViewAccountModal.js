import React from 'react';
import {Button, Modal, Icon, Row, Col, Divider} from 'antd';
import DescriptionItem from './DescriptionItem';
import moment from 'moment';



class ViewAccountModal extends React.Component {

   state = {
      visible: false
   };

   showModal = () => {
      this.setState({visible: true});
   }

   hideModal = () => {
      this.setState({visible: false});
   }

   render() {
      const {account} = this.props;
      return (
         <React.Fragment>
            <Button onClick={this.showModal} type="primary"><Icon type="profile" /></Button>
            <Modal
               title={<h2>Account Info</h2>}
               visible={this.state.visible}
               okButtonProps={{style:{display: 'none'}}}
               cancelText={<React.Fragment><Icon type="close" />Close</React.Fragment>}
               onCancel={this.hideModal}
               width="100%"
               style={{maxWidth: '650px'}}
               
            >
               <Divider orientation="left">Personal</Divider>
               <Row>
                  <Col span={8}>
                     <DescriptionItem title="Firstname" content={account.first_name} />
                  </Col>
                  <Col span={8}>
                     <DescriptionItem title="Middlename" content={account.middle_name} /> 
                  </Col>
                  <Col span={8}>
                     <DescriptionItem title="Lastname" content={account.last_name}/>
                  </Col>
               </Row>
               <Row>
                  <Col span={8}>
                     <DescriptionItem title="Role" content={account.role === 'dentist' ? 'Dentist' : 'Dental Aide'} />
                  </Col>
                  <Col span={8}>
                     <DescriptionItem title="Address" content={account.address || ''} />
                  </Col>
                  <Col span={8}>
                     <DescriptionItem title="Birthday" content={moment(account.birthday).format('MMMM DD, YYYY')} />
                  </Col>
               </Row>
               <Divider orientation="left">Credentials</Divider>
               <Row>
                  <Col>
                     <DescriptionItem title="Username" content={account.username} />
                  </Col>
                  
               </Row>
               <Row>
                  <Col>
                     <DescriptionItem title="Password" content={account.password} />
                  </Col>
               </Row>
            </Modal>
         </React.Fragment>
      );
   }
}




export default ViewAccountModal;