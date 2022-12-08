import { IWidget } from '../types/IWidget';

const onSource = function (this: IWidget) {
  console.log('on source');
};

export { onSource };
