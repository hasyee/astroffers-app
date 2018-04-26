import * as React from 'react';
import { connect } from 'react-redux';
import { View, DrawerLayoutAndroid, ToolbarAndroid, StatusBar, ToolbarAndroidAction } from 'react-native';
import { NgcInfo } from 'astroffers-core';
import { getOpenedNgcInfo, isOpenDetails, isOpenAbout } from '../selectors';
import { closeDetails, openAbout, closeAbout } from '../actions';
import Filter from './Filter';
import Result from './Result';
import Details from './Details';
import About from './About';

export default connect(
  state => ({
    openedNgcInfo: getOpenedNgcInfo(state),
    isOpenDetails: isOpenDetails(state),
    isOpenAbout: isOpenAbout(state)
  }),
  {
    closeDetails,
    openAbout,
    closeAbout
  }
)(
  class extends React.PureComponent<{
    openedNgcInfo: NgcInfo;
    isOpenDetails: boolean;
    isOpenAbout: boolean;
    closeDetails: typeof closeDetails;
    openAbout: typeof openAbout;
    closeAbout: typeof closeAbout;
  }> {
    drawer: DrawerLayoutAndroid;

    handleNavIconClick = () => {
      if (this.props.isOpenDetails) return this.props.closeDetails();
      if (this.props.isOpenAbout) return this.props.closeAbout();
      this.drawer.openDrawer();
    };

    handleCloseDrawer = () => {
      this.drawer.closeDrawer();
    };

    handleActionSelect = position => {
      if (position === 0) {
        this.props.openAbout();
      }
    };

    getNavIcon(): string {
      return this.props.isOpenDetails || this.props.isOpenAbout ? 'ic_action_arrow_back' : 'ic_action_menu';
    }

    getTitle(): string {
      if (this.props.isOpenDetails) return 'NGC ' + this.props.openedNgcInfo.object.ngc;
      if (this.props.isOpenAbout) return 'About';
      return 'Astroffers    '; // hax of the content inset bug
    }

    getActions(): ToolbarAndroidAction[] {
      return this.props.isOpenDetails || this.props.isOpenAbout ? [] : [ { title: 'About', show: 'never' } ];
    }

    getDrawerLockMode() {
      return this.props.isOpenDetails || this.props.isOpenAbout ? 'locked-closed' : 'unlocked';
    }

    renderDrawer = () => {
      return <Filter onSubmit={this.handleCloseDrawer} />;
    };

    render() {
      const { openedNgcInfo, isOpenDetails, isOpenAbout } = this.props;
      return (
        <DrawerLayoutAndroid
          drawerLockMode={this.getDrawerLockMode()}
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={this.renderDrawer}
          ref={drawer => (this.drawer = drawer)}
        >
          <View style={{ flex: 1, marginTop: 0, backgroundColor: '#f8f8f8' }}>
            <ToolbarAndroid
              navIcon={{ uri: this.getNavIcon() }}
              overflowIcon={{ uri: 'ic_action_more_vert' }}
              titleColor="white"
              style={{ height: 56, backgroundColor: '#01579b', elevation: 5 }}
              title={this.getTitle()}
              actions={this.getActions()}
              onIconClicked={this.handleNavIconClick}
              onActionSelected={this.handleActionSelect}
            />
            <View style={{ flex: 1 }}>
              <Result />
              {isOpenDetails && <Details />}
              {isOpenAbout && <About />}
            </View>
          </View>
        </DrawerLayoutAndroid>
      );
    }
  }
);
