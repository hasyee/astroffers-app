import * as React from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import Dialog from './Dialog';
import Button from './Button';
import MapView, { Marker, Callout } from 'react-native-maps';

type MapType = 'standard' | 'satellite' | 'hybrid' | 'terrain' | 'none' | 'mutedStandard';

export default class extends React.PureComponent<
  {
    show?: boolean;
    onSubmit?: (location: { latitude: number; longitude: number }) => void;
    onClose?: () => void;
    latitude: number;
    longitude: number;
  },
  { mapType: MapType; latitude: number; longitude: number }
> {
  static defaultProps = {
    show: false,
    onClose: () => {},
    onSubmit: () => {}
  };

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      mapType: 'standard' as MapType,
      latitude: this.props.latitude,
      longitude: this.props.longitude
    };
  }

  handleChangeMapType = mapType => this.setState({ mapType });
  handleMarkerChange = evt => {
    console.log('%%%%%%%%%', evt);
  };
  handleSubmit = () => {};

  componentWillUpdate(nextProps) {
    if (nextProps.latitude !== this.props.latitude || nextProps.longitude !== this.props.longitude) {
      this.setState({
        latitude: nextProps.latitude,
        longitude: nextProps.longitude
      });
    }
  }

  render() {
    const { show, onClose, onSubmit } = this.props;
    const { mapType, latitude, longitude } = this.state;
    return (
      <Dialog show={show} onClose={onClose} margin={10}>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20 }}>Select your location</Text>
        </View>
        <View style={{ flex: 1 }}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            showsUserLocation
            followsUserLocation
            showsMyLocationButton={false}
            mapType={mapType}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 5,
              longitudeDelta: 5
            }}
          >
            <Marker coordinate={{ latitude, longitude }} draggable />
          </MapView>
          <View
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              top: 12,
              right: 12,
              flexDirection: 'row',
              elevation: 2,
              borderRadius: 2,
              opacity: 0.9
            }}
          >
            <Picker
              selectedValue={mapType}
              mode="dropdown"
              style={{ width: 150, height: 37 }}
              onValueChange={this.handleChangeMapType}
            >
              <Picker.Item label="Roadmap" value="standard" />
              <Picker.Item label="Satellite" value="satellite" />
              <Picker.Item label="Hybrid" value="hybrid" />
              <Picker.Item label="Terrain" value="terrain" />
            </Picker>
          </View>
        </View>
        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Button title="USE MY LOCATION" />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button title="CANCEL" onPress={onClose} />
            <Button title="SUBMIT" color="#01579b" onPress={this.handleSubmit} />
          </View>
        </View>
      </Dialog>
    );
  }
}
