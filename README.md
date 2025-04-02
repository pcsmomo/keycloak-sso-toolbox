# AS SSO Toolbox

Repo: [as-sso-toolbox](https://bitbucket.synchrotron.org.au/projects/ST/repos/as-sso-toolbox/browse)

SSO Toolbox is a module of functions that facilitate the use of Single Sign-On services to our authentication server.

## Dependencies

- [Node.js](https://nodejs.org/en/) - Latest tested with v20
- [NPM](https://docs.npmjs.com/) - Latest tested with v10

## Installation

Install via local NPM registry:

```sh
# install package
npm install as-sso-toolbox --registry=https://npm.asci.synchrotron.org.au
```

## Updating

In order to publish an updated package:

1. Bump version number in the `package.json` and `package-lock.json`

2. Build & publish package: \

    ```sh
    # build package
    npm run build

    # set package registry
    npm config set registry https://npm.asci.synchrotron.org.au

    # publish package
    npm publish
    ```

3. Commit code to repo `main` branch \
   (Do this step last, otherwise the pipeline will try to bump the version without publishing the updates)

4. Update the package in relevant repos: \

    ```sh
    npm update as-sso-toolbox --registry=https://npm.asci.synchrotron.org.au
    ```

## Usage

You'll need to wrap your application in `SingleSignOnProvider` which will provide the right context to the other components.

The redirect URL hostname is taken from the client set at `clientId`, so ensure you're using the correct SSO client ID for your app.

Refer to the [example](#example) below.

## Example

### SingleSignOnProvider

```jsx harmony
import App from "@/App.tsx";
import { SingleSignOnProvider, KeycloakConfig } from "as-sso-toolbox";

const keycloakConfig: KeycloakConfig = {
  url: "Keycloak URL",
  realm: "keycloak realm",
  clientId: "keycloak client id",
};

export const Main = () => {
  return (
    <SingleSignOnProvider keycloakConfig={keycloakConfig}>
      <div>App</div>
    </SingleSignOnProvider>
  );
};
```

### useSingleSignOn

```jsx harmony
import { useSingleSignOn } from "as-sso-toolbox";

export const Header = (props: AccountProps) => {
  const { logout } = useSingleSignOn();

  return <button onClick={() => logout()}>Logout</button>
}
```

## Changes

[v2 -> v3 schema chnages](./docs/sso-context-v2-v3-changes.md)
