import {DBSchema} from 'idb';

export interface MyDB extends DBSchema {
  'post-store': {
    key: string;
    value: string;
  };
}
