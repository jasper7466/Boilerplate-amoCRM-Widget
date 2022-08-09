import { IWidget } from '../types/IWidget';

const onAddAsSource = function (this: IWidget, pipelineId: number) {
  console.log('on add as source');
  console.log(`pipeline id: ${pipelineId}`);
};

export { onAddAsSource };
