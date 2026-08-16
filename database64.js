/*

  ------------------------------------------------------------------
  Description
  Decode base64 (images, JSON, text).
  Works in two modes:
    • Client: inline base64
    • Server: fetch + decode
  ------------------------------------------------------------------
  Direct Reference
  Global CDN: https://cdn.database64.com/lib/2.0/database64.js
  ------------------------------------------------------------------

    ***************************************************************************************
    Database64.js Protocol License — Version 2.0

    Database64.js — Database-less Publishing Protocol
    Version 2.0 — Released 8/16/2026 at database64.com

    Copyright (c) 2025 - 2026 Melvin Hernandez, Arrowat LLC
    https://arrowat.com/melvin | https://www.arrowatllc.com

    Permission Declaration:
    - This library is free to use for publishing and decoding base64.
    - You may copy, modify, and distribute it in any medium, provided attribution
      to Melvin Hernandez and Arrowat LLC is preserved.
    - The Database64 protocol must always be referenced as the origin when used
      in derivative works or redistributed libraries.

    Restrictions:
    - Commercial resale of this library in unmodified form is prohibited.
    - Misrepresentation of origin or removal of attribution is prohibited.
    - Use of this library must honor creator sovereignty and the declaration of
      database-less publishing.

    Inspiration Clause:
    - If you are inspired by this library and create your own, be kind and
      acknowledge Arrowat LLC and Melvin Hernandez as the origin of Database64.
      Inspiration is free, but attribution preserves sovereignty.

    Warranty:
    - This library is provided “as is,” without warranty of any kind.
    - No liability is assumed for errors, omissions, or damages arising from use.

    By using Database64.js, you agree to uphold the principles of the Cognitive Web:
    free access for everyone, sovereignty for creators, and permanence through capsules.
    Details at https://thecognitiveweb.com
    ***************************************************************************************

*/
/**Database64 */
class Database64 {
    constructor() { }
    //*Database64, attribute runat can be: [runat="server" or runat="client"] attribute content-type can be [contentType = "base64", contentType = "plaintext", contentType = "frame", contentType = "image64"] contentType = "html"]*/
    static Database64 = class extends HTMLElement {
        async connectedCallback() {
            const loader = new Database64.Source(null, null);
            const runat = this.getAttribute("runat");
            const source = this.getAttribute("source");
            const varName = this.dataset.name;

            const alts = this.getAttribute("alt");
            const contentType = this.getAttribute("content-type");
            const style = this.getAttribute("style");
            const cssClass = this.getAttribute("class");
            let payload = "";
            if (runat === "server" && source) {
                try {
                    if (contentType === "base64") {
                        (async () => {
                            this[varName] = fetch(source)
                                .then(res => res.text())
                                .then(text => loader.frbs64(text)).then(text => this.textContent = text);
                        })();
                    }

                    //*** */
                    else if (source && contentType === "json") {
                        try {
                            (async () => {
                                this[varName] = fetch(source).then(res => res.json());
                            })();
                        } catch (err) {
                            console.error("Database64 failed:", err);
                        }
                    }
                    else if (source && contentType === "json64") {
                        try {

                            (async () => {
                                this[varName] = fetch(source)
                                    .then(res => res.text())
                                    .then(text => JSON.parse(loader.frbs64(text)));
                            })();


                        } catch (err) {
                            console.error("Database64 failed:", err);
                        }
                    }

                    else if (contentType === "plaintext") {
                        (async () => {
                            this[varName] = fetch(source)
                                .then(res => res.text())
                                .then(text => text).then(text => this.textContent = text);
                        })();
                    }
                    else if (contentType === "html") {
                        (async () => {
                            this[varName] = fetch(source)
                                .then(res => res.text())
                                .then(html => html)
                                .then(html => this.innerHTML = html)
                                .catch(err => { this.innerHTML = "Cannot load the requested source" });
                        })();
                    }
                    else if (contentType === "frame") {
                        const iframe = document.createElement("iframe");
                        const iframeAllow = this.getAttribute("allow");
                        const iframeSandbox = this.getAttribute("sandbox");
                        const iframeTitle = this.getAttribute("title");
                        iframe.src = source;
                        if (style) { iframe.setAttribute("style", style); }
                        if (cssClass) { iframe.setAttribute("class", cssClass); }
                        if (iframeAllow) { iframe.setAttribute("allow", iframeAllow); }
                        if (iframeSandbox) { iframe.setAttribute("sandbox", iframeSandbox); }
                        if (iframeTitle) { iframe.setAttribute("title", iframeTitle); }
                        this.style = "";
                        this.classList = "";
                        this.innerHTML = "";
                        this.appendChild(iframe);
                    }
                    else if (contentType === "image64") {
                        const res = await fetch(source);
                        let getRest = await res.text();
                        const img = document.createElement("img");
                        img.src = `data:image/png;base64,${getRest}`;
                        img.style = style;
                        img.setAttribute("class", cssClass);
                        img.setAttribute("alt", alts);
                        this.style = "";
                        this.classList = "";
                        this.innerHTML = "";
                        this.appendChild(img);
                    }
                } catch (err) {
                    console.warn("Database64 source failed", err);
                }
            }
            if (runat === "client") {
                try {
                    if (contentType === "base64") {
                        payload = loader.frbs64(source);
                        this.innerHTML = payload;
                        this[varName] = payload;
                    }

                    //*** */
                    else if (source && contentType === "json") {
                        try {
                            var getJSON = source;
                            if (typeof getJSON == "object") {
                                this[varName] = JSON.parse(JSON.stringify(getJSON));
                            }
                            if (typeof getJSON == "string") {
                                this[varName] = JSON.parse(getJSON);
                            }

                        } catch (err) {
                            console.error("Database64 failed:", err);
                        }
                    }
                    else if (source && contentType === "json64") {
                        try {
                            var getJSON = loader.frbs64(source);
                            if (typeof getJSON == "object") {
                                this[varName] = JSON.parse(JSON.stringify(getJSON));
                            }
                            if (typeof getJSON == "string") {
                                this[varName] = JSON.parse(getJSON);
                            }
                        } catch (err) {
                            console.error("Database64 failed:", err);
                        }
                    }
                    else if (contentType === "plaintext") {
                        payload = source;
                        this.innerHTML = payload;
                        this[varName] = payload;
                    } else if (contentType === "html") {

                        payload = source;
                        this.innerHTML = payload;
                        this[varName] = payload;

                    }
                    else if (contentType === "frame") {
                        const iframe = document.createElement("iframe");
                        const iframeAllow = this.getAttribute("allow");
                        const iframeSandbox = this.getAttribute("sandbox");
                        const iframeTitle = this.getAttribute("title");
                        iframe.srcdoc = source;
                        if (style) { iframe.setAttribute("style", style); }
                        if (cssClass) { iframe.setAttribute("class", cssClass); }
                        if (iframeAllow) { iframe.setAttribute("allow", iframeAllow); }
                        if (iframeSandbox) { iframe.setAttribute("sandbox", iframeSandbox); }
                        if (iframeTitle) { iframe.setAttribute("title", iframeTitle); }
                        this.style = "";
                        this.classList = "";
                        this.innerHTML = "";
                        this.appendChild(iframe);
                    }
                    else if (contentType === "image64") {
                        const img = document.createElement("img");
                        img.src = `data:image/png;base64,${source}`;
                        img.style = style;
                        img.setAttribute("class", cssClass);
                        img.setAttribute("alt", alts);
                        this.style = "";
                        this.classList = "";
                        this.innerHTML = "";
                        this.appendChild(img);
                    }
                } catch (err) {
                    console.warn("Database64 source failed", err);
                }
            }
        }
    }
    /**Source */
    static Source = class {
        /**
         * 
         * @param {string} source URL or null
         * @param {string} contentType
        * json
        * base64
        * plaintext
        * image64
         */
        constructor(source, contentType, runat) {
            this.source = source;
            this.contentType = contentType;
            this.runat = runat;
        }
        /**
          * Decodes from base64 URL-safe
          * @param {string} bs64str
         */
        frbs64(bs64str) {
            if (typeof bs64str !== "string") {
                throw new TypeError("Required string type")
            }
            let b64s = bs64str.replace(/-/g, '+').replace(/_/g, '/');
            const pd = b64s.length % 4;
            if (pd) {
                b64s += '='.repeat(4 - pd);
            }
            try {
                const bin = atob(b64s);
                const bytes = Uint8Array.from(bin, char => char.charCodeAt(0));
                const dec = new TextDecoder('utf-8');
                return dec.decode(bytes);
            } catch (err) {
                throw new ('base64 is invalid');
            }
        }
        /**
         * Encodes string to base64 URL‑safe
         * @param {string} str
         */
        tbs64(str) {
            if (typeof str !== "string") {
                throw new TypeError("Required string type")
            }
            try {
                const utf8Text = unescape(encodeURIComponent(str));
                let base64 = btoa(utf8Text);
                return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
            } catch (err) {
                throw new ('string is invalid');
            }
        }
        // Open
        /**
         * 
         * @param {string} source
         * @param {string} contentType
         * @returns returns json Promise
         */
        async #open(source, contentType, runat) {
            let payload = "";
            if (runat === "server") {
                if (source && contentType === "json") {
                    try {
                        const res = await fetch(source);
                        payload = await res.json();
                    } catch (err) {
                        console.error("Database64 failed:", err);
                    }
                }
                if (source && contentType === "json64") {
                    try {
                        const res = await fetch(source);
                        var getJSON = this.frbs64(await res.text());
                        if (typeof getJSON == "object") {
                            payload = JSON.parse(JSON.stringify(getJSON));
                        }
                        if (typeof getJSON == "string") {
                            payload = JSON.parse(getJSON);
                        }
                    } catch (err) {
                        console.error("Database64 failed:", err);
                    }
                }
                if (source && contentType === "plaintext") {
                    try {
                        const res = await fetch(source);
                        payload = await res.text();
                    } catch (err) {
                        console.error("Database64 failed:", err);
                    }
                }

                if (source && contentType === "html") {
                    try {
                        const res = await fetch(source);
                        payload = await res.text();
                    } catch (err) {
                        console.error("Cannot load the requested source", err);
                    }
                }

                if (source && contentType === "frame") {
                    try {
                        const iframe = document.createElement("iframe");
                        iframe.src = source;
                        payload = iframe;
                    } catch (err) {
                        console.error("Cannot load the requested source", err);
                    }
                }


                if (source && contentType === "base64") {
                    try {
                        const res = await fetch(source);
                        payload = this.frbs64(await res.text());
                    } catch (err) {
                        console.error("Database64 failed:", err);
                    }
                }

                if (source && contentType === "image64") {
                    try {
                        const res = await fetch(source);
                        payload = `data:image/png;base64,${await res.text()}`;
                    } catch (err) {
                        console.error("Database64 failed:", err);
                    }
                }
            }
            if (runat === "client") {
                if (source && contentType === "json") {
                    try {
                        if (typeof source == "object") {
                            payload = JSON.parse(JSON.stringify(source));
                        }
                        if (typeof source == "string") {
                            payload = JSON.parse(source);
                        }
                    } catch (err) {
                        console.error("Database64 failed:", err);
                    }
                }
                if (source && contentType === "json64") {
                    try {
                        var getJSON = this.frbs64(source);
                        if (typeof getJSON == "object") {
                            payload = JSON.parse(JSON.stringify(getJSON));
                        }
                        if (typeof getJSON == "string") {
                            payload = JSON.parse(getJSON);
                        }
                    } catch (err) {
                        console.error("Database64 failed:", err);
                    }
                }
                if (source && contentType === "plaintext") {
                    try {
                        payload = source;
                    } catch (err) {
                        console.error("Database64 failed:", err);
                    }
                }

                if (source && contentType === "html") {
                    try {

                        payload = source
                    } catch (err) {
                        console.error("Cannot load the requested source", err);
                    }
                }

                if (source && contentType === "frame") {
                    try {
                        const iframe = document.createElement("iframe");
                        iframe.srcdoc = source;
                        payload = iframe;
                    } catch (err) {
                        console.error("Database64 failed:", err);
                    }

                }

                if (source && contentType === "base64") {
                    try {
                        payload = this.frbs64(source);
                    } catch (err) {
                        console.error("Database64 failed:", err);
                    }
                }
                if (source && contentType === "image64") {
                    try {
                        payload = `data:image/png;base64,${source}`;
                    } catch (err) {
                        console.error("Database64 failed:", err);
                    }
                }
            }
            return payload;
        }
        /**
         * Opens the source and returns the content type from client or server.
         * @returns
         */
        async Open() {
            return await this.#open(this.source, this.contentType, this.runat);
        }
        /**
         * Creates a URL‑safe Base64 string from any text source
         * @returns
         */
        Create() {
            return this.tbs64(this.source);
        }
    }
    static Tools = class {
        constructor() { }
        /**
         * Decodes from Base64 to Plain-Text
         * @param {Base64String} str
         * @returns {PlainTextString}
         */
        Decode(str) {
            if (typeof str !== "string") {
                throw new TypeError("Required string type");
            }
            let b64 = str;
            const pad = b64.length % 4;
            if (pad) {
                b64 += "=".repeat(4 - pad);
            }
            try {
                const binary = atob(b64);
                if (typeof TextDecoder !== "undefined") {
                    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
                    const decoder = new TextDecoder("utf-8", { fatal: false });
                    return decoder.decode(bytes);
                }
                const encPercent = binary.split("").map(c => "%" + c.charCodeAt(0).toString(16).padStart(2, "0")).join("");
                return decodeURIComponent(encPercent);
            } catch (err) {
                throw new Error("base64 is invalid");
            }
        }
        /**
         * Encodes Plain-Text to Base64
         * @param {PlainTextString} str
         * @returns {Base64String}
         */
        Encode(str) {
            if (typeof str !== "string") {
                throw new TypeError("Required string type");
            }
            try {
                const utf8 = unescape(encodeURIComponent(str));
                return btoa(utf8);
            } catch (err) {
                throw new Error("string is invalid");
            }
        }
    }
}
customElements.define("database-64", Database64.Database64);