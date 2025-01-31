import { useRef } from "react";
import Button from "../Button";
import { COLORS, ColorType } from "../../constants";

type ColorPickerProps = {
  type: ColorType;
  colors: typeof COLORS.background | typeof COLORS.accent | typeof COLORS.text;
  activeColor: string;
  customColor: string;
  onColorChange: (name: string) => void;
  onCustomColorChange: (color: string) => void;
};

export const ColorPicker = ({
  type,
  colors,
  activeColor,
  customColor,
  onColorChange,
  onCustomColorChange,
}: ColorPickerProps) => {
  const pickerRef = useRef<HTMLInputElement>(null);

  const handleColorClick = (name: string) => {
    if (name === "custom") {
      pickerRef.current?.click();
    }
    onColorChange(name);
  };

  return (
    <div className="flex flex-col space-y-4">
      <p className="capitalize">{type}</p>
      <div className="w-full flex flex-wrap gap-2">
        {colors.map(({ name, color }) => (
          <Button
            key={name}
            className="size-7 center"
            rounded="full"
            active={activeColor === name}
            onClick={() => handleColorClick(name)}
          >
            <div
              className={`size-[15.75px] rounded-full ${
                name === "white" && "border-2 border-lightPurple"
              }`}
              style={{
                background: name === "custom" ? customColor : color,
              }}
            />
          </Button>
        ))}
        <input
          ref={pickerRef}
          type="color"
          className="hidden"
          value={activeColor === "custom" ? customColor : ""}
          onChange={(e) => onCustomColorChange(e.target.value)}
        />
      </div>
    </div>
  );
};
