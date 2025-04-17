import { useState } from "react";
import Button from "../../../components/Button";
// import { ColorPicker } from "../../../components/ColorPicker";

// import { CornerButtons, Fonts } from "../../../constants";
import { useConfigContext } from "../../../hooks/useConfigContext";

import sun from "/images/sun.svg";
import moon from "/images/moon.svg";
import { ColorBox } from "../../../components/ColorBox";
import Select from "../../../components/Select";
import ToggleCollapse from "../../../components/ToggleCollapse";
import CheckBox from "../../../components/CheckBox";

const Style = () => {
  const { appearance, updateAppearance } = useConfigContext();
  const [logoInputValue, setLogoInputValue] = useState("");

  const [checked, setChecked] = useState(false);

  const handleUpdateLogo = () => {
    updateAppearance("logo", logoInputValue);
  };

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateAppearance("logo", logoInputValue);
    }
  };

  const themes = [
    { name: "light", logo: sun },
    { name: "dark", logo: moon },
  ];

  return (
    <div className="flex flex-col text-primary space-y-3">
      {/* Mode Selection */}
      <p className="text-lg font-medium font-manrope">Style</p>

      <div className="flex flex-col space-y-1">
        <p className="text-xs text-[#0C1083B2]">Theme</p>
        <div className="w-full center gap-2">
          {themes.map((m) => (
            <Button
              label={m.name}
              key={m.name}
              className={`w-full h-12 font-manrope center gap-1 font-medium`}
              active={appearance.theme === m.name}
              onClick={() => updateAppearance("theme", m.name)}
            >
              <img
                src={m.logo}
                alt={m.name}
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
            name="background"
            color={appearance.background}
            onColorChange={(color) => updateAppearance("background", color)}
          />
          <ColorBox
            name="accent"
            color={appearance.accent}
            onColorChange={(color) => updateAppearance("accent", color)}
          />
          <ColorBox
            name="bgField"
            color={appearance.bgField}
            onColorChange={(color) => updateAppearance("bgField", color)}
          />
          <ColorBox
            name="text"
            color={appearance.textColor}
            onColorChange={(color) => updateAppearance("textColor", color)}
          />
          <ColorBox
            name="border"
            color={appearance.borderColor}
            onColorChange={(color) => updateAppearance("borderColor", color)}
          />
        </div>
      </ToggleCollapse>

      <hr className="border border-dashed border-lightPurple" />

      <Select
        name="Corner radius"
        values={[
          { name: "None", value: "0px" },
          { name: "Sm", value: "4px" },
          { name: "Md", value: "8px" },
          { name: "Lg", value: "16px" },
          { name: "Full", value: "32px" },
        ]}
        defaultValue={{
          name: appearance.cornerRadius,
          value: appearance.cornerRadius.toLowerCase(),
        }}
        onChange={(item) => {
          updateAppearance("cornerRadius", item.value);
        }}
        startItem={
          <img
            src="/images/roundedCorner.svg"
            alt="cornerRadius"
            width={20}
            height={20}
          />
        }
      />

      <hr className="border border-dashed border-lightPurple" />

      <div className="between">
        <p className="text-xs text-[#0C1083B2]">Include border lines</p>
        <CheckBox
          checked={checked}
          onChange={toggleChecked}
          borderColor="#cdceee"
        />
      </div>

      <Select
        name="Border width"
        values={[
          { name: "1px", value: "1px" },
          { name: "1.5px", value: "1.5px" },
          { name: "2px", value: "2px" },
        ]}
        defaultValue={{
          name: appearance.borderWidth,
          value: appearance.borderWidth.toLowerCase(),
        }}
        onChange={(item) => {
          updateAppearance("borderWidth", item.name);
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
      <hr className="border border-dashed border-lightPurple " />

      <Select
        name="Font"
        values={[
          { name: "Inter", value: "inter" },
          { name: "Manrope", value: "manrope" },
          { name: "Lora", value: "lora" },
          { name: "JetBrains", value: "jetbrains" },
        ]}
        defaultValue={{
          name: appearance.font,
          value: appearance.font.toLowerCase(),
        }}
        onChange={(item) => {
          updateAppearance("font", item.name);
        }}
        startItem={<img src="/images/fontIcon.svg" alt="font" />}
      />

      <hr className="border border-dashed border-lightPurple" />

      <ToggleCollapse title="Insert logo" defaultOpen={false}>
        <div className="space-y-2 mt-3">
          {appearance.logo && (
            <div className="w-full flex justify-end">
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
          <div className="font-manrope py-4 px-3 w-full border text-sm border-lightPurple h-12 flex items-center relative">
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
              className="absolute font-medium right-[10px] w-[62px] h-[32px] center rounded-[32px] border border-lightPurple text-primary text-xs"
            >
              Update
            </button>
          </div>
          <div className="border inline-flex gap-3 bg-[#E5FBFF] text-xs p-[10px] font-manrope font-medium border-[#99F0FF] text-[#333333]">
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
