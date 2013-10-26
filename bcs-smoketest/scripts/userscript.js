/**
 * Copyright 2013 leo picado
**/

"use strict";

var smoketest = {
  _doc : null,

  /**
   * Runs the content script on this page.
   * @param aEvent the load event fired from the page.
   */
  run : function(aEvent) {
    this._doc = aEvent.originalTarget;
    this.log("Page loaded.");

    if ((null != this._doc) && (null != this._doc.location) &&
        (null != this._doc.location.hostname) &&
        /\.google\.com$/.test(this._doc.location.hostname)) {
      this.log("Found wikipedia page.");

      let win = this._doc.defaultView;
      let unsafeWin = win.wrappedJSObject;
      let dummyDOM;

      // utils
      Components.utils.import("chrome://smoketest-lib/content/utils.js");

      // ext library
      Utils.loadLibrary("chrome://smoketest-scripts/content/jquery.min.js", win);
      Utils.loadLibrary("chrome://smoketest-scripts/content/underscore-min.js", win);

      unsafeWin.$('body').html(unsafeWin._.VERSION);

      //unsafeWin.$("#mw-panel").hide();
      //unsafeWin.$("#p-logo").hide();
      //unsafeWin.$("#content").css("margin-left", "1em");
      //$('');

      sendAsyncMessage("smoketest-done", { title : this._doc.title });
    }
  },

  log : function (aText) {
    this._doc.defaultView.console.log(aText);
  }
};

var smoketestListener = function(aEvent) { smoketest.run(aEvent); };

addEventListener("load", smoketestListener, true);

addMessageListener(
  "smoketest-unload",
  function(aMessage) {
    removeEventListener("load", smoketestListener, true);
});