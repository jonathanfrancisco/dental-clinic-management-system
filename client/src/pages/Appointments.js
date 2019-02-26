import React from 'react';
import CenteredSpinner from '../components/CenteredSpinner';

class Appointments extends React.Component {

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
         <h1>Appointments</h1>
      );
   }
}


export default Appointments;