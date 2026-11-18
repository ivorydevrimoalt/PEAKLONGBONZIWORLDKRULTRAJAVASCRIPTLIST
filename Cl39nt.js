
(() => {
    // CL39NT — BonziWorld User Info
    window.CL39NT?.stop?.();

    if (typeof bonzis === "undefined" || typeof Dialog === "undefined") {
        console.error("[CL39NT] BonziWorld objects not found.");
        return;
    }

    let selectedBonzi = null;

    const escapeHTML = value => String(value ?? "")
        .replace(/[&<>"']/g, char => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;",
            '"': "&quot;", "'": "&#39;"
        })[char]);

    function getBonzi(element) {
        for (const bonzi of bonzis.values()) {
            if (bonzi.element === element) return bonzi;
        }
        return null;
    }

    function showInfo(bonzi) {
        if (!bonzi?.userPublic) return;

        const user = bonzi.userPublic;
        const colorParts = String(user.color ?? "Unknown").split(/\s+/);
        const baseColor = colorParts.shift() || "Unknown";
        const hats = colorParts.join(", ") || "None";

        const fields = [
            ["Name", user.name],
            ["Tag", user.tag || "None"],
            ["Color", baseColor],
            ["Hat(s)", hats],
            ["Speed", user.speed],
            ["Pitch", user.pitch],
            ["Internal ID", bonzi.id]
        ];

        const html = `
            <div style="padding:10px">
                ${fields.map(([key, value]) => `
                    <div style="
                        display:flex;
                        justify-content:space-between;
                        gap:18px;
                        padding:7px 3px;
                        border-bottom:1px solid #8885;
                    ">
                        <strong>${escapeHTML(key)}</strong>
                        <span style="overflow-wrap:anywhere;text-align:right">
                            ${escapeHTML(value ?? "Unknown")}
                        </span>
                    </div>
                `).join("")}
            </div>
        `;

        new Dialog({
            title: "User Info",
            width: 340,
            center: true,
            resizable: false,
            html
        });

        console.log("[CL39NT] User information:", {
            name: user.name,
            tag: user.tag,
            color: baseColor,
            hats,
            speed: user.speed,
            pitch: user.pitch,
            id: bonzi.id
        });
    }

    function addInfoEntry() {
        if (!selectedBonzi) return;

        const menus = [...document.querySelectorAll(".context-menu-list")];
        const menu = menus.find(element =>
            element.getClientRects().length > 0 &&
            getComputedStyle(element).visibility !== "hidden"
        );

        if (!menu) return;

        menu.querySelectorAll("[data-cl39nt-entry]").forEach(el => el.remove());

        const separator = document.createElement("div");
        separator.dataset.cl39ntEntry = "true";
        separator.textContent = "──── CL39NT · USER INFO ────";
        separator.style.cssText = `
            padding:7px 10px 4px;
            text-align:center;
            font-size:10px;
            font-weight:bold;
            opacity:.65;
            pointer-events:none;
            white-space:nowrap;
            border-top:1px solid currentColor;
            margin-top:4px;
        `;

        const entry = document.createElement("div");
        entry.dataset.cl39ntEntry = "true";
        entry.textContent = "User Info";
        entry.style.cssText = `
            display:block;
            box-sizing:border-box;
            width:100%;
            padding:6px 12px;
            color:inherit;
            font:inherit;
            cursor:pointer;
            user-select:none;
            white-space:nowrap;
        `;

        entry.addEventListener("mouseenter", () => {
            entry.style.background = "rgba(127,127,127,.25)";
        });

        entry.addEventListener("mouseleave", () => {
            entry.style.background = "transparent";
        });

        entry.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            showInfo(selectedBonzi);
        });

        menu.append(separator, entry);
    }

    function onContextMenu(event) {
        const element = event.target.closest?.(".bonzi");
        if (!element) return;

        selectedBonzi = getBonzi(element);
        if (!selectedBonzi) return;

        setTimeout(addInfoEntry, 0);
        setTimeout(addInfoEntry, 50);
    }

    document.addEventListener("contextmenu", onContextMenu, true);

    window.CL39NT = {
        stop() {
            document.removeEventListener("contextmenu", onContextMenu, true);
            document.querySelectorAll("[data-cl39nt-entry]").forEach(el => el.remove());
            selectedBonzi = null;
            delete window.CL39NT;
            console.log("[CL39NT] Uninstalled.");
        }
    };

    console.log("[CL39NT] Installed successfully.");
})();
