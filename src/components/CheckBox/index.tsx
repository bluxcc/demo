import React from 'react';
import { WhiteCheck } from '../../assets/Icons';
import { useConfigContext } from '../../hooks/useConfigContext';

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
  const { theme } = useConfigContext();

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
        style={{ borderColor: theme === 'dark' ? 'white' : borderColor }}
        className={`flex size-5 border items-center justify-center transition duration-100 ease-in-out transform ${
          checked
            ? 'bg-primary !border-primary dark:!border-white dark:bg-white'
            : 'bg-transparent'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {checked && (
          <div className="select-none">
            <WhiteCheck fill={theme === 'dark' ? 'black' : 'white'} />
          </div>
        )}
      </button>
    </div>
  );
};

export default CheckBox;
