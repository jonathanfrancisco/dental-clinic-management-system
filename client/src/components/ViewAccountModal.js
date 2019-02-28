import React from 'react';
import {Modal, Icon, Row, Col, Divider} from 'antd';
import moment from 'moment';

const DescriptionItem = ({ title, content }) => (
   <div
     style={{
       fontSize: 14,
       lineHeight: '22px',
       marginBottom: 7,
       color: 'rgba(0,0,0,0.65)',
     }}
   >
     <p
       style={{
         marginRight: 8,
         display: 'inline-block',
         color: 'rgba(0,0,0,0.85)',
         fontWeight: 'bold'
       }}
     >
       {title}:
     </p>
     {content}
   </div>
 );


const ViewAccountModal = (props) => {

   const {visible, onCancel, account} = props;

   return (
      <Modal
         title={<h2>Account Info</h2>}
         visible={visible}
         okButtonProps={{style:{display: 'none'}}}
         cancelText={<React.Fragment><Icon type="close" />Close</React.Fragment>}
         onCancel={onCancel}
         width="100%"
         style={{maxWidth: '650px'}}
         
      >
         <Divider orientation="left">Personal</Divider>
         <Row>
            <Col span={8}>
               <DescriptionItem title="Firstname" content={account.first_name || ''} />
            </Col>
            <Col span={8}>
               <DescriptionItem title="Middlename" content={account.middle_name || ''} /> 
            </Col>
            <Col span={8}>
               <DescriptionItem title="Lastname" content={account.last_name || ''}/>
            </Col>
         </Row>
         <Row>
            <Col span={8}>
               <DescriptionItem title="Role" content={(account.role === 'dentist' ? 'Dentist' : 'Dental Aide') || ''} />
            </Col>
            <Col span={8}>
               <DescriptionItem title="Address" content={account.address || ''} />
            </Col>
            <Col span={8}>
               <DescriptionItem title="Birthday" content={moment(account.birthday).format('MMMM DD, YYYY') || ''} />
            </Col>
         </Row>
         <Divider orientation="left">Credentials</Divider>
         <Row>
            <Col>
               <DescriptionItem title="Username" content={account.username || ''} />
            </Col>
            
         </Row>
         <Row>
            <Col>
               <DescriptionItem title="Password" content={account.password || ''} />
            </Col>
         </Row>
      </Modal>
   );
}

export default ViewAccountModal;