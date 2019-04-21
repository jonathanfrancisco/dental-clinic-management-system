import React from 'react';
import {Card, Tag, Typography, BackTop, Calendar, Row, Col, Alert} from 'antd'
import AppointmentsPopoverDrawer from './AppointmentsPopoverDrawer';
import moment from 'moment';


const {Text} = Typography;

class AppointmentsCalendar extends React.Component {

   state = {
      value: moment(Date.now()),
      visiblePopover: false
   }

   getAppointmentCount(value) {
      const dateValue = moment(value.format('MMMM DD')).unix('X');
      const data = [...this.props.appointments];
      return data.filter((appointment) => {
         return dateValue === moment(moment(appointment.date_time).format('MMMM DD')).unix('X') && appointment.status === 'confirmed';
      }).length;
   }

   getAppointmentMonthCount(value) {
      const dateValue = moment(value.format('MMMM YYYY')).unix('X');
      const data = [...this.props.appointments];
      return data.filter((appointment) => {
         return dateValue === moment(moment(appointment.date_time).format('MMMM YYYY')).unix('X') && appointment.status === 'confirmed';
      }).length;
    }

   getAppointmentsDay(value) {
      const dateValue = moment(value.format('MMMM DD')).unix('X');
      const data = [...this.props.appointments];
      return data.filter((appointment) => {
         return dateValue === moment(moment(appointment.date_time).format('MMMM DD')).unix('X') && appointment.status === 'confirmed';
      });
   }


   dateFullCellRender = (date) => {
      const appointmentCount = this.getAppointmentCount(date);
      const startOfMonth = moment(JSON.parse(JSON.stringify(this.state.value))).startOf('month').unix('X');
      const endOfMonth =  moment(JSON.parse(JSON.stringify(this.state.value))).endOf('month').unix('X');
      const isSelected = date.unix('X') === this.state.value.unix('X');

      if(date.unix('X') < startOfMonth || date.unix ('X') > endOfMonth) {
         return (
            <div style={{padding: 4, opacity: 0.5}}>
               <Card
                  title={<Text>{date.format('MMMM DD')}</Text>}
                  size="small"
                  style={{textAlign: 'right', height: 100, cursor: 'pointer', border: 0, boxShadow: '3px 3px 6px -4px #8c8c8c'}}
               >
                  {
                     appointmentCount > 0 ? (
                        <Tag color="red">{appointmentCount} Appointment(s)</Tag>
                     ) : (null)
                  }
               </Card>
            </div>
         );
      }

   
      return (
         <div style={{padding: 4}}>
            <AppointmentsPopoverDrawer
               role={this.props.role}
               title={<Text strong>{date.format('MMMM DD')}</Text>}
               appointments={this.getAppointmentsDay(date)}
            >
               {
                  isSelected ? (
                     <Card
                        title={<Text>{date.format('MMMM DD')}</Text>}
                        size="small"
                        style={
                           {
                              textAlign: 'right',
                              backgroundColor: '#e6f7ff',
                              height: 100,
                              cursor: 'pointer', 
                              border: 0, 
                              boxShadow: '4px 4px 4px -4px #8c8c8c'
                           }
                        }
                     >

                        {
                           appointmentCount > 0 ? (
                              <Tag color="red">{appointmentCount} Appointment(s)</Tag>
                           ) : (null)
                        }
   
                     </Card>
                  ) : (
                     <Card
                        title={<Text>{date.format('MMMM DD')}</Text>}
                        size="small"
                        style={
                           {
                              textAlign: 'right',
                              height: 100,
                              cursor: 'pointer', 
                              border: '1px solid 8c8c8c',
                              boxShadow: '4px 4px 4px -4px #8c8c8c'
                           }
                        }
                     >
                        {
                           appointmentCount > 0 ? (
                              <Tag style={{textAlign: 'center'}} color="red">{appointmentCount} Appointment(s)</Tag>
                           ) : (null)
                        }
                     </Card>
                  )
               }
            </AppointmentsPopoverDrawer>
  
         </div>
      );

   }

   hidePopover = () => {
      this.setState({visiblePopover: false});
   }

   handleVisiblePopoverChange = (visible) => {
      this.setState({ visiblePopover: visible });
   }


   monthCellRender = (date) => {
      const appointmentCount = this.getAppointmentMonthCount(date);
      return (
         <Row>
            <Col align="center">
               {appointmentCount > 0 ? (
                  <Tag color="red">{appointmentCount} Appointment(s)</Tag>
               ) : (null)}
            </Col>
         </Row>
      ); 
   }
  
   onSelect = (value) => {
      this.setState({
        value
      });
    }
  
    onPanelChange = (value) => {
      this.setState({ value });
    }

   render() {
      const {value}  = this.state;
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
            <Alert message={`You selected date: ${value.format('MMMM DD, YYYY')}`} />
            <Calendar 
               dateFullCellRender={this.dateFullCellRender} 
               monthCellRender={this.monthCellRender}
               value={value}
               onSelect={this.onSelect}
               onPanelChange={this.onPanelChange} />
         </React.Fragment>
      );
   }
}

export default AppointmentsCalendar;   