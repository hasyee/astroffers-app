import { State, ListItemProp } from './types';
import defaultState from './defaultState';
import { objectTypes, constellations, BirghtnessType } from 'astroffers-core';
import sorters from './utils/sorters';

export const resetFilter = () => (state: State): State => ({ ...state, filter: defaultState.filter });

export const changeFilter = (prop: string, value: number | boolean | BirghtnessType) => (state: State): State => ({
  ...state,
  filter: { ...state.filter, [prop]: value }
});

export const toggleSetFilter = (set: string, typeKey: string) => (state: State): State => ({
  ...state,
  filter: {
    ...state.filter,
    [set]: {
      ...state.filter[set],
      [typeKey]: !state.filter[set][typeKey]
    }
  }
});

export const changeAllTypeFilter = (value: boolean) => (state: State): State => ({
  ...state,
  filter: {
    ...state.filter,
    types: Object.keys(objectTypes).reduce((acc, type) => ({ ...acc, [type]: value }), {})
  }
});

export const changeAllConstellationFilter = (value: boolean) => (state: State): State => ({
  ...state,
  filter: {
    ...state.filter,
    constellations: Object.keys(constellations).reduce((acc, cons) => ({ ...acc, [cons]: value }), {})
  }
});

export const filterObjects = () => (state: State) => async (dispatch, getState, { api }) => {
  dispatch((state: State): State => ({ ...state, isFiltering: true }));
  const result = await api.filterObjects(getState().filter);
  const sortBy = getState().settings.sortBy;
  dispatch((state: State): State => ({
    ...state,
    result: { ...result, list: result.list.sort(sorters[sortBy]) },
    isFiltering: false
  }));
};
