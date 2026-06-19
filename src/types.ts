export interface IAppearance {
  background: string;
  fieldBackground: string;
  accentColor: string;
  textColor: string;
  fontFamily: string;
  outlineWidth?: string;
  outlineColor?: string;
  outlineRadius?: string;
  borderRadius: string;
  borderColor: string;
  borderWidth: string;
  logo: string;
  backdropBlur: string;
  backdropColor: string;
  boxShadow: string;
}

// Supported UI language codes (ISO 639-1).
export type LanguageKey =
  | 'en'
  | 'es'
  | 'pt'
  | 'fr'
  | 'de'
  | 'ru'
  | 'zh'
  | 'ja'
  | 'ko';

// Block explorer used to build account/transaction links.
export type IExplorer = 'steexp' | 'stellarchain' | 'stellarexpert' | 'lumenscan';

// Canonical names of the wallets Blux can integrate with.
export type WalletName =
  | 'rabet'
  | 'albedo'
  | 'freighter'
  | 'xbull'
  | 'lobstr'
  | 'hana'
  | 'hot'
  | 'klever'
  | 'cactuslink'
  | 'fordefi'
  | 'trezor';
