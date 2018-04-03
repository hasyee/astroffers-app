import { State, Filter, ListItemProp } from './types';
import { NightInfo, NgcInfo, CoordSeries, Az, getHorizontalCoordSeries } from 'astroffers-core';

export const getVersion = ({ packageJson: { version } }: State): string => version;
export const getAuthorName = ({ packageJson: { author: { name } } }: State): string => name;
export const getLicense = ({ packageJson: { license } }: State): string => license;
export const getFeedbackUrl = ({ packageJson: { bugs: { url } } }: State): string => url;
export const getHomepage = ({ packageJson: { homepage } }: State): string => homepage;

export const getFilter = ({ filter }: State): Filter => filter;

export const isFiltering = ({ isFiltering }: State): boolean => isFiltering;

export const getCount = ({ result }: State): number => (result ? result.list.length : 0);

export const getNightInfo = ({ result }: State): NightInfo => (result ? result.nightInfo : null);

export const hasResult = ({ result }: State): boolean => !!result;

export const getDate = ({ result }: State): number => (result ? result.filter.date : null);

export const getMoonless = ({ result }: State): boolean => (result ? result.filter.moonless : null);

export const getList = ({ result }: State): NgcInfo[] => (result ? result.list : null);

export const getSortBy = ({ settings }: State): ListItemProp => settings.sortBy;

export const isOpenDetails = ({ openedDetails }: State): boolean => !!openedDetails;

export const getOpenedNgcInfo = ({ result, openedDetails }: State): NgcInfo =>
  result ? result.list.find(info => info.object.ngc === openedDetails) : null;

export const getOpenedNgcInfoIndex = ({ result, openedDetails }: State): number =>
  result ? result.list.findIndex(info => info.object.ngc === openedDetails) : 0;

export const getHorizontalCoords = (state: State): CoordSeries<Az> => {
  const ngcInfo = getOpenedNgcInfo(state);
  return ngcInfo
    ? getHorizontalCoordSeries(
        state.result.filter.date,
        state.result.filter.latitude,
        state.result.filter.longitude,
        ngcInfo.eqCoordsOnDate
      )
    : null;
};

export const getMinAltitde = ({ result }: State): number => (result ? result.filter.altitude : null);
