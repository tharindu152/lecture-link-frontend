import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaStar } from 'react-icons/fa';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import DatePickerTwo from '../../components/Forms/DatePicker/DatePickerTwo.tsx';
import { useState } from 'react';
import { useMutation } from 'react-query';
import Loader from '../../common/Loader/Loader.tsx';
import lecturerService from '../../services/lecturerService.ts';
import Toast from '../../components/Toast.tsx';

const UpdateLecturerForm = () => {

  const [toast, setToast] = useState(null);

  const { mutate: createLecturer, isLoading: isCreatingLecturer } = useMutation(
    lecturerService.createLecturer,
    {
      onSuccess: () => {
        // @ts-ignore
        setToast({ message: "Lecturer created successfully!", type: "success" });
      },
      onError: () => {
        // @ts-ignore
        setToast({ message: "Lecturer creation is unsuccessful!", type: "error" });
      },
    },
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      email: '',
      district: '',
      contactNo: '',
      payRate: 0,
      dob: '',
      review: 0,
      isAssigned: false,
      status: 'ACTIVE',
      picture: null,
      preference: '',
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
          .required('Name is required')
          .min(2, 'Name must be at least 2 characters')
          .max(50, 'Name cannot exceed 50 characters'),
        password: Yup.string()
          .required('Password is required')
          .min(6, 'Password must be at least 6 characters')
          .max(50, 'Password cannot exceed 50 characters'),
        email: Yup.string()
          .required('Email is required')
          .email('Enter a valid email address'),
        district: Yup.string().required('District is required'),
        contactNo: Yup.string()
          .required('Contact number is required')
          .matches(/^\d{10}$/, 'Telephone must be a valid 10-digit number'),
        payRate: Yup.number()
          .required('Hourly rate is required')
          .integer('Hourly rate must be an integer')
          .positive('Hourly rate must be a positive value')
          .min(10, 'Hourly rate must be non-negative'),
        dob: Yup.date()
          .required('Date of birth is required')
          .nullable()
          .max(new Date(), 'Date of birth cannot be in the future'),
        review: Yup.number()
          .required('Rating is required')
          .min(0, 'Rating must be non-negative')
          .max(5, 'Rating cannot exceed 5'),
        isAssigned: Yup.boolean().required('Assignment status is required'),
        status: Yup.string()
          .required('Status is required')
          .oneOf(['ACTIVE', 'INACTIVE'], 'Status must be either ACTIVE or INACTIVE'),
        picture: Yup.mixed().nullable(),
        preference: Yup.string()
          .optional()
          .max(1000, 'Description cannot exceed 200 characters'),
      }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('password', values.password);
      formData.append('email', values.email);
      formData.append('district', values.district);
      formData.append('contactNo', values.contactNo);
      formData.append('payRate', values.payRate.toString());
      formData.append('dob', values.dob);
      formData.append('review', values.review?.toString() ?? '0');
      formData.append('isAssigned', String(values.isAssigned));
      formData.append('status', values.status);
      formData.append('preference', values.preference);
      if (values.picture) formData.append('picture', values.picture);
      console.log(formData)
      createLecturer({ lecturerConfig: formData });
    },
  });

  if (isCreatingLecturer) {
    return <Loader />;
  }

  // @ts-ignore
  return (
    <>
      <Breadcrumb pageName="Add/Update Lecturer" />
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 rounded-lg border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark"
      >
        <h2 className="text-lg font-medium mb-6 text-black dark:text-white">
          Update Lecturer
        </h2>

        {/* Name */}
        <div className="mb-4 flex items-center">
          <label
            className="block w-40 text-black dark:text-white"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name"
            className={`flex-1 rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
              formik.touched.name && formik.errors.name
                ? 'border-red-500'
                : 'border-gray-300 focus:border-primary'
            } dark:bg-gray-800`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </div>
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.name}</p>
        )}

        {/* Password */}
        <div className="mb-4 flex items-center">
          <label
            className="block w-40 text-black dark:text-white"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            className={`flex-1 rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
              formik.touched.password && formik.errors.password
                ? 'border-red-500'
                : 'border-gray-300 focus:border-primary'
            } dark:bg-gray-800`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.password}</p>
        )}

        {/* Email */}
        <div className="mb-4 flex items-center">
          <label
            className="block w-40 text-black dark:text-white"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
            className={`flex-1 rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
              formik.touched.email && formik.errors.email
                ? 'border-red-500'
                : 'border-gray-300 focus:border-primary'
            } dark:bg-gray-800`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.email}</p>
        )}

        {/* District */}
        <div className="mb-4 flex items-center">
          <label
            className="block w-40 text-black dark:text-white"
            htmlFor="district"
          >
            District
          </label>
          <input
            id="district"
            name="district"
            type="text"
            placeholder="Enter district"
            className={`flex-1 rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
              formik.touched.district && formik.errors.district
                ? 'border-red-500'
                : 'border-gray-300 focus:border-primary'
            } dark:bg-gray-800`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.district}
          />
        </div>
        {formik.touched.district && formik.errors.district && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.district}</p>
        )}

        {/* Telephone */}
        <div className="mb-4 flex items-center">
          <label
            className="block w-40 text-black dark:text-white"
            htmlFor="telephone"
          >
            Telephone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="text"
            placeholder="Enter telephone number"
            className={`flex-1 rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
              formik.touched.contactNo && formik.errors.contactNo
                ? 'border-red-500'
                : 'border-gray-300 focus:border-primary'
            } dark:bg-gray-800`}
            onChange={(e) => {
              formik.setFieldValue('contactNo', e.target.value);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.contactNo}
          />
        </div>
        {formik.touched.contactNo && formik.errors.contactNo && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.contactNo}</p>
        )}

        {/* Payment */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white" htmlFor="payment">
            Hourly Rate
          </label>
          <input
            id="payment"
            name="payment"
            type="number"
            placeholder="Enter Hourly Rate"
            className={`rounded-md border-[1.5px] py-2 px-3 outline-none w-52 text-center transition ${
              formik.touched.payRate && formik.errors.payRate
                ? 'border-red-500'
                : 'border-gray-300 focus:border-primary'
            } dark:bg-gray-800`}
            value={formik.values.payRate}
            onChange={(e) => {
              const value = e.target.value ? parseFloat(e.target.value) : 0;
              formik.setFieldValue('payRate', value);
            }}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.payRate && formik.errors.payRate && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.payRate}</p>
        )}

        {/* dob */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white" htmlFor="dob">
            Date of Birth
          </label>
          <DatePickerTwo
            id="dob"
            value={formik.values.dob}
            onChange={(date) => formik.setFieldValue('dob', date)}
          />
        </div>
        {formik.touched.dob && formik.errors.dob && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.dob}</p>
        )}


        {/* Rating */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white" htmlFor="rating">
            Rating
          </label>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              id={`rating-${star}`}
              key={star}
              onClick={() => formik.setFieldValue('review', star)}
              className={`mx-1 cursor-pointer text-2xl ${
                formik.values.review >= star
                  ? 'text-yellow-400'
                  : 'text-gray-500'
              }`}
            >
              <FaStar />
            </span>
          ))}
        </div>

        {/* isAssigned Toggle */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white" htmlFor="isAssigned">
            Is Assigned
          </label>
          <div
            id="isAssigned"
            onClick={() =>
              formik.setFieldValue('isAssigned', !formik.values.isAssigned)
            }
            className={`w-12 h-6 rounded-full cursor-pointer p-1 transition border-gray-300 ${
              formik.values.isAssigned ? 'bg-primary' : 'bg-gray-500'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                formik.values.isAssigned ? 'translate-x-6' : ''
              }`}
            ></div>
          </div>
        </div>

        {/* Status */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            className={`flex-1 rounded-md border-[1.5px] px-3 py-2 outline-none transition ${
              formik.touched.status && formik.errors.status
                ? 'border-red-500'
                : 'border-gray-300 focus:border-primary'
            } bg-white dark:bg-gray-800 dark:text-white`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
          >
            <option
              className="bg-white dark:bg-gray-800 dark:text-white"
              value="ACTIVE"
            >
              ACTIVE
            </option>
            <option
              className="bg-white dark:bg-gray-800 dark:text-white"
              value="INACTIVE"
            >
              INACTIVE
            </option>
          </select>
        </div>

        {/* Picture Upload */}
        <div className="mb-4 flex flex-wrap sm:flex-nowrap">
          <label className="block w-full sm:w-40 mb-2 sm:mb-0 text-black dark:text-white" htmlFor="FileUpload">
            Picture
          </label>
          <div
            id="FileUpload"
            className={`relative h-full w-full sm:flex-1 cursor-pointer border rounded bg-gray-50 py-4 px-4 sm:py-7.5 dark:bg-gray-800 dark:text-white ${
              formik.touched.picture && formik.errors.picture
                ? 'border-red-500'
                : 'border-gray-300 hover:border-primary'
            }`}
          >
            {/* File Input */}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 z-50 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                const file = e.currentTarget.files?.[0] || null;
                formik.setFieldValue('picture', file);
              }}
            />

            {/* Display File Name or Prompt */}
            <div className="flex flex-col items-center justify-center space-y-2">
              {/* Placeholder or File Name */}
              {formik.values.picture ? (
                <p className="text-sm text-primary truncate">
                  {formik.values.picture
                    // @ts-ignore
                    .name}
                </p>
              ) : (
                <>
          <span className="flex items-center justify-center h-10 w-10 rounded-full border dark:border-strokedark bg-white dark:bg-boxdark">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                fill="#3C50E0"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                fill="#3C50E0"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                fill="#3C50E0"
              />
            </svg>
          </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">(SVG, PNG, JPG, or GIF - max, 800px by 800px)</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4 flex flex-wrap sm:flex-nowrap items-start">
          <label
            className="w-full sm:w-40 mb-2 sm:mb-0 text-black dark:text-white"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter Description"
            className={`w-full sm:flex-1 rounded-md border-[1.5px] py-2 px-3 outline-none transition resize-none ${
              formik.touched.preference && formik.errors.preference
                ? 'border-red-500'
                : 'border-gray-300 focus:border-primary'
            } dark:bg-gray-800 dark:text-white h-32`}
            onChange={(e) => {
              formik.setFieldValue('preference', e.target.value);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.preference}
            rows={6}
          />
        </div>
        {formik.touched.preference && formik.errors.preference && (
          <p className="text-red-500 text-sm mb-4">
            {formik.errors.preference}
          </p>
        )}

        {/* Submit Button */}
        <button
          onClick={()=>formik.handleSubmit()}
          className="mt-6 w-full hover:bg-opacity-90 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-white"
          type="submit"
        >
          Update Lecturer
        </button>
      </form>
      {toast && <Toast {
                     // @ts-ignore
                     ...toast} onClose={() => setToast(null)} />}
    </>
  );
};

export default UpdateLecturerForm;