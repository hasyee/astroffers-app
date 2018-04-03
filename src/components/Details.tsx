import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NgcInfo } from 'astroffers-core';
import { getTitle } from '../utils/display';

export default connect()(
  class extends React.PureComponent<{ ngcInfo: NgcInfo }> {
    render() {
      return (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'white',
            elevation: 4
          }}
        >
          <Text>hello</Text>
        </View>
      );
    }
  }
);
