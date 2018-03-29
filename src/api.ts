import { Thread } from 'react-native-threads';
import { Filter, Result } from './types';
import { v1 as uuid } from 'uuid';

const worker = new Thread('worker.js');
const cidMap = new Map();

export const filterObjects = (filter: Filter): Promise<Result> =>
  new Promise((resolve, reject) => {
    const cid = uuid();
    const handler = message => {
      const response = JSON.parse(message);
      if (response.cid !== cid) return;
      cidMap.delete(cid);
      resolve(response.result);
    };
    cidMap.set(cid, handler);
    worker.onmessage = handler;
    worker.postMessage(JSON.stringify({ cid, filter }));
  });
