/**
 * Copyright 2013 leo picado
 **/

"use strict";

function install(aData, aReason) {}

function uninstall(aData, aReason) {}

function startup(aData, aReason) {
  Components.utils.import("chrome://smoketest-lib/content/utils.js");

  Utils.loadUserscript("chrome://smoketest-scripts/content/userscript.js");
  Utils.log("Loaded userscript.");

  Utils.addMessageListener("smoketest-done", doneWithPage);
}

function shutdown(aData, aReason) {
  Utils.removeMessageListener("smoketest-done", doneWithPage);

  Utils.messageAllUserscripts("smoketest-unload");
  Utils.unloadUserscript("chrome://smoketest-scripts/content/userscript.js");
  Utils.log("Unloaded userscripts.");

  Components.utils.unload("chrome://smoketest-lib/content/utils.js");
}

function doneWithPage(aMessage) {
  Utils.log("Finished with page: " + aMessage.data.title);
}
