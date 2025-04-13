import { useEffect, useState } from "react";
import Button from "../../../components/Button";
// import { ColorPicker } from "../../../components/ColorPicker";

// import { CornerButtons, Fonts } from "../../../constants";
import { useConfigContext } from "../../../hooks/useConfigContext";

import sun from "/images/sun.svg";
import moon from "/images/moon.svg";
import { ColorSelector } from "../../../components/ColorSelector";
import Select from "../../../components/Select";
import ToggleCollapse from "../../../components/ToggleCollapse";
import CheckBox from "../../../components/CheckBox";

const Style = () => {
  const { appearance, updateAppearance } = useConfigContext();
  const [logoInputValue, setLogoInputValue] = useState("");
  const [borderInputValue, setBorderInputValue] = useState("1");
  const [CornerInputValue, setCornerInputValue] = useState("16");
  const [checked, setChecked] = useState(false);

  const handleUpdateLogo = () => {
    updateAppearance("logo", logoInputValue);
  };

  useEffect(() => {
    updateAppearance("borderWidth", borderInputValue + "px");
    updateAppearance("cornerRadius", CornerInputValue + "px");
  }, [borderInputValue, CornerInputValue]);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateAppearance("logo", logoInputValue);
    }
  };

  // const fontClasses: Record<string, string> = {
  //   inter: "font-inter",
  //   jetbrains: "font-jetbrains",
  //   lora: "font-lora",
  //   manrope: "font-manrope",
  // };

  const themes = [
    { name: "light", logo: sun },
    { name: "dark", logo: moon },
  ];

  return (
    <div className="flex flex-col text-primary space-y-3">
      {/* Mode Selection */}
      <p className="text-lg font-medium font-manrope">Style</p>

      <div className="flex flex-col space-y-4">
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
        <div className="mt-3 space-y-2">
          <ColorSelector
            name="background"
            color={appearance.background}
            onColorChange={(color) => updateAppearance("background", color)}
          />
          <ColorSelector
            name="text"
            color={appearance.textColor}
            onColorChange={(color) => updateAppearance("textColor", color)}
          />
          <ColorSelector
            name="accent"
            color={appearance.accent}
            onColorChange={(color) => updateAppearance("accent", color)}
          />
          <ColorSelector
            name="bgField"
            color={appearance.bgField}
            onColorChange={(color) => updateAppearance("bgField", color)}
          />
          <ColorSelector
            name="border"
            color={appearance.borderColor}
            onColorChange={(color) => updateAppearance("borderColor", color)}
          />
        </div>
      </ToggleCollapse>

      <hr className="border border-dashed border-lightPurple" />

      <Select
        type="select"
        name="Font"
        onClick={() => {}}
        value="Manrope"
        startItem={<img src="/images/fontIcon.svg" alt="font" />}
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
        type="input"
        name="Border width"
        startItem={
          <img
            src="/images/borderIcon.svg"
            alt="border"
            width={20}
            height={20}
          />
        }
      >
        <input
          type="number"
          value={borderInputValue}
          aria-label="border width"
          placeholder={appearance.borderWidth}
          min={0}
          max={5}
          onChange={(e) => {
            const value = Math.max(0, Math.min(5, Number(e.target.value)));
            setBorderInputValue(value.toString());
          }}
          className="focus:outline-none placeholder:text-primary text-sm max-w-[94px]"
        />
      </Select>
      <hr className="border border-dashed border-lightPurple " />

      <Select
        type="input"
        name="Corner radius"
        startItem={
          <img
            src="/images/roundedCorner.svg"
            alt="cornerRadius"
            width={20}
            height={20}
          />
        }
      >
        <input
          type="number"
          value={CornerInputValue}
          aria-label="Corner Radius"
          placeholder={appearance.borderWidth}
          min={0}
          max={44}
          onChange={(e) => {
            const value = Math.max(0, Math.min(44, Number(e.target.value)));
            setCornerInputValue(value.toString());
          }}
          className="focus:outline-none placeholder:text-primary text-sm max-w-[94px]"
        />
      </Select>

      <hr className="border border-dashed border-lightPurple" />

      <ToggleCollapse title="Insert logo" defaultOpen={false}>
        <div className="space-y-2 mt-3">
          {appearance.logo && (
            <div className="w-full flex justify-end">
              <div className="flex border border-dashed border-lightPurple overflow-hidden p-2 max-h-[36px] max-w-[150px]">
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
