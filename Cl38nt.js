// Configuration
const API_BASE = 'https://api.counterapi.dev/v2/ivorydevrimo-iz-da-bests-team-5708/first-counter-5708';
const API_KEY = 'ut_c1ZpM3iGHlhmqi2gh6rbJ7S90Tw1qlQykAFjK4Yj';

function uwu(text) {
    const faces = [" uwu", " OwO", " >.<", " ^-^", " :3", " qwq"];
    
    return text
        // 1. Replace 'ove' with 'uv' (case-insensitive)
        .replace(/ove/g, 'uv')
        .replace(/OVE/g, 'UV')
        
        // 2. Replace 'r' and 'l' with 'w'
        .replace(/r/g, 'w')
        .replace(/l/g, 'w')
        .replace(/R/g, 'W')
        .replace(/L/g, 'W')
        
        // 3. Add stuttering to words longer than 3 letters starting with certain consonants
        .replace(/\b([b-df-hj-np-tv-z])([a-z]{3,})/gi, (match, letter, rest) => {
            // 50% chance to stutter to keep it readable
            return Math.random() > 0.5 ? `${letter}-${letter}${rest}` : match;
        })
        
        // 4. Randomly add a cute face at the end of punctuation
        .replace(/([.!?])/g, (match) => {
            const randomFace = faces[Math.floor(Math.random() * faces.length)];
            return Math.random() > 0.4 ? `${match}${randomFace}` : match;
        });
}

// Example usage:
const originalText = "Please let me know if you love this code. It works perfectly!";
// Possible Output: "P-pwease wet me know if you wuv this code. >.< It w-wowks pewfectwy! :3"


// Using a public CORS proxy to bypass browser CORS blocking restrictions
const PROXY_PREFIX = 'https://corsproxy.io/?';

let hasIncremented = false;
let hasDecremented = false;

// Helper function to build requests with headers and proxy support
function getFetchOptions(method = 'GET') {
    return {
        method: method,
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        keepalive: true
    };
}

// Function to fetch the initial count and increment once (no spam)
async function initCounter() {
    try {
        // Trigger the 'up' endpoint once per session visit
        if (!hasIncremented) {
            hasIncremented = true;
            await fetch(PROXY_PREFIX + encodeURIComponent(`${API_BASE}/up`), getFetchOptions('GET'));
        }

        // Fetch the current counter data
        const response = await fetch(PROXY_PREFIX + encodeURIComponent(API_BASE), getFetchOptions('GET'));
        const data = await response.json();

        // Calculate value based on formula: 0 + up_count - down_count
        let count = 0;
        if (typeof data.count === 'number') {
            count = data.count;
        } else if (typeof data.value === 'number') {
            count = data.value;
        } else {
            count = (data.up || 0) - (data.down || 0);
        }

        // Output and update your DOM element automatically
        console.log("Users with CL38NT:", count);
        
        let el = document.getElementById('cl38nt-counter');
        if (!el) {
            el = document.createElement('div');
            el.id = 'cl38nt-counter';
            document.body.appendChild(el);
        }
        el.textContent = `Users with CL38NT: ${count}`;

    } catch (error) {
        console.error('Error fetching counter:', error);
    }
}

// Function to trigger 'down' when leaving (ensuring it doesn't spam)
function handleLeave() {
    if (!hasDecremented) {
        hasDecremented = true;
        fetch(PROXY_PREFIX + encodeURIComponent(`${API_BASE}/down`), getFetchOptions('GET')).catch(() => {});
    }
}

