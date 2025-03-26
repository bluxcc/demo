import { useState } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import CheckBoxItem from "../../../components/CheckBoxItem";

const Auth = () => {
  const [sections, setSections] = useState([
    {
      id: "wallet",
      title: "Wallet",
      items: [
        { id: "stellar-wallets", title: "Stellar Wallets", checked: true },
      ],
    },
    {
      id: "login-option",
      title: "Login Option",
      items: [
        { id: "email", title: "Email", checked: false },
        { id: "phone", title: "Phone", checked: false },
      ],
    },
  ]);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSections((prevSections) => {
      const oldIndex = prevSections.findIndex((s) => s.id === active.id);
      const newIndex = prevSections.findIndex((s) => s.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return prevSections;

      return arrayMove(prevSections, oldIndex, newIndex);
    });
  };
  const handleItemChange = (title: string, checked: boolean) => {
    setSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        items: section.items.map((item) =>
          item.title === title ? { ...item, checked } : item
        ),
      }))
    );
    console.log(sections);
    console.log("Item changed:", title, checked);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div className="flex flex-col text-primary space-y-3">
        <p className="font-manrope font-medium text-lg">Connect Options</p>

        <SortableContext
          items={sections}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section, index) => (
            <div key={section.id}>
              <SortableItem id={section.id} title={section.title}>
                {section.items.map((item) => (
                  <CheckBoxItem
                    key={item.id}
                    title={item.title}
                    checked={item.checked ?? false}
                    onChange={handleItemChange}
                  />
                ))}
              </SortableItem>
              {index !== sections.length - 1 && (
                <hr
                  key={`hr-${section.id}`}
                  className="border border-dashed border-lightPurple mt-4"
                />
              )}
            </div>
          ))}
        </SortableContext>

        <hr className="border border-dashed border-lightPurple my-2" />
        <CheckBoxItem
          title="PassKey"
          checked={true}
          onChange={handleItemChange}
        />
      </div>
    </DndContext>
  );
};

export default Auth;
