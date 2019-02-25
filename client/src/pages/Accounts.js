import React from 'react';
import CenteredSpinner from '../components/CenteredSpinner';
import AccountsTable from '../components/AccountsTable';

class Accounts extends React.Component {

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
         <AccountsTable />
      );
   }
   
}

export default Accounts;