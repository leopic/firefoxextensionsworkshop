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

var WikipediaPlus = {
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
        /\.wikipedia\.org$/.test(this._doc.location.hostname)) {
      this.log("Found wikipedia page.");

      this._doc.getElementById("mw-panel").hidden = true;
      this._doc.getElementById("p-logo").hidden = true;
      this._doc.getElementById("content").
        setAttribute("style", "margin-left: 1em !important");

      sendAsyncMessage("wikipediaplus-done", { title : this._doc.title });
    }
  },

  log : function (aText) {
    this._doc.defaultView.console.log(aText);
  }
};

var WikipediaPlusListener = function(aEvent) { WikipediaPlus.run(aEvent); };

addEventListener("load", WikipediaPlusListener, true);

addMessageListener(
  "wikipediaplus-unload",
  function(aMessage) {
    removeEventListener("load", WikipediaPlusListener, true);
  });
