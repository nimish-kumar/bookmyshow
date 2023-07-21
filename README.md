# BookMyShow clone

This repository contains an Expo project with Firebase Authentication implemented. It provides a basic setup for integrating Firebase Authentication into your Expo project, allowing users to sign up, sign in, and sign out using google account.

## Table of contents

- [BookMyShow clone](#bookmyshow-clone)
  - [Table of contents](#table-of-contents)
  - [Demo](#demo)
    - [Log in](#log-in)
    - [Log out](#log-out)
    - [Booking flow](#booking-flow)
  - [Getting Started](#getting-started)
  - [Environment variables](#environment-variables)
  - [Running the Project](#running-the-project)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)

## [Demo](#demo)

### Log in
<img src="https://github.com/nimish-kumar/bookmyshow-clone/blob/main/demo/login.gif?raw=true" width="216" height="468" />

### Log out
<img src="https://github.com/nimish-kumar/bookmyshow-clone/blob/main/demo/logout.gif?raw=true" width="216" height="468" />


### Booking flow
<img src="https://github.com/nimish-kumar/bookmyshow-clone/blob/main/demo/appflow.gif?raw=true" width="216" height="468" />



## [Getting Started](#getting-started)

To get started with this project, follow the steps below:

1. Clone this repository to your local machine.
2. Install Expo CLI globally by running the following command:
   ```bash
   npm i -g expo-cli
   ```
3. Navigate to the project directory and install the dependencies by running:
   ```bash
   npm i
   ```
4. Register android application with `com.fasttech.bms` as android package and download `google-services.json` file. After completion of registration, install `eas-cli` globally for generating application build
   ```bash
   npm i -g eas-cli
   ```
5. Fetch SHA256 using following command
   ```bash
   eas credentials
   ```
6. Now add the certificate fingerprint in firebase console under Project settings > General > Your apps > `com.fasttech.bms` > Add fingerprint.
7. Once done install expo app from the app store on testing device/emulator and run
   ```bash
   eas build --profile development --platform android --local
   ```
   to generate development build locally, as it uses [react-native-firebase](https://rnfirebase.io/) and this can be later used in further development of app.
8. Once finished install the `apk file` on testing device.

## [Environment variables](#environment-variables)

Before running the project, make sure you have following environment variables in a .env file present in the root folder.

- FIREBASE_WEB_CLIENT_ID: client > oauth_client > client_id of client_type 3. This can be found in `google-services.json`.
- GRAPHQL_API_URL: Backend Graphql API url.

## [Running the Project](#running-the-project)

1.  Scan the QR code on expo app, generated using

```bash
npx expo start --dev-client
```

2. After scanning the QR code, it should open the generated development build which we manually installed.

| NOTE: If the development build fails locally due to `google-service.json` being not found by EAS, comment out `google-services.json` temporarily in `.gitgnore` and make sure `google-services.json` is present in root directory |

## [Project Structure](#project-structure)

The project follows [barrel exports](https://basarat.gitbook.io/typescript/main-1/barrel) as a standard. The structure is as follows:

- `App.tsx`: The main entry point of the Expo app.
- `src/components`: Contains reusable UI components.
- `src/__generated__`: Contains auto-generated typings from graphql server.
- `src/screens`: Contains the screens of the app.
- `src/navigation`: Contains the navigation configuration.
- `src/context`: Contains the context for managing the user authentication state.
- `src/utils`: Contains the utility functions for authentication, firebase, authentication, custom helper functions and constants.
- `src/types`: Contains typings used by components and functions across the project.
- `src/tailwind`: Contains configuration related to tailwind package [twrnc](https://www.npmjs.com/package/twrnc).
- `src/graphql`: Contains queries and mutations used in graphql.

## [Contributing](#contributing)

Contributions to this project are welcome. If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

When contributing, please follow the existing code style and ensure that your changes are well-documented and tested.
