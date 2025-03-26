import { useState } from "react";
import CheckBoxItem from "../../../components/CheckBoxItem";
import dragHandle from "/images/dragHandle.svg";

const Auth = () => {
  const [sections, setSections] = useState([
    {
      id: "wallet",
      title: "Wallet",
      items: [
        { id: "stellar-wallets", title: "Stellar Wallets", draggable: false },
      ],
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

  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [draggedSectionId, setDraggedSectionId] = useState<string | null>(null);

  // Handle section drag start
  const handleSectionDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    id: string
  ) => {
    setDraggedSectionId(id);
    event.dataTransfer.effectAllowed = "move";
  };

  // Handle section drop
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

  // Handle item drag start (for email and phone)
  const handleItemDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    id: string
  ) => {
    setDraggedItemId(id);
    event.dataTransfer.effectAllowed = "move";
  };

  // Handle item drop (within the login-option section)
  const handleItemDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetId: string
  ) => {
    event.preventDefault();

    if (!draggedItemId || draggedItemId === targetId) return;

    const newSections = [...sections];
    const sectionIndex = newSections.findIndex(
      (section) => section.id === "login-option"
    );

    if (sectionIndex !== -1) {
      const section = newSections[sectionIndex];
      const draggedIndex = section.items.findIndex(
        (item) => item.id === draggedItemId
      );
      const targetIndex = section.items.findIndex(
        (item) => item.id === targetId
      );

      if (draggedIndex !== -1 && targetIndex !== -1) {
        const [movedItem] = section.items.splice(draggedIndex, 1);
        section.items.splice(targetIndex, 0, movedItem);
        setSections(newSections);
      }
    }

    setDraggedItemId(null);
  };

  return (
    <div className="flex flex-col text-primary space-y-3">
      <p className="font-manrope font-medium text-lg">Connect options</p>

      {sections.map((section, index) => (
        <div key={section.id} className=" transition-all duration-1000">
          {/* Draggable Section */}
          <div
            className="flex flex-col"
            draggable
            onDragStart={(e) => handleSectionDragStart(e, section.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleSectionDrop(e, section.id)}
          >
            <span className="text-sm flex items-center py-2 mb-3">
              <img
                className="mr-2 cursor-grab"
                src={dragHandle}
                alt="Draggable"
              />
              {section.title}
            </span>
            <div className="w-full flex items-center gap-2 flex-col  transition-all duration-1000">
              {section.items.map((item) => (
                <CheckBoxItem
                  key={item.id}
                  title={item.title}
                  draggable={item.draggable}
                  onDragStart={(e) => handleItemDragStart(e, item.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleItemDrop(e, item.id)}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
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
