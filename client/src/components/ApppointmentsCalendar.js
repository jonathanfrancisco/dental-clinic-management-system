import React from 'react';
import {Typography, BackTop, Calendar, Row, Col, Alert} from 'antd'
import moment from 'moment';


const {Title, Text} = Typography;

class AppointmentsCalendar extends React.Component {

   state = {
      value: moment(Date.now()),
      selectedValue: moment(Date.now())
    }
  
    onSelect = (value) => {
      this.setState({
        value,
        selectedValue: value,
      });
    }
  
    onPanelChange = (value) => {
      this.setState({ value });
    }

   render() {
      const { value, selectedValue } = this.state;
      return (
         <React.Fragment>
            <Row>
               <BackTop />
               <Col align="left" span={24}>
                  <Text style={{margin: '0px 12px 0px 0px'}}>(Today's Date)</Text>
                  <br />
                  <Text strong style={{fontSize: '21px', margin: '0px 12px 0px 0px'}}>{moment(Date.now()).format('MMMM DD, YYYY')}</Text>
               </Col>
            </Row>
            <Alert message={`You selected date: ${selectedValue.format('MMMM DD, YYYY') && selectedValue.format('MMMM DD, YYYY')}`} />
            <Calendar value={value} onSelect={this.onSelect} onPanelChange={this.onPanelChange} />
         </React.Fragment>
      );
   }
}

export default AppointmentsCalendar;   