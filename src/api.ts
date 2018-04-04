import { Thread } from 'react-native-threads';
import { AppState } from 'react-native';
import { Filter, Result } from './types';
import { v1 as uuid } from 'uuid';

let worker = null;
let cid = null;

AppState.addEventListener('change', nextState => initWorker());

const initWorker = () => {
  worker = new Thread('worker.js');
};

export const filterObjects = (filter: Filter): Promise<Result> =>
  new Promise((resolve, reject) => {
    if (!worker) initWorker();
    cid = uuid();
    worker.onmessage = message => {
      const response = JSON.parse(message);
      if (response.cid !== cid) return;
      resolve(response.result);
    };
    worker.postMessage(JSON.stringify({ cid, filter }));
  });
