import * as React from 'react';
import { connect } from 'react-redux';
import { View, DrawerLayoutAndroid, ToolbarAndroid, StatusBar } from 'react-native';
import { NgcInfo } from 'astroffers-core';
import { getOpenedNgcInfo } from '../selectors';
import { closeDetails } from '../actions';
import Filter from './Filter';
import Result from './Result';
import Details from './Details';

export default connect(state => ({ openedNgcInfo: getOpenedNgcInfo(state) }), { closeDetails })(
  class extends React.PureComponent<{ openedNgcInfo: NgcInfo; closeDetails: typeof closeDetails }> {
    drawer: DrawerLayoutAndroid;

    handleIconClick = () => {
      !this.props.openedNgcInfo ? this.drawer.openDrawer() : this.props.closeDetails();
    };

    handleCloseDrawer = () => {
      this.drawer.closeDrawer();
    };

    handleActionSelect = position => {
      console.log(position);
    };

    renderDrawer = () => {
      return <Filter onSubmit={this.handleCloseDrawer} />;
    };

    render() {
      const { openedNgcInfo } = this.props;
      const isOpenDetails = !!openedNgcInfo;
      return (
        <DrawerLayoutAndroid
          drawerLockMode={isOpenDetails ? 'locked-closed' : 'unlocked'}
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={this.renderDrawer}
          ref={drawer => (this.drawer = drawer)}
        >
          <StatusBar backgroundColor="#004376" barStyle="light-content" />
          <View style={{ flex: 1, marginTop: 0, backgroundColor: '#f8f8f8' }}>
            <ToolbarAndroid
              navIcon={{ uri: isOpenDetails ? 'ic_action_arrow_back' : 'ic_action_menu' }}
              overflowIcon={{ uri: 'ic_action_more_vert' }}
              titleColor="white"
              style={{ height: 56, backgroundColor: '#01579b', alignSelf: 'stretch', elevation: 5 }}
              title={isOpenDetails ? 'NGC ' + openedNgcInfo.object.ngc : 'Astroffers'}
              actions={isOpenDetails ? [] : [ { title: 'About', show: 'never' } ]}
              onIconClicked={this.handleIconClick}
              onActionSelected={this.handleActionSelect}
            />
            <View style={{ flex: 1 }}>
              <Result />
              {isOpenDetails && <Details />}
            </View>
          </View>
        </DrawerLayoutAndroid>
      );
    }
  }
);
