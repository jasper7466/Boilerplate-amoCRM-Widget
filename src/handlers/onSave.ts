import { IWidget } from '../Types/IWidget';

const onSave = function (this: IWidget) {
  console.log('on save');
};

export { onSave };
