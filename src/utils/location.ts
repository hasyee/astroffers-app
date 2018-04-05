import { ToastAndroid } from 'react-native';

export const fetchLocation = (): Promise<{ latitude; longitude }> =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      },
      err => {
        ToastAndroid.showWithGravity('Failed to fetch location', ToastAndroid.SHORT, ToastAndroid.CENTER);
      }
    )
  );
