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

function install(aData, aReason) {}

function uninstall(aData, aReason) {}

function startup(aData, aReason) {
  Components.utils.import("chrome://wikipediaplus-lib/content/utils.js");

  Utils.loadUserscript("chrome://wikipediaplus-scripts/content/userscript.js");
  Utils.log("Loaded userscript.");

  Utils.addMessageListener("wikipediaplus-done", doneWithPage);
}

function shutdown(aData, aReason) {
  Utils.removeMessageListener("wikipediaplus-done", doneWithPage);

  Utils.messageAllUserscripts("wikipediaplus-unload");
  Utils.unloadUserscript("chrome://wikipediaplus-scripts/content/userscript.js");
  Utils.log("Unloaded userscripts.");

  Components.utils.unload("chrome://wikipediaplus-lib/content/utils.js");
}

function doneWithPage(aMessage) {
  Utils.log("Finished with page: " + aMessage.data.title);
}
