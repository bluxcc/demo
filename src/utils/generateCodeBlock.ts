import { IAppearance } from '../types';
import { LoginMethodType } from '../constants';
import { defaultLightTheme } from '../constants/themes';

export const generateCodeBlock = (
  appearance: IAppearance,
  loginMethods: LoginMethodType,
) => {
  const indent = '          ';

  const showableFields = Object.entries(appearance)
    .map(([key, val]) => [
      key,
      val,
      defaultLightTheme[key as keyof IAppearance] === val,
    ])
    .filter(([, , isDefault]) => !isDefault)
    .map(([key, val]) => `${indent}${key}: "${val}",`);

  const hasEmailLogin = loginMethods.includes('email');

  // Build config safely
  const configLines: string[] = [
    `appName: "Blux Demo",`,
    `networks: [networks.mainnet],`,
  ];

  if (showableFields.length > 0) {
    configLines.push(`appearance: {\n${showableFields.join('\n')}\n        },`);
  }

  configLines.push(
    `loginMethods: [${loginMethods.map((x) => `"${x}"`).join(', ')}],`,
  );

  if (hasEmailLogin) {
    configLines.push(
      `appId: "YOUR_APP_ID", // Required for email login (get it from dashboard.blux.cc)`,
    );
  }

  const codeBlock = `import { BluxProvider, useBlux, networks } from "@bluxcc/react";

const LoginButton = () => {
  const { login } = useBlux();

  return <button onClick={login}>Login</button>;
};

const App = () => {
  return (
    <BluxProvider
      config={{
        ${configLines.join('\n        ')}
      }}
    >
      <LoginButton />
    </BluxProvider>
  );
};

export default App;`;

  return codeBlock;
};
