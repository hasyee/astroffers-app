import * as React from 'react';
import { View, Modal, Dimensions } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default class extends React.PureComponent<{ style?: any; show?: boolean; onClose?: () => void }> {
  static defaultProps = {
    style: {},
    show: false,
    onClose: () => {}
  };

  render() {
    const { style, show, onClose, children } = this.props;
    return (
      <Modal animationType="fade" transparent={true} visible={show} onRequestClose={onClose}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'black',
              opacity: 0.6
            }}
          />
          <View style={{ backgroundColor: 'white', elevation: 10, maxHeight: HEIGHT, maxWidth: WIDTH, ...style }}>
            {children}
          </View>
        </View>
      </Modal>
    );
  }
}
