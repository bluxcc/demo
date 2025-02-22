import { useRef } from "react";
import Button from "../Button";
import { COLORS, ColorType, CUSTOM_GRADIENT } from "../../constants";

type ColorPickerProps = {
  type: ColorType;
  colors: typeof COLORS.background | typeof COLORS.accent | typeof COLORS.text;
  activeColor: string;
  customColor: string;
  onColorChange: (color: string) => void;
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

  const handleColorClick = (name: string, color: string) => {
    if (name === "custom") {
      pickerRef.current?.click();
    }
    onColorChange(color);
  };

  return (
    <div className="flex flex-col space-y-4">
      <p className="capitalize text-sm">{type}</p>
      <div className="w-full flex flex-wrap gap-2 relative">
        {colors.map(({ name, color }) => (
          <Button
            key={name}
            className="size-7 center"
            rounded="full"
            active={activeColor === color || activeColor === name}
            onClick={() => handleColorClick(name, color)}
          >
            <div
              className={`size-[15.75px] rounded-full ${
                name === "white" && "border-2 border-lightPurple"
              }`}
              style={{
                background:
                  name === "custom" ? CUSTOM_GRADIENT || customColor : color,
              }}
            />
          </Button>
        ))}
        <input
          ref={pickerRef}
          type="color"
          className="absolute top-3 opacity-0 w-[20px] h-[20px] pointer-events-none"
          value={customColor}
          onChange={(e) => onCustomColorChange(e.target.value)}
        />
      </div>
    </div>
  );
};
