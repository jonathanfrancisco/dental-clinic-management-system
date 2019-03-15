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
      {/* boxShadow: '0px 3px 10px -4px #8c8c8c', padding: 24 */}
      return (
         <Content style={{margin: '24px 24px 24px 36px', padding:24, background: '#fff'}}>
            <Title level={4}>Appointments</Title>
            <Tabs tabPosition="left" defaultActiveKey="1">
               <TabPane tab="Calendar View" key="1">
                 <AppointmentsCalendar /> 
               </TabPane>
               <TabPane tab="List View" key="2">
                  <AppointmentsTable />
               </TabPane>
            </Tabs>
         </Content>
      );
   }
}


export default Appointments;