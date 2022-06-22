define([], function () {
  return function (pipelineId) {
    console.log('on add as source');
    console.log(`pipeline id: ${pipelineId}`);
  };
});
