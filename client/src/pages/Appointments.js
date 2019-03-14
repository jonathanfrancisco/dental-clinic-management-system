import React from 'react';
import {Table, Tabs, Typography} from 'antd';
import AppointmentsCalendar from '../components/ApppointmentsCalendar';
import AppointmentsTable from '../components/AppointmentsTable';
import {Layout} from 'antd';

const {Title} = Typography;
const {TabPane} = Tabs;
const {Content} = Layout;

class Appointments extends React.Component {
   render() {
      return (
         <Content style={{margin: '24px 24px 24px 36px',boxShadow: '0px 3px 10px -4px #8c8c8c', padding: 24, background: '#fff'}}>
            <Title level={3}>Appointments</Title>
            <Tabs defaultActiveKey="1">
               <TabPane tab="Calendar" key="1">
                 <AppointmentsCalendar /> 
               </TabPane>
               <TabPane tab="Appointments" key="2">
                  <AppointmentsTable />
               </TabPane>
            </Tabs>
         </Content>
      );
   }
}


export default Appointments;