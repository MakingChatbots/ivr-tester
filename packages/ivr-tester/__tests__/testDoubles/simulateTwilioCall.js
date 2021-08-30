"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateTwilioCall = void 0;
const ws_1 = __importDefault(require("ws"));
test.skip("ignore");
async function simulateTwilioCall(serverUrl) {
    const waitForConnection = async (ws) => new Promise((resolve) => {
        ws.on("open", resolve);
    });
    const ws = new ws_1.default(serverUrl);
    await waitForConnection(ws);
    return {
        async sendMediaPayload(data) {
            const payload = {
                event: "media",
                media: {
                    payload: data.toString("base64"),
                },
            };
            return new Promise((resolve, reject) => {
                ws.send(JSON.stringify(payload), (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        },
        close() {
            if (this.ws &&
                ![this.ws.CLOSED, this.ws.CLOSING].includes(this.ws.readyState)) {
                this.ws.close();
            }
        },
        isClosed() {
            return this.ws.readyState === this.ws.CLOSED;
        },
    };
}
exports.simulateTwilioCall = simulateTwilioCall;
//# sourceMappingURL=simulateTwilioCall.js.map