import * as React from 'react';
import { DatePickerAndroid, View, TouchableWithoutFeedback } from 'react-native';
const moment = require('moment');
import TextInput from './TextInput';

export default class extends React.PureComponent<{ value?: number; onChange?: (date: number) => void }> {
  static defaultProps = {
    value: Date.now(),
    onChange: date => {}
  };

  state = {
    value: this.props.value
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handlePress = async () => {
    console.log('%%%%%%%%%%%%%%%%%%%%%');
    const { action, year, month, day } = await DatePickerAndroid.open({
      date: new Date(this.state.value)
    });
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({ value: new Date(year, month, day).getTime() }, () => this.props.onChange(this.state.value));
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <View>
          <TextInput
            label="Date"
            inputProps={{
              value: moment(this.state.value).format('YYYY-MM-DD'),
              editable: false
            }}
            inputStyle={{ color: 'black' }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
