/*--------------------------------------------------------------
>>> BACKGROUND
----------------------------------------------------------------
# webRequest.onBeforeRequest
# Locale
# IMPORTING OLD SETTINGS
# Context menu
# Tab focus/blur
# Message listener
# Uninstall URL
--------------------------------------------------------------*/
/*
// For Manifest3:
/*-----# Persistent Serviceworker:
		"Manifest2 Background.js"-----*/
// Periodic "keep-alive" message every 29.5 seconds
// const keepAliveInterval = setInterval(() => chrome.runtime.sendMessage({ status: 'keep-alive' }), 29.5 * 1000);

/* Sidepanel Option
  chrome.storage.local.get('improvedTubeSidePanel', function (result) {
	if ( result.improvedTubeSidePanel && result.improvedTubeSidePanel === true) {
		chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
	} else {chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false }) }
  });
*/
/*---------------------------
# IMPORTING OLD (renamed) SETTINGS   (Each one is mostly needed once, but fine to stay unlimited. Legacy.)
-----------------------------*/
chrome.runtime.onInstalled.addListener(function (installed) {
	if (installed.reason == 'update') {
		//		var thisVersion = chrome.runtime.getManifest().version;
		//		console.log("Updated from " + installed.previousVersion + " to " + thisVersion + "!");
		chrome.storage.local.get('description', function (result) {
			if (result.description === 'classic_expanded') {
				chrome.storage.local.set({description: 'expanded'});
			}
		});		
		// Shortcut renames:
		chrome.storage.local.get(['shortcut_auto', 'shortcut_144p', 'shortcut_240p', 'shortcut_360p', 'shortcut_480p', 'shortcut_720p', 'shortcut_1080p', 'shortcut_1440p', 'shortcut_2160p', 'shortcut_2880p', 'shortcut_4320p'], function (result) {
			// validate and move to new name
			for (let [name, keys] of Object.entries(result)) {
				if (!keys) continue;
				let newKeys = {},
					newName = name.replace('shortcut_', 'shortcut_quality_');
				for (const button of ['alt', 'ctrl', 'shift', 'wheel', 'toggle']) {
					if (keys[button]) newKeys[button] = keys[button];
				}
				if (keys['keys'] && Object.keys(keys['keys'])?.length) {
					newKeys['keys'] = keys['keys'];
				}
				// only shortcuts with Key of Wheel are valid and saved
				if (newKeys['keys'] || newKeys['wheel']) chrome.storage.local.set({[newName]: newKeys});
			}
			chrome.storage.local.remove(Object.keys(result));
		});
		chrome.storage.local.get(['volume_step', 'playback_speed_step'], function (result) {
			for (let [name, value] of Object.entries(result)) {
				let newName = 'shortcuts_' + name;
				chrome.storage.local.set({[newName]: value});
			}
			chrome.storage.local.remove(Object.keys(result));
		});
		chrome.storage.local.get('player_autoplay', function (result) {
			if (result.player_autoplay === false) {
				chrome.storage.local.set({player_autoplay_disable: true});
				chrome.storage.local.remove(['player_autoplay']);
			}
		});
		chrome.storage.local.get('channel_default_tab', function (result) {
			if (result.channel_default_tab === '/home') {
				chrome.storage.local.set({channel_default_tab: '/'});
			}
		});
		chrome.storage.local.get('player_quality', function (result) {
			if (result.player_quality === 'auto') {
				chrome.storage.local.get('player_quality_auto', function (result) {
					if (result.player_quality_auto !== 'migrated') {
						chrome.storage.local.set({player_quality: 'disabled'});
						chrome.storage.local.set({player_quality_auto: 'migrated'});
					}
				});
			}
		});
		chrome.storage.local.get('hideSubscribe', function (result) {
			if (result.hideSubscribe === true) {
				chrome.storage.local.set({subscribe: 'hidden'});
				chrome.storage.local.remove(['hideSubscribe']);
			}
		});
		chrome.storage.local.get('limit_page_width', function (result) {
			if (result.limit_page_width === false) {
				chrome.storage.local.set({no_page_margin: true});
				chrome.storage.local.remove(['limit_page_width']);
				chrome.storage.local.get('player_size', function (r) {
					if (r.player_size == 'full_window' || r.player_size == 'fit_to_window') {
						chrome.storage.local.set({player_size: 'max_width'});
					}
				});
			}
		});
		chrome.storage.local.get('comments_sidebar_simple', function (result) {
			if (result.comments_sidebar_simple === true) {
				chrome.storage.local.set({comments_sidebar_simple: true});
			}
		});
		chrome.storage.local.get('hide_animated_thumbnails', function (result) {
			if (result.hide_animated_thumbnails === true) {
				chrome.storage.local.set({hide_animated_thumbnails: true});
			}
		});
		chrome.storage.local.get('hide_cards', function (result) {
			if (result.hide_cards === true) {
				chrome.storage.local.set({hide_cards: true});
			}
		});
		chrome.storage.local.get('hide_comments', function (result) {
			if (result.hide_comments === true) {
				chrome.storage.local.set({hide_comments: true});
			}
		});
		chrome.storage.local.get('hide_comments_count', function (result) {
			if (result.hide_comments_count === true) {
				chrome.storage.local.set({hide_comments_count: true});
			}
		});
		chrome.storage.local.get('hide_details', function (result) {
			if (result.hide_details === true) {
				chrome.storage.local.set({hide_details: true});
			}
		});
		chrome.storage.local.get('hide_views_count', function (result) {
			if (result.hide_views_count === true) {
				chrome.storage.local.set({hide_views_count: true});
			}
		});
		chrome.storage.local.get('hide_date', function (result) {
			if (result.hide_date === true) {
				chrome.storage.local.set({hide_date: true});
			}
		});
		chrome.storage.local.get('hide_share_button', function (result) {
			if (result.hide_share_button === true) {
				chrome.storage.local.set({hide_share_button: true});
			}
		});
		chrome.storage.local.get('hide_save_button', function (result) {
			if (result.hide_save_button === true) {
				chrome.storage.local.set({hide_save_button: true});
			}
		});
		chrome.storage.local.get('hide_more_button', function (result) {
			if (result.hide_more_button === true) {
				chrome.storage.local.set({hide_more_button: true});
			}
		});
		chrome.storage.local.get('hide_download_button', function (result) {
			if (result.hide_download_button === true) {
				chrome.storage.local.set({hide_download_button: true});
			}
		});
		chrome.storage.local.get('hide_clip_button', function (result) {
			if (result.hide_clip_button === true) {
				chrome.storage.local.set({hide_clip_button: true});
			}
		});
		chrome.storage.local.get('hide_thanks_button', function (result) {
			if (result.hide_thanks_button === true) {
				chrome.storage.local.set({hide_thanks_button: true});
			}
		});
		chrome.storage.local.get('hide_dislike_button', function (result) {
			if (result.hide_dislike_button === true) {
				chrome.storage.local.set({hide_dislike_button: true});
			}
		});
		chrome.storage.local.get('hide_report_button', function (result) {
			if (result.hide_report_button === true) {
				chrome.storage.local.set({hide_report_button: true});
			}
		});
		chrome.storage.local.get('hide_ai_summary', function (result) {
			if (result.hide_ai_summary === true) {
				chrome.storage.local.set({hide_ai_summary: true});
			}
		});
	} else if (installed.reason == 'install') {
		if (navigator.userAgent.indexOf("Firefox") != -1) {
			chrome.storage.local.set({below_player_pip: false})
		}
		if (navigator.userAgent.indexOf('Safari') !== -1
		   && (!/Windows|Chrom/.test(navigator.userAgent)
			   || /Macintosh|iPhone/.test(navigator.userAgent))) {
			chrome.storage.local.set({below_player_pip: false})
			// still needed? (are screenshots broken in Safari?):
			chrome.storage.local.set({below_player_screenshot: false})
		}
		// console.log('Thanks for installing!');
	}
});
/*--------------------------------------------------------------
# LOCALE
--------------------------------------------------------------*/
function getLocale (language, callback) {
	language = language.replace('-', '_');
	fetch('_locales/' + language.substring(0, 2) + '/messages.json').then(function (response) {
		if (response.ok) {
			response.json().then(callback);
		} else {
			fetch('_locales/' + language.substring(0, 2) + '/messages.json').then(function (response) {
				if (response.ok) {
					response.json().then(callback);
				} else {
					getLocale('en', callback);
				}
			}).catch(function () { getLocale('en', callback); });
			getLocale('en', callback);
		}
	}).catch(function () {
		getLocale('en', callback);
	});
}
/*--------------------------------------------------------------
# CONTEXT MENU
--------------------------------------------------------------*/
function updateContextMenu (language) {
	if (!language || language === 'default') language = chrome.i18n.getUILanguage();
	getLocale(language, function (response) {
		const items = [
			'donate',
			'rateMe',
			'GitHub'
		];
		chrome.contextMenus.removeAll();

		for (const [index, item] of items.entries()) {
			const text = response?.[item]?.message || item;

			chrome.contextMenus.create({
				id: String(index),
				title: text,
				contexts: ['action'] //manifest3
				// contexts: ['browser_action'] //manifest2
			});
		}
		chrome.contextMenus.onClicked.addListener(function (info) {
			const links = [
				'https://www.improvedtube.com/donate',
				'https://chrome.google.com/webstore/detail/improve-youtube-video-you/bnomihfieiccainjcjblhegjgglakjdd',
				'https://github.com/code4charity/YouTube-Extension'
			];
			chrome.tabs.create({ url: links[info.menuItemId] }); //manifest3
			// window.open(links[info.menuItemId]); //manifest2
		});
	});
}
chrome.runtime.onInstalled.addListener(function () {
	chrome.storage.local.get(function (items) {
		updateContextMenu(items.language);
	});
});

