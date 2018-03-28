import * as React from 'react';
import { View, Modal } from 'react-native';

export default class extends React.PureComponent<{ margin?: number; show?: boolean; onClose?: () => void }> {
  static defaultProps = {
    margin: 30,
    show: false,
    onClose: () => {}
  };

  render() {
    const { margin, show, onClose, children } = this.props;
    return (
      <Modal animationType="fade" transparent={true} visible={show} onRequestClose={onClose}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: margin }}
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
          <View style={{ backgroundColor: 'white', elevation: 10, flex: 1, margin }}>{children}</View>
        </View>
      </Modal>
    );
  }
}
