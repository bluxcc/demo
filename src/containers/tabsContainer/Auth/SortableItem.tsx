import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragHandle } from '../../../assets/Icons';
import { useConfigContext } from '../../../hooks/useConfigContext';

type SortableItemProps = {
  id: string;
  title?: string;
  children: React.ReactNode;
};

const SortableItem = ({ id, title, children }: SortableItemProps) => {
  const { theme } = useConfigContext();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col pointer-events-auto cursor-grab"
    >
      <span className="flex items-center py-2 mb-3 text-sm">
        <div className="mr-2 cursor-grab">
          <DragHandle fill={theme == 'dark' ? 'white' : '#A2A4F6'} />
        </div>

        {title && title}
      </span>
      <div
        className="flex flex-col gap-2"
        onPointerDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default SortableItem;
