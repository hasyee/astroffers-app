import * as React from 'react';
import { TouchableNativeFeedback, View, Image } from 'react-native';

export default class extends React.PureComponent<{ icon: string; onPress?: () => void }> {
  static defaultProps = {
    onPress: () => {}
  };

  render() {
    const { icon, onPress } = this.props;
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: icon }} style={{ width: 20, height: 20 }} />
        </View>
      </TouchableNativeFeedback>
    );
  }
}
