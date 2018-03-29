import * as React from 'react';
import { Animated, View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { NightInfo } from 'astroffers-core';
import { getNightInfo } from '../selectors';
import Moon from './Moon';
import NightChart from './NightChart';

const { width: windowWidth } = Dimensions.get('window');

const COLLAPSED_HEIGHT = 60;
const EXPANDED_HEIGHT = 300;
const DURATION = 100;

export default connect(state => ({ nightInfo: getNightInfo(state) }))(
  class extends React.PureComponent<{ nightInfo: NightInfo }> {
    state = {
      height: new Animated.Value(EXPANDED_HEIGHT)
    };

    handlePress = () => {
      const { height } = this.state;
      if (height['_value'] === COLLAPSED_HEIGHT) {
        Animated.timing(height, { toValue: EXPANDED_HEIGHT, duration: DURATION }).start();
      } else {
        Animated.timing(height, { toValue: COLLAPSED_HEIGHT, duration: DURATION }).start();
      }
    };

    render() {
      const { nightInfo } = this.props;
      if (!nightInfo) return null;
      const { moonPhase } = nightInfo;
      return (
        <View style={{ width: '100%', backgroundColor: 'white', elevation: 3 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
              paddingVertical: 5
            }}
          >
            <View style={{ alignItems: 'flex-start', justifyContent: 'center', flex: 1 }}>
              <Text style={{ fontSize: 20 }}>1400</Text>
              <Text style={{ fontSize: 10 }}>total results</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Moon phase={moonPhase} scale={0.5} />
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <NightChart />
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text>N</Text>
            </View>
          </View>
        </View>
      );
    }
  }
);
