import React from 'react';
import {Table, Tabs, Typography} from 'antd';
import AppointmentsCalendar from '../components/ApppointmentsCalendar';
import AppointmentsTable from '../components/AppointmentsTable';

const {Title} = Typography;
const {TabPane} = Tabs;

class Appointments extends React.Component {
   render() {
      return (
         <React.Fragment>
            <Title level={3}>Appointments</Title>
            <Tabs defaultActiveKey="1">
               <TabPane tab="Calendar" key="1">
                 <AppointmentsCalendar /> 
               </TabPane>
               <TabPane tab="Appointments" key="2">
                  <AppointmentsTable />
               </TabPane>
            </Tabs>
           
         </React.Fragment>
      );
   }
}


export default Appointments;