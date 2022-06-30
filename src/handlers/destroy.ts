import { IWidget } from '../types';

const destroy = function (this: IWidget) {
  console.log('destroy');
};

export { destroy };
