// NavigateModal.tsx
import React from 'react';

interface ModalProps {
  message: string;
  onConfirm: (locale: string) => void;
  onClose: (locale: string) => void;
  submit?:boolean;
  btnOne: string;
  btnTwo: string;
}

const NavigateModal: React.FC<ModalProps> = ({ message, onClose, onConfirm, submit, btnOne, btnTwo }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 mt-30 transition-all border border-gray-800 hover:border-blue-400">
      <h2 className="text-gray-600 dark:text-blue-300 mt-2 text-center">{message}</h2>
      <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-lg transition border-2 border-white dark:border-gray-800 hover:border-gray-600 dark:hover:border-gray-600"
            type={`${submit ? 'submit' : 'button'}`}
            onClick={() =>
              // @ts-ignore
              onConfirm()
            }
          >
            {btnTwo}
          </button>
          <button
            className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg transition border-2 border-white dark:border-gray-800 hover:border-red-900 dark:hover:border-red-400"
            onClick={() =>
              // @ts-ignore
              onClose()}
          >
            {btnOne}
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default NavigateModal;