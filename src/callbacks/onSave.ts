import { IWidget } from '../types/IWidget';

const onSave = function (this: IWidget) {
  console.log('on save');
};

export { onSave };
