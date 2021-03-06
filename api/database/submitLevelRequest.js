"use strict";

const BaseLevelRequests = require("./BaseLevelRequests");

const { API_CODES } = require("../../source/util/Constants");
const PROPERTY_LIST = (require("../../source/properties/endpoints").submitLevelRequest);

const updateLevelRequest = require("./updateLevelRequest");

class submitLevelRequest extends BaseLevelRequests {

    static SUPPORTED = true;
    static OFFLINE = false;

    static PROPERTY_LIST = PROPERTY_LIST;
    static PROPERTIES_LOADED = -1;
    static SETS = {};

    /**
     * @returns {boolean} Whether the current parameters will clearly produce a faulty return
     */

    isFaulty() {
        return super.isFaulty()
        || !this.levelRequest.hasSender();
    }

    async handlerAction() {
        if (!(await this.entryExists())) {
            if (!(await this.senderCanRequest())) return API_CODES.FAILED_BAN;
            return await new updateLevelRequest()
                .buildByObj(this.levelRequest)
                .handler();
        }
        return API_CODES.TAKEN;
    }

    build(data) {
        data = this.parse(data);
        super.build();

        /**
         * @description The identifiation number of the sender's Discord ID
         * @type {BigInt}
         */

        this.senderDisID = "senderDisID" in data ? data.senderDisID : 0n;

        /**
         * @description The identifiation number of the sender's GD Account ID
         * @type {BigInt}
         */

        this.senderAccountID = "senderAccountID" in data ? data.senderAccountID : 0n;

        /**
         * @description The identifiation number of the sender's Twitch ID
         * @type {BigInt}
         */

        this.senderTwitchID = "senderTwitchID" in data ? data.senderTwitchID : 0n;

        /**
         * @description The identifiation code of the sender's YouTube ID
         * @type {?string}
         */

        this.senderYoutubeID = "senderYoutubeID" in data ? data.senderYoutubeID : null;

        return this;
    }
    
    
    // This is for documentation purposes

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setLevelID(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setSenderDisID(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setSenderAccountID(value=0n) { return this; }

    /**
     * @default 0n
     * @param {?number|string|BigInt} [value=0n]
     */

    setSenderTwitchID(value=0n) { return this; }

    /**
     * @default null
     * @param {?string} [value=null]
     */

    setSenderYoutubeID(value=null) { return this; }

}

module.exports = submitLevelRequest;