import { AsyncStorage } from 'react-native';
import Store, { thunk } from 'repatch';
import { State } from './types';
import defaultState from './defaultState';
import * as location from './utils/location';
import * as api from './api';

export const createStore = async (): Promise<Store<State>> => {
  const storedFilterStr = await AsyncStorage.getItem('filter');
  const storedFilter = storedFilterStr ? JSON.parse(storedFilterStr) : {};

  const storedSettingsStr = await AsyncStorage.getItem('settings');
  const storedSettings = storedSettingsStr ? JSON.parse(storedSettingsStr) : {};

  const initialState: State = {
    ...defaultState,
    filter: { ...defaultState.filter, ...storedFilter, date: Date.now() },
    settings: { ...defaultState.settings, ...storedSettings }
  };

  const store = new Store<State>(initialState).addMiddleware(thunk.withExtraArgument({ api, location }));

  store.subscribe(async () => {
    const filter = JSON.stringify(store.getState().filter);
    AsyncStorage.setItem('filter', filter);
    const settings = JSON.stringify(store.getState().settings);
    AsyncStorage.setItem('settings', settings);
  });

  return store;
};
