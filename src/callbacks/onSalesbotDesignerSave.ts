import { IWidgetExtended } from './../interfaces/widget-extended.interface';

const onSalesbotDesignerSave = function (
  this: IWidgetExtended,
  handlerCode: any,
  params: any,
) {
  console.log('on sales bot designer save');
  console.log(`handler code: ${handlerCode}`);
  console.log(`params: ${params}`);
};

export { onSalesbotDesignerSave };
