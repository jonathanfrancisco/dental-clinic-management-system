import React from 'react';
import CenteredSpinner from '../components/CenteredSpinner';

class Dashboard extends React.Component {

   state  ={
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
         <h1>Dashboard</h1>
      );
   }
}


export default Dashboard;