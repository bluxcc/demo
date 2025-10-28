import { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import CheckBoxItem from '../../../components/CheckBoxItem';
import { useConfigContext } from '../../../hooks/useConfigContext';
import { LoginMethodType } from '../../../constants';

const Auth = () => {
  const { updateLoginMethods, loginMethods } = useConfigContext();

  const [sections, setSections] = useState([
    {
      id: 'wallet',
      title: 'Wallet',
      items: [
        {
          id: 'wallet',
          title: 'Stellar Wallets',
          checked: loginMethods.includes('wallet'),
        },
      ],
    },
    {
      id: 'email',
      title: 'Email',
      items: [
        {
          id: 'email',
          title: 'Email',
          checked: loginMethods.includes('email'),
          disabled: false,
        },
      ],
    },
  ]);

  const [passkeyChecked, setPasskeyChecked] = useState(
    loginMethods.includes('passkey'),
  );

  useEffect(() => {
    setPasskeyChecked(loginMethods.includes('passkey'));
  }, [loginMethods]);

  const updateCheckedValues = () => {
    const checkedItems = sections
      .flatMap((section) => section.items)
      .filter((item) => item.checked)
      .map((item) => item.id);

    if (passkeyChecked) {
      checkedItems.push('passkey');
    }

    updateLoginMethods(checkedItems as LoginMethodType);
  };

  useEffect(() => {
    updateCheckedValues();
  }, [sections, passkeyChecked]);

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
    const allItems = sections.flatMap((s) => s.items);
    const itemCheckedCount = allItems.filter((i) => i.checked).length;
    const totalChecked = itemCheckedCount + (passkeyChecked ? 1 : 0);
    const isPasskey = title === 'Passkey';

    if (!checked && totalChecked === 1) return;

    if (isPasskey) {
      setPasskeyChecked(checked);
      return;
    }

    setSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        items: section.items.map((item) =>
          item.title === title ? { ...item, checked } : item,
        ),
      })),
    );
  };

  return (
    <div className="overflow-hidden">
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <div className="flex flex-col space-y-3 text-primary">
          <p className="text-lg font-manrope-medium">Login Methods</p>

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
                      checked={loginMethods.includes(
                        item.id as (typeof loginMethods)[number],
                      )}
                      onChange={handleItemChange}
                    />
                  ))}
                </SortableItem>
                {index !== sections.length - 1 && (
                  <hr className="mt-4 border border-dashed border-lightPurple" />
                )}
              </div>
            ))}
          </SortableContext>

          <hr className="my-2 border border-dashed border-lightPurple" />
          <CheckBoxItem
            title="Passkey"
            checked={passkeyChecked}
            onChange={handleItemChange}
          />
        </div>
      </DndContext>
    </div>
  );
};

export default Auth;
