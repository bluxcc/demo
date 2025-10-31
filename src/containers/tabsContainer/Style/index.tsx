import { useState } from 'react';

import Button from '../../../components/Button';
import ColorBox from '../../../components/ColorBox';
import ToggleCollapse from '../../../components/ToggleCollapse';
import { useConfigContext } from '../../../hooks/useConfigContext';

import sun from '/images/sun.svg';
import moon from '/images/moon.svg';
import sunFilled from '/images/sunFilled.svg';
import moonFilled from '/images/moonFilled.svg';
import Input from '../../../components/Input';

const Style = () => {
  const { appearance, updateAppearance, theme, setTheme } = useConfigContext();
  const [logoInputValue, setLogoInputValue] = useState('');

  const handleUpdateLogo = () => {
    updateAppearance('logo', logoInputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateAppearance('logo', logoInputValue);
    }
  };

  const themes = [
    { name: 'light', logo: sun, activeLogo: sunFilled },
    { name: 'dark', logo: moon, activeLogo: moonFilled },
  ];

  return (
    <div className="flex flex-col space-y-4 text-primary">
      <p className="text-lg font-manrope-medium">Style</p>

      <div className="flex flex-col space-y-1">
        <p className="text-xs text-[#0C1083B2]">Theme</p>
        <div className="w-full gap-2 center">
          {themes.map((m) => (
            <Button
              label={m.name}
              key={m.name}
              className={`w-full h-12 font-manrope-medium center gap-1 select-none`}
              active={theme === m.name}
              onClick={() => setTheme(m.name as 'light' | 'dark')}
            >
              <img
                src={theme === m.name ? m.activeLogo : m.logo}
                alt="theme"
                className="w-6 h-6"
                width={24}
                height={24}
              />
              {m.name.charAt(0).toUpperCase() + m.name.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <hr className="border border-dashed border-lightPurple" />
      <ToggleCollapse title="Color options">
        <div className="mt-3">
          <ColorBox
            mode={theme}
            name="background"
            color={appearance.background}
            onColorChange={(color) => updateAppearance('background', color)}
          />
          <ColorBox
            mode={theme}
            name="accentColor"
            color={appearance.accentColor}
            onColorChange={(color) => updateAppearance('accentColor', color)}
          />
          <ColorBox
            mode={theme}
            name="fieldBackground"
            color={appearance.fieldBackground}
            onColorChange={(color) =>
              updateAppearance('fieldBackground', color)
            }
          />
          <ColorBox
            mode={theme}
            name="textColor"
            color={appearance.textColor}
            onColorChange={(color) => updateAppearance('textColor', color)}
          />
          <ColorBox
            mode={theme}
            name="borderColor"
            color={appearance.borderColor}
            onColorChange={(color) => updateAppearance('borderColor', color)}
          />
          <ColorBox
            mode={theme}
            name="outlineColor"
            color={appearance.outlineColor ?? '0'}
            onColorChange={(color) => updateAppearance('outlineColor', color)}
          />
        </div>
      </ToggleCollapse>

      <hr className="border border-dashed border-lightPurple" />

      <ToggleCollapse title="Font options" defaultOpen={false}>
        <div className="flex flex-col mt-3 space-y-2">
          <p className="capitalize text-xs text-[#0C1083B2]">Font family</p>
          <div className="grid w-full grid-cols-2 gap-2">
            {[
              { name: 'Manrope', value: 'Manrope', class: 'font-manrope' },
              {
                name: 'Comic Neue',
                value: 'ComicNeue',
                class: 'font-comicNeue',
              },
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

      <hr className="border border-dashed border-lightPurple" />

      <ToggleCollapse title="Border options">
        <div className="mt-3 space-y-2">
          <Input
            defaultValue={parseInt(appearance.borderWidth ?? '0')}
            value={parseInt(appearance.borderWidth ?? '0')}
            maxValue={3}
            minValue={1}
            startIcon={
              <img
                src="/images/borderIcon.svg"
                alt="border"
                width={20}
                height={20}
              />
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
              <img
                src="/images/roundedCorner.svg"
                alt="borderRadius"
                width={20}
                height={20}
              />
            }
            label="Border Radius"
            onChange={(item) => {
              updateAppearance('borderRadius', `${item}px`);
            }}
          />
        </div>
      </ToggleCollapse>
      <hr className="border border-dashed border-lightPurple " />

      <ToggleCollapse title="Outline options" defaultOpen={false}>
        <div className="mt-3 space-y-2">
          <Input
            defaultValue={parseInt(appearance.outlineWidth ?? '0')}
            value={parseInt(appearance.outlineWidth ?? '0')}
            maxValue={6}
            startIcon={
              <img
                src="/images/borderIcon.svg"
                alt="border"
                width={20}
                height={20}
              />
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
              <img
                src="/images/roundedCorner.svg"
                alt="borderRadius"
                width={20}
                height={20}
              />
            }
            label="outline Radius"
            onChange={(item) => {
              updateAppearance('outlineRadius', `${item}px`);
            }}
          />
        </div>
      </ToggleCollapse>

      <hr className="border border-dashed border-lightPurple " />

      <ToggleCollapse title="Insert logo" defaultOpen={false}>
        <div className="mt-3 space-y-2">
          {appearance.logo && (
            <div className="flex justify-end w-full">
              <div
                style={{
                  background: appearance.background,
                }}
                className="flex border border-dashed border-lightPurple overflow-hidden p-2 max-h-[36px] max-w-[150px]"
              >
                <img
                  src={appearance.logo}
                  alt="Logo"
                  height={60}
                  width={152}
                  className="max-w-[180px] max-h-[80px]"
                />
              </div>
            </div>
          )}
          <div className="relative flex items-center w-full h-12 px-3 py-4 text-sm border font-manrope border-lightPurple">
            <input
              type="text"
              aria-label="logo link"
              onKeyDown={handleKeyDown}
              onChange={(e) => setLogoInputValue(e.target.value)}
              placeholder="Paste your logo link here"
              className="focus:outline-none placeholder:text-[#4D4D4D]"
            />
            <button
              onClick={handleUpdateLogo}
              className="absolute font-manrope-medium right-[10px] w-[62px] h-[32px] center rounded-[32px] border border-lightPurple text-primary text-xs"
            >
              Update
            </button>
          </div>
          <div className="border inline-flex gap-3 bg-[#E5FBFF] text-xs p-[10px] font-manrope-medium border-[#99F0FF] text-[#333333]">
            <img
              src="/images/exclamationCircle.svg"
              alt="exclamation"
              width={20}
              height={32}
            />
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
            { name: 'ComicNeue', value: 'ComicNeue' },
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
            <img src="/images/fontIcon.svg" alt="font" width={20} height={20} />
          }
        /> */
}
