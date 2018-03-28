import * as React from 'react';
import { View, FlatList, Text, TouchableNativeFeedback, Image } from 'react-native';
import Button from './Button';
import Dialog from './Dialog';

class Item extends React.PureComponent<{ label: string; checked: boolean; onPress: () => void }> {
  render() {
    const { label, checked, onPress } = this.props;
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: 'ic_check' }}
            style={{ marginRight: 10, opacity: checked ? 1 : 0, width: 30, height: 30 }}
          />
          <Text>{label}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

export default class extends React.PureComponent<{
  show?: boolean;
  onClose?: () => void;
  onSelect?: (value: string) => void;
  onSelectAll?: () => void;
  onSelectNone?: () => void;
  data?: { value: string; label: string; checked: boolean }[];
}> {
  static defaultProps = {
    show: false,
    onClose: () => {},
    onSelect: value => {},
    onSelectAll: () => {},
    onSelectNone: () => {},
    data: []
  };

  render() {
    const { show, onClose, data, onSelect, onSelectAll, onSelectNone } = this.props;
    return (
      <Dialog show={show} onClose={onClose}>
        <View>
          <FlatList
            style={{ padding: 10 }}
            data={data}
            keyExtractor={item => item.value}
            renderItem={({ item: { value, label, checked } }) => (
              <Item label={label} checked={checked} onPress={() => onSelect(value)} />
            )}
          />
        </View>
        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Button title="SELECT ALL" onPress={onSelectAll} />
            <Button title="SELECT NONE" onPress={onSelectNone} />
          </View>
          <View>
            <Button title="CLOSE" color="#01579b" onPress={onClose} />
          </View>
        </View>
      </Dialog>
    );
  }
}
