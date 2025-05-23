// FirstTimeUserModal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const FirstTimeUserModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-1/2 h-3/4 dark:bg-gray-800 p-4 rounded shadow-lg border border-blue-400 overflow-x-auto bg-gray-100">
        <h2 className="text-lg font-bold text-center">Welcome to Lecture Link!</h2>
        <p className=" font-bold text-center">Here are some instructions for the first-time users...</p>
        {children}
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white p-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default FirstTimeUserModal;