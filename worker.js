import { self } from 'react-native-threads';
import getResult from './src/utils/getResult';

self.onmessage = message => {
  const { cid, filter } = JSON.parse(message);
  const result = getResult(filter);
  self.postMessage(JSON.stringify({ cid, result }));
};
