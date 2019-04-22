import React from 'react';
import DentalRecord from '../components/DentalRecord';
import DentalRecordsTable from '../components/DentalRecordsTable';
import {Layout} from 'antd';

const {Content} = Layout;

class DentalRecords extends React.Component {
  
   
   render() {
      const {code: match} = this.props.match.params;
      if(match)
         return (
            <Content style={{margin: '24px 24px 24px 36px', padding: 24, background: '#fff'}}>
               <DentalRecord role={this.props.user.role} code={match} />
            </Content>
         );
      return (
      <Content style={{margin: '24px 24px 24px 36px', padding: 24, background: '#fff'}}>
         <DentalRecordsTable />
      </Content>
      );
   }
}


export default DentalRecords;