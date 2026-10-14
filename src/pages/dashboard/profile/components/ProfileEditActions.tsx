import { Pencil, Save, X } from 'lucide-react';

interface ProfileEditActionsProps {
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  editLabel?: string;
}

export function ProfileEditActions({
  isEditing,
  onEdit,
  onCancel,
  onSave,
  editLabel = 'Edit',
}: ProfileEditActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2 mt-8">
      {isEditing ? (
        <>
          <button
            type="button"
            onClick={onCancel}
            className="
              flex items-center gap-2
              px-4 py-2
              rounded-lg border border-gray-300
              font-medium text-gray-600 text-sm
              transition
              hover:bg-gray-50
            "
          >
            <X size={16} />
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            className="
              flex items-center gap-2
              px-4 py-2
              bg-pink-500 rounded-lg
              font-medium text-white text-sm
              transition
              hover:bg-pink-600
            "
          >
            <Save size={16} />
            Save
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={onEdit}
          aria-label={editLabel}
          title={editLabel}
          className="
            flex items-center justify-center gap-2
            px-4 py-2
            bg-pink-500 shadow-md rounded-xl
            text-white text-sm
            transition
            hover:bg-pink-600 hover:shadow-lg
          "
        >
          <Pencil size={16} />
          Edit
        </button>
      )}
    </div>
  );
}
