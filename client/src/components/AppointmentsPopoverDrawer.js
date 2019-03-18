import React from 'react';
import {Tag, Card, Popover, Drawer,  } from 'antd';
import moment from 'moment';

const {Meta} = Card;

class AppointmentsPopoverDrawer extends React.Component {

  state = { visible: false, childrenDrawer: false, visiblePopover: false};

  showDrawer = () => {
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
               content={<a onClick={this.showDrawer}>View Appointments</a>}
            >
               {this.props.children}
            </Popover>
            <Drawer
               title="Appointments for this date"
               width="50%"
               closable={true}
               onClose={this.onClose}
               visible={this.state.visible}
            >

            {
               this.props.appointments.map((appointment) => (
                  <Card key={appointment.id} size="small" style={{ width: '100%', marginBottom: 16}}>
                      <Meta
                        title={`${appointment.name} @ ${moment(appointment.date_time).format('h:MM A')}`}
                        description={`${appointment.reason}`}
                     />
                  </Card>
               ))
            }

               {/* SECOND LEVEL DAWER*/}
               {/* <Button type="primary" onClick={this.showChildrenDrawer}>
                  Two-level drawer
               </Button>
               <Drawer
                  title="Two-level Drawer"
                  width={320}
                  closable={true}
                  onClose={this.onChildrenDrawerClose}
                  visible={this.state.childrenDrawer}
               >
                  This is two-level drawer
               </Drawer> */}
               {/* SECOND LEVEL DAWER*/}

         
            </Drawer>
         </React.Fragment>
      );
  }
}


export default AppointmentsPopoverDrawer;