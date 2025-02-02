import { useAppearance } from "../../../hooks/useAppearanceContext";
import Button from "../../../components/Button";
import { ColorPicker } from "../../../components/ColorPicker";
import { CornerButtons, CUSTOM_GRADIENT, COLORS } from "../../../constants";
import ToggleSwitch from "../../../components/ToggleSwitch";

const Style = () => {
  const { appearance, updateAppearance } = useAppearance();

  return (
    <div className="flex flex-col text-primary space-y-3">
      {/* Mode Selection */}
      <div className="flex flex-col space-y-4">
        <p>Mode</p>
        <div className="w-full flex items-center gap-2">
          {["light", "dark"].map((m) => (
            <Button
              key={m}
              className="w-[120px] h-8"
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
        customColor={appearance.background || CUSTOM_GRADIENT}
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
        <p>Corner radius</p>
        <div className="w-full flex items-center gap-2">
          {CornerButtons.map((m) => (
            <Button
              key={m.name}
              rounded={m.radius}
              className="w-12 h-12 text-sm"
              active={appearance.cornerRadius === m.radius}
              onClick={() => updateAppearance("cornerRadius", m.radius)}
            >
              {m.name.charAt(0).toUpperCase() + m.name.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <hr className="border border-dashed border-lightPurple" />

      {/* Cover toggle */}
      <div className="w-full flex items-center justify-between pr-2">
        <span>Add a cover</span>
        <ToggleSwitch
          checked={appearance.cover !== ""}
          onChange={() => updateAppearance("cover", appearance.cover)}
        />
      </div>
    </div>
  );
};

export default Style;
