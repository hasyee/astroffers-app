import * as React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, Linking, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { getVersion, getAuthorName, getLicense, getFeedbackUrl, getHomepage, getList } from '../selectors';

export default connect(state => ({
  version: getVersion(state),
  author: getAuthorName(state),
  license: getLicense(state),
  feedback: getFeedbackUrl(state),
  homepage: getHomepage(state)
}))(
  class extends React.PureComponent<{
    isOpen: boolean;
    onClose: Function;
    version: string;
    author: string;
    license: string;
    feedback: string;
    homepage: string;
  }> {
    renderRow(label: string, value: string, link = false) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ padding: 5, width: 80 }}>
            <Text style={{ fontWeight: 'bold' }}>{label}</Text>
          </View>
          {link ? (
            <TouchableWithoutFeedback onPress={() => Linking.openURL(value)}>
              <View style={{ flex: 1, padding: 5 }}>
                <Text style={{ color: '#01579b' }}>{value}</Text>
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <View style={{ flex: 1, padding: 5 }}>
              <Text>{value}</Text>
            </View>
          )}
        </View>
      );
    }

    render() {
      const { isOpen, onClose, version, author, license, feedback, homepage } = this.props;
      return (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'white',
            elevation: 4
          }}
        >
          <ScrollView style={{ padding: 20 }}>
            <View style={{ paddingBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
              <Image source={{ uri: 'ic_launcher' }} style={{ width: 60, height: 60 }} />
              <Text style={{ fontSize: 30, color: 'black', marginLeft: 20 }}>Astroffers</Text>
            </View>
            {this.renderRow('Version', version)}
            {this.renderRow('Author', author)}
            {this.renderRow('License', license)}
            {this.renderRow('Feedback', feedback, true)}
            {this.renderRow('Homepage', homepage, true)}
          </ScrollView>
        </View>
      );
    }
  }
);
