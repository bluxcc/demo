import { useState } from "react";
import CheckBoxItem from "../../../components/CheckBoxItem";
import dragHandle from "/images/dragHandle.svg";

const Auth = () => {
  const [sections, setSections] = useState([
    {
      id: "wallet",
      title: "Wallet",
      items: [{ id: "stellar-wallets", title: "Stellar Wallets" }],
    },
    {
      id: "login-option",
      title: "Login option",
      items: [
        { id: "email", title: "Email", draggable: true },
        { id: "phone", title: "Phone", draggable: true },
      ],
    },
  ]);

  const [draggedSectionId, setDraggedSectionId] = useState<string | null>(null);

  const handleSectionDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    id: string
  ) => {
    setDraggedSectionId(id);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleSectionDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetId: string
  ) => {
    event.preventDefault();

    if (!draggedSectionId || draggedSectionId === targetId) return;

    const newSections = [...sections];
    const draggedIndex = newSections.findIndex(
      (section) => section.id === draggedSectionId
    );
    const targetIndex = newSections.findIndex(
      (section) => section.id === targetId
    );

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [movedSection] = newSections.splice(draggedIndex, 1);
      newSections.splice(targetIndex, 0, movedSection);
      setSections(newSections);
    }

    setDraggedSectionId(null);
  };

  return (
    <div className="flex flex-col text-primary space-y-3">
      <p className="font-manrope font-medium text-lg">Connect options</p>

      {sections.map((section, index) => (
        <div key={section.id}>
          {/* Draggable Section */}
          <div
            className="flex flex-col"
            draggable
            onDragStart={(e) => handleSectionDragStart(e, section.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleSectionDrop(e, section.id)}
          >
            <span className="text-sm flex items-center p-2 mb-3">
              <img
                className="mr-2 cursor-grab"
                src={dragHandle}
                alt="Draggable"
              />
              {section.title}
            </span>
            <div className="w-full flex items-center gap-2 flex-col">
              {section.items.map((item) => (
                <CheckBoxItem
                  key={item.id}
                  title={item.title}
                  draggable={item.draggable}
                />
              ))}
            </div>
          </div>

          {/* Divider*/}
          {index !== sections.length - 1 && (
            <hr className="border border-dashed border-lightPurple mt-4" />
          )}
        </div>
      ))}

      <hr className="border border-dashed border-lightPurple my-2" />
      <CheckBoxItem title="PassKey" initialChecked />
    </div>
  );
};

export default Auth;
