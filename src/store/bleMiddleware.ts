import { Dispatch, Store } from 'redux';
import { arrayBufferToString, stringToArrayBuffer } from '../helpers/arrayBuffer';
import { updateBleConnection, completeBleReadRequest, getProfiles } from '../modules/enailMagic';
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
            action.connectionPromise = connectBle(store);
            break;
        }

        default: {
            if (typeof action.type === "string") {
                if ((action.type as string).startsWith(EMConstants.EM_FROMCLIENT_PREFIX)) {
                    ble.writeWithoutResponse(
                        bleSettings.deviceId, EMConstants.EM_SERVICE_UUID, action.uuid, 
                        stringToArrayBuffer(JSON.stringify(
                            action
                        ))
                    );
                } else if ((action.type as string) === EMConstants.EM_READBLE_REQUEST) {
                    readBleData(store, action.uuid);
                }
            }
        }
    }

    const result = next(action);
    return result;
};

const readBleData = (store: Store<IEMStore>, uuid: string) => {
    ble.read(bleSettings.deviceId, EMConstants.EM_SERVICE_UUID, uuid, (rawData: ArrayBuffer) => {
        const s = arrayBufferToString(rawData);
        const obj: { type: string, value: any} = JSON.parse(s);
        store.dispatch(completeBleReadRequest(uuid, obj.value));
        
    });
}

const connectBle = (store: Store<IEMStore>): Promise<{deviceId: string, characteristics: string[]}> => {
    const blePromise: Promise<{deviceId: string, characteristics: string[]}> = new Promise<{deviceId: string, characteristics: string[]}>((resolve, reject) => {
      try {
          if (!ble) {
              throw new Error('No Bluetooth LE available.');
          } else {
              ble.isEnabled(() => {
                  ble.startScan([EMConstants.EM_SERVICE_UUID], (data: BLECentralPlugin.PeripheralData) => {
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
                      throw new Error('Error scanning Bluetooth LE for device.');
                  });
              }, () => {
                  throw new Error('Bluetooth LE is not enabled.');
              });                        
          }
      } catch (e) {
          console.log(`No Bluetooth LE available: ${e.message}`);
          resolve({ deviceId: '', characteristics: [] });
      }
  });

  blePromise.then(({deviceId, characteristics}) => {
    if (deviceId !== '') {
      bleSettings.deviceId = deviceId;
      bleSettings.characteristics = characteristics;
      for (const characteristic in bleSettings.characteristics) {
        if (!!!characteristic)  {
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
        }
      }

      store.dispatch(updateBleConnection(1));
      store.dispatch(getProfiles());
//      api.dispatch(getSettings());
    }
  });

  return blePromise;
};
