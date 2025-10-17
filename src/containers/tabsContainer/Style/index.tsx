import { useState } from "react";

import Button from "../../../components/Button";
import Select from "../../../components/Select";
import ColorBox from "../../../components/ColorBox";
import ToggleCollapse from "../../../components/ToggleCollapse";
import { useConfigContext } from "../../../hooks/useConfigContext";
// import CheckBox from "../../../components/CheckBox";

import sun from "/images/sun.svg";
import moon from "/images/moon.svg";
import sunFilled from "/images/sunFilled.svg";
import moonFilled from "/images/moonFilled.svg";

const Style = () => {
  const { appearance, updateAppearance, theme, setTheme } = useConfigContext();
  const [logoInputValue, setLogoInputValue] = useState("");

  const handleUpdateLogo = () => {
    updateAppearance("logo", logoInputValue);
  };

  // const [checked, setChecked] = useState(false);
  // const toggleChecked = () => {
  //   setChecked((prev) => !prev);
  //
  //   updateAppearance("includeBorders", checked);
  // };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateAppearance("logo", logoInputValue);
    }
  };

  const themes = [
    { name: "light", logo: sun, activeLogo: sunFilled },
    { name: "dark", logo: moon, activeLogo: moonFilled },
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
              onClick={() => setTheme(m.name as "light" | "dark")}
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
      <ToggleCollapse title="Color option">
        <div className="mt-3">
          <ColorBox
            mode={theme}
            name="background"
            color={appearance.background}
            onColorChange={(color) => updateAppearance("background", color)}
          />
          <ColorBox
            mode={theme}
            name="accent"
            color={appearance.accentColor}
            onColorChange={(color) => updateAppearance("accentColor", color)}
          />
          <ColorBox
            mode={theme}
            name="bgField"
            color={appearance.fieldBackground}
            onColorChange={(color) =>
              updateAppearance("fieldBackground", color)
            }
          />
          <ColorBox
            mode={theme}
            name="text"
            color={appearance.textColor}
            onColorChange={(color) => updateAppearance("textColor", color)}
          />
          <ColorBox
            mode={theme}
            name="border"
            color={appearance.borderColor}
            onColorChange={(color) => updateAppearance("borderColor", color)}
          />
        </div>
      </ToggleCollapse>

      <hr className="border border-dashed border-lightPurple" />

      <div className="between">
        <p className="text-xs text-[#0C1083B2]">Include border lines</p>
        {/*
          TODO: 
        <CheckBox
          checked={appearance.includeBorders}
          onChange={toggleChecked}
          borderColor="#cdceee"
        />

        */}
      </div>

      <Select
        name="Border width"
        values={[
          { name: "0.5px", value: "0.5px" },
          { name: "1px", value: "1px" },
          { name: "1.5px", value: "1.5px" },
          { name: "2px", value: "2px" },
        ]}
        defaultValue={{
          name: appearance.borderWidth,
          value: appearance.borderWidth.toLowerCase(),
        }}
        onChange={(item) => {
          updateAppearance("borderWidth", item.value);
        }}
        startItem={
          <img
            src="/images/borderIcon.svg"
            alt="border"
            width={20}
            height={20}
          />
        }
      />

      <Select
        name="Border radius"
        values={[
          { name: "None", value: "0px" },
          { name: "Sm", value: "8px" },
          { name: "Md", value: "16px" },
          { name: "Lg", value: "24px" },
          { name: "Round", value: "32px" },
        ]}
        defaultValue={{
          name: appearance.borderRadius,
          value: appearance.borderRadius.toLowerCase(),
        }}
        onChange={(item) => {
          updateAppearance("borderRadius", item.value);
        }}
        startItem={
          <img
            src="/images/roundedCorner.svg"
            alt="borderRadius"
            width={20}
            height={20}
          />
        }
      />

      <hr className="border border-dashed border-lightPurple " />

      <Select
        name="Font"
        values={[
          { name: "Manrope", value: "Manrope" },
          { name: "Inter", value: "Inter" },
          { name: "Lora", value: "Lora" },
          { name: "JetBrains", value: "JetbrainsMono" },
        ]}
        defaultValue={{
          name: appearance.font,
          value: appearance.font,
        }}
        onChange={(item) => {
          updateAppearance("font", item.value);
        }}
        startItem={
          <img src="/images/fontIcon.svg" alt="font" width={20} height={20} />
        }
      />

      <hr className="border border-dashed border-lightPurple" />

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
            we recommend using a logo with dimensions 40×152 px.
          </div>
        </div>
      </ToggleCollapse>
    </div>
  );
};

export default Style;
