import { IWidget } from '../types/IWidget';

const onSalesbotDesignerSave = function (
  this: IWidget,
  handlerCode: any,
  params: any,
) {
  console.log('on sales bot designer save');
  console.log(`handler code: ${handlerCode}`);
  console.log(`params: ${params}`);
};

export { onSalesbotDesignerSave };
