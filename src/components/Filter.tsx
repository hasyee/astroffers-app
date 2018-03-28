import * as React from 'react';
import { View, Text, Switch, Picker, ScrollView, FlatList } from 'react-native';
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';
import DatePicker from './DatePicker';
import TextInput from './TextInput';
//import MultiSelectDialog from './MultiSelectDialog';
//import MapDialog from './MapDialog';

const data = Array.from({ length: 50 }).map((_, i) => ({
  value: i.toString(),
  label: Math.random().toString(),
  checked: Math.random() > 0.5
}));

export default class extends React.PureComponent {
  state = {
    isOpenLocationDialog: false,
    isOpenTypeFilterDialog: false,
    isOpenConstellationFilterDialog: false
  };

  handleLocationDialogOpen = () => this.setState({ isOpenLocationDialog: true });
  handleLocationDialogClose = () => this.setState({ isOpenLocationDialog: false });
  handleConstellationDialogOpen = () => this.setState({ isOpenConstellationFilterDialog: true });
  handleConstellationDialogClose = () => this.setState({ isOpenConstellationFilterDialog: false });

  render() {
    const { isOpenLocationDialog, isOpenConstellationFilterDialog } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {/* <MapDialog show={isOpenLocationDialog} onClose={this.handleLocationDialogClose} />
        <MultiSelectDialog
          show={isOpenConstellationFilterDialog}
          onClose={this.handleConstellationDialogClose}
          data={data}
        /> */}
        <ScrollView style={{ padding: 20 }}>
          <DatePicker />
          <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextButton title="SET TODAY" />
            <TextButton title="SELECT LOCATION" onPress={this.handleLocationDialogOpen} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput
              label="Latitude ( ° )"
              containerStyle={{ width: 120 }}
              inputProps={{ keyboardType: 'numeric' }}
            />
            <TextInput
              label="Longitude ( ° )"
              containerStyle={{ width: 120 }}
              inputProps={{ keyboardType: 'numeric' }}
            />
          </View>
          <TextInput label="Minimum observation time ( min )" inputProps={{ keyboardType: 'numeric' }} />
          <TextInput label="Maximum altitude of Sun ( ° )" inputProps={{ keyboardType: 'numeric' }} />
          <TextInput label="Minimum altitude of objects ( ° )" inputProps={{ keyboardType: 'numeric' }} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}
          >
            <Text style={{ fontSize: 16 }}>Moonless night only</Text>
            <Switch value={true} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 20
            }}
          >
            <TextInput
              label="Max"
              inputProps={{ keyboardType: 'numeric' }}
              containerStyle={{ marginBottom: 0, width: 50 }}
            />
            <View style={{ borderBottomWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)' }}>
              <Picker selectedValue="surface-brightness" mode="dropdown" style={{ width: 200, height: 40 }}>
                <Picker.Item label="Magnitude" value="magnitude" />
                <Picker.Item label="Surface brightness" value="surface-brightness" />
              </Picker>
            </View>
          </View>
          <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextButton title="FILTER CONS" onPress={this.handleConstellationDialogOpen} />
            <TextButton title="FILTER TYPES" />
          </View>
        </ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <TextButton title="RESET" />
          <RaisedTextButton title="FILTER" color="#01579b" titleColor="white" />
        </View>
      </View>
    );
  }
}
