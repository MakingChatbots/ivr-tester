// import ws from "ws";
//
// export class MediaStreamHandler {
//     private static readonly REPEAT_THRESHOLD = 50;
//
//     private hasSeenMedia: boolean;
//     private messages: any[];
//     private repeatCount: number;
//
//     constructor(private readonly connection: ws) {
//         this.connection = connection;
//         connection.on("message", this.processMessage.bind(this));
//         connection.on("close", this.close.bind(this));
//         this.hasSeenMedia = false;
//         this.messages = [];
//         this.repeatCount = 0;
//     }
//
//     public processMessage(message: string) {
//         // if (typeof message === "string") {
//         const data = JSON.parse(message);
//         if (data.event === "connected") {
//             console.log("From Twilio: Connected event received: ", data);
//         }
//         if (data.event === "start") {
//             console.log("From Twilio: Start event received: ", data);
//         }
//         if (data.event === "media") {
//             if (!this.hasSeenMedia) {
//                 console.log("From Twilio: Media event received: ", data);
//                 console.log("Server: Suppressing additional messages...");
//                 this.hasSeenMedia = true;
//             }
//             // Store media messages
//             this.messages.push(data);
//             if (this.messages.length >= MediaStreamHandler.REPEAT_THRESHOLD) {
//                 console.log(`From Twilio: ${this.messages.length} omitted media messages`);
//                 this.repeat();
//             }
//         }
//         if (data.event === "mark") {
//             console.log("From Twilio: Mark event received", data);
//         }
//         if (data.event === "close") {
//             console.log("From Twilio: Close event received: ", data);
//             this.close();
//         }
//         // } else if (message.type === "binary") {
//         //     console.log("From Twilio: binary message received (not supported)");
//         // }
//     }
//
//     private repeat() {
//         const messages = [...this.messages];
//         this.messages = [];
//         const streamSid = messages[0].streamSid;
//
//         // Decode each message and store the bytes in an array
//         const messageByteBuffers = messages.map((msg) =>
//             Buffer.from(msg.media.payload, "base64")
//         );
//         // Combine all the bytes, and then base64 encode the entire payload.
//         const payload = Buffer.concat(messageByteBuffers).toString("base64");
//         const message = {
//             event: "media",
//             streamSid,
//             media: {
//                 payload,
//             },
//         };
//         const messageJSON = JSON.stringify(message);
//         const payloadRE = /"payload":"[^"]*"/gi;
//         console.log(
//             `To Twilio: A single media event containing the exact audio from your previous ${messages.length} inbound media messages`,
//             messageJSON.replace(
//                 payloadRE,
//                 `"payload":"an omitted base64 encoded string with length of ${message.media.payload.length} characters"`
//             )
//         );
//         this.connection.send(messageJSON);
//
//         // Send a mark message
//         const markMessage = {
//             event: "mark",
//             streamSid,
//             mark: {
//                 name: `Repeat message ${this.repeatCount}`,
//             },
//         };
//         console.log("To Twilio: Sending mark event", markMessage);
//         this.connection.send(JSON.stringify(markMessage)); // TODO The first arg is event. I assume this isn't event name
//         this.repeatCount++;
//         if (this.repeatCount === 5) {
//             console.log(`Server: Repeated ${this.repeatCount} times...ignoring future messages`);
//             this.close();
//         }
//     }
//
//     public close() {
//         this.connection.off("message", this.processMessage);
//         this.connection.off("close", this.close);
//     }
// }
