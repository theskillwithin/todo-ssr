import HttpError from './HttpError';
import ValidationError from './ValidationError';

export default class HttpRequest {
  /*static delete(endpoint, params, headers) {
    return request(endpoint, params, headers, 'delete');
  }*/

  static get(endpoint, headers) {
    return request(endpoint, undefined, headers, 'get');
  }

  /*static patch(endpoint, params, headers) {
    return request(endpoint, params, headers, 'patch');
  }*/

  static post(endpoint, params, headers) {
    return request(endpoint, params, headers, 'post');
  }

  /*static update(endpoint, params, headers) {
    return request(endpoint, params, headers, 'update');
  }*/
}

const request = async (endpoint, params={}, headers={}, method) => {
  headers = new Headers(headers);

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  params = JSON.stringify(params);

  const body = params === '{}' ? null : params;
  const mode = 'cors';
  const options = {body, headers, method, mode};

  const response = await fetch(`http://localhost:8080/${endpoint}`, options);
  const json = await response.json();

  if (response.ok) {
    return json;
  } else if (json.invalidations && json.invalidations.length > 0) {
    throw new ValidationError(json.invalidations);
  } else {
    throw new HttpError('Network response was not ok.', response.status);
  }
};
