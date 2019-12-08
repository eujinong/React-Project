import QueryString from 'qs';

const RestApi = {
  get: (url, params = {}, headers = {}) => {
    const realHeaders = { ...headers };
    const queryString = QueryString.stringify(params, { addQueryPrefix: true });
    const realURL = `${url}${queryString}`;
    return fetch(realURL, {
      method: 'GET',
      headers: realHeaders
    });
  },
  post: (url, params = {}, headers = {}) => {
    if (headers['Content-Type'] && headers['Content-Type'] === 'application/json') {
      return fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(params)
      });
    }

    const realHeaders = {
      ...headers,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return fetch(url, {
      method: 'POST',
      headers: realHeaders,
      body: QueryString.stringify(params, { addQueryPrefix: false })
    });
  },
  put: (url, params = {}, headers = {}) => {
    if (headers['Content-Type'] && headers['Content-Type'] === 'application/json') {
      return fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(params)
      });
    }

    const realHeaders = {
      ...headers,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return fetch(url, {
      method: 'PUT',
      headers: realHeaders,
      body: QueryString.stringify(params, { addQueryPrefix: false })
    });
  },
  delete: (url, params = {}, headers = {}) => {
    const realHeaders = { ...headers };
    const queryString = QueryString.stringify(params, { addQueryPrefix: true });
    const realURL = `${url}${queryString}`;
    return fetch(realURL, {
      method: 'DELETE',
      headers: realHeaders
    });
  },
  upload: (url, formData, headers = {}) => (
    fetch(url, {
      method: 'POST',
      body: formData,
      headers
    })
  )
};

export default RestApi;
