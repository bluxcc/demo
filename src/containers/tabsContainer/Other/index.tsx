import Select from '../../../components/Select';
import MultiSelect from '../../../components/MultiSelect';
import CheckBoxItem from '../../../components/CheckBoxItem';
import { useConfigContext } from '../../../hooks/useConfigContext';
import { EXPLORERS, LANGUAGES, WALLETS } from '../../../constants';
import { IExplorer, LanguageKey } from '../../../types';

const Other = () => {
  const {
    language,
    setLanguage,
    explorer,
    setExplorer,
    excludeWallets,
    setExcludeWallets,
    orderWallets,
    setOrderWallets,
    promptOnWrongNetwork,
    setPromptOnWrongNetwork,
  } = useConfigContext();

  return (
    <div className="flex flex-col space-y-4 text-primary dark:text-white/70">
      <p className="text-lg font-manrope-medium">Other</p>

      <div className="flex flex-col space-y-4">
        <Select
          name="Language"
          values={LANGUAGES}
          defaultValue={LANGUAGES.find((item) => item.value === language)}
          onChange={(item) => setLanguage(item.value as LanguageKey)}
        />

        <Select
          name="Explorer"
          values={EXPLORERS}
          defaultValue={EXPLORERS.find((item) => item.value === explorer)}
          onChange={(item) => setExplorer(item.value as IExplorer)}
        />

        <MultiSelect
          name="Exclude wallets"
          values={WALLETS}
          selected={excludeWallets}
          placeholder="None"
          onChange={setExcludeWallets}
        />

        <MultiSelect
          name="Order wallets"
          values={WALLETS}
          selected={orderWallets}
          placeholder="Default"
          showOrder
          onChange={setOrderWallets}
        />
      </div>

      <hr className="border border-dashed border-lightPurple dark:border-darkBorder" />

      <CheckBoxItem
        title="Prompt on wrong network"
        checked={promptOnWrongNetwork}
        onChange={(_, checked) => setPromptOnWrongNetwork(checked)}
      />
    </div>
  );
};

export default Other;