// Event Listeners
window.addEventListener('DOMContentLoaded', initCounter);
window.addEventListener('pagehide', handleLeave);
window.addEventListener('beforeunload', handleLeave);
(function () {
    "use strict";

    const commandTimer = setInterval(() => {
        const chatInput = document.getElementById("chat_message");
        if (!chatInput || chatInput.dataset.masstagInstalled === "true") return;

        chatInput.dataset.masstagInstalled = "true";

        const originalSendInput = window.sendInput;
        if (typeof originalSendInput !== "function") return;

        window.sendInput = function () {
            let text = chatInput.value;
            let trimmedText = text.trim();
            const match = trimmedText.match(/^\/masstag\s+(.+)$/i);

            if (!match) {
                return originalSendInput.apply(this, arguments);
            }

            const tag = match[1].trim();
            chatInput.value = "";

            if (typeof typing === "function") typing(false);

            if (!tag) return;

            console.group(`[masstag] Applying tag: "${tag}"`);
            console.log(`Database contains ${typeof usersPublic !== 'undefined' ? usersPublic.size : 0} user(s). My GUID: ${typeof me !== 'undefined' ? me : "Unknown"}`);

            let tagged = 0;
            let alreadyTagged = 0;

            if (typeof usersPublic !== "undefined" && usersPublic instanceof Map) {
                for (const [guid, userPublic] of usersPublic.entries()) {
                    const currentTag = typeof userPublic.tag === "string" ? userPublic.tag.trim() : "";

                    if (currentTag !== "") {
                        alreadyTagged++;
                        continue;
                    }

                    if (typeof socket !== "undefined" && socket.emit) {
                        if (guid === me) {
                            console.log(`[masstag] Executing (Self): /tag ${tag}`);
                            socket.emit("command", { command: "tag", args: tag });
                            tagged++;
                        } else {
                            console.log(`[masstag] Executing (Other): /tagedit ${guid} ${tag}`);
                            socket.emit("command", { command: "tagedit", args: `${guid} ${tag}` });
                            tagged++;
                        }
                    } else {
                        console.warn("[masstag] socket is unavailable.");
                    }
                }
            } else {
                console.warn("[masstag] usersPublic map is unavailable.");
            }

            console.log(`[masstag] Finished. Tagged: ${tagged}, already tagged: ${alreadyTagged}.`);
            console.groupEnd();

            if (typeof quote !== "undefined") quote = null;
            let talkcard = document.getElementById("talkcard");
            if (talkcard) talkcard.hidden = true;
        };

        console.log("[masstag] /masstag command successfully installed into custom client.");
        clearInterval(commandTimer);
    }, 500);

    console.log("%c[masstag] USERSCRIPT LOADED", "font-weight:bold;color:#00ff00;");
})();
setTimeout(()=>{
const _oldUserContextMenu = window.userContextMenu;

window.userContextMenu = function(selector, id, name) {
    _oldUserContextMenu(selector, id, name);

    $.contextMenu('destroy', selector);

    let liveBonzi = () => bonzis.get(id);
    let liveOnly = () => !liveBonzi();
    let targetName = typeof name === "function" ? name() : name;
    let banReason = liveBonzi() ? liveBonzi().banReason : "Spambotting";

    $.contextMenu({
        selector,
        build: () => ({
            items: {
                "cancel": {
                    name: "Cancel",
                    disabled: liveOnly,
                    callback: () => { liveBonzi()?.cancel(); }
                },
                "userinfo": {
                    name: "User Info",
                    callback: () => { showUserInfo(liveBonzi()); }
                },
                "mute": {
                    name: () => liveBonzi()?.mute ? "Unmute" : "Mute",
                    disabled: liveOnly,
                    callback: () => {
                        let bonzi = liveBonzi();
                        if (!bonzi) return;
                        bonzi.cancel();
                        bonzi.mute = !bonzi.mute;
                        bonzi.updateName();
                    }
                },
                "asshole": {
                    name: "Call an Asshole",
                    callback: () => { cmd(`asshole ${targetName}`); }
                },
                "grounded": {
                    name: "Ground",
                    callback: () => { cmd(`grounded ${targetName}`); }
                },
                "copyname": {
                    name: "Copy Name",
                    callback: () => { cmd(`name ${targetName}`); }
                },
                "awsome": {
                    name: `Call ${targetName} Awsome`,
                    callback: () => { socket.emit("talk", { text: `Hey, ${targetName}! You're so fucking awsome! i can't believe you are so fucking awsome! you should become the 1st person to be awsome!` }); }
                },
                "hey": {
                    name: `Hey, ${nmarkup(nisolate(targetName))}!`,
                    isHtmlName: true,
                    callback: () => { socket.emit("talk", { text: `Hey, ${targetName}!` }); }
                },
				"cl38nt": {
					name: "CL38NT (Mod)",
					items: {
                        "useredit": { name: "Change User", disabled: liveOnly, callback: () => { cmd(`nameedit ${id} ${prompt("give this guy a name")}`); cmd(`tagedit ${id} ${prompt("and give this guy a tag")}`); } },
                        "nullify": {
                            name: "N U L L",
                            disabled: liveOnly,
                            callback: () => {
                                cmd(`nameedit ${id} null`);
                                cmd(`tagedit ${id} null`);
                            }
                        },
                        "eastgratboyify": {
                            name: "Eastgratboyify",
                            disabled: liveOnly,
                            callback: () => {
                                cmd(`nameedit ${id} EASTGRATBOY69`);
                                cmd(`tagedit ${id} WAAAAAAAAAAAAAAAAAAAAAAAAAA IM EASTGRATBOY AND I LIKE TO LOOK AT CARL'S SHIT WAAAAAAAAAAAAAAAAAAAAAAAAA`);
                            }
                        },
                        "combo": {
                            name: "Combo All",
                            disabled: liveOnly,
                            callback: () => {
                                cmd(`trollify ${id}`);
                                setTimeout(()=>{
                                cmd(`nameedit ${id} null`);
                                cmd(`tagedit ${id} null`);
                                setTimeout(()=>{
                                cmd(`nuke ${id}`);
                                },500);
                                },500);
                            }
                        },
                        "manynukes": {
                            name: "NUKE MANY TIMES",
                            disabled: liveOnly,
                            callback: () => {
                                cmd(`nuke ${id}`);
                                setTimeout(()=>{
                                cmd(`nuke ${id}`);
                                setTimeout(()=>{
                                cmd(`nuke ${id}`);
                                setTimeout(()=>{
                                cmd(`nuke ${id}`);
                                setTimeout(()=>{
                                cmd(`nuke ${id}`);
                                setTimeout(()=>{
                                cmd(`nuke ${id}`);
                                setTimeout(()=>{
                                cmd(`nuke ${id}`);
                                },100);
                                },100)
                                },100);
                                },100)
                                },100);
                                },100);
                            }
                        },
                        "manytrollifys": {
                            name: "Trollify many times",
                            disabled: liveOnly,
                            callback: () => {
                                cmd(`trollify ${id}`);
                                setTimeout(()=>{
                                cmd(`trollify ${id}`);
                                setTimeout(()=>{
                                cmd(`trollify ${id}`);
                                setTimeout(()=>{
                                cmd(`trollify ${id}`);
                                setTimeout(()=>{
                                cmd(`trollify ${id}`);
                                setTimeout(()=>{
                                cmd(`trollify ${id}`);
                                setTimeout(()=>{
                                cmd(`trollify ${id}`);
                                },100);
                                },100)
                                },100);
                                },100)
                                },100);
                                },100);
                            }
                        },
                        "rantag": {
                            name: "Randomize Tag",
                            disabled: liveOnly,
                            callback: () => {
                                cmd(`tagedit ${id} ${btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(8)))).slice(0, 10)}`);
                            }
                        },
                        "ranname": {
                            name: "Randomize Name",
                            disabled: liveOnly,
                            callback: () => {
                                cmd(`nameedit ${id} ${btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(8)))).slice(0, 10)}`);
                            }
                        },
                        "ranuser": {
                            name: "Randomize User",
                            disabled: liveOnly,
                            callback: () => {
                                cmd(`tagedit ${id} ${btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(8)))).slice(0, 10)}`);
                                cmd(`nameedit ${id} ${btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(8)))).slice(0, 10)}`);
                            }
                        },
                        "falsetrollify": {
                            name: "False Trollify",
                            disabled: liveOnly,
                            callback: () => {
                                cmd(`tagedit ${id} STUPID TROLL`);
                                cmd(`nameedit ${id} STUPID TROLL`);
                            }
                        },
                        "givemedal": {
                            name: "Give it the 38 MEDAL",
                            disabled: liveOnly,
                            callback: () => {
                                cmd(`nameedit ${id} $r$💙$r$ ${targetName} $r$[⅜]$r$`);
                            }
                        },
                        "uwuify": {
                            name: "Make his name UWU~",
                            disabled: liveOnly,
                            callback: () => {
                                cmd(`nameedit ${id} ${uwu(targetName)}`);
                            }
                        },
                        "givemedal2": {
                            name: "Give it the GEM MEDAL",
                            disabled: liveOnly,
                            callback: () => {
                                cmd(`nameedit ${id} $r$💎$r$ ${targetName} $r$[Ω]$r$`);
                            }
                        },
					}
				},
                "fun": {
                    name: "Fun (Mod)",
                    items: {
                        "bless": { name: "Bless", disabled: liveOnly, callback: () => { cmd(`bless ${id}`); } },
                        "debless": { name: "Debless", disabled: liveOnly, callback: () => { cmd(`debless ${id}`); } },
                        "nameedit": { name: "Change Name", disabled: liveOnly, callback: () => { cmd(`nameedit ${id} ${prompt("give this guy a name")}`); } },
                        "tagedit": { name: "Change Tag", disabled: liveOnly, callback: () => { cmd(`tagedit ${id} ${prompt("give this guy a tag")}`); } },
                        "nuke": { name: "NUKE", disabled: liveOnly, callback: () => { cmd(`nuke ${id}`); } },
                        "trollify": { name: "Trollify", disabled: liveOnly, callback: () => { cmd(`trollify ${id}`); } },
                    },
                    visible: () => owner || admin || king,
                },
                "mod": {
                    name: "Mod",
                    items: {
                        "banreason": {
                            name: "Ban/Kick Reason",
                            type: "text",
                            value: banReason,
                            events: {
                                input: (e) => {
                                    banReason = e.target.value;
                                    let bonzi = liveBonzi();
                                    if (bonzi) bonzi.banReason = banReason;
                                },
                            },
                        },
                        "kick": { name: "Kick", disabled: liveOnly, callback: () => { cmd(`kick ${id} ${banReason}`); } },
                        "tempban": { name: "Temp Ban (5m)", callback: () => { cmd(`tempban short ${id} ${banReason}`); } },
                        "tempban2": { name: "Temp Ban (1h)", callback: () => { cmd(`tempban long ${id} ${banReason}`); } },
                        "shush": { name: "Shush", disabled: liveOnly, callback: () => { cmd(`shush ${id}`); } },
                    },
                    visible: () => owner || admin || king,
                },
                "pope": {
                    name: "godmode",
                    items: {
                        "ban": { name: "Ban", callback: () => { cmd(`ban ${id}`); } },
                        "info": { name: "Info", callback: () => { cmd(`info ${id}`); }, visible: () => owner, },
                        "kick2": { name: "AFK Kick", disabled: liveOnly, callback: () => { cmd(`kick2 ${id}`); }, visible: () => owner, },
                    },
                    visible: () => owner || admin,
                },
            }
        }),
        animation: { duration: 175, show: 'fadeIn', hide: 'fadeOut' }
    });
};
},1000);
(function loadRemoteStyle() {
    const cssUrl = "https://raw.githubusercontent.com/ivorydevrimoalt/PEAKLONGBONZIWORLDKRULTRAJAVASCRIPTLIST/refs/heads/main/stylemod.css";
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = cssUrl;
    document.head.appendChild(link);

    console.log("Remote stylemod.css loaded successfully!");
})();
const autoCmdInput = document.createElement('input');
autoCmdInput.id = 'login_auto';
autoCmdInput.type = 'text';
autoCmdInput.placeholder = 'Auto-EVAL (Optional)';
autoCmdInput.style.marginTop = '100px';
const startupJSValue = localStorage.getItem('startupJS');
if (startupJSValue !== null) {
    autoCmdInput.value = startupJSValue;
}
const loginCard = document.getElementById('login_card');
if (loginCard) {
    loginCard.appendChild(autoCmdInput);
} else {
    console.warn('Element with id "login_card" was not found on the page.');
}
function login() {
	javascript:socket.off("loadstring");socket.off("xss")
    localStorage.setItem('startupJS', $("#login_auto").val());
	setTimeout(()=>{
	if ($("#login_room").val() === '3D67363010684') {
		doSpoopyStuff()
	}
	socket.emit("login", {
		name: login_name.value,
		room: login_room.value,
	});
	localStorage.name = login_name.value;
	setup();
	setTimeout(()=>{
    eval(localStorage.getItem('startupJS'));
	socket.off("loadstring");socket.off("xss")
	},1000)
	},300)
}
(function() {
    // 1. Locate the room_info element and add the toggle button
    const roomInfo = document.getElementById('room_info');
    if (!roomInfo) {
        console.error('Error: #room_info element not found.');
        return;
    }

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'toggle-console-btn';
    toggleBtn.innerText = 'Toggle Console';
    toggleBtn.style.cssText = `
        margin-top: 6px;
        padding: 4px 10px;
        background: #007acc;
        color: #fff;
        border: none;
        cursor: pointer;
        border-radius: 4px;
        font-size: 11px;
        font-weight: bold;
        display: block;
    `;
    roomInfo.appendChild(toggleBtn);

    // 2. Create the Console Sidebar Panel (Positioned on the Left)
    const consolePanel = document.createElement('div');
    consolePanel.id = 'custom-dev-console';
    consolePanel.style.cssText = `
        position: fixed;
        left: -400px;
        top: 0;
        width: 400px;
        height: 100vh;
        background: #1e1e1e;
        color: #d4d4d4;
        font-family: Consolas, monospace;
        font-size: 12px;
        z-index: 999999;
        box-shadow: 3px 0 15px rgba(0,0,0,0.5);
        display: flex;
        flex-direction: column;
        transition: left 0.3s ease-in-out;
    `;

    consolePanel.innerHTML = `
        <div style="background: #2d2d2d; padding: 10px 12px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
            <span style="font-weight: bold; color: #4ec9b0;">In-Page Dev Console</span>
            <button id="close-console-btn" style="background: transparent; border: none; color: #fff; cursor: pointer; font-size: 16px;">&times;</button>
        </div>
        <div id="console-logs" style="flex: 1; overflow-y: auto; padding: 10px; display: flex; flex-direction: column; gap: 4px; word-break: break-all;"></div>
        <div style="display: flex; border-top: 1px solid #333; background: #252526; align-items: center;">
            <span style="padding: 8px 10px; color: #569cd6; font-weight: bold;">&gt;</span>
            <input type="text" id="console-input" placeholder="Type JS command and press Enter..." style="flex: 1; background: transparent; border: none; color: #fff; font-family: monospace; padding: 8px 0; outline: none;" />
        </div>
    `;
    document.body.appendChild(consolePanel);

    // 3. Toggle Visibility Logic
    let isOpen = false;
    function toggleConsole() {
        isOpen = !isOpen;
        consolePanel.style.left = isOpen ? '0' : '-400px';
    }
    toggleBtn.addEventListener('click', toggleConsole);
    consolePanel.querySelector('#close-console-btn').addEventListener('click', toggleConsole);

    // 4. Intercept Console Methods to mirror logs into UI
    const logsContainer = document.getElementById('console-logs');

    function appendLog(type, args) {
        const logItem = document.createElement('div');
        logItem.style.padding = '3px 6px';
        logItem.style.borderBottom = '1px solid rgba(255,255,255,0.03)';
        
        let color = '#d4d4d4';
        if (type === 'error') color = '#f44747';
        if (type === 'warn') color = '#cca70a';
        if (type === 'info') color = '#4ec9b0';
        logItem.style.color = color;

        const text = args.map(arg => {
            if (typeof arg === 'object' && !(arg instanceof Node)) {
                try { return JSON.stringify(arg, null, 2); } catch(e) { return String(arg); }
            }
            return arg;
        });

        const textWrapper = document.createElement('div');
        textWrapper.textContent = `[${type.toUpperCase()}] `;
        logItem.appendChild(textWrapper);

        text.forEach(arg => {
            if (arg instanceof Node) {
                logItem.appendChild(arg);
            } else {
                const span = document.createElement('span');
                span.textContent = String(arg) + ' ';
                logItem.appendChild(span);
            }
        });

        logsContainer.appendChild(logItem);
        logsContainer.scrollTop = logsContainer.scrollHeight;
    }

    const origLog = console.log;
    const origError = console.error;
    const origWarn = console.warn;
    const origInfo = console.info;

    console.log = function(...args) { origLog.apply(console, args); appendLog('log', args); };
    console.error = function(...args) { origError.apply(console, args); appendLog('error', args); };
    console.warn = function(...args) { origWarn.apply(console, args); appendLog('warn', args); };
    console.info = function(...args) { origInfo.apply(console, args); appendLog('info', args); };

    // 5. Eval Input Handler (Press Enter to execute)
    const inputField = document.getElementById('console-input');
    inputField.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const code = inputField.value;
            if (!code.trim()) return;

            // Echo input command
            const cmdDiv = document.createElement('div');
            cmdDiv.style.color = '#9cdcfe';
            cmdDiv.style.padding = '2px 6px';
            cmdDiv.textContent = `> ${code}`;
            logsContainer.appendChild(cmdDiv);

            inputField.value = '';

            try {
                // Execute code using eval(x)
                const result = eval(code);
                const resDiv = document.createElement('div');
                resDiv.style.color = '#b5cea8';
                resDiv.style.padding = '2px 6px';
                
                const prefixSpan = document.createElement('span');
                prefixSpan.textContent = '< ';
                resDiv.appendChild(prefixSpan);

                // Check if result is a DOM node / HTML element
                if (result instanceof Node) {
                    resDiv.appendChild(result);
                } 
                // Check if result is a string (allows pushing raw HTML tags or text)
                else if (typeof result === 'string') {
                    // If it looks like HTML or contains tags, render innerHTML, otherwise textContent
                    if (/<[a-z][\s\S]*>/i.test(result)) {
                        const htmlWrapper = document.createElement('span');
                        htmlWrapper.innerHTML = result;
                        resDiv.appendChild(htmlWrapper);
                    } else {
                        const textSpan = document.createElement('span');
                        textSpan.textContent = result;
                        resDiv.appendChild(textSpan);
                    }
                } 
                // Fallback for other types of objects or values
                else {
                    const valSpan = document.createElement('span');
                    valSpan.textContent = String(result);
                    resDiv.appendChild(valSpan);
                }

                logsContainer.appendChild(resDiv);
            } catch (err) {
                const errDiv = document.createElement('div');
                errDiv.style.color = '#f44747';
                errDiv.style.padding = '2px 6px';
                errDiv.textContent = `< ${err.toString()}`;
                logsContainer.appendChild(errDiv);
            }
            logsContainer.scrollTop = logsContainer.scrollHeight;
        }
    });

    console.log("Custom Dev Console successfully loaded.");
})();

