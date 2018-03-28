import * as React from 'react';
import * as moment from 'moment';
import TextInput from './TextInput';

import { DatePickerAndroid } from 'react-native';

export default class extends React.PureComponent<{ value: number; onChange: (date: number) => void }> {
  static defaultProps = {
    value: Date.now(),
    onChange: date => {}
  };

  picker;

  state = {
    value: this.props.value
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleFocus = async () => {
    this.picker.blur();
    const { action, year, month, day } = await DatePickerAndroid.open({
      date: new Date(this.state.value)
    });
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({ value: new Date(year, month, day).getTime() });
    }
  };

  render() {
    return (
      <TextInput
        label="Date"
        inputProps={{
          value: moment(this.state.value).format('YYYY-MM-DD'),
          onFocus: this.handleFocus,
          ref: picker => (this.picker = picker)
        }}
      />
    );
  }
}
