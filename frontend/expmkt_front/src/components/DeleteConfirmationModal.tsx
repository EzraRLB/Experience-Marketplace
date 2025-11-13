interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function DeleteConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Delete Experience?",
  message = "This action cannot be undone. Are you sure you want to delete this experience?"
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-4">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}