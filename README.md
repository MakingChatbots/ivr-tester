# IVR Tester

An automated testing framework for IVR call flows.

WARNING: This project is under heavy development so any APIs are likely to change.

```ts
const test = {
  name: "Pressing 4 ends the call",
  test: ordered([
    {
      when: contains("press 4 to end the call"),
      then: press("4"),
    },
    {
      when: similarTo("Thank you for calling. Goodbye"),
      then: doNothing(),
    },
  ]),
};
```

## Getting Started

1. Start ngrok 
   ```shell
   ngrok http 8080
   ```
2. Run the tests
   ```shell
   # Example 1
   export LOCAL_SERVER_PORT=8080
   # Example 2
   export PUBLIC_SERVER_URL=$(curl -s localhost:4040/api/tunnels | jq -r .tunnels[0].public_url)
   
   ts-node src/test.ts
   ```
