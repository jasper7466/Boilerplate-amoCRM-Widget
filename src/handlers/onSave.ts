import { IWidget } from '../types';

const onSave = function (this: IWidget) {
  console.log('on save');
};

export { onSave };
