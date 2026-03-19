// SPDX-License-Identifier: LGPL-3.0-only
// Copyright (C) 2026 Simone Malacarne
// ThunderPEC-ng — https://github.com/ghastx/thunderpec-ng

/**
 * Background Script (Event Page)
 *
 * Non-persistent Event Page: loaded on-demand, unloaded when idle.
 * All state must be persisted via browser.storage.local.
 */

const MENU_ID_ROOT = "thunderpec-ng-tools-menu";

/**
 * Create the ThunderPEC-ng entry in the Tools menu.
 */
function registerMenus() {
  browser.menus.create({
    id: MENU_ID_ROOT,
    title: "ThunderPEC-ng",
    contexts: ["tools_menu"],
  });
}

// Register menus on install/update.
browser.runtime.onInstalled.addListener((details) => {
  console.log(`ThunderPEC-ng: onInstalled (reason: ${details.reason})`);
  registerMenus();
});

// Re-register menus on browser startup (Event Page pattern).
browser.runtime.onStartup.addListener(() => {
  console.log("ThunderPEC-ng: onStartup");
  registerMenus();
});

// Handle menu clicks.
browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === MENU_ID_ROOT) {
    console.log("ThunderPEC-ng: menu clicked (placeholder)");
  }
});

console.log("ThunderPEC-ng: background script loaded");
