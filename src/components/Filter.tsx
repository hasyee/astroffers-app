import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text, Switch, Picker, ScrollView, FlatList } from 'react-native';
import Button from './Button';
import { BirghtnessType, objectTypes, constellations } from 'astroffers-core';
import DatePicker from './DatePicker';
import TextInput from './TextInput';
import { Filter as IFilter } from '../types';
import {
  changeFilter,
  resetFilter,
  toggleSetFilter,
  changeAllTypeFilter,
  changeAllConstellationFilter,
  filterObjects
} from '../actions';
import { getFilter } from '../selectors';
import MultiSelectDialog from './MultiSelectDialog';
import SelectLocationDialog from './SelectLocationDialog';

/* const data = Array.from({ length: 50 }).map((_, i) => ({
  value: i.toString(),
  label: Math.random().toString(),
  checked: Math.random() > 0.5
})); */

type Range = { min: number; max: number };

const isNegZero = (value: number) => Object.is(value, -0);
const resolveValue = (value: number) => (Number.isFinite(value) ? (isNegZero(value) ? '-' : value.toString()) : '');
const checkRange = (value: number, range?: Range) =>
  !Number.isFinite(value) || !range || (value >= range.min && value <= range.max);
const getErrorMessage = (value: number): string => !Number.isFinite(value) && 'This field is required';

