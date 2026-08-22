import { useState } from 'react';

import Button from '../../../components/Button';
import ColorBox from '../../../components/ColorBox';
import ToggleCollapse from '../../../components/ToggleCollapse';
import { useConfigContext } from '../../../hooks/useConfigContext';

import Input from '../../../components/Input';
import {
  BorderIcon,
  Close,
  ExclamationCircle,
  InfoIcon,
  Moon,
  MoonFilled,
  NeptunePlanet,
  RoundedCorner,
  Sparkles,
  Sun,
  SunFilled,
} from '../../../assets/Icons';
import { ThemeName } from '../../../types';

const Style = () => {
  const {
    appearance,
    updateAppearance,
    theme,
    isDarkMode,
    setTheme,
    setCustomLogo,
  } = useConfigContext();
  const [logoInputValue, setLogoInputValue] = useState('');

  const handleUpdateLogo = () => {
    updateAppearance('logo', logoInputValue);
    setCustomLogo(logoInputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdateLogo();
    }
  };

  const iconColor = isDarkMode ? 'white' : '#0C1083';
  const themes: Array<{
    name: ThemeName;
    label: string;
    logo: React.ReactNode;
    activeLogo: React.ReactNode;
  }> = [
    {
      name: 'light',
      label: 'Light',
      logo: <Sun fill={iconColor} />,
      activeLogo: <SunFilled fill={iconColor} />,
    },
    {
      name: 'dark',
      label: 'Dark',
      logo: <Moon fill={iconColor} />,
      activeLogo: <MoonFilled fill={iconColor} />,
    },
    {
      name: 'retro',
      label: 'Neptune',
      logo: <NeptunePlanet fill={iconColor} />,
      activeLogo: <NeptunePlanet fill="white" />,
    },
    {
      name: 'modern',
      label: 'Modern',
      logo: <Sparkles fill={iconColor} />,
      activeLogo: <Sparkles fill={iconColor} />,
    },
  ];
  const handleRemoveLogo = () => {
    updateAppearance('logo', '');
    setCustomLogo('');
  };
  return (
    <div className="flex flex-col space-y-4 text-primary dark:text-white/70">
      <p className="text-lg font-manrope-medium">Style</p>

      <div className="flex flex-col space-y-1">
        <div className="flex items-center gap-1.5">
          <p className="text-xs text-[#0C1083B2] dark:text-white">Theme</p>

          <div className="relative flex items-center group">
            <button
              type="button"
              aria-label="Theme information"
              className="flex items-center justify-center"
            >
              <InfoIcon fill={isDarkMode ? 'white' : '#0C1083B2'} />
            </button>

            <div
              role="tooltip"
              className="pointer-events-none invisible absolute left-0 top-full z-50 mt-2 w-[220px] rounded-md border border-lightPurple bg-white px-3 py-2 text-xs leading-relaxed text-[#4D4D4D] opacity-0 shadow-sm transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:border-darkBorder dark:bg-darkGray dark:text-white"
            >
              Selecting a theme resets all styles to the default theme provided
              by Blux.
            </div>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-2">
          {themes.map((m) => (
            <Button
              label={m.name}
              key={m.name}
              className={`w-full h-12 font-manrope-medium center gap-1 select-none ${
                m.name === 'retro' && theme === 'retro'
                  ? '!border-[#00f0ff] !bg-[#090d24] !text-white shadow-[3px_3px_0_#ff2bd6]'
                  : ''
              }`}
              active={theme === m.name}
              onClick={() => setTheme(m.name)}
            >
              {theme === m.name ? m.activeLogo : m.logo}
              {m.label}
            </Button>
          ))}
        </div>
      </div>

      <hr className="border border-dashed border-lightPurple dark:border-darkBorder" />
      <ToggleCollapse title="Color options">
        <div className="mt-3">
          <ColorBox
            mode={isDarkMode ? 'dark' : 'light'}
            name="background"
            color={appearance.background}
            onColorChange={(color) => updateAppearance('background', color)}
          />
          <ColorBox
            mode={isDarkMode ? 'dark' : 'light'}
            name="accentColor"
            color={appearance.accentColor}
            onColorChange={(color) => updateAppearance('accentColor', color)}
          />
          <ColorBox
            mode={isDarkMode ? 'dark' : 'light'}
            name="fieldBackground"
            color={appearance.fieldBackground}
            onColorChange={(color) =>
              updateAppearance('fieldBackground', color)
            }
          />
          <ColorBox
            mode={isDarkMode ? 'dark' : 'light'}
            name="textColor"
            color={appearance.textColor}
            onColorChange={(color) => updateAppearance('textColor', color)}
          />
          <ColorBox
            mode={isDarkMode ? 'dark' : 'light'}
            name="borderColor"
            color={appearance.borderColor}
            onColorChange={(color) => updateAppearance('borderColor', color)}
          />
          <ColorBox
            mode={isDarkMode ? 'dark' : 'light'}
            name="outlineColor"
            color={appearance.outlineColor ?? '0'}
            onColorChange={(color) => updateAppearance('outlineColor', color)}
          />
        </div>
      </ToggleCollapse>

      <hr className="border border-dashed border-lightPurple dark:border-darkBorder" />

      <ToggleCollapse
        title="Font options"
        defaultOpen={false}
        info="Choose a preset or use any custom font you prefer."
      >
        <div className="flex flex-col mt-3 space-y-2">
          <p className="capitalize text-xs text-[#0C1083B2] dark:text-white/70">
            Font family
          </p>
          <div className="grid w-full grid-cols-2 gap-2">
            {[
              { name: 'Manrope', value: 'Manrope', class: 'font-manrope' },
              {
                name: 'Playfair Display',
                value: 'Playfair',
                class: 'font-playfair',
              },
              {
                name: 'JetBrains Mono',
                value: 'JetbrainsMono',
                class: 'font-jetbrainsMono',
              },
              {
                name: 'Space Grotesk',
                value: 'Space Grotesk',
                class: 'font-spaceGrotesk',
              },
            ].map((font) => {
              const isActive = appearance.fontFamily === font.value;
              return (
                <Button
                  key={font.name}
                  className={`h-8 text-xs ${font.class} ${
                    isActive ? 'font-medium border border-[#0C1083B2]' : ''
                  }`}
                  active={isActive}
                  onClick={() => updateAppearance('fontFamily', font.value)}
                >
                  {font.name}
                </Button>
              );
            })}
          </div>
        </div>
      </ToggleCollapse>

      <hr className="border border-dashed border-lightPurple dark:border-darkBorder" />

      <ToggleCollapse title="Border options">
        <div className="mt-3 space-y-2">
          <Input
            defaultValue={parseInt(appearance.borderWidth ?? '0')}
            value={parseInt(appearance.borderWidth ?? '0')}
            maxValue={3}
            minValue={1}
            startIcon={
              <BorderIcon fill={isDarkMode ? 'white' : '#0C1083'} />
            }
            label="Border width"
            onChange={(item) => {
              updateAppearance('borderWidth', `${item}px`);
            }}
          />

          <Input
            defaultValue={parseInt(appearance.borderRadius ?? '0')}
            value={parseInt(appearance.borderRadius ?? '0')}
            maxValue={50}
            startIcon={
              <RoundedCorner fill={isDarkMode ? 'white' : '#0C1083'} />
            }
            label="Border Radius"
            onChange={(item) => {
              updateAppearance('borderRadius', `${item}px`);
            }}
          />
        </div>
      </ToggleCollapse>
      <hr className="border border-dashed border-lightPurple dark:border-darkBorder" />

      <ToggleCollapse title="Outline options" defaultOpen={false}>
        <div className="mt-3 space-y-2">
          <Input
            defaultValue={parseInt(appearance.outlineWidth ?? '0')}
            value={parseInt(appearance.outlineWidth ?? '0')}
            maxValue={6}
            startIcon={
              <BorderIcon fill={isDarkMode ? 'white' : '#0C1083'} />
            }
            label="outline width"
            onChange={(item) => {
              updateAppearance('outlineWidth', `${item}px`);
            }}
          />

          <Input
            defaultValue={parseInt(appearance.outlineRadius ?? '0')}
            value={parseInt(appearance.outlineRadius ?? '0')}
            maxValue={38}
            startIcon={
              <RoundedCorner fill={isDarkMode ? 'white' : '#0C1083'} />
            }
            label="outline Radius"
            onChange={(item) => {
              updateAppearance('outlineRadius', `${item}px`);
            }}
          />
        </div>
      </ToggleCollapse>

      <hr className="border border-dashed border-lightPurple dark:border-darkBorder" />

      <ToggleCollapse
        title="Insert logo"
        defaultOpen={false}
        info="Add your own logo to replace the default Blux branding."
      >
        <div className="mt-3 space-y-2">
          {appearance.logo && (
            <div className="flex justify-start w-full gap-1.5">
              <div
                style={{
                  background: appearance.background,
                }}
                className="flex items-center border border-dashed border-lightPurple dark:border-darkBorder overflow-hidden p-2 max-h-[44px] max-w-[165px]"
              >
                <img
                  src={appearance.logo}
                  alt="Logo"
                  height={50}
                  width={152}
                  className="max-w-[180px] max-h-[80px]"
                />
              </div>

              <button
                type="button"
                onClick={handleRemoveLogo}
                aria-label="Remove logo"
                className="flex shrink-0 items-center justify-center size-4 border border-dashed border-lightPurple dark:border-darkBorder text-[#4D4D4D] dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-darkGray transition-colors"
              >
                <Close fill={isDarkMode ? 'white' : '#0D1292'} />
              </button>
            </div>
          )}
          <div className="relative flex items-center w-full h-12 px-3 py-4 text-sm border font-manrope border-lightPurple dark:border-darkBorder">
            <input
              type="text"
              aria-label="logo link"
              onKeyDown={handleKeyDown}
              onChange={(e) => setLogoInputValue(e.target.value)}
              placeholder="Paste your logo link here"
              className="focus:outline-none placeholder:text-[#4D4D4D] bg-transparent"
            />
            <button
              onClick={handleUpdateLogo}
              className="absolute font-manrope-medium right-[10px] w-[62px] h-[32px] center rounded-[32px] border border-lightPurple dark:border-darkBorder text-primary dark:text-white text-xs"
            >
              Update
            </button>
          </div>
          <div className="border inline-flex gap-3 bg-[#E5FBFF] text-xs p-[10px] font-manrope-medium border-[#99F0FF] dark:border-darkBorder dark:bg-darkGray text-[#333333] dark:text-white">
            <ExclamationCircle fill={isDarkMode ? 'white' : '#0C1083'} />
            Use a logo sized 40 × 152 px for best results.
          </div>
        </div>
      </ToggleCollapse>
    </div>
  );
};

export default Style;

{
  /* <Select
          name="Font family"
          values={[
            { name: 'Manrope', value: 'Manrope' },
            { name: 'Playfair', value: 'Playfair' },
            { name: 'JetBrains', value: 'JetbrainsMono' },
          ]}
          defaultValue={{
            name: appearance.fontFamily,
            value: appearance.fontFamily,
          }}
          onChange={(item) => {
            updateAppearance('fontFamily', item.value);
          }}
          startItem={
          }
        /> */
}
