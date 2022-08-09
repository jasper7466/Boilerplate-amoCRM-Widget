import $ from 'jquery';

export const onEvent = function (
  event: string,
  selector: string,
  callback: () => void,
) {
  $(document).off(event, selector).on(event, selector, callback);
};
