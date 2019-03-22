import React from 'react';
import {Timeline, Popover, Drawer, Divider} from 'antd';
import moment from 'moment';



class TreatmentsPopoverDrawer extends React.Component {

  state = { visible: false, childrenDrawer: false, visiblePopover: false};

  showDrawer = () => {
   this.props.getTreatments();
   this.setState({
      visible: true,
      visiblePopover: false
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      visiblePopover: false
    });
  };

  showChildrenDrawer = () => {

    this.setState({
      childrenDrawer: true,
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  handleVisiblePopoverChange = (visible) => {
   this.setState({ visiblePopover: visible });
 }




  render() {
      return (
         <React.Fragment>
            <Popover
               title={this.props.title}
               trigger="click"
               visible={this.state.visiblePopover}
               onVisibleChange={this.handleVisiblePopoverChange}
               content={(
                  <React.Fragment>
                     {this.props.content}
                     <br />
                     <a style={{textAlign: 'center', display: 'block', marginTop: 8}} onClick={this.showDrawer}>View Treatments</a>
                  </React.Fragment>
               )}               
            >
               {this.props.children}
            </Popover>
            <Drawer
               title="Treatments done on this tooth"
               width="50%"
               closable={true}
               onClose={this.onClose}
               visible={this.state.visible}
            >
               <Timeline>
                  {
                     this.props.treatments.map((treatment) => (
                        <Timeline.Item key={treatment.id}>{moment(treatment.date_treated).format('MMMM DD, YYYY')}<Divider type="vertical" />{treatment.description}</Timeline.Item>
                     ))
                  }
               </Timeline>  
            </Drawer>
         </React.Fragment>
      );
  }
}


export default TreatmentsPopoverDrawer;