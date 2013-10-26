/**
 * Copyright 2013 Jorge Villalobos
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

"use strict";

var EXPORTED_SYMBOLS = [ "Utils" ];

const Cc = Components.classes;
const Ci = Components.interfaces;

Components.utils.import("resource://gre/modules/Services.jsm");

let Utils = {
  /**
   * Logs a message to the console.
   * @param aMessage the message to log.
   */
  log : function(aMessage) {
    Services.console.logStringMessage(aMessage);
  },

  /**
   * Loads a global userscript.
   * @param aURL the chrome URL pointing to the script.
   */
  loadUserscript : function(aURL) {
    let gmm =
      Cc["@mozilla.org/globalmessagemanager;1"].
        getService(Ci.nsIMessageListenerManager);

    gmm.loadFrameScript(aURL, true);
  },

  /**
   * Unloads a global userscript. Note that this doesn't deactivate loaded
   * userscripts this needs to be done manually.
   * @param aURL the chrome URL pointing to the script.
   */
  unloadUserscript : function(aURL) {
    let gmm =
      Cc["@mozilla.org/globalmessagemanager;1"].
        getService(Ci.nsIMessageListenerManager);

    gmm.removeDelayedFrameScript(aURL);
  },

  /**
   * Adds a global message listener.
   * @param aMessageName the name of the message to listen to.
   * @param aListener the listener function.
   */
  addMessageListener : function(aMessageName, aListener) {
    let gmm =
      Cc["@mozilla.org/globalmessagemanager;1"].
        getService(Ci.nsIMessageListenerManager);

    gmm.addMessageListener(aMessageName, aListener);
  },

  /**
   * Removes a global message listener.
   * @param aMessageName the name of the message to listen to.
   * @param aListener the listener function.
   */
  removeMessageListener : function(aMessageName, aListener) {
    let gmm =
      Cc["@mozilla.org/globalmessagemanager;1"].
        getService(Ci.nsIMessageListenerManager);

    gmm.removeMessageListener(aMessageName, aListener);
  },

  /**
   * Sends a message to all userscripts.
   * @param aMessageName the name of the message.
   * @param aJSONMessage (optional) a JSON object with the message contents.
   */
  messageAllUserscripts : function(aMessageName, aJSONMessage) {
    let gmm =
      Cc["@mozilla.org/globalmessagemanager;1"].
        getService(Ci.nsIMessageBroadcaster);

    gmm.broadcastAsyncMessage(aMessageName, aJSONMessage);
  },

  /**
   * Loads a library into a content window.
   * @param aURL the chrome URL of the library script.
   * @param aContentWin the content window to load it into.
   */
  loadLibrary : function(aURL, aContentWin) {
    Services.scriptloader.loadSubScript(aURL, aContentWin);
  }
};
