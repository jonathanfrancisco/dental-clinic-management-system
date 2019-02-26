import React from 'react';
import CenteredSpinner from '../components/CenteredSpinner';

class DentalRecords extends React.Component {

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
         <h1>Dental Records</h1>
      );
   }
}


export default DentalRecords;