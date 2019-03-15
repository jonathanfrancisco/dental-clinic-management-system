import React from 'react';
import {Spin} from 'antd'
import logo from '../andres-logo.jpg';


const SpinningComponent = (props) => {
   return (
      <div style={{backgroundColor: '#0c162e',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
         <img style={{maxWidth: 128, borderRadius: '100%', padding: 10}} src={logo} />
         <br />
         <h2 style={{color: '#fff'}}>Your smile! Your passion!</h2>
         <Spin />
      </div>
   );
}

export default SpinningComponent;