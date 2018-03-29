import * as React from 'react';
import { TouchableNativeFeedback, View, Text } from 'react-native';

export default class extends React.PureComponent<{
  title: string;
  color?: string;
  onPress?: () => void;
  raised?: boolean;
  disabled?: boolean;
}> {
  static defaultProps = {
    color: 'black',
    onPress: () => {},
    raised: false,
    disabled: false
  };

  renderButton() {
    const { title, color, onPress, raised, disabled } = this.props;
    return (
      <View
        style={{
          backgroundColor: raised ? (disabled ? '#DDD' : color) : 'transparent',
          elevation: raised && !disabled ? 3 : 0,
          height: 36,
          minWidth: raised ? 88 : 64,
          paddingHorizontal: raised ? 16 : 8,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            color: disabled ? '#999' : raised ? 'white' : color,
            fontSize: 14,
            fontWeight: 'bold'
          }}
        >
          {title.toUpperCase()}
        </Text>
      </View>
    );
  }

  render() {
    const { onPress, disabled } = this.props;
    return disabled ? (
      this.renderButton()
    ) : (
      <TouchableNativeFeedback onPress={onPress}>{this.renderButton()}</TouchableNativeFeedback>
    );
  }
}
