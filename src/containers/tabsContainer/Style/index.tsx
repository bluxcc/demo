import { useState } from "react";
import Button from "../../../components/Button";
import { ColorPicker } from "../../../components/ColorPicker";
import {
  BackgroundColor,
  AccentColor,
  TextColor,
  COLORS,
  CUSTOM_GRADIENT,
  CornerButtons,
  RadiusValues,
} from "../../../constants";
import ToggleSwitch from "../../../components/ToggleSwitch";

const Style = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [corner, setCorner] = useState<{ name: string; radius: RadiusValues }>({
    name: "none",
    radius: "none",
  });
  const [isOn, setIsOn] = useState(false);

  const [background, setBackground] = useState<{
    active: BackgroundColor;
    custom: string;
  }>({
    active: "white",
    custom: CUSTOM_GRADIENT,
  });
  const [accent, setAccent] = useState<{
    active: AccentColor;
    custom: string;
  }>({
    active: "red",
    custom: CUSTOM_GRADIENT,
  });
  const [text, setText] = useState<{
    active: TextColor;
    custom: string;
  }>({
    active: "black",
    custom: CUSTOM_GRADIENT,
  });

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
              active={mode === m}
              onClick={() => setMode(m as "light" | "dark")}
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
        activeColor={background.active}
        customColor={background.custom}
        onColorChange={(name) =>
          setBackground((prev) => ({
            ...prev,
            active: name as BackgroundColor,
          }))
        }
        onCustomColorChange={(color) =>
          setBackground({ active: "custom", custom: color })
        }
      />

      <ColorPicker
        type="accent"
        colors={COLORS.accent}
        activeColor={accent.active}
        customColor={accent.custom}
        onColorChange={(name) =>
          setAccent((prev) => ({ ...prev, active: name as AccentColor }))
        }
        onCustomColorChange={(color) =>
          setAccent({ active: "custom", custom: color })
        }
      />

      <hr className="border border-dashed border-lightPurple" />

      <ColorPicker
        type="text"
        colors={COLORS.text}
        activeColor={text.active}
        customColor={text.custom}
        onColorChange={(name) =>
          setText((prev) => ({ ...prev, active: name as TextColor }))
        }
        onCustomColorChange={(color) =>
          setText({ active: "custom", custom: color })
        }
      />
      <hr className="border border-dashed border-lightPurple" />

      <div className="flex flex-col space-y-4">
        <p>Corner radius</p>
        <div className="w-full flex items-center gap-2">
          {CornerButtons.map((m) => (
            <Button
              key={m.name}
              rounded={m.radius as RadiusValues}
              className="w-12 h-12 text-sm"
              active={corner.name === m.name}
              onClick={() =>
                setCorner({
                  name: m.name,
                  radius: m.radius as RadiusValues,
                })
              }
            >
              {m.name.charAt(0).toUpperCase() + m.name.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <hr className="border border-dashed border-lightPurple" />

      <div className="w-full flex items-center justify-between pr-2">
        <span>Add a cover</span>
        <ToggleSwitch
          checked={isOn}
          onChange={() => setIsOn((prev) => !prev)}
        />
      </div>
    </div>
  );
};
export default Style;
