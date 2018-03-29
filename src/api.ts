import { Thread } from 'react-native-threads';
import { Filter, Result } from './types';
import { v1 as uuid } from 'uuid';

const worker = new Thread('worker.js');
let cid = null;

export const filterObjects = (filter: Filter): Promise<Result> =>
  new Promise((resolve, reject) => {
    cid = uuid();
    worker.onmessage = message => {
      const response = JSON.parse(message);
      if (response.cid !== cid) return;
      resolve(response.result);
    };
    worker.postMessage(JSON.stringify({ cid, filter }));
  });
