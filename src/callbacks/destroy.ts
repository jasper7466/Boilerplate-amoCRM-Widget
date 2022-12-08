import { IWidget } from '../types/IWidget';

const destroy = function (this: IWidget) {
  console.log('destroy');
};

export { destroy };
