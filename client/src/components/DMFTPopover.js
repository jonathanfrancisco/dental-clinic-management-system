import React from 'react';
import {Popover, Radio} from 'antd';
const RadioGroup = Radio.Group;



class DMFTPopover extends React.Component {
   
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
         <Popover title={this.props.toothPosition} content={DMFTRadioGroup} trigger="click">
            {this.props.children}
         </Popover>
      );
   }

}

export default DMFTPopover;