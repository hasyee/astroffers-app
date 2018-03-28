import * as React from 'react';
import { View, Text, TextInput } from 'react-native';

export default class extends React.PureComponent<{ label: string; inputProps: Object; containerStyle: any }> {
  render() {
    const { label, inputProps, containerStyle } = this.props;
    return (
      <View style={{ marginBottom: 20, ...containerStyle }}>
        <Text style={{ fontSize: 14, textAlign: 'left', color: 'rgba(0, 0, 0, 0.3)' }}>{label}</Text>
        <TextInput
          style={{ borderBottomWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)', height: 40 }}
          selectionColor="#01579b"
          underlineColorAndroid="transparent"
          {...inputProps}
        />
      </View>
    );
  }
}
