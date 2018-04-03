const moment = require('moment');
import { NgcInfo, radToDeg, stringifyTimeDiff } from 'astroffers-core';

export const display = ({
  object: { ngc, messier, name, constellation, magnitude, surfaceBrightness, types },
  intersection: { start, end },
  max,
  sum,
  altitudeAtMax
}: NgcInfo) => ({
  ngc,
  messier,
  name,
  types,
  constellation,
  from: moment(start).format('HH:mm'),
  to: moment(end).format('HH:mm'),
  max: `${moment(max).format('HH:mm')} / ${Math.round(radToDeg(altitudeAtMax))}°`,
  sum: stringifyTimeDiff(sum),
  magnitude,
  surfaceBrightness
});

export const getTitle = (ngcInfo: NgcInfo): string => {
  const object = ngcInfo ? ngcInfo.object : null;
  if (!object) return 'Unknown';
  return [ `NGC ${object.ngc}`, object.messier ? `M ${object.messier}` : null, object.name || null ]
    .filter(_ => _)
    .join(' | ');
};
