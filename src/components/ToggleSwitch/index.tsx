interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

const ToggleSwitch = ({ checked, onChange }: ToggleSwitchProps) => {
  return (
    <button
      type="button"
      aria-label="toggle switch"
      className={`w-10 h-5 flex items-center rounded-full border  p-1 transition-colors
        ${checked ? "border-primary" : "border-[#9999B6]"}`}
      onClick={onChange}
    >
      <div
        className={`w-3 h-3 rounded-full  transition-transform 
        ${
          checked
            ? "translate-x-[18px] bg-primary"
            : "translate-x-0 bg-[#9999B6]"
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;
