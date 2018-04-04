import * as React from 'react';
const moment = require('moment');
import { Animated, View, Text, TouchableNativeFeedback, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { NightInfo, Interval } from 'astroffers-core';
import { getNightInfo, getCount, getMoonless } from '../selectors';
import Moon from './Moon';
import NightChart from './NightChart';
import IconButton from './IconButton';

const COLLAPSED_HEIGHT = 60;
const EXPANDED_HEIGHT = 152;
const DURATION = 200;

export default connect(state => ({
  nightInfo: getNightInfo(state),
  count: getCount(state),
  moonless: getMoonless(state)
}))(
  class extends React.PureComponent<
    { nightInfo: NightInfo; count: number; moonless: boolean },
    { height: Animated.Value; icon: string }
  > {
    state = {
      height: new Animated.Value(COLLAPSED_HEIGHT),
      icon: 'ic_action_keyboard_arrow_down'
    };

    handlePress = () => {
      const { height } = this.state;
      if (height['_value'] === COLLAPSED_HEIGHT) {
        Animated.timing(height, { toValue: EXPANDED_HEIGHT, duration: DURATION }).start();
        this.setState({ icon: 'ic_action_keyboard_arrow_up' });
      } else {
        Animated.timing(height, { toValue: COLLAPSED_HEIGHT, duration: DURATION }).start();
        this.setState({ icon: 'ic_action_keyboard_arrow_down' });
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

    renderRow(title: string, startTitle: string, endTitle: string, night: Interval, last: boolean = false) {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 3,
            ...!last ? { borderBottomColor: '#DDD', borderBottomWidth: 1 } : {}
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text numberOfLines={1} style={{ fontSize: 12, paddingRight: 5 }}>
              {title}
            </Text>
          </View>
          <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text numberOfLines={1} style={{ fontSize: 12, flex: 1, paddingRight: 5, textAlign: 'right' }}>
                {startTitle}
              </Text>
              <Text numberOfLines={1} style={{ fontSize: 12, width: 40, textAlign: 'center' }}>
                {night && Number.isFinite(night.start) ? moment(night.start).format('HH:mm') : '-'}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text numberOfLines={1} style={{ fontSize: 12, flex: 1, paddingRight: 5, textAlign: 'right' }}>
                {endTitle}
              </Text>
              <Text numberOfLines={1} style={{ fontSize: 12, width: 40, textAlign: 'center' }}>
                {night && Number.isFinite(night.end) ? moment(night.end).format('HH:mm') : '-'}
              </Text>
            </View>
          </View>
        </View>
      );
    }

    render() {
      const { nightInfo, count, moonless } = this.props;
      if (!nightInfo) return null;
      const { moonPhase, night, astroNight, moonNight, moonlessNight } = nightInfo;
      const { height, icon } = this.state;
      return (
        <Animated.View style={{ width: '100%', backgroundColor: 'white', elevation: 3, height }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 20,
              paddingRight: 5,
              paddingTop: 5
            }}
          >
            <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
              <Text style={{ fontSize: 23 }}>{count}</Text>
              <Text style={{ fontSize: 10 }}>total results</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <View style={{ marginRight: 10, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 12 }}>Moon</Text>
                  <Text style={{ fontSize: 12 }}>phase</Text>
                </View>
                <Moon phase={moonPhase} />
              </View>
              <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={{ fontSize: 12 }}>{this.getNightStart()}</Text>
                <Text style={{ fontSize: 12 }}>{this.getNightEnd()}</Text>
              </View>
              <NightChart />
              <IconButton icon={icon} onPress={this.handlePress} />
            </View>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            {this.renderRow('Night', 'Sunset', 'Sunrise', night)}
            {this.renderRow('Astro night', 'From', 'To', astroNight)}
            {this.renderRow('Moon', 'Moonset', 'Moonrise', moonNight)}
            {this.renderRow('Moonless night', 'From', 'To', moonlessNight, true)}
          </View>
        </Animated.View>
      );
    }
  }
);
