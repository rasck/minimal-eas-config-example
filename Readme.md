# Test Expo EAS Build with environment vars #

We want to be able to change configuration based on environement variables. The feature is described in [switching-configuration-based-on-the-environment](https://docs.expo.io/workflow/configuration/#switching-configuration-based-on-the-environment).

We define our configuration in the `app.config.js`. Based on the envrionment variable `APP_ENV` we load either the `production` or the `qa` config.

We also want to dynamic change the version code for android. For that we use the `VERSION_CODE` environment variable.

Locally it works:
`npx cross-env APP_ENV=qa VERSION_CODE=20 expo config` and shows the correct config (in other projects we have also observed this works with expo publish, but that might also be beacuse expo publish just uses the local enviroment)

But when we try to bulid:
`npx cross-env APP_ENV='qa' VERSION_CODE=20 eas build --platform android`

Expo build servers keep showing the error *"Could not create a config file based on environment: APP_ENV=undefined"*

I ran the commands from a windows machine.

Global installations (with yarn):
 * "eas-cli@0.19.1" 
 * "expo-cli@4.7.3"