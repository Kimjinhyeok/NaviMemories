import axios, {AxiosResponse, AxiosRequestConfig} from 'axios';
import { ServerUrl } from '../Data/url'
/**
 * @typedef {Object} httpPraram
 * @property {String} query
 * @property {Object} data
 * @property {AxiosRequestConfig} options
 */

axios.defaults.baseURL = ServerUrl;

export default function Http() {

  const http = axios.create({
    timeout : 10000
  });

  function dataToQuery(params) {
    var query = "?";
    for(var itr in params) {
      query += `${itr}=${params[itr]}&`;
    }
    return query;
  }
  /**
   * 
   * @param {httpPraram} params 
   * @returns {AxiosResponse}
   */
  async function post(params) {
    var { query, data } = params;
    var options = params.options ? params.options : {withCredentials : true};
    try {
      var result = await http.post(`${ServerUrl}/${query}`, data, options);
      if(result instanceof Error) {
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
  async function get(params) {
    var { query, data } = params;
    var options = params.options ? params.options : {withCredentials : true};
    if(data) {
      query+= dataToQuery(data);
    }
    try {
      var result = await http.get(`${ServerUrl}/${query}`, options);
      if(result instanceof Error) {
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
  async function put(params) {
    var { query, data } = params;
    var options = params.options ? params.options : {withCredentials : true};
    try {
      var result = await http.put(`${ServerUrl}/${query}`, data, options);
      if(result instanceof Error) {
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
  async function del(params) {
    var { query, data } = params;
    var options = params.options ? params.options : {withCredentials : true};
    if(data) {
      query += dataToQuery(data);
    }
    try {
      var result = await http.delete(`${ServerUrl}/${query}`, options);
      if(result instanceof Error) {
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
  return ({
    post,
    get,
    put,
    delete : del,
    setHeader,
    removeHeader
  })
}