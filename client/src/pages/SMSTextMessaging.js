import React from 'react';
import CenteredSpinner from '../components/CenteredSpinner';

class SMSTextMessaging extends React.Component {

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
         <h1>SMS Text Messaging</h1>
      );
   }
}


export default SMSTextMessaging;