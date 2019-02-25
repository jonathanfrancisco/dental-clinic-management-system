import React from 'react';
import {Spin, Row, Col} from 'antd';

const CenteredSpinner = () => {
   return (
      <Row type="flex" align="middle" style={{height: '100%'}}>
         <Col md={{span: 8, offset: 12}}>
            <Spin size="large"/>
         </Col>
      </Row>
   );
}

export default CenteredSpinner;