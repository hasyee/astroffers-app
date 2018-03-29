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
      height: new Animated.Value(COLLAPSED_HEIGHT)
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
      const { height } = this.state;
      return (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height,
            width: '100%',
            backgroundColor: 'white',
            elevation: 10
          }}
        >
          <TouchableWithoutFeedback onPress={this.handlePress}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  height: COLLAPSED_HEIGHT,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 15
                }}
              >
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20 }}>1400</Text>
                  <Text style={{ fontSize: 10 }}>total results</Text>
                </View>
                <Moon phase={moonPhase} scale={0.5} />
              </View>
              <Animated.View style={{ flex: 1, padding: 5 }}>
                <NightChart />
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      );
    }
  }
);
