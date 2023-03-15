import { IWidgetExtended } from './../interfaces/widget-extended.interface';

const onSource = function (this: IWidgetExtended) {
  console.log('on source');
};

export { onSource };
