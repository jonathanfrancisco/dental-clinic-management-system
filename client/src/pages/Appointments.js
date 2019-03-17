import React from 'react';
import {Table, Tabs, Typography, message} from 'antd';
import AppointmentsCalendar from '../components/ApppointmentsCalendar';
import AppointmentsTable from '../components/AppointmentsTable';
import {Layout} from 'antd';
import axios from 'axios';

const {Title} = Typography;
const {TabPane} = Tabs;
const {Content} = Layout;

class Appointments extends React.Component {


   state = {
      appointmentsTableLoading: true,
      appointmentsTable: []
   };

   componentDidMount() {
      this.getAppointmentsTable();
   }
   
   getAppointmentsTable = (search = '', dates = []) => {
      let hide;
      if(search != '')
         hide = message.loading('Searching...', 0);
      if(dates.length === 2) {
         this.setState({appointmentsTableLoading: true});
         axios.get(`/api/appointments`, {
            params: {
               startDate: dates[0].format('YYYY-MM-DD'),
               endDate: dates[1].format('YYYY-MM-DD'),
               search
            }
         })
         .then((response) => {
            if(response.status === 200) {
               setTimeout(() => {
                  if(search !='') {
                     hide();
                     message.info(`${response.data.appointments.length} appointment(s) found`);
                  }
                  this.setState({appointmentsTableLoading: false, appointmentsTable: response.data.appointments});
               },300);
            }
         })
         .catch((err) => {
            console.log(err);
            message.error('Something went wrong! Please, try again.');
         });
      }

      else {
         this.setState({appointmentsTableLoading: true});
         axios.get(`/api/appointments`, {
            params: {
               search
            }
         })
         .then((response) => {
            if(response.status === 200) {
               setTimeout(() => {
                  if(search !='') {
                     hide();
                     message.info(`${response.data.appointments.length} appointment(s) found`);
                  }
                  this.setState({appointmentsTableLoading: false, appointmentsTable: response.data.appointments});
               },300);
            }
         })
         .catch((err) => {
            console.log(err);
            message.error('Something went wrong! Please, try again.');
         });
      }


   }

   render() {
      {/* boxShadow: '0px 3px 10px -4px #8c8c8c', padding: 24 */}
      return (
         <Content style={{margin: '24px 24px 24px 36px', padding:24, background: '#fff'}}>
            <Title level={4}>APPOINTMENTS</Title>
            <Tabs defaultActiveKey="1">
               <TabPane tab="Calendar View" key="2">
                 <AppointmentsCalendar /> 
               </TabPane>
               <TabPane tab="Table View" key="1">
                  <AppointmentsTable tableLoading={this.state.appointmentsTableLoading} appointments={this.state.appointmentsTable} getAppointments={this.getAppointmentsTable} />
               </TabPane>
            </Tabs>
         </Content>
      );
   }
}


export default Appointments;