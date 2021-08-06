import React from 'react'
import Cookies from 'js-cookie'

/**
 * @typedef page_options
 * @property {Boolean} collapseDrawer
 * @property {String} bibleVersion 
 */

 const INIT_CONFIG = {
  collapseDrawer : false,
  userName : "",
  bibleVersion : true
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
      Cookies.set(configCookieName, configCookie);
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
    Cookies.set(configCookieName, configCookie);
  }

  function reset() {
    Cookies.remove(authCookieName);
    Cookies.remove(configCookieName);
  }

  init();
  return {
    get,
    set,
    reset
  }
})()