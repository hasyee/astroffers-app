import * as React from 'react';
import { connect } from 'react-redux';
import { View, DrawerLayoutAndroid, ToolbarAndroid, StatusBar, ToolbarAndroidAction } from 'react-native';
import { NgcInfo } from 'astroffers-core';
import { getOpenedNgcInfo, isOpenDetails } from '../selectors';
import { closeDetails } from '../actions';
import { getTitle } from '../utils/display';
import Filter from './Filter';
import Result from './Result';
import Details from './Details';
import About from './About';

export default connect(state => ({ openedNgcInfo: getOpenedNgcInfo(state), isOpenDetails: isOpenDetails(state) }), {
  closeDetails
})(
  class extends React.PureComponent<
    {
      openedNgcInfo: NgcInfo;
      isOpenDetails: boolean;
      closeDetails: typeof closeDetails;
    },
    { isOpenAbout: boolean }
  > {
    drawer: DrawerLayoutAndroid;

    state = {
      isOpenAbout: false
    };

    handleNavIconClick = () => {
      if (this.props.isOpenDetails) return this.props.closeDetails();
      if (this.state.isOpenAbout) return this.setState({ isOpenAbout: false });
      this.drawer.openDrawer();
    };

    handleCloseDrawer = () => {
      this.drawer.closeDrawer();
    };

    handleActionSelect = position => {
      if (position === 0) {
        this.setState({ isOpenAbout: true });
      }
    };

    getNavIcon(): string {
      return this.props.isOpenDetails || this.state.isOpenAbout ? 'ic_action_arrow_back' : 'ic_action_menu';
    }

    getTitle(): string {
      if (this.props.isOpenDetails) return getTitle(this.props.openedNgcInfo);
      if (this.state.isOpenAbout) return 'About';
      return 'Astroffers';
    }

    getActions(): ToolbarAndroidAction[] {
      return this.props.isOpenDetails || this.state.isOpenAbout ? [] : [ { title: 'About', show: 'never' } ];
    }

    getDrawerLockMode() {
      return this.props.isOpenDetails || this.state.isOpenAbout ? 'locked-closed' : 'unlocked';
    }

    renderDrawer = () => {
      return <Filter onSubmit={this.handleCloseDrawer} />;
    };

    render() {
      const { openedNgcInfo, isOpenDetails } = this.props;
      const { isOpenAbout } = this.state;
      return (
        <DrawerLayoutAndroid
          drawerLockMode={this.getDrawerLockMode()}
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={this.renderDrawer}
          ref={drawer => (this.drawer = drawer)}
        >
          <StatusBar backgroundColor="#004376" barStyle="light-content" />
          <View style={{ flex: 1, marginTop: 0, backgroundColor: '#f8f8f8' }}>
            <ToolbarAndroid
              navIcon={{ uri: this.getNavIcon() }}
              overflowIcon={{ uri: 'ic_action_more_vert' }}
              titleColor="white"
              style={{ height: 56, backgroundColor: '#01579b', alignSelf: 'stretch', elevation: 5 }}
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
