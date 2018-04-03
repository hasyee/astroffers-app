import * as React from 'react';
import { StyleSheet, Dimensions, View, Text, Image, ScrollView } from 'react-native';
const { VirtualizedList } = require('react-native');
import { connect } from 'react-redux';
import { NgcInfo, getObjectImgSrc, resolveTypes, resolveConstellation, dmsToString } from 'astroffers-core';
import { getOpenedNgcInfoIndex, getList, getMinAltitude } from '../selectors';
import { openDetails } from '../actions';
import { displayToDetails } from '../utils/display';

const { width: WIDTH } = Dimensions.get('window');

class Row extends React.PureComponent<{
  label1: string;
  value1: string | number;
  label2?: string;
  value2?: string | number;
}> {
  render() {
    const fontSize = 12;
    const { label1, label2, value1, value2 } = this.props;
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize }}>{label1}</Text>
        </View>
        <View style={{ flex: value2 ? 1 : 3 }}>
          <Text style={{ fontSize }}>{value1}</Text>
        </View>
        {label2 && (
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize }}>{label2}</Text>
          </View>
        )}
        {value2 && (
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize }}>{value2}</Text>
          </View>
        )}
      </View>
    );
  }
}

export default connect(
  state => ({
    initialIndex: getOpenedNgcInfoIndex(state),
    objects: getList(state),
    minAltitude: getMinAltitude(state)
  }),
  { openDetails }
)(
  class extends React.PureComponent<{
    initialIndex: number;
    objects: NgcInfo[];
    minAltitude: number;
    openDetails: typeof openDetails;
  }> {
    handleSwipe = e => {
      const contentOffset = e.nativeEvent.contentOffset;
      const index = Math.round(contentOffset.x / WIDTH);
      this.props.openDetails(this.props.objects[index].object.ngc);
    };

    renderItem = ({ item: ngcInfo }) => {
      const {
        ngc,
        title,
        types,
        constellation,
        size,
        magnitude,
        surfaceBrightness,
        ra,
        de,
        raOnDate,
        deOnDate,
        rising,
        setting,
        risingAboveMinAltitude,
        settingBelowMinAltitude,
        from,
        to,
        max,
        altitudeAtMax,
        transit,
        altitudeAtTransit
      } = displayToDetails(ngcInfo);

      const minAltitude = this.props.minAltitude;
      return (
        <View style={{ flex: 1, width: WIDTH }}>
          <ScrollView>
            <Image source={{ uri: getObjectImgSrc(ngc) }} style={{ width: WIDTH, height: WIDTH }} />
            <View style={{ padding: 10 }}>
              <View>
                <Text style={{ fontSize: 20, color: 'black', maxWidth: '100%', marginBottom: 20 }}>{title}</Text>
              </View>
              <View>
                <Row label1="Type" value1={resolveTypes(types).join(', ')} />
                <Row label1="Constellation" value1={resolveConstellation(constellation)} />
                <Row label1="Size" value1={size} />
                <Row label1="Magnitude" value1={magnitude} />
                <Row label1="Surface brightness" value1={surfaceBrightness} />
                <Row label1="RA (J2000)" value1={ra} label2="Dec (J2000)" value2={de} />
                <Row label1="RA (on date)" value1={raOnDate} label2="Dec (on date)" value2={deOnDate} />
                <Row label1="Rising" value1={rising} label2="Setting" value2={setting} />
                <Row
                  label1={`Rising above ${minAltitude}°`}
                  value1={risingAboveMinAltitude}
                  label2={`Setting below ${minAltitude}°`}
                  value2={settingBelowMinAltitude}
                />
                <Row label1="Visibility from" value1={from} label2="Visibility to" value2={to} />
                <Row label1="Best visibility" value1={max} label2="Altitude" value2={altitudeAtMax} />
                <Row label1="Transit" value1={transit} label2="Altitude" value2={altitudeAtTransit} />
              </View>
            </View>
          </ScrollView>
        </View>
      );
    };

    render() {
      const { objects, initialIndex } = this.props;
      return (
        <VirtualizedList
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'white',
            elevation: 4
          }}
          horizontal
          pagingEnabled
          data={objects}
          windowSize={1}
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          initialScrollIndex={initialIndex}
          getItemLayout={(data, index) => ({
            length: WIDTH,
            offset: WIDTH * index,
            index
          })}
          keyExtractor={(item, index) => index}
          getItemCount={data => data.length}
          getItem={(data, index) => data[index]}
          renderItem={this.renderItem}
          onMomentumScrollEnd={this.handleSwipe}
        />
      );
    }
  }
);
