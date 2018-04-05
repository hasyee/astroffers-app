import { ToastAndroid, PermissionsAndroid } from 'react-native';

export const fetchLocation = async (): Promise<{ latitude: number; longitude: number }> => {
  await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  return new Promise<{ latitude: number; longitude: number }>((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      },
      err => {
        ToastAndroid.showWithGravity('Failed to fetch location', ToastAndroid.SHORT, ToastAndroid.CENTER);
        reject(new Error('Failed to fetch location'));
      }
    )
  );
};
