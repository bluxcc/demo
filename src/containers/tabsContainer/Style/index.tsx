import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { ColorPicker } from "../../../components/ColorPicker";

import { CornerButtons, COLORS, Fonts } from "../../../constants";
import { useConfigContext } from "../../../hooks/useConfigContext";

// import ToggleSwitch from "../../../components/ToggleSwitch";

const Style = () => {
  const { appearance, updateAppearance } = useConfigContext();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputValue === "") {
      updateAppearance("logo", "/images/blackBluxLogo.svg");
    }
  }, []);

  const handleUpdateLogo = () => {
    updateAppearance("logo", inputValue);
  };

  const fontClasses: Record<string, string> = {
    inter: "font-inter",
    jetbrains: "font-jetbrains",
    lora: "font-lora",
    manrope: "font-manrope",
  };

  return (
    <div className="flex flex-col text-primary space-y-3">
      {/* Mode Selection */}
      <div className="flex flex-col space-y-4">
        <p className="text-sm">Mode</p>
        <div className="w-full flex items-center justify-center px-3 gap-2">
          {["light", "dark"].map((m) => (
            <Button
              key={m}
              className={`w-full h-8 font-manrope ${
                appearance.theme === m && "font-medium"
              }`}
              disabled={m === "dark"}
              active={appearance.theme === m}
              onClick={() => updateAppearance("theme", m)}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <hr className="border border-dashed border-lightPurple" />

      {/* Color Pickers */}
      <ColorPicker
        type="background"
        colors={COLORS.background}
        activeColor={appearance.background}
        customColor={appearance.background}
        onColorChange={(color) => updateAppearance("background", color)}
        onCustomColorChange={(color) => updateAppearance("background", color)}
      />

      <ColorPicker
        type="accent"
        colors={COLORS.accent}
        activeColor={appearance.accent}
        customColor={appearance.accent}
        onColorChange={(color) => updateAppearance("accent", color)}
        onCustomColorChange={(color) => updateAppearance("accent", color)}
      />

      <hr className="border border-dashed border-lightPurple" />

      <div className="flex flex-col space-y-4">
        <p className="text-sm">Font</p>
        <div className="w-full grid grid-cols-2 gap-2 px-3">
          {Fonts.map((m) => (
            <Button
              key={m.name}
              className={`w-full h-8 ${
                fontClasses[m.name.toLowerCase()] || ""
              } ${appearance.font === m.value ? "font-medium" : ""}`}
              active={appearance.font === m.value}
              onClick={() => updateAppearance("font", m.value)}
            >
              {m.name.charAt(0).toUpperCase() + m.name.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <ColorPicker
        type="text"
        colors={COLORS.text}
        activeColor={appearance.textColor}
        customColor={appearance.textColor}
        onColorChange={(color) => updateAppearance("textColor", color)}
        onCustomColorChange={(color) => updateAppearance("textColor", color)}
      />

      <hr className="border border-dashed border-lightPurple" />

      {/* Corner radius buttons */}
      <div className="flex flex-col space-y-4">
        <p className="text-sm">Corner radius</p>
        <div className="w-full flex items-center gap-2">
          {CornerButtons.map((m) => (
            <Button
              key={m.name}
              rounded={m.radius}
              className="size-12 text-xs font-medium font-manrope"
              active={appearance.cornerRadius === m.radius}
              onClick={() => updateAppearance("cornerRadius", m.radius)}
            >
              {m.name.charAt(0).toUpperCase() + m.name.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Cover toggle */}

      <hr className="border border-dashed border-lightPurple" />

      <div className="w-full flex-col flex pr-2 space-y-4">
        <p className="text-sm">Brand logo</p>
        <div className="font-manrope py-4 px-3 w-full border text-sm border-lightPurple h-12 flex items-center relative">
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
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
          <img src="/images/exclamationCircle.svg" alt="exclamation" />
          we recommend using a logo with dimensions 40×152 px.
        </div>
      </div>
    </div>
  );
};

export default Style;
