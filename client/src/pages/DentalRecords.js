import React from 'react';
import DentalRecord from '../components/DentalRecord';
import DentalRecordsTable from '../components/DentalRecordsTable';

class DentalRecords extends React.Component {
   render() {
      const {code: match} = this.props.match.params;
      if(match)
         return <DentalRecord code={match} />
      return (
         <DentalRecordsTable />
      );
   }
}


export default DentalRecords;