import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import axios from 'axios';


class ProtectedRoute extends React.Component {
   
   state = {
      redirect: false,
      role: ''
   };

   componentDidMount() {
      axios.get('/api/user/checkToken')
      .then((response) => {
         if(response.status === 200) {
            this.setState({redirect: false, role:response.data.user.role});
         }
      }).catch((err) => {
         if(err)
            this.setState({redirect: true});
      });
   }

   
   render() {
      const {component: Component,...rest} = this.props;
      const {pathname} = this.props.location;
      return (
         <Route {...rest} render={(props) => {
            console.log('From: ',props.location);
            if(!this.state.redirect 
               && this.state.role === 'dentalaide' && 
               (pathname === '/useraccounts' || pathname === '/dashboard')) {
                  return (
                     <Redirect to={
                        {
                           pathname: "/dentalrecords",
                           state: {
                              from: props.location
                           }
                        }
                     }/>
                  );
               }
            else if(!this.state.redirect)
               return <Component {...props}/>
            return (
               <Redirect to={
                  {
                     pathname: "/login",
                     state: {
                        from: props.location
                     }
                  }
               }/>
            );
         }}/>
      );
   }
}

export default ProtectedRoute;
