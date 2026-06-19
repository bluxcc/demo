import { IAppearance } from '../types';
import { LoginMethodType } from '../constants';
import { defaultLightTheme } from '../constants/themes';

export const generateCodeBlock = (
  appearance: IAppearance,
  loginMethods: LoginMethodType,
  options?: {
    language?: string;
    explorer?: string;
    excludeWallets?: string[];
    orderWallets?: string[];
    promptOnWrongNetwork?: boolean;
  },
) => {
  const indent = '          ';

  const {
    language = 'en',
    explorer = 'stellarchain',
    excludeWallets = [],
    orderWallets = [],
    promptOnWrongNetwork = true,
  } = options ?? {};

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

  if (language !== 'en') {
    configLines.push(`lang: "${language}",`);
  }

  if (explorer !== 'stellarchain') {
    configLines.push(`explorer: "${explorer}",`);
  }

  if (excludeWallets.length > 0) {
    configLines.push(
      `excludeWallets: [${excludeWallets.map((x) => `"${x}"`).join(', ')}],`,
    );
  }

  if (orderWallets.length > 0) {
    configLines.push(
      `orderWallets: [${orderWallets.map((x) => `"${x}"`).join(', ')}],`,
    );
  }

  if (!promptOnWrongNetwork) {
    configLines.push(`promptOnWrongNetwork: false,`);
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
