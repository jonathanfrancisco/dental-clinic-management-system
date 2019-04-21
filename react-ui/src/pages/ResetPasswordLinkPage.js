import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class ResetPasswordLinkPage extends React.Component {

   state = {
      resetPasswordStatus: undefined,
   };

   componentDidMount() {
      const {token} = this.props.match.params;
      axios.post(`/api/users/${token}/resetPassword`, {token})
      .then((response) => {
         if(response.status === 200) {
            this.setState({resetPasswordStatus: true});
         }
      }).catch((err) => {
         this.setState({resetPasswordStatus: false});
      });
   }


   render() {
      return <Redirect  to={{
         pathname: '/login',
         state: { resetPasswordStatus: this.state.resetPasswordStatus}
       }}/>
   }
}

export default ResetPasswordLinkPage;