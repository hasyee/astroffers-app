import * as React from 'react';
import { TextInput } from 'react-native';

const TIMEOUT = 300;

export default class extends React.PureComponent<
  { value?: string; onTypeEnd?: (value: string) => void; numeric?: boolean; style?: any },
  { value: string }
> {
  static defaultProps = {
    value: '',
    onTypeEnd: () => {},
    numeric: false,
    style: {}
  };

  private timer;
  state = { value: this.props.value };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) this.setState({ value: nextProps.value });
  }

  handleChange = value => {
    this.setState({ value });
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.props.onTypeEnd(this.state.value);
    }, TIMEOUT);
  };

  handleEndEditing = () => {
    if (this.timer) clearTimeout(this.timer);
    this.props.onTypeEnd(this.state.value);
  };

  render() {
    return (
      <TextInput
        value={this.state.value}
        onChangeText={this.handleChange}
        keyboardType={this.props.numeric ? 'numeric' : 'default'}
        style={this.props.style}
        onEndEditing={this.handleEndEditing}
        underlineColorAndroid="transparent"
      />
    );
  }
}
