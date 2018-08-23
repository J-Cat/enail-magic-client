import { Dispatch, Store } from 'redux';
import { arrayBufferToString, stringToArrayBuffer } from '../helpers/arrayBuffer';
import { updateBleConnection, getProfiles, connectBle } from '../modules/enailMagic';
import { IEMStore } from '../models/IEMStore';

import * as EMConstants from '../modules/constants';
import { EMAction } from '../models/IEMAction';

const bleSettings: {
    characteristics:string[];
    deviceId: string;
} = {
    characteristics: [],
    deviceId: ''
};

export const bleMiddleware = (store: Store<IEMStore>) => <A extends EMAction>(next: Dispatch<A>) => (action: A) => {
    switch (action.type) {    
        case EMConstants.EM_CONNECT_BLE_ACTION: {
            action.connectionPromise = connectBleAdapter(store);
            break;
        }

        default: {
            try {
                if (typeof action.type === "number") {
                    ble.writeWithoutResponse(
                        bleSettings.deviceId, EMConstants.EM_SERVICE_UUID, action.uuid, 
                        stringToArrayBuffer(JSON.stringify(
                            [action.type.toString(10), action.key]
                        ))
                    );
                }
            } catch (e) {
                alert(e);
            }
        }
    }

    const result = next(action);
    return result;
};

const connectBleAdapter = (store: Store<IEMStore>): Promise<{deviceId: string, characteristics: string[]}> => {
    const blePromise: Promise<{deviceId: string, characteristics: string[]}> = new Promise<{deviceId: string, characteristics: string[]}>((resolve, reject) => {
      try {
          if (window.cordova && !ble) {
              setTimeout(() => {
                  store.dispatch(connectBle(store));
              }, 2000);
              throw new Error('No Bluetooth LE available.  Trying again in a couple seconds.');
          } else {
              ble.isEnabled(() => {
                  ble.startScan([EMConstants.EM_SERVICE_UUID], (data: BLECentralPlugin.PeripheralData) => {
                    ble.stopScan();
                    const deviceId: string = data.id;
                    
                    ble.connect(deviceId, (extendedData: BLECentralPlugin.PeripheralDataExtended) => {
                        const characteristics: string[] = extendedData.characteristics.map((characteristic) => (
                            characteristic.characteristic
                        ));

                        resolve({
                        characteristics,
                        deviceId
                        });
                    }, () => {
                        throw new Error('Error connecting to Bluetooth LE device.');
                    });
                  }, () => {
                    ble.stopScan();
                    throw new Error('Error scanning Bluetooth LE for device.');
                  });
              }, () => {
                  throw new Error('Bluetooth LE is not enabled.');
              });                        
          }
      } catch (e) {
          if (window.cordova) {
              setTimeout(() => {
                  store.dispatch(connectBle(store));
                }, 
                2000);
                console.log('No Bluetooth LE available.  Trying again in a couple seconds.');
                // resolve({ deviceId: '', characteristics: [] });
          }
      }
  });

  blePromise.then(({deviceId, characteristics}) => {
    if (deviceId !== '') {
        bleSettings.deviceId = deviceId;
        bleSettings.characteristics = characteristics;
        // tslint:disable-next-line:forin
        characteristics.forEach(characteristic => {
            ble.startNotification(
                bleSettings.deviceId, 
                EMConstants.EM_SERVICE_UUID,
                characteristic,
                (rawData: ArrayBuffer) => {
                    const s = arrayBufferToString(rawData);
                    store.dispatch(
                        JSON.parse(s)
                    );
                },
                () => {
                    store.dispatch({
                        error: 'Error starting bluetooth notification',
                        type: 'PINAIL/ERROR'
                    });
                }
            );
        });

        store.dispatch(updateBleConnection(1));
        store.dispatch(getProfiles());
//      api.dispatch(getSettings());
    }
  });

  return blePromise;
};
