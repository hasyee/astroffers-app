import * as React from 'react';
import { connect } from 'react-redux';
import { View, ProgressBarAndroid } from 'react-native';
import { isFiltering } from '../selectors';
import List from './List';
import Summary from './Summary';

export default connect(state => ({ isFiltering: isFiltering(state) }))(
  class extends React.PureComponent<{ isFiltering: boolean }> {
    render() {
      const { isFiltering } = this.props;
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {isFiltering && <ProgressBarAndroid />}
          {!isFiltering && <Summary />}
          {!isFiltering && <List />}
        </View>
      );
    }
  }
);
