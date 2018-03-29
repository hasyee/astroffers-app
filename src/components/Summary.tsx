import * as React from 'react';
const moment = require('moment');
import { Animated, View, Text, TouchableNativeFeedback, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { NightInfo } from 'astroffers-core';
import { getNightInfo, getCount, getMoonless } from '../selectors';
import Moon from './Moon';
import NightChart from './NightChart';

const { width: windowWidth } = Dimensions.get('window');

const COLLAPSED_HEIGHT = 60;
const EXPANDED_HEIGHT = 300;
const DURATION = 100;

export default connect(state => ({
  nightInfo: getNightInfo(state),
  count: getCount(state),
  moonless: getMoonless(state)
}))(
  class extends React.PureComponent<{ nightInfo: NightInfo; count: number; moonless: boolean }> {
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

    getNightStart() {
      const { moonless, nightInfo: { moonlessNight, astroNight } } = this.props;
      return moonless
        ? moonlessNight && Number.isFinite(moonlessNight.start) ? moment(moonlessNight.start).format('HH:mm') : ''
        : astroNight && Number.isFinite(astroNight.start) ? moment(astroNight.start).format('HH:mm') : '';
    }

    getNightEnd() {
      const { moonless, nightInfo: { moonlessNight, astroNight } } = this.props;
      return moonless
        ? moonlessNight && Number.isFinite(moonlessNight.end) ? moment(moonlessNight.end).format('HH:mm') : ''
        : astroNight && Number.isFinite(astroNight.end) ? moment(astroNight.end).format('HH:mm') : '';
    }

    render() {
      const { nightInfo, count, moonless } = this.props;
      if (!nightInfo) return null;
      const { moonPhase, moonlessNight, astroNight } = nightInfo;
      return (
        <View style={{ width: '100%', backgroundColor: 'white', elevation: 3 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
              paddingTop: 5
            }}
          >
            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
              <Text style={{ fontSize: 23 }}>{count}</Text>
              <Text style={{ fontSize: 10 }}>total results</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={{ fontSize: 12 }}>Moon</Text>
                <Text style={{ fontSize: 12 }}>phase</Text>
              </View>
              <Moon phase={moonPhase} scale={0.5} />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={{ fontSize: 12 }}>{this.getNightStart()}</Text>
                <Text style={{ fontSize: 12 }}>{this.getNightEnd()}</Text>
              </View>
              <NightChart />
            </View>
          </View>
        </View>
      );
    }
  }
);
