import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import axios from 'axios';


class ProtectedRoute extends React.Component {
   
   state = {
      redirect: false
   };

   componentDidMount() {
      axios.get('/api/user/checkToken')
      .then((response) => {
         if(response.status === 200)
            this.setState({redirect: false});
      }).catch((err) => {
         console.log(err);
         this.setState({redirect: true});
      });
   }

   render() {
      const {component: Component,...rest} = this.props;
      return (
         <Route {...rest} render={(props) => {
            if(!this.state.redirect)
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

// export default ProtectedRoute = ({component: Component, auth, ...rest}) => {
//    return (
//       <Route {...rest} render={(props) => {
//          if(auth)
//             return <Component {...props}/>
//          return (
//             <Redirect to={
//                {
//                   pathname: "/login",
//                   state: {
//                      from: props.location
//                   }
//                }
//             }/>
//          );
//       }}/>
//    );
// };