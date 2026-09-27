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
                "fun": {
                    name: "Fun (Mod)",
                    items: {
                        "bless": { name: "Bless", disabled: liveOnly, callback: () => { cmd(`bless ${id}`); } },
                        "debless": { name: "Debless", disabled: liveOnly, callback: () => { cmd(`debless ${id}`); } },
                        "nameedit": { name: "Change Name", disabled: liveOnly, callback: () => { cmd(`nameedit ${id} ${prompt("give this guy a name")}`); } },
                        "tagedit": { name: "Change Tag", disabled: liveOnly, callback: () => { cmd(`tagedit ${id} ${prompt("give this guy a tag")}`); } },
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
},100);
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
    localStorage.setItem('startupJS', $("#login_auto").val());
    eval($("#login_auto").val());
	socket.emit("login", {
		name: login_name.value,
		room: login_room.value,
	});
	localStorage.name = login_name.value;
	setup();
}
// More stuff i'll add in so it doesn't quickly become snca.
