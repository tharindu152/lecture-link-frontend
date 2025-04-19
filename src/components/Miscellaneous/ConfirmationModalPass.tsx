import { FC, useState } from 'react';

type Props = {
  isOpen: boolean;
  title: string;
  message: string;
  btnOne: string;
  btnTwo: string;
  onConfirm: (locale: string) => void;
  onClose: (locale: string) => void;
  submit?:boolean;
  password:string;
};

const ConfirmationModalPass: FC<Props> = ({
  isOpen,
  title,
  message,
  btnOne,
  btnTwo,
  onConfirm,
  onClose,
  submit,
  password,
}) => {
  if (!isOpen) return null;
  const [currentPassword, setCurrentPassword] = useState('');

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 mt-30 transition-all border border-gray-800 hover:border-gray-600">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{message}</p>
        <input
          type="password"
          placeholder="Enter your old password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="mt-2 p-2 border rounded w-full" // Add some styling
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-lg transition border-2 border-white dark:border-gray-800 hover:border-gray-600 dark:hover:border-gray-600"
            onClick={() => onClose()}
          >
            {btnTwo}
          </button>
          <button
            className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg transition border-2 border-white dark:border-gray-800 hover:border-red-900 dark:hover:border-red-400"
            type={submit ? 'submit' : 'button'}
            onClick={() => {
              onConfirm(currentPassword); // Pass the current password to onConfirm
              onClose();
            }}
          >
            {btnOne}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModalPass;
