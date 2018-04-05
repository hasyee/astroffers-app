import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Picker } from 'react-native';
import Dialog from './Dialog';
import Button from './Button';
import MapView, { Marker, Callout } from 'react-native-maps';
import { fetchLocation } from '../actions';

type MapType = 'standard' | 'satellite' | 'hybrid' | 'terrain' | 'none' | 'mutedStandard';

export default connect(null, { fetchLocation })(
  class extends React.PureComponent<
    {
      show?: boolean;
      onSubmit?: (location: { latitude: number; longitude: number }) => void;
      onClose?: () => void;
      latitude: number;
      longitude: number;
      fetchLocation: Function;
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
      this.state = this.getInitialState(this.props);
    }

    private map: MapView;

    getInitialState(props) {
      const { latitude, longitude } = props;
      const coords =
        !Number.isFinite(latitude) || !Number.isFinite(longitude)
          ? { latitude: 47, longitude: 19 }
          : {
              latitude,
              longitude
            };
      return { mapType: this.state ? this.state.mapType : 'standard' as MapType, ...coords };
    }

    handleChangeMapType = mapType => this.setState({ mapType });
    handleMarkerChange = evt => {
      this.setState(evt.nativeEvent.coordinate, this.navigateMapToPosition);
    };
    handleUseMyLocation = () =>
      this.props.fetchLocation().then(location => this.setState(location, this.navigateMapToPosition)).catch(err => {});

    handleCancel = () => {
      this.setState(this.getInitialState(this.props));
      this.props.onClose();
    };

    handleSubmit = () =>
      this.props.onSubmit({
        latitude: parseFloat(this.state.latitude.toFixed(5)),
        longitude: parseFloat(this.state.longitude.toFixed(5))
      });

    componentWillUpdate(nextProps) {
      if (nextProps.latitude !== this.props.latitude || nextProps.longitude !== this.props.longitude) {
        this.setState(this.getInitialState(nextProps));
      }
    }

    navigateMapToPosition = () => {
      this.map.animateToCoordinate({ latitude: this.state.latitude, longitude: this.state.longitude });
    };

    render() {
      const { show, onClose, onSubmit } = this.props;
      const { mapType, latitude, longitude } = this.state;
      return (
        <Dialog show={show} onClose={onClose} style={{ margin: 10, flex: 1 }}>
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
              ref={map => (this.map = map)}
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 5,
                longitudeDelta: 5
              }}
            >
              <Marker coordinate={{ latitude, longitude }} draggable onDragEnd={this.handleMarkerChange} />
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
              <Button title="USE MY LOCATION" onPress={this.handleUseMyLocation} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Button title="CANCEL" onPress={this.handleCancel} />
              <Button title="SUBMIT" color="#01579b" onPress={this.handleSubmit} />
            </View>
          </View>
        </Dialog>
      );
    }
  }
);
