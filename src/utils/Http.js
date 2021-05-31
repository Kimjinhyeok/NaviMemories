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
    timeout : 2500
  });

  function dataToQuery(params) {
    var query = "?";
    for(var itr in params) {
      query += `${itr}=${params[itr]}`;
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
      return result;
    } catch (error) {
      return error;
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
      return result;
    } catch (error) {
      return error;
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
      return result;
    } catch (error) {
      return error;
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
      return result;
    } catch (error) {
      return error;
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