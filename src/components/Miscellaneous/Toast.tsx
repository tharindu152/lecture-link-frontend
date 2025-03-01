import { FC, useEffect } from 'react';

type Props = {
  type: string;
  message: string;
  onClose: (locale: string) => void;
};

const Toast: FC<Props> = ({ message, type, onClose }) =>  {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-25 right-5 px-4 py-3 rounded-lg shadow-lg transition-
        ${type === "success"
        ? "bg-green-600 text-white dark:bg-green-700"
        : "bg-red-600 text-white dark:bg-red-700"
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
