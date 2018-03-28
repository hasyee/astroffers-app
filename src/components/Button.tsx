import * as React from 'react';
import { TouchableNativeFeedback, View, Text } from 'react-native';

export default class extends React.PureComponent<{
  title: string;
  color?: string;
  onPress?: () => void;
  raised?: boolean;
}> {
  static defaultProps = {
    color: 'black',
    onPress: () => {},
    raised: false
  };

  render() {
    const { title, color, onPress, raised } = this.props;
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <View
          style={{
            backgroundColor: raised ? color : 'transparent',
            elevation: raised ? 3 : 0,
            height: 36,
            minWidth: raised ? 88 : 64,
            paddingHorizontal: raised ? 16 : 8,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ color: raised ? 'white' : color, fontSize: 14, fontWeight: 'bold' }}>
            {title.toUpperCase()}
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}
