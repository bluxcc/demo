import { IAppearance } from "./types";
import { LoginMethodType } from "./constants";
import { defaultLightTheme } from "./constants/themes";

export const generateCodeBlock = (
  appearance: IAppearance,
  loginMethods: LoginMethodType,
) => {
  const indent = "          ";

  const showableFields = Object.entries(appearance)
    .map(([key, val]) => [
      key,
      val,
      defaultLightTheme[key as keyof IAppearance] === val,
    ])
    .filter(([, , isDefault]) => !isDefault)
    .map(([key, val]) => `${indent}${key}: "${val}",`)
    .join("\n");

  const codeBlock = `import { BluxProvider, useBlux, networks } from "@bluxcc/react";

const LoginButton = () => {
  const { login } = useBlux();

  return <button onClick={login}>Login</button>;
};

const App = () => {
  return (
    <BluxProvider
      config={{
        appName: "Blux Demo",
        networks: [networks.mainnet],
        appearance: {
${showableFields}
        },
        loginMethods: [${loginMethods.map((x) => `"${x}"`).join(", ")}]
      }}
    >
      <LoginButton />
    </BluxProvider>
  );
};

export default App;`;

  return codeBlock;
};
