import React from 'react';
import {Radio, message} from 'antd';
import TreatmentsPopoverDrawer from './TreatmentsPopoverDrawer';
import axios from 'axios';

const RadioGroup = Radio.Group;



class DMFTPopover extends React.Component {
   
   state = {
      treatments: []
   };

   componentDidMount() {
      this.getTreatments(this.props.toothPosition);
   }

   getTreatments(toothPosition) {
      axios.get(`/api/treatments/tooth/${toothPosition}`)
      .then((response) => {
         if(response.status === 200) {
            this.setState({treatments: response.data.treatments});
         }
      })
      .catch((err) => {
         console.error(err);
         message.error('Something went wrong! Please, try again.');
      });
   }

   onChange = (e) => {
      this.props.onChange(this.props.toothPosition, e.target.value);
   }

   render() {
      const radioStyle = {
         display: 'block',
         height: '30px',
         lineHeight: '30px',
      };

      const DMFTRadioGroup = (
            <RadioGroup value={this.props.value || ""} onChange={this.onChange} >
               <Radio style={radioStyle} value="">None</Radio>
               <Radio style={radioStyle} value="decayed">Decayed</Radio>
               <Radio style={radioStyle} value="missing">Missing</Radio>
               <Radio style={radioStyle} value="filled">Filled Teeth</Radio>
            </RadioGroup>);

      return (
         <TreatmentsPopoverDrawer treatments={this.state.treatments} title={this.props.toothPosition} content={DMFTRadioGroup}>
            {this.props.children}
         </TreatmentsPopoverDrawer>
      
      );
   }

}

export default DMFTPopover;