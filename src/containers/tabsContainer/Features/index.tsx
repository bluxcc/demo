import { useState } from "react";
import CheckBoxItem from "../../../components/CheckBoxItem";

const Features = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "Send",
    "Swap",
    "Receive",
    "History",
    "Balances",
  ]);

  console.log(selectedFeatures);
  const handleFeatureChange = (title: string, checked: boolean) => {
    setSelectedFeatures((prev) =>
      checked ? [...prev, title] : prev.filter((item) => item !== title)
    );
  };

  return (
    <div className="flex flex-col text-primary space-y-3">
      <div className="flex flex-col space-y-4">
        <p className="text-lg font-medium font-manrope">Features</p>
        <div className="w-full flex flex-col items-center gap-2">
          <CheckBoxItem
            title="Send"
            onChange={handleFeatureChange}
            initialChecked
          />
          <CheckBoxItem
            title="Swap"
            onChange={handleFeatureChange}
            initialChecked
          />
          <CheckBoxItem
            title="Receive"
            onChange={handleFeatureChange}
            initialChecked
          />
        </div>
      </div>

      <hr className="border border-dashed border-lightPurple" />
      <div className="w-full flex flex-col items-center gap-2">
        <CheckBoxItem
          title="History"
          onChange={handleFeatureChange}
          initialChecked
        />
        <CheckBoxItem
          title="Balances"
          onChange={handleFeatureChange}
          initialChecked
        />
      </div>
    </div>
  );
};

export default Features;
