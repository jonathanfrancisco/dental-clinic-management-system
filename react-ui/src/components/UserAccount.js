import React from 'react';
import {Tabs, Row, Col, Icon, message} from 'antd';
import {Link} from 'react-router-dom';
import UpdateAccountForm from '../components/UpdateAccountForm';
import UpdateAccountCredentialsForm from '../components/UpdateAccountCredentialsForm';
import axios from 'axios';


const {TabPane} = Tabs;


class UserAccount extends React.Component {

   state = {
      account: {}
   };

   componentDidMount() {
      this.getUserAccount(this.props.id);
   }

   getUserAccount(id) {
      axios.get(`/api/users/${id}`)
      .then((response) => {
         if(response.status === 200)
            this.setState({account: response.data.user});
      })
      .catch((err) => {
         console.log(err);
         message.error('Something went wrong! Please, try again.');
      });
   }


   handleUpdate = (values) => {

      const hide = message.loading('Updating Account...', 0);
      if(values.birthday)
         values.birthday = values.birthday.format('YYYY-MM-DD');


      axios.patch(`/api/users/${this.state.account.id}/update`, values)
      .then((response) => {
         if(response.status === 200) {
            hide();
            message.success('Account Updated Successfully');
         }
      })
      .catch((err) => {
         console.log(err);
         hide();
         message.error('Something went wrong! Please, try again.');
      });
      
   }

   render() {
      return (
         <React.Fragment>
            <Row style={{marginBottom: 21}}>
               <Col align="left">
                  <Link to="/useraccounts"> <Icon type="arrow-left" /> Back to User Accounts</Link>
               </Col>
            </Row>
            <Tabs tabPosition="left" defaultActiveKey="1">
               <TabPane tab="Personal Info" key="1">
                  <UpdateAccountForm onUpdate={this.handleUpdate} account={this.state.account} />
               </TabPane>
               <TabPane tab="Account Credentials" key="2">
                  <UpdateAccountCredentialsForm onUpdate={this.handleUpdate} account={this.state.account} />
               </TabPane>
            </Tabs>
         </React.Fragment>
      );
   }

}

export default UserAccount;