export default connect(state => ({ filter: getFilter(state) }), {
  changeFilter,
  resetFilter,
  toggleSetFilter,
  changeAllTypeFilter,
  changeAllConstellationFilter
})(
  class extends React.PureComponent<
    {
      filter: IFilter;
      changeFilter: typeof changeFilter;
      resetFilter: typeof resetFilter;
      filterObjects: typeof filterObjects;
      toggleSetFilter: typeof toggleSetFilter;
      changeAllTypeFilter: typeof changeAllTypeFilter;
      changeAllConstellationFilter: typeof changeAllConstellationFilter;
    },
    {
      isOpenLocationDialog: boolean;
      isOpenTypeFilterDialog: boolean;
      isOpenConstellationFilterDialog: boolean;
    }
  > {
    state = {
      isOpenLocationDialog: false,
      isOpenTypeFilterDialog: false,
      isOpenConstellationFilterDialog: false
    };

    handleLocationDialogOpen = () => this.setState({ isOpenLocationDialog: true });
    handleLocationDialogClose = () => this.setState({ isOpenLocationDialog: false });
    handleConstellationDialogOpen = () => this.setState({ isOpenConstellationFilterDialog: true });
    handleConstellationDialogClose = () => this.setState({ isOpenConstellationFilterDialog: false });
    handleTypeFilterDailogOpen = () => this.setState({ isOpenTypeFilterDialog: true });
    handleTypeFilterDailogClose = () => this.setState({ isOpenTypeFilterDialog: false });
    handleLocationDialogSubmit = ({ latitude, longitude }) => {
      this.setState({ isOpenLocationDialog: false });
      this.props.changeFilter('latitude', latitude);
      this.props.changeFilter('longitude', longitude);
    };
    handleDateChange = date => this.props.changeFilter('date', date);
    handleSetToday = () => this.props.changeFilter('date', Date.now());
    handleChange = (prop: string, range?: Range) => text => {
      const value = text === '-' ? -0 : parseFloat(text);
      if (!checkRange(value, range)) return;
      this.props.changeFilter(prop, Number.isFinite(value) ? value : null);
    };
    handleMoonlessChange = (value: boolean) => this.props.changeFilter('moonless', value);
    handleBrightnessFilterChange = (value: BirghtnessType) => this.props.changeFilter('brightnessFilter', value);

    render() {
      const {
        filter: {
          date,
          latitude,
          longitude,
          observationTime,
          twilight,
          altitude,
          moonless,
          brightnessFilter,
          magnitude,
          surfaceBrightness,
          types,
          constellations: constellationFilter
        },
        filterObjects,
        toggleSetFilter,
        changeAllTypeFilter,
        changeAllConstellationFilter,
        resetFilter
      } = this.props;
      const { isOpenLocationDialog, isOpenConstellationFilterDialog, isOpenTypeFilterDialog } = this.state;
      return (
        <View style={{ flex: 1 }}>
          <SelectLocationDialog
            show={isOpenLocationDialog}
            onClose={this.handleLocationDialogClose}
            onSubmit={this.handleLocationDialogSubmit}
            latitude={latitude}
            longitude={longitude}
          />
          <MultiSelectDialog
            show={isOpenConstellationFilterDialog}
            onClose={this.handleConstellationDialogClose}
            data={Object.keys(constellations).map(value => ({
              value,
              label: constellations[value],
              checked: constellationFilter[value]
            }))}
            onSelect={key => toggleSetFilter('constellations', key)}
            onSelectAll={() => changeAllConstellationFilter(true)}
            onSelectNone={() => changeAllConstellationFilter(false)}
          />
          <MultiSelectDialog
            show={isOpenTypeFilterDialog}
            onClose={this.handleTypeFilterDailogClose}
            data={Object.keys(objectTypes).map(value => ({ value, label: objectTypes[value], checked: types[value] }))}
            onSelect={key => toggleSetFilter('types', key)}
            onSelectAll={() => changeAllTypeFilter(true)}
            onSelectNone={() => changeAllTypeFilter(false)}
          />
          <ScrollView style={{ padding: 20 }}>
            <DatePicker value={date} onChange={this.handleDateChange} />
            <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button title="SET TODAY" onPress={this.handleSetToday} />
              <Button title="SELECT LOCATION" onPress={this.handleLocationDialogOpen} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextInput
                label="Latitude ( ° )"
                containerStyle={{ width: 120 }}
                inputProps={{
                  keyboardType: 'numeric',
                  value: resolveValue(latitude),
                  onChangeText: this.handleChange('latitude', { min: -90, max: 90 })
                }}
                error={getErrorMessage(latitude)}
              />
              <TextInput
                label="Longitude ( ° )"
                containerStyle={{ width: 120 }}
                inputProps={{
                  keyboardType: 'numeric',
                  value: resolveValue(longitude),
                  onChangeText: this.handleChange('longitude', { min: -90, max: 90 })
                }}
                error={getErrorMessage(longitude)}
              />
            </View>
            <TextInput
              label="Minimum observation time ( min )"
              inputProps={{
                keyboardType: 'numeric',
                value: resolveValue(observationTime),
                onChangeText: this.handleChange('observationTime', { min: 0, max: 1440 })
              }}
              error={getErrorMessage(observationTime)}
            />
            <TextInput
              label="Maximum altitude of Sun ( ° )"
              inputProps={{
                keyboardType: 'numeric',
                value: resolveValue(twilight),
                onChangeText: this.handleChange('twilight', { min: -90, max: 90 })
              }}
              error={getErrorMessage(twilight)}
            />
            <TextInput
              label="Minimum altitude of objects ( ° )"
              inputProps={{
                keyboardType: 'numeric',
                value: resolveValue(altitude),
                onChangeText: this.handleChange('altitude', { min: -90, max: 90 })
              }}
              error={getErrorMessage(altitude)}
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}
            >
              <Text style={{ fontSize: 16 }}>Moonless night only</Text>
              <Switch value={moonless} onValueChange={this.handleMoonlessChange} />
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
                inputProps={{
                  keyboardType: 'numeric',
                  value: resolveValue(brightnessFilter === BirghtnessType.magnitude ? magnitude : surfaceBrightness),
                  onChangeText: this.handleChange(brightnessFilter)
                }}
                error={getErrorMessage(brightnessFilter === BirghtnessType.magnitude ? magnitude : surfaceBrightness)}
                containerStyle={{ marginBottom: 0, width: 50 }}
              />
              <View style={{ borderBottomWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)' }}>
                <Picker
                  selectedValue={brightnessFilter}
                  onValueChange={this.handleBrightnessFilterChange}
                  mode="dropdown"
                  style={{ width: 200, height: 40 }}
                >
                  <Picker.Item label="Magnitude" value={BirghtnessType.magnitude} />
                  <Picker.Item label="Surface brightness" value={BirghtnessType.surfaceBrightness} />
                </Picker>
              </View>
            </View>
            <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button title="FILTER CONS" onPress={this.handleConstellationDialogOpen} />
              <Button title="FILTER TYPES" onPress={this.handleTypeFilterDailogOpen} />
            </View>
          </ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
            <Button title="RESET" onPress={resetFilter} />
            <Button title="FILTER" color="#01579b" raised />
          </View>
        </View>
      );
    }
  }
);
