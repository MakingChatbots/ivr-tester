# IVR Tester
![](https://github.com/SketchingDev/ivr-tester/workflows/On%20Push/badge.svg)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/SketchingDev/ivr-tester.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/SketchingDev/ivr-tester/context:javascript)


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

## Development

### How to publish a release

1. Merge functionality to master along with an increase in the package's version
2. Create a release in GitHub - the version will be the package's version prefixed with 'v'

Creating the release with trigger the [GitHub workflow](./.github/workflows/on-release.yml) that will publish to npmjs.com
