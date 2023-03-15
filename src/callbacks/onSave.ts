import { IWidgetExtended } from './../interfaces/widget-extended.interface';

const onSave = function (this: IWidgetExtended) {
  console.log('on save');
};

export { onSave };
