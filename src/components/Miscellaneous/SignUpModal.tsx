// SgnUpModal.tsx
import React from 'react';

interface ModalProps {
  message: string;
  onClose: () => void;
}

const SgnUpModal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 mt-30 transition-all border border-gray-800 hover:border-blue-400">
      <h2 className="text-gray-600 dark:text-blue-300 mt-2 text-center">{message}</h2>
        <button
          onClick={onClose}
          className="mt-4 ml-28 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default SgnUpModal;