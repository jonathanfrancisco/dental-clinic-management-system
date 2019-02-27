import React from 'react';
import CenteredSpinner from '../components/CenteredSpinner';
import UserAccountsTable from '../components/UserAccountsTable';

class UserAccounts extends React.Component {

   state = {
      loading: true
   };

   componentDidMount() {
      setTimeout(() => {
         this.setState({loading: false});
      }, 500);
   }   

   render() {
      if(this.state.loading)
         return (
            <CenteredSpinner />
         );
      return (
         <UserAccountsTable />
      );
   }
   
}

export default UserAccounts;