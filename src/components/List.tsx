import * as React from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text, TouchableNativeFeedback, StyleSheet, Picker, TextInput } from 'react-native';
import { NgcInfo, resolveTypes, resolveConstellation } from 'astroffers-core';
import { ListItemProp } from '../types';
import { getList, isFiltering, getSortBy } from '../selectors';
import { sort } from '../actions';
import display from '../utils/display';
import IconButton from './IconButton';
import LazyInput from './LazyInput';

const styles = StyleSheet.create({
  propertyLabeL: {
    fontWeight: 'bold',
    fontSize: 11
  },
  propertyValue: {
    fontSize: 12
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  searchLabeL: {
    fontSize: 13
  },
  searchInput: {
    flex: 1,
    height: 40
  }
});

class Item extends React.PureComponent<{ object: NgcInfo }> {
  getTitle(): string {
    const object = this.props.object ? this.props.object.object : null;
    if (!object) return 'Unknown';
    return [ `NGC ${object.ngc}`, object.messier ? `M ${object.messier}` : null, object.name || null ]
      .filter(_ => _)
      .join(' | ');
  }

  render() {
    const { object } = this.props;
    const { object: { types, constellation } } = object;
    const { from, to, max, sum, magnitude, surfaceBrightness } = display(object);
    return (
      <TouchableNativeFeedback>
        <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, padding: 20 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>{this.getTitle()}</Text>
            <Text>
              {resolveTypes(types).join(', ')} in {resolveConstellation(constellation)}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.propertyLabeL}>From</Text>
              <Text style={styles.propertyValue}>{from}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.propertyLabeL}>Max / Alt</Text>
              <Text style={styles.propertyValue}>{max}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.propertyLabeL}>To</Text>
              <Text style={styles.propertyValue}>{to}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.propertyLabeL}>Sum</Text>
              <Text style={styles.propertyValue}>{sum}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.propertyLabeL}>Magnitude</Text>
              <Text style={styles.propertyValue}>{magnitude}</Text>
            </View>
            <View style={{ flex: 3 }}>
              <Text style={styles.propertyLabeL}>Surface brightness</Text>
              <Text style={styles.propertyValue}>{surfaceBrightness}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

export default connect(
  state => ({
    objects: getList(state),
    isFiltering: isFiltering(state),
    sortBy: getSortBy(state)
  }),
  { sort }
)(
  class extends React.PureComponent<
    {
      objects: NgcInfo[];
      isFiltering: boolean;
      sortBy: ListItemProp;
      sort: typeof sort;
    },
    { isOpenFilter: boolean; filter: { [key in ListItemProp]?: string } }
  > {
    private list;

    state = {
      isOpenFilter: false,
      filter: {
        [ListItemProp.NGC]: '',
        [ListItemProp.MESSIER]: '',
        [ListItemProp.NAME]: ''
      }
    };

    handleSort = (prop: ListItemProp) => {
      if (prop !== this.props.sortBy) {
        this.props.sort(prop);
      }
    };

    handleToggleFilter = () => this.setState({ isOpenFilter: !this.state.isOpenFilter });

    handleFilterChange = (prop: ListItemProp) => value => {
      this.setState({ filter: { ...this.state.filter, [prop]: value } });
    };

    componentDidUpdate(prevProps) {
      if (prevProps.sortBy !== this.props.sortBy && this.props.objects.length > 0)
        this.list.scrollToIndex({ index: 0 });
    }

    renderHeader() {
      const { sortBy } = this.props;
      const { isOpenFilter, filter } = this.state;
      return (
        <View
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            elevation: 3,
            backgroundColor: '#EEE'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Picker
              mode="dropdown"
              style={{ width: '50%', height: 40 }}
              selectedValue={sortBy}
              onValueChange={this.handleSort}
            >
              <Picker.Item label="NGC" value={ListItemProp.NGC} />
              <Picker.Item label="Messier" value={ListItemProp.MESSIER} />
              <Picker.Item label="Name" value={ListItemProp.NAME} />
              <Picker.Item label="Type" value={ListItemProp.TYPE} />
              <Picker.Item label="Constellation" value={ListItemProp.CONSTELLATION} />
              <Picker.Item label="From" value={ListItemProp.FROM} />
              <Picker.Item label="To" value={ListItemProp.TO} />
              <Picker.Item label="Max" value={ListItemProp.MAX} />
              <Picker.Item label="Sum" value={ListItemProp.SUM} />
              <Picker.Item label="Magnitude" value={ListItemProp.MAGNITUDE} />
              <Picker.Item label="Surface birghtness" value={ListItemProp.SURFACE_BRIGHTNESS} />
            </Picker>
            <IconButton icon="ic_action_search" onPress={this.handleToggleFilter} />
          </View>
          {isOpenFilter && (
            <View style={{ padding: 10 }}>
              <View style={styles.searchItem}>
                <Text style={styles.searchLabeL}>NGC</Text>
                <LazyInput
                  style={styles.searchInput}
                  numeric
                  value={filter[ListItemProp.NGC]}
                  onTypeEnd={this.handleFilterChange(ListItemProp.NGC)}
                />
              </View>
              <View style={styles.searchItem}>
                <Text style={styles.searchLabeL}>Messier</Text>
                <LazyInput
                  style={styles.searchInput}
                  numeric
                  value={filter[ListItemProp.MESSIER]}
                  onTypeEnd={this.handleFilterChange(ListItemProp.MESSIER)}
                />
              </View>
              <View style={styles.searchItem}>
                <Text style={styles.searchLabeL}>Name</Text>
                <LazyInput
                  style={styles.searchInput}
                  value={filter[ListItemProp.NAME]}
                  onTypeEnd={this.handleFilterChange(ListItemProp.NAME)}
                />
              </View>
            </View>
          )}
        </View>
      );
    }

    render() {
      const { sortBy, isFiltering, objects } = this.props;
      const { filter } = this.state;
      if (isFiltering || !objects) return null;
      return (
        <View style={{ flex: 1, width: '100%' }}>
          {this.renderHeader()}
          <FlatList
            style={{ flex: 1 }}
            ref={list => (this.list = list)}
            keyExtractor={({ object }) => object.ngc.toString()}
            data={objects.filter(search(filter))}
            extraData={{ sortBy, filter }}
            renderItem={({ item: object }) => <Item object={object} />}
          />
        </View>
      );
    }
  }
);

const search = (filter: { [key in ListItemProp]?: string }) => (ngcInfo: NgcInfo): boolean => {
  if (filter[ListItemProp.NGC] && filter[ListItemProp.NGC] !== ngcInfo.object.ngc.toString()) return false;
  if (filter[ListItemProp.MESSIER] && !ngcInfo.object.messier) return false;
  if (
    filter[ListItemProp.MESSIER] &&
    ngcInfo.object.messier &&
    filter[ListItemProp.MESSIER] !== ngcInfo.object.messier.toString()
  )
    return false;
  if (filter[ListItemProp.NAME] && !ngcInfo.object.name) return false;
  if (
    filter[ListItemProp.NAME] &&
    ngcInfo.object.name &&
    ngcInfo.object.name.toLowerCase().search(filter[ListItemProp.NAME].toLowerCase()) === -1
  )
    return false;
  return true;
};
