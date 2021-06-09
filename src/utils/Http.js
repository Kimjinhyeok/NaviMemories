import axios, {AxiosResponse} from 'axios';
import { ServerUrl } from '../Data/url'
/**
 * @typedef {Object} httpPraram
 * @property {String} query
 * @property {Object} data
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
    try {
      var result = await http.post(`${ServerUrl}/${query}`, data);
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
    if(data) {
      query+= dataToQuery(data);
    }
    try {
      var result = await http.get(`${ServerUrl}/${query}`);
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
    try {
      var result = await http.put(`${ServerUrl}/${query}`, data);
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
    if(data) {
      query += dataToQuery(data);
    }
    try {
      var result = await http.delete(`${ServerUrl}/${query}`);
      if(result instanceof Error) {
        throw result;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  function setHeader(headerName, headerValue) {
    http.defaults.headers.common[headerName] = headerValue
  }
  function removeHeader(headerName) {
    http.defaults.headers.common[headerName] = undefined;
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