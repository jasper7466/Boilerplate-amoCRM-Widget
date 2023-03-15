import { IWidgetExtended } from './../interfaces/widget-extended.interface';

const onAddAsSource = function (this: IWidgetExtended, pipelineId: number) {
  console.log('on add as source');
  console.log(`pipeline id: ${pipelineId}`);
};

export { onAddAsSource };
