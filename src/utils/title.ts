import { NgcInfo } from 'astroffers-core';

export const getTitle = (ngcInfo: NgcInfo): string => {
  const object = ngcInfo ? ngcInfo.object : null;
  if (!object) return 'Unknown';
  return [ `NGC ${object.ngc}`, object.messier ? `M ${object.messier}` : null, object.name || null ]
    .filter(_ => _)
    .join(' | ');
};
