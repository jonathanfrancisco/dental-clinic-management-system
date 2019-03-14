import React from 'react';
import {Typography, Calendar, Row, Col} from 'antd'
import moment from 'moment';


const {Title, Text} = Typography;

class AppointmentsCalendar extends React.Component {
   render() {
      return (
         <React.Fragment>
            <Row>
               <Col align="right" span={24}>
                  <Text style={{margin: '0px 12px 0px 0px'}}>(Today's Date)</Text>
                  <Title level={4} style={{margin: '0px 12px 0px 0px'}}>{moment(Date.now()).format('MMMM DD, YYYY')}</Title>
               </Col>
            </Row>
            <Calendar />
         </React.Fragment>
      );
   }
}

export default AppointmentsCalendar;   