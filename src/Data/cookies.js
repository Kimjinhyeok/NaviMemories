import React from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';

/**
 * @typedef page_options
 * @property {Boolean} collapseDrawer
 * @property {String} bibleVersion 
 */

 const INIT_CONFIG = {
  collapseDrawer : true,
  userName : "",
  bibleVersion : true // true : 개정개역, false : 개역한글
}

export default (function() {

  const authCookieName = 'authtoken';
  const configCookieName = 'configCookie';
  var authCookie = null;
  var configCookie = null;

  function init() {
    authCookie = Cookies.get(authCookieName);
    configCookie = Cookies.get(configCookieName);

    if(!configCookie) {
      configCookie = INIT_CONFIG;
      if(authCookie) {
        let decoded = jwtDecode(authCookie);
        let {u_n : userName} = decoded;
        configCookie.userName = userName;
      }
      Cookies.set(configCookieName, JSON.stringify(configCookie));
    } else {
      configCookie = JSON.parse(configCookie);
    }
  }
  
  /**
   * 
   * @param {('collapseDrawer'|'userName'|'bibleVersion')} property 
   * @returns {(String|Boolean)}
   */
  function get(property) {
    return configCookie[property];
  }

  /**
   * 
   * @param {('collapseDrawer'|'userName'|'bibleVersion')} property 
   * @param {String}
   * @returns {Null}
   */
  function set(property, value) {
    configCookie[property] = value;
    Cookies.set(configCookieName, JSON.stringify(configCookie));
  }

  function reset() {
    Cookies.remove(authCookieName);
    Cookies.remove(configCookieName);
  }

  function isLogin() {
    try {

      let decoded = jwtDecode(authCookie) ? true : false;
      return decoded
    } catch (error) {
      return false;
    }
  }

  init();
  return {
    get,
    set,
    reset,
    isLogin
  }
})()