chrome.storage.onChanged.addListener(function (changes) {
	if (changes?.language) updateContextMenu(changes.language.newValue);
	if (changes?.improvedTubeSidebar) chrome.sidePanel.setPanelBehavior({openPanelOnActionClick: changes.language.newValue});

	// Listen for hide_ai_summary changes and notify tabs
	if (changes?.hide_ai_summary) {
		// Query only active YouTube tabs and send the message
		chrome.tabs.query({ url: "*://www.youtube.com/*" }, (tabs) => {
			for (const tab of tabs) {
				// Check if the tab is likely still connected (optional but good practice)
				if (tabConnected[tab.id]) {
					chrome.tabs.sendMessage(tab.id, { action: 'apply-hide-ai-summary' }).catch(error => console.log(`Could not send message to tab ${tab.id}: ${error.message}`)); // Add catch for potentially closed tabs
				}
			}
		});
	}
});
/*--------------------------------------------------------------
# TAB Helper, prune stale connected tabs
--------------------------------------------------------------*/
let tabConnected = {},
	tab = {},
	tabPrev = {},
	windowId;

function tabPrune (callback) {
	chrome.tabs.query({ url: 'https://www.youtube.com/*' }).then(function (tabs) {
		let tabIds = [];
		for (let tab of tabs) {
			if (!tab.discarded && tabConnected[tab.id]) {
				tabIds.push(tab.id);
			}
		}
		for (let id in tabConnected) {
			if (!tabIds.includes(Number(id))) {
				delete tabConnected[id];
			}
		}
		callback();
	}, function () { console.log("Error querying Tabs") });
};
/*--------------------------------------------------------------
# TAB FOCUS/BLUR
 commented out console.log left intentionally, to help understand
 https://issues.chromium.org/issues/41116352
--------------------------------------------------------------*/
chrome.tabs.onActivated.addListener(function (activeInfo) {
	tabPrev = tab;
	tab = activeInfo;
	//console.log('activeInfo', windowId, tabPrev, tab);
	tabPrune(function () {
		if (windowId == tabPrev.windowId) {
			if (tabConnected[tabPrev.tabId]) {
				chrome.tabs.sendMessage(tabPrev.tabId, {action: 'blur'});
				//console.log('tabIdPrev', tabPrev.tabId);
			}
			if (tabConnected[tab.tabId]) {
				chrome.tabs.sendMessage(tab.tabId, {action: 'focus'});
				//console.log('tabId', tab.tabId);
			}
		}
	});
});
chrome.windows.onFocusChanged.addListener(function (wId) {
	windowId = wId;
	//console.log('onFocusChanged', windowId, tabPrev, tab);
	tabPrune(function () {
		if (windowId != tab.windowId && tab.tabId && !tab.blur && tabConnected[tab.tabId]) {
			tab.blur = true;
			chrome.tabs.sendMessage(tab.tabId, {action: 'blur'});
			//console.log('blur', tab.tabId, windowId);
		} else if (windowId == tab.windowId && tab.tabId && tab.blur && tabConnected[tab.tabId]) {
			tab.blur = false;
			chrome.tabs.sendMessage(tab.tabId, {action: 'focus'});
			//console.log('focus', tab.tabId, windowId);
		}
	});
});
/*--------------------------------------------------------------
# MESSAGE LISTENER
--------------------------------------------------------------*/
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	//console.log(message);
	//console.log(sender);

	switch (message.action || message.name || message) {
		case 'play':
			tabPrune(function () {
				for (let id in tabConnected) {
					id = Number(id);
					if (id != sender.tab.id) {
						chrome.tabs.sendMessage(id, {action: "another-video-started-playing"});
					}
				}
			});
			break

		case 'options-page-connected':
			sendResponse({
				isTab: !!sender.tab
			});
			break

		case 'tab-connected':
			tabConnected[sender.tab.id] = true;
			sendResponse({
				tabId: sender.tab.id
			});
			break

		case 'fixPopup':
			//~ get the current focused tab and convert it to a URL-less popup (with same state and size)
			chrome.windows.getLastFocused(w => {
				chrome.tabs.query({
					windowId: w.id,
					active: true
				}, ts => {
					const tID = ts[0]?.id,
						  data = { type: 'popup',
								  state: w.state,
								  width: parseInt(message.width, 10),
								  height: parseInt(message.height, 10),
								  left: 0,
								  top: 20
								 }

					if (tID) {data.tabId = tID;}
					chrome.windows.create(data);

					//append to title?
					chrome.tabs.onUpdated.addListener(function listener (tabId, changeInfo) {
						if (tabId === tID && changeInfo.status === 'complete' && !message.title.startsWith("undefined")) {
							chrome.tabs.onUpdated.removeListener(listener);
							chrome.scripting.executeScript({ target: { tabId: tID }, func: () => { document.title = `${message.title} - ImprovedTube`; } });			//manifest3
							// chrome.tabs.executeScript(tID, {code: `document.title = "${message.title} - ImprovedTube";`});  //manifest2
						}
					});
				});
			});
			break
		case 'download':
			chrome.permissions.request({
				permissions: ['downloads'],
				origins: ['https://www.youtube.com/*']
			}, function (granted) {
				if (granted) {
					try {
						const blob = new Blob([JSON.stringify(message.value)], {
							type: 'application/json;charset=utf-8'
						});
						chrome.downloads.download({
							url: URL.createObjectURL(blob),
							filename: message.filename,
							saveAs: true
						});
					} catch (error) { console.error(error);	}
				} else { console.error('Permission is not granted.'); }
			})
			break
	}
});
/*-----# UNINSTALL URL-----------------------------------*/
chrome.runtime.setUninstallURL('https://improvedtube.com/uninstalled');
