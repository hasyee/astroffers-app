import { Thread } from 'react-native-threads';
import { Filter, Result } from './types';

const worker = new Thread('worker.js');
let isWorkerBusy = false;

export const filterObjects = (filter: Filter): Promise<Result> =>
  new Promise((resolve, reject) => {
    if (isWorkerBusy) return reject(new Error('Worker is busy'));
    isWorkerBusy = true;
    worker.onmessage = message => {
      if (!isWorkerBusy) return reject(new Error('Worker is already done'));
      const data = JSON.parse(message);
      isWorkerBusy = false;
      resolve(data);
    };
    worker.postMessage(JSON.stringify(filter));
  });
