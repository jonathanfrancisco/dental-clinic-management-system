import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import axios from 'axios';


class ProtectedRoute extends React.Component {
   
   state = {
      redirect: false,
      user: ''
   };

   componentDidMount() {
      axios.get('/api/users/checkToken')
      .then((response) => {
         if(response.status === 200) {
            this.setState({redirect: false, user:response.data.user});
         }
      }).catch((err) => {
         if(err)
            this.setState({redirect: true});
      });
   }

   
   render() {
      const {component: Component, user, ...rest} = this.props;
      const {pathname} = this.props.location;
      return (
         <Route {...rest} render={(props) => {
           if(!this.state.redirect)
               return <Component user={user} {...props}/>
            return (
               <Redirect to={
                  {
                     pathname: "/",
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

// if(!this.state.redirect 
//    && this.state.role === 'dentalaide' && 
//    (pathname === '/useraccounts' || pathname === '/dashboard' || pathname === '/transactionlog')) {
//       return (
//          <Redirect to={
//             {
//                pathname: "/",
//                state: {
//                   from: props.location
//                }
//             }
//          }/>
//       );
//    }
// else if(!this.state.redirect && this.state.role === 'patient' && 
// (pathname === '/useraccounts' || pathname === '/dashboard' || pathname === '/transactionlog' 
// || pathname === '/dentalrecords' || '/appointments' || '/sms' )) {
//    return (
//       <Redirect to={
//          {
//             pathname: "/",
//             state: {
//                from: props.location
//             }
//          }
//       }/>
//    );
// }
// else if(!this.state.redirect)
//    return <Component {...props}/>
// return (
//    <Redirect to={
//       {
//          pathname: "/",
//          state: {
//             from: props.location
//          }
//       }
//    }/>
// );