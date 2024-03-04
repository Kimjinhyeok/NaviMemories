import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { ServerUrl } from "../Data/url";
/**
 * @typedef {Object} httpPraram
 * @property {String} query
 * @property {Object} data
 * @property {AxiosRequestConfig} options
 */

axios.defaults.baseURL = ServerUrl;

export default function Http() {
  const http = axios.create({
    timeout: 10000,
  });

  function dataToQuery(params) {
    var query = "?";
    for (var itr in params) {
      query += `${itr}=${params[itr]}&`;
    }
    return query;
  }
  /**
   *
   * @param {httpPraram} params
   * @returns {AxiosResponse}
   */
  async function post(url, params={ data: {}, options : {} }) {
    var { data } = params;
    var options = params.options ? params.options : { withCredentials: true };
    try {
      var result = await http.post(`${ServerUrl}/${url}`, data, options);
      if (result instanceof Error) {
        throw result;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {httpPraram} params
   * @returns
   */
  async function get(url = "", params = { data: {}, options: {} }) {
    const { data } = params;
    var options = params.options ? params.options : { withCredentials: true };
    if (data) {
      url += dataToQuery(data);
    }
    try {
      var result = await http.get(`${ServerUrl}/${url}`, options);
      if (result instanceof Error) {
        throw result;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {httpPraram} params
   * @returns
   */
  async function put(url, params={ data: {}, options : {} }) {
    const { data } = params;
    var options = params.options ? params.options : { withCredentials: true };
    try {
      var result = await http.put(`${ServerUrl}/${url}`, data, options);
      if (result instanceof Error) {
        throw result;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {httpPraram} params
   * @returns
   */
  async function del(url, params={ data: {}, options : {} }) {
    const { data } = params;
    var options = params.options ? params.options : { withCredentials: true };
    if (data) {
      url += dataToQuery(data);
    }
    try {
      var result = await http.delete(`${ServerUrl}/${url}`, options);
      if (result instanceof Error) {
        throw result;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  function setHeader(headerName, headerValue) {
    axios.defaults.headers.common[headerName] = headerValue;
  }
  function removeHeader(headerName) {
    axios.defaults.headers.common[headerName] = undefined;
  }
  return {
    post,
    get,
    put,
    delete: del,
    setHeader,
    removeHeader,
  };
}
