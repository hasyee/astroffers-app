import * as React from 'react';
import { View, Text, TextInput } from 'react-native';

export default class extends React.PureComponent<{
  label?: string;
  inputProps?: Object;
  containerStyle?: any;
  error?: string;
}> {
  static defaultProps = {
    label: '',
    inputProps: {},
    containerStyle: {},
    error: null
  };

  render() {
    const { label, inputProps, containerStyle, error } = this.props;
    return (
      <View style={{ marginBottom: 20, ...containerStyle }}>
        <Text style={{ fontSize: 14, textAlign: 'left', color: error ? 'rgb(244, 67, 54)' : 'rgba(0, 0, 0, 0.3)' }}>
          {label}
        </Text>
        <TextInput
          style={{ borderBottomWidth: 1, borderColor: error ? 'rgb(244, 67, 54)' : 'rgba(0, 0, 0, 0.3)', height: 40 }}
          selectionColor="#01579b"
          underlineColorAndroid="transparent"
          {...inputProps}
        />
        {!!error && <Text style={{ fontSize: 12, color: 'rgb(244, 67, 54)' }}>{error}</Text>}
      </View>
    );
  }
}
