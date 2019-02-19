import React from 'react';
import {Route, Redirect} from 'react-router-dom';


class ProtectedRoute extends React.Component {
   render() {

      const {component: Component, auth, ...rest} = this.props;

      return (
         <Route {...rest} render={(props) => {
            if(auth)
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