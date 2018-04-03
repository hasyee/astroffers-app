import * as React from 'react';
import { StyleSheet, Dimensions, View, Text, Image, ViewPagerAndroid, ScrollView } from 'react-native';
const { VirtualizedList } = require('react-native');
import { connect } from 'react-redux';
import { NgcInfo, getObjectImgSrc } from 'astroffers-core';
import { getOpenedNgcInfoIndex, getList } from '../selectors';
import { openDetails } from '../actions';
import { getTitle } from '../utils/display';

const { width: WIDTH } = Dimensions.get('window');

export default connect(
  state => ({
    initialIndex: getOpenedNgcInfoIndex(state),
    objects: getList(state)
  }),
  { openDetails }
)(
  class extends React.PureComponent<{
    initialIndex: number;
    objects: NgcInfo[];
    openDetails: typeof openDetails;
  }> {
    handleSwipe = e => {
      const contentOffset = e.nativeEvent.contentOffset;
      const index = Math.round(contentOffset.x / WIDTH);
      this.props.openDetails(this.props.objects[index].object.ngc);
    };

    renderItem = ({ item: ngcInfo }) => {
      return (
        <View style={{ flex: 1, width: WIDTH }}>
          <ScrollView>
            <View>
              <Image source={{ uri: getObjectImgSrc(ngcInfo.object.ngc) }} style={{ width: WIDTH, height: WIDTH }} />
            </View>
            <View style={{ padding: 20 }}>
              <View>
                <Text style={{ fontSize: 20, color: 'black', maxWidth: '100%' }}>{getTitle(ngcInfo)}</Text>
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
          maxToRenderPerBatch={2}
          initialNumToRender={3}
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
