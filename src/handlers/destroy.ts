import { IWidget } from '../Types/IWidget';

const destroy = function (this: IWidget) {
  console.log('destroy');
};

export { destroy };
