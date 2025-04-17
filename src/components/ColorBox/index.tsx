import { useRef } from "react";
import Button from "../Button";
import { COLORS, ColorType } from "../../constants";

type ColorBoxProps = {
  name: ColorType;
  color: string;
  onColorChange: (color: string) => void;
};

export const ColorBox = ({ name, color, onColorChange }: ColorBoxProps) => {
  const colorInputRef = useRef<HTMLInputElement>(null);

  const openColorPicker = () => {
    colorInputRef.current?.click();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(e.target.value);
  };

  return (
    <>
      <div className="w-full flex flex-col my-2">
        <p className="capitalize text-xs text-[#0C1083B2] mb-1">{name}</p>
        <div className="flex items-center justify-between border border-lightPurple p-2 w-full h-10 cursor-pointer relative">
          <div
            onClick={openColorPicker}
            className="flex items-center gap-1 bg-[#f2f2f2] p-0.5 rounded-full w-[92px]"
          >
            <div className="!size-5">
              <div
                className="size-5 rounded-full border-[2px] border-lightPurple"
                style={{ background: color }}
              />
            </div>

            <span className={`text-xs font-manrope`}>
              {color.toLowerCase()}
            </span>
          </div>
          <input
            ref={colorInputRef}
            type="color"
            aria-label="Color picker"
            className="absolute -top-5 -right-[30px] opacity-0 size-5 pointer-events-none"
            value={color}
            onChange={handleColorChange}
          />
          <div className="flex items-center gap-2">
            {COLORS[name].map((colorHex) => (
              <Button
                key={colorHex}
                label={`color ${colorHex}`}
                className="size-6 center"
                rounded="full"
                active={
                  color === colorHex || color === colorHex.toLocaleLowerCase()
                }
                onClick={() => onColorChange(colorHex)}
              >
                <div
                  className={`size-3.5 rounded-full ${
                    colorHex === "#ffffff" && "border border-lightPurple"
                  }`}
                  style={{ background: colorHex }}
                />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
