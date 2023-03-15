import { IWidgetExtended } from './../interfaces/widget-extended.interface';

const destroy = function (this: IWidgetExtended) {
  console.log('destroy');
};

export { destroy };