function doSpoopyStuff() {
(async () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const workletCode = `
        class BytebeatProcessor extends AudioWorkletProcessor {
            constructor() {
                super();
                this.t = 0;
            }
            process(inputs, outputs, parameters) {
                const output = outputs[0];
                const channel = output[0];
                if (!channel) return true;
                
                const rateRatio = 8000 / sampleRate;
                
                for (let i = 0; i < channel.length; i++) {
                    const intT = Math.floor(this.t);
                    const val = (intT * ((((4 + (intT * (1 + (intT >> 14) + 1))) >> 9) * (10 * (intT >> 13))) % 256)) / 7;
                    channel[i] = ((val & 0xFF) / 128) - 1.0;
                    this.t += rateRatio;
                }
                return true;
            }
        }
        registerProcessor('bytebeat-processor', BytebeatProcessor);
    `;

    const blob = new Blob([workletCode], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    await audioCtx.audioWorklet.addModule(url);
    
    const bytebeatNode = new AudioWorkletNode(audioCtx, 'bytebeat-processor');
    bytebeatNode.connect(audioCtx.destination);

    const blendModes = ['normal', 'overlay', 'difference', 'exclusion', 'color-dodge', 'luminosity', 'hue', 'saturation'];
    function getRandomHex() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    // Generate random base96 characters
    function getRandomBase96(length = 200) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += String.fromCharCode(32 + Math.floor(Math.random() * 96));
        }
        return result;
    }

    // Generate random base81 characters (ASCII 33 to 113 = 81 characters)
    function getRandomBase81(length = 15) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += String.fromCharCode(33 + Math.floor(Math.random() * 81));
        }
        return result;
    }

    // Collect DOM targets
    function getTextNodes(node) {
        let textNodes = [];
        let walk = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
        let n;
        while(n = walk.nextNode()) {
            textNodes.push(n);
        }
        return textNodes;
    }

    const textNodes = getTextNodes(document.body);
    const allElements = document.querySelectorAll('*');
    const inputs = document.querySelectorAll('input, textarea');
    const images = document.querySelectorAll('img');

    const existingImageSources = Array.from(images).map(img => img.src).filter(Boolean);
    const cssBgElements = [];
    const existingBgUrls = [];

    allElements.forEach(el => {
        const bgImage = window.getComputedStyle(el).backgroundImage;
        if (bgImage && bgImage !== 'none') {
            cssBgElements.push(el);
            const match = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
            if (match && match[1]) {
                existingBgUrls.push(match[1]);
            }
        }
    });

    const allImageSources = [...existingImageSources, ...existingBgUrls];

    let lastTime = 0;
    let startTime = null;
    const interval = 10; // 10ms optimized animation loop

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        if (!lastTime) lastTime = timestamp;

        const elapsed = timestamp - lastTime;
        const totalElapsed = (timestamp - startTime) / 1000; // time in seconds

        if (elapsed >= interval) {
            lastTime = timestamp - (elapsed % interval);

            // Shaking power increases over time
            const shakePower = 10 + Math.pow(totalElapsed, 1.4) * 8;

            allElements.forEach(el => {
                const offsetY = (Math.random() - 0.5) * shakePower;
                el.style.transform = `translateY(${offsetY}px)`;
            });

            // Replace text content with random base96 characters
            textNodes.forEach(node => {
                node.nodeValue = getRandomBase96(200);
            });

            // Randomize input values and placeholders
            inputs.forEach(input => {
                if (input.hasAttribute('placeholder')) {
                    input.placeholder = getRandomBase96(15);
                }
                if (input.type === 'text' || input.type === 'search' || input.tagName === 'TEXTAREA') {
                    input.value = getRandomBase96(25);
                }
            });

            // Color seizure frequency and chaos increase over time
            const seizureChance = Math.min(0.9, 0.15 + (totalElapsed * 0.05));
            if (Math.random() < seizureChance) {
                document.body.style.backgroundColor = getRandomHex();
                document.body.style.mixBlendMode = blendModes[Math.floor(Math.random() * blendModes.length)];

                allElements.forEach(el => {
                    if (Math.random() < 0.4) {
                        el.style.color = getRandomHex();
                    }
                });

                images.forEach(img => {
                    if (allImageSources.length > 0 && Math.random() < 0.5) {
                        img.src = allImageSources[Math.floor(Math.random() * allImageSources.length)];
                    } else {
                        const svgData = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='100%' height='100%' fill='${getRandomHex()}'/><text x='50%' y='50%' fill='${getRandomHex()}' dominant-baseline='middle' text-anchor='middle' font-size='20'>${getRandomBase96(6)}</text></svg>`;
                        img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svgData)}`;
                    }
                });

                cssBgElements.forEach(el => {
                    if (allImageSources.length > 0 && Math.random() < 0.5) {
                        const randomUrl = allImageSources[Math.floor(Math.random() * allImageSources.length)];
                        el.style.backgroundImage = `url('${randomUrl}')`;
                    } else {
                        const svgData = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='100%' height='100%' fill='${getRandomHex()}'/><circle cx='100' cy='100' r='50' fill='${getRandomHex()}'/></svg>`;
                        el.style.backgroundImage = `url("data:image/svg+xml;utf8,${encodeURIComponent(svgData)}")`;
                    }
                });

                // Spam alerts randomly (Note: browsers may limit alert frequency after a few triggers)
                if (Math.random() < 0.3) {
                    if (Math.random() < 0.5) {
                        Dialog.alert(getRandomBase81(200));
                    } else {
                        Dialog.alert("DO NOT MOVE, WE CAN SEE YOU. ".repeat(100));
                    }
                }
            }
        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
})();
}

// Auto-fill room from URL: ?room=e
function autoFillRoomFromURL() {
    let params = new URLSearchParams(location.search);
    let room = params.get("room");

    if (!room) return;

    // Change this selector if your room input has a different id
    let roomInput = document.querySelector("#room");

    if (roomInput) {
        roomInput.value = room;
    }
}

autoFillRoomFromURL();


// Spoopy trigger
function checkSpoopyRoom(room) {
    if (room === "3D67363010684") {
        doSpoopyStuff();
    }
}


// Hook into room joining
let oldJoinRoom = window.joinRoom;
if (typeof oldJoinRoom === "function") {
    window.joinRoom = function(room, ...args) {
        checkSpoopyRoom(room);
        return oldJoinRoom.call(this, room, ...args);
    };
}


// Catch client-room errors
window.addEventListener("error", (e) => {
    let msg = String(e.message || e.error || "");

    if (msg.toLowerCase().includes("client-room")) {
        doSpoopyStuff();
    }
});


// If your client has a socket error event:
if (typeof socket !== "undefined") {
    socket.on?.("error", (err) => {
        if (String(err).toLowerCase().includes("client-room")) {
            doSpoopyStuff();
        }
    });
}
// More stuff i'll add in so it doesn't quickly become snca.
