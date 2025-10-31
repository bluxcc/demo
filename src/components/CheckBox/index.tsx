import React from 'react';
import whiteCheck from '/images/whiteCheck.svg';

type CheckBoxProps = {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  borderColor?: string;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onChange,
  disabled = false,
  borderColor = '#0d1292',
}) => {
  const toggleChecked = () => {
    if (!disabled) {
      onChange();
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        aria-label="checkbox"
        className="hidden"
        checked={checked}
        onChange={toggleChecked}
        disabled={disabled}
      />

      <button
        id="bluxcc-button"
        onClick={toggleChecked}
        style={{ borderColor }}
        className={`flex size-5 border items-center justify-center transition duration-100 ease-in-out transform ${
          checked ? 'bg-primary !border-primary' : 'bg-transparent'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {checked && (
          <img
            src={whiteCheck}
            alt="check"
            className="select-none"
            draggable="false"
          />
        )}
      </button>
    </div>
  );
};

export default CheckBox;
