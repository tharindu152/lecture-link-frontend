import flatpickr from 'flatpickr';
import { useEffect, useRef } from 'react';

interface DatePickerTwoProps {
  value: string;
  onChange: (date: string) => void;
  id?: string;
}

const DatePickerTwo = ({ value, onChange, id }: DatePickerTwoProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Initialize flatpickr with binding to value and onChange handler
    if (inputRef.current) {
      flatpickr(inputRef.current, {
        mode: 'single',
        static: true,
        monthSelectorType: 'static',
        dateFormat: 'Y-m-d', // Updated format to align with 'yyyy-MM-dd'
        defaultDate: value, // Default value passed through props
        prevArrow:
          '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
        nextArrow:
          '<svg className="fill-current" width="7" height="11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
        onChange: (selectedDates) => {
          if (selectedDates[0]) {
            // Format date to 'YYYY-MM-DD' without using UTC timezone
            const date = selectedDates[0];
            const formattedDate =
              date.getFullYear() +
              '-' +
              String(date.getMonth() + 1).padStart(2, '0') +
              '-' +
              String(date.getDate()).padStart(2, '0');
            onChange(formattedDate);
          }
        },
      });
    }
  }, [value, onChange]);

  return (
    <div>
      <div className="relative">
        <input
          id={id}
          ref={inputRef}
          className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          placeholder="yyyy-MM-dd"
          data-class="flatpickr-right"
          value={value} // Controlled value from props
          readOnly // Ensures flatpickr manages the input value
        />

        <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.0002 12.8249C8.83145 12.8249 8.69082 12.7687 8.5502 12.6562L2.08145 6.2999C1.82832 6.04678 1.82832 5.65303 2.08145 5.3999C2.33457 5.14678 2.72832 5.14678 2.98145 5.3999L9.0002 11.278L15.0189 5.34365C15.2721 5.09053 15.6658 5.09053 15.9189 5.34365C16.1721 5.59678 16.1721 5.99053 15.9189 6.24365L9.45019 12.5999C9.30957 12.7405 9.16895 12.8249 9.0002 12.8249Z"
              fill="#64748B"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DatePickerTwo;
