import { useRef } from "react";
import Select from "../Select";

type ColorSelectorProps = {
  name: string;
  color: string;
  onColorChange: (color: string) => void;
};

export const ColorSelector = ({
  name,
  color,
  onColorChange,
}: ColorSelectorProps) => {
  const colorInputRef = useRef<HTMLInputElement>(null);

  const openColorPicker = () => {
    colorInputRef.current?.click();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(e.target.value);
  };

  return (
    <Select
      type="colorPicker"
      name={name}
      onClick={openColorPicker}
      value={color}
      startItem={
        <div
          className="size-5 rounded-full border-[2px] border-lightPurple"
          style={{ background: color }}
        />
      }
    >
      <input
        ref={colorInputRef}
        type="color"
        aria-label="Color picker"
        className="absolute -top-5 -right-[30px] opacity-0 size-5 pointer-events-none"
        value={color}
        onChange={handleColorChange}
      />
    </Select>
  );
};
