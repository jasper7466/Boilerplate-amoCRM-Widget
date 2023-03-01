import { Indexed } from '../types/common';

export type Options = {
  data?: any;
  headers?: Object;
  timeout?: number;
};

type RequestOptions = {
  headers?: Object;
  data?: any;
  method: string;
};

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

function queryStringify(data: Indexed<string>) {
  return Object.entries(data).reduce((res, [key, value]) => {
    return `${res}${key}=${value}&`;
  }, '?');
}

export class HTTPTransport {
  constructor(readonly _baseURL: string) {}

  get = (url: string, options: Options = {}) => {
    if (options.data) url += queryStringify(options.data);
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  post = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  put = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  delete = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request = (
    url: string,
    options: RequestOptions,
    timeout = 5000
  ): Promise<any> => {
    const { headers = {}, method, data } = options;
    url = `${this._baseURL}${url}`;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onload = () => {
        if (xhr.status < 400) {
          resolve(xhr);
        } else {
          reject(xhr);
        }
      };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.timeout = timeout;
      xhr.withCredentials = true;
      xhr.responseType = 'json';

      const headersEntries = Object.entries(headers);
      if (headersEntries.length)
        headersEntries.forEach((header) =>
          xhr.setRequestHeader(header[0], header[1])
        );

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
