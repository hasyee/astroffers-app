import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from './store';
import App from './components/App';
import 'babel-polyfill';

export default class extends React.PureComponent {
  state = {
    store: null
  };

  async componentDidMount() {
    const store = await createStore();
    this.setState({ store });
  }

  render() {
    return this.state.store ? (
      <Provider store={this.state.store}>
        <App />
      </Provider>
    ) : null;
  }
}
