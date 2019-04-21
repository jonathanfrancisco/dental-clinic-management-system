import React from 'react';
import {Spin, Typography} from 'antd'
const {Text} = Typography;

const SpinningComponent = (props) => {
   return (
      <div style={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
         <Spin />
         <Text style={{fontSize: 16}}>Logging-in</Text>
      </div>
   );
}

export default SpinningComponent;