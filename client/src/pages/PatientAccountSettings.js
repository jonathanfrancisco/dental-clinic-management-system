import React from 'react';
import {Layout, Tabs, Typography, message} from 'antd';
import UpdateAccountForm from '../components/UpdateAccountForm';
import UpdateAccountCredentialsForm from '../components/UpdateAccountCredentialsForm';
import axios from 'axios';

const {Title} = Typography;
const {Content} = Layout;
const {TabPane} = Tabs;

class PatientAccountSettings extends React.Component {

   state = {
      account: {}
   };

   componentDidMount() {
      this.getUserAccount(this.props.user.id);
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
      values.role = this.state.account.role;

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
      console.log(this.state.account);
      return (
      <Content style={{margin: '24px 24px 24px 36px', padding: 24, background: '#fff'}}>
         <Title level={4}>ACCOUNT SETTINGS</Title>
         <Tabs tabPosition="left" defaultActiveKey="1">
            <TabPane tab="Personal Info" key="1">
               <UpdateAccountForm onUpdate={this.handleUpdate} account={this.state.account} />
            </TabPane>
            <TabPane tab="Account Credentials" key="2">
               <UpdateAccountCredentialsForm onUpdate={this.handleUpdate} account={this.state.account} />
            </TabPane>
         </Tabs>
      </Content>
      );
   }
}

export default PatientAccountSettings;

// account={this.state.account}