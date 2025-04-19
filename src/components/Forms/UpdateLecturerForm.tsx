import { useFormik } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from '../Breadcrumbs/Breadcrumb.tsx';
import { useMutation } from 'react-query';
import lecturerService from '../../services/lecturerService.ts';
import Loader from '../../common/Loader/Loader.tsx';
import { useEffect, useState } from 'react';
import Toast from '../Miscellaneous/Toast.tsx';
import { useData, useDispatcher } from '../../context/MainContext.tsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Status } from '../../types/enums/status.ts';
import ConfirmationModal from '../Miscellaneous/ConfirmationModal.tsx';
import { LecturerRes } from '../../types/lecturerTypes/lecturerRes.ts';
import NavigateModal from '../Miscellaneous/NavigateModal.tsx';
import { PrefferedTimeSlot } from '../../types/enums/prefferedTimeSlot.ts';
import { Language } from '../../types/enums/language.ts';

const UpdateLecturerForm = () => {
  const [toast, setToast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  // @ts-ignore
  const lecturer: LecturerRes = useData();
  const navigate = useNavigate();
  const dispatch = useDispatcher();
  const location = useLocation();
  const { pathname } = location;
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);

  const districtOptions = [
    'Ampara',
    'Anuradhapura',
    'Badulla',
    'Batticaloa',
    'Colombo',
    'Galle',
    'Gampaha',
    'Hambantota',
    'Jaffna',
    'Kalutara',
    'Kandy',
    'Kegalle',
    'Kilinochchi',
    'Kurunegala',
    'Mannar',
    'Matale',
    'Matara',
    'Monaragala',
    'Mullaitivu',
    'Nuwara Eliya',
    'Polonnaruwa',
    'Puttalam',
    'Ratnapura',
    'Trincomalee',
    'Vavuniya',
  ];

  const { mutate: updateLecturerMultipart, isLoading: isUpdatingLecturerMultipart } =
    useMutation(lecturerService.updateLecturerMultipart, {
      onSuccess: () => {
        setToast({
          // @ts-ignore
          message: 'Lecturer updated successfully!',
          type: 'success',
        });
        dispatch({ type: 'delete' });
      },
      onError: () => {
        setToast({
          // @ts-ignore
          message: 'Lecturer update is unsuccessful!',
          type: 'error',
        });
      },
    });

  const { mutate: updateLecturerJson, isLoading: isUpdatingLecturerJson } =
    useMutation(lecturerService.updateLecturerJson, {
      onSuccess: () => {
        setToast({
          // @ts-ignore
          message: `${pathname.includes("settings") ? 'Settings updated successfully!. Please login again' : 'Lecturer updated successfully!'}`,
          type: 'success',
        });
        !pathname.includes("settings") && dispatch({ type: 'delete' });
      },
      onError: () => {
        setToast({
          // @ts-ignore
          message: `${pathname.includes("settings") ? 'Settings' : 'Lecturer'} update is unsuccessful!`,
          type: 'error',
        });
      },
    });

  const { mutate: deactivateLecturer, isLoading: isDeactivating } = useMutation(
    lecturerService.deactivateLecturer, // This should be the function that calls your API
    {
      onSuccess: () => {
        setToast({
          // @ts-ignore
          message: 'Account deactivated successfully!',
          type: 'success',
        });
        // Optionally, navigate to login or home page
        navigate('/auth/signin'); // Adjust the path as necessary
      },
      onError: () => {
        setToast({
          // @ts-ignore
          message: 'Failed to deactivate account. Please try again.',
          type: 'error',
        });
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      id: lecturer?.id,
      name: lecturer?.name,
      password: lecturer?.password,
      email: lecturer?.email,
      district: lecturer?.district,
      contactNo: lecturer?.contactNo ?? '',
      hourlyPayRate: lecturer?.hourlyPayRate ?? 0,
      subscribed: lecturer?.subscribed ?? false,
      picture: undefined,
      status: lecturer?.status ?? Status.ACTIVE,
      preference: lecturer?.preference ?? '',
      timePreference: lecturer?.timePreference ?? PrefferedTimeSlot.WEEKDAY,
      mapsLocation: lecturer?.mapsLocation ?? '',
      fieldOfWork: lecturer?.fieldOfWork ?? '',
      lecturingExperience: lecturer?.lecturingExperience ?? 0,
      language: lecturer?.language ?? Language.ENGLISH,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required')
        .max(255, 'Name must not exceed 255 characters'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_]?)[A-Za-z\d_]{15,16}$/,
          'Password must be 16 characters long and include at least one uppercase letter, one lowercase letter,' +
          ' and one number. No special characters allowed other than underscore ',
        )
        .required('Password is required'),
      district: Yup.string()
        .required('District is required')
        .max(500, 'District must not exceed 500 characters'),
      contactNo: Yup.string()
        .matches(
          /^(?:\+94|0)?(?:7[01245678]\d{7}|1\d{8})$/,
          'Invalid Sri Lankan contactNo number',
        )
        .nullable(),
      preference: Yup.string()
        .max(1000, 'preference must not exceed 1000 characters')
        .nullable(),
      hourlyPayRate: Yup.number()
        .required('hourlyPayRate is required')
        .positive('hourlyPayRate must be greater than 0'),
      fieldOfWork: Yup.string()
        .nullable(),
      lecturingExperience: Yup.number()
        .nullable(),
      timePreference: Yup.string()
        .required('Time Preference is required')
        .oneOf(['WEEKDAY', 'WEEKEND', 'FLEXIBLE'], 'Invalid Time Preference'),
      subscribed: Yup.boolean().required('subscribed status is required'),
      mapsLocation: Yup.string().required('Map Location is required'),
      picture: Yup.mixed().nullable(),
      status: Yup.string()
        .required('Status is required')
        .oneOf(['ACTIVE', 'INACTIVE'], 'Invalid status'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('district', values.district);
      formData.append('hourlyPayRate', values.hourlyPayRate.toString());
      formData.append('subscribed', String(values.subscribed));
      formData.append('status', values.status);
      formData.append('preference', values.preference);
      formData.append('timePreference', values.timePreference);
      formData.append('language', values.language);
      formData.append('mapsLocation', values.mapsLocation);
      formData.append('fieldOfWork', values.fieldOfWork);
      formData.append('lecturingExperience', values.lecturingExperience.toString());
      // @ts-ignore
      formData.append('picture', values.picture);
      if (values.contactNo) formData.append('contactNo', values.contactNo);

      // @ts-ignore
      formik.values.picture?.size > 0 ?
        updateLecturerMultipart({
          lecturerId: lecturer?.id,
          lecturerConfig: formData,
        }) :
        updateLecturerJson({
          lecturerId: lecturer?.id,
          lecturerConfig: values,
        });
    },
  });

  const [loading, setLoading] = useState(true);

  const handleDeactivate = () => {
    deactivateLecturer({ lecturerId: lecturer.id });
    navigate('/auth/signin');
    setShowModal(false);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    navigate('/app/profile');
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isUpdatingLecturerMultipart || isUpdatingLecturerJson ||  isDeactivating || loading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb
        pageName={`${pathname.includes("settings") ? 'Account Settings' : 'Update Lecturer'}`}
      />
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 rounded-lg border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark"
      >
        <h2 className="text-lg font-medium mb-6 text-black dark:text-white">
          {`${pathname.includes("settings") ? 'Account Settings' : 'Update Lecturer'}`}
        </h2>

        {pathname.includes('update') && (
          <>
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
                    : 'border-gray-800 focus:border-primary'
                } dark:bg-gray-800`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mb-4">{formik.errors.name}</p>
            )}
          </>
        )}

        {/* Password */}
        {!pathname?.includes('update') && (
          <>
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
                    : 'border-gray-800 focus:border-primary'
                } dark:bg-gray-800`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mb-4">
                {formik.errors.password}
              </p>
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
                    : 'border-gray-800 focus:border-primary'
                } dark:bg-gray-800`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mb-4">{formik.errors.email}</p>
            )}
          </>
        )}

        {pathname.includes('update') && (
          <>
            {/* District */}
            <div className="mb-4 flex items-center">
              <label
                className="block w-40 text-black dark:text-white"
                htmlFor="district"
              >
                District
              </label>
              <select
                id="district"
                name="district"
                className={`flex-1 rounded-md border-[1.5px] px-3 py-2 outline-none transition ${
                  formik.touched.status && formik.errors.district
                    ? 'border-red-500'
                    : 'border-gray-800 focus:border-primary'
                } bg-white dark:bg-gray-800 dark:text-white`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.district}
              >
                {districtOptions.map((district, index) => (
                  <option key={index + district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* contactNo */}
            <div className="mb-4 flex items-center">
              <label
                className="block w-40 text-black dark:text-white"
                htmlFor="contactNo"
              >
                Contact Number
              </label>
              <input
                id="contactNo"
                name="contactNo"
                type="text"
                placeholder="Enter Contact Number"
                className={`flex-1 rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
                  formik.touched.contactNo && formik.errors.contactNo
                    ? 'border-red-500'
                    : 'border-gray-800 focus:border-primary'
                } dark:bg-gray-800`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contactNo}
              />
            </div>
            {formik.touched.contactNo && formik.errors.contactNo && (
              <p className="text-red-500 text-sm mb-4">
                {formik.errors.contactNo}
              </p>
            )}


            <div className="mb-4 flex items-center">
              <label
                className="block w-40 text-black dark:text-white"
                htmlFor="timePreference"
              >
                Time Preference
              </label>
              <select
                id="timePreference"
                name="timePreference"
                className={`w-40 text-center rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
                  formik.touched.timePreference && formik.errors.timePreference
                    ? 'border-red-500'
                    : 'border-gray-800 focus:border-primary'
                } dark:bg-gray-800`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.timePreference}
              >
                <option
                  className="text-center rounded-md border-[1.5px]"
                  value="WEEKDAY"
                >
                  WEEKDAY
                </option>
                <option
                  className="text-center rounded-md border-[1.5px]"
                  value="WEEKEND"
                >
                  WEEKEND
                </option>
                <option
                  className="text-center rounded-md border-[1.5px]"
                  value="FLEXIBLE"
                >
                  FLEXIBLE
                </option>
              </select>
            </div>
            {formik.touched.timePreference && formik.errors.timePreference && (
              <p className="text-red-500 text-sm mb-4">{formik.errors.timePreference}</p>
            )}

            {/* Language Dropdown */}
            <div className="mb-4 flex items-center">
              <label
                className="block w-40 text-black dark:text-white"
                htmlFor="language"
              >
                Language
              </label>
              <select
                id="language"
                name="language"
                className={`w-40 text-center rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
                  formik.touched.language && formik.errors.language
                    ? 'border-red-500'
                    : 'border-gray-800 focus:border-primary'
                } dark:bg-gray-800`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.language}
              >
                <option
                  className="text-center rounded-md border-[1.5px]"
                  value="SINHALA"
                >
                  SINHALA
                </option>
                <option
                  className="text-center rounded-md border-[1.5px]"
                  value="ENGLISH"
                >
                  ENGLISH
                </option>
                <option
                  className="text-center rounded-md border-[1.5px]"
                  value="TAMIL"
                >
                  TAMIL
                </option>
              </select>
            </div>
            {formik.touched.language && formik.errors.language && (
              <p className="text-red-500 text-sm mb-4">{formik.errors.language}</p>
            )}

            {/* hourlyPayRate */}
            <div className="mb-4 flex items-center">
              <label
                className="block w-40 text-black dark:text-white"
                htmlFor="hourlyPayRate"
              >
                Hourly PayRate to lecturer (LKR)
              </label>
              <input
                id="hourlyPayRate"
                name="hourlyPayRate"
                type="number"
                placeholder="Enter hourlyPayRate amount"
                className={`rounded-md border-[1.5px] py-2 px-3 outline-none w-40 text-center transition ${
                  formik.touched.hourlyPayRate && formik.errors.hourlyPayRate
                    ? 'border-red-500'
                    : 'border-gray-800 focus:border-primary'
                } dark:bg-gray-800`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.hourlyPayRate}
              />
            </div>
            {formik.touched.hourlyPayRate && formik.errors.hourlyPayRate && (
              <p className="text-red-500 text-sm mb-4">{formik.errors.hourlyPayRate}</p>
            )}

            {/* lecturingExperience */}
            <div className="mb-4 flex items-center">
              <label
                className="block w-40 text-black dark:text-white"
                htmlFor="lecturingExperience"
              >
                Lecture Experience (Yrs)
              </label>
              <input
                id="lecturingExperience"
                name="lecturingExperience"
                type="number"
                placeholder="Enter Lecturing Experience"
                className={`rounded-md border-[1.5px] py-2 px-3 outline-none w-40 text-center transition ${
                  formik.touched.lecturingExperience && formik.errors.lecturingExperience
                    ? 'border-red-500'
                    : 'border-gray-800 focus:border-primary'
                } dark:bg-gray-800`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lecturingExperience}
              />
            </div>
            {formik.touched.lecturingExperience && formik.errors.lecturingExperience && (
              <p className="text-red-500 text-sm mb-4">{formik.errors.lecturingExperience}</p>
            )}

            {/* fieldOfWork */}
            <div className="mb-4 flex items-center">
              <label
                className="w-full sm:w-40 mb-2 sm:mb-0 text-black dark:text-white"
                htmlFor="fieldOfWork"
              >
                Field Of Work
              </label>
              <input
                id="fieldOfWork"
                name="fieldOfWork"
                type="text"
                placeholder="Enter Field Of Work"
                className={`flex-1 rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
                  formik.touched.fieldOfWork && formik.errors.fieldOfWork
                    ? 'border-red-500'
                    : 'border-gray-800 focus:border-primary'
                } dark:bg-gray-800 dark:text-white`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fieldOfWork}
              />
            </div>
            {formik.touched.fieldOfWork && formik.errors.fieldOfWork && (
              <p className="text-red-500 text-sm mb-4">
                {formik.errors.fieldOfWork}
              </p>
            )}

            {/* mapsLocation */}
            <div className="mb-4 flex items-center">
              <label
                className="w-full sm:w-40 mb-2 sm:mb-0 text-black dark:text-white"
                htmlFor="mapsLocation"
              >
                Location
              </label>
              <input
                id="mapsLocation"
                name="mapsLocation"
                type="text"
                placeholder="Enter Location Coordinates"
                className={`flex-1 rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
                  formik.touched.mapsLocation && formik.errors.mapsLocation
                    ? 'border-red-500'
                    : 'border-gray-800 focus:border-primary'
                } dark:bg-gray-800 dark:text-white`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mapsLocation}
              />
            </div>
            {formik.touched.mapsLocation && formik.errors.mapsLocation && (
              <p className="text-red-500 text-sm mb-4">
                {formik.errors.mapsLocation}
              </p>
            )}
          </>
        )}

        {/* Subscribed Toggle */}
        {!pathname.includes('update') && (
          <>
            <div className="mb-4 flex items-center">
              <label
                className="block w-40 text-black dark:text-white"
                htmlFor="subscribed"
              >
                Subscribed
              </label>
              <div
                id="subscribed"
                className={`w-12 h-6 rounded-full cursor-pointer p-1 transition border-gray-800 ${
                  formik.values.subscribed ? 'bg-primary' : 'bg-gray-500'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                    formik.values.subscribed ? 'translate-x-6' : ''
                  }`}
                ></div>
              </div>
            </div>


            {/* Status */}
            <div className="mb-4 flex items-center">
              <label
                className="block w-40 text-black dark:text-white"
                htmlFor="status"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                className={`flex-1 rounded-md border-[1.5px] px-3 py-2 outline-none transition ${
                  formik.touched.status && formik.errors.status
                    ? 'border-red-500'
                    : 'border-gray-800 focus:border-primary'
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
          </>
        )}

        {pathname.includes('update') && (
          <>
            {/* preference */}
            <div className="mb-4 flex flex-wrap sm:flex-nowrap items-start">
              <label
                className="w-full sm:w-40 mb-2 sm:mb-0 text-black dark:text-white"
                htmlFor="preference"
              >
                Lecturer Preference
              </label>
              <textarea
                id="preference"
                name="preference"
                placeholder="Enter Preference"
                className={`w-full sm:flex-1 rounded-md border-[1.5px] py-2 px-3 outline-none transition resize-none ${
                  formik.touched.preference && formik.errors.preference
                    ? 'border-red-500'
                    : 'border-gray-800 focus:border-primary'
                } dark:bg-gray-800 dark:text-white h-32`}
                onChange={formik.handleChange}
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
            {/* picture Upload */}
            <div className="mb-4 flex flex-wrap sm:flex-nowrap">
              <label
                className="block w-full sm:w-40 mb-2 sm:mb-0 text-black dark:text-white"
                htmlFor="picture"
              >
                Picture
              </label>
              <div
                id="picture"
                className={`relative h-full w-full sm:flex-1 cursor-pointer border rounded bg-gray-50 py-4 px-4 sm:py-7.5 dark:bg-gray-800 dark:text-white ${
                  formik.touched.picture && formik.errors.picture
                    ? 'border-red-500'
                    : 'border-gray-800 hover:border-primary'
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
                    <><p className="text-sm text-primary truncate">
                      {
                        // @ts-ignore
                        formik.values.picture.name}
                    </p>
                    </>
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
                        Upload a picture if you want to change the picture, unless leave blank
                      </p>
                      <p className="text-xs text-gray-400">
                        (SVG, PNG, JPG, or GIF - max, 800px by 800px)
                      </p>
                    </>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsImgModalOpen(true);
                } }
                className="text-red-500 hover:text-red-700"
              >
                Remove Added<br/> Logo
              </button>
            </div>
          </>
        )}

        {/* Submit Button */}
        {
          pathname.includes('settings') ? (
            <>
              <button
                onClick={() =>
                  setIsModalOpen(true)
                }
                disabled={!formik.isValid}
                className="mt-6 w-full hover:bg-opacity-90 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-white"

              >
                {`Update Settings`}
              </button>
              <Link to={'/app/profile/pricing-card'}>
                <button className="mt-6 w-full hover:bg-opacity-90 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out hover:bg-success hover:border-success hover:text-white">
                  Update Your Plan
                </button>
              </Link>
              <button
                onClick={() => setIsNewModalOpen(true)}
                className="mt-6 w-full hover:bg-opacity-90 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-red-500 py-2 px-5 text-center font-medium text-red-500 transition duration-150 ease-in-out hover:bg-red-600 hover:border-red-600 hover:text-white"
              >
                Deactivate Account
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                formik.handleSubmit;
                setShowModal(true);
              }}
              disabled={!formik.isValid}
              className="mt-6 w-full hover:bg-opacity-90 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-white"
              type="submit"
            >
              {`Update lecturer`}
            </button>
          )
        }

      </form>
      <ConfirmationModal
        isOpen={isNewModalOpen}
        title={'Confirm To Deactivate Account'}
        message={`Diactivate Account will log you out from LectureLink. After Deactivate you cannot sign in to this account again.. Enter Confirm to continue?`}
        btnOne={'Yes'}
        btnTwo={'No'}
        submit={true}
        onConfirm={handleDeactivate}
        onClose={() => {
          setIsNewModalOpen(false);
          // @ts-ignore
          setToast({ message: 'Account settings are reverted to last saved', type: 'success' });
        }}
      />
      <ConfirmationModal
        isOpen={isModalOpen}
        title={'Confirm Old Password'}
        message={`Please enter your old password to confirm the update.`}
        btnOne={'Confirm'}
        btnTwo={'Cancel'}
        submit={true}
        onConfirm={() => {
          if (oldPassword === formik.values.password) {
            formik.handleSubmit();
            setIsModalOpen(false);
          } else {
            // @ts-ignore
            setToast({ message: 'Old password is incorrect!', type: 'error' });
          }
        }}
        onClose={() => {
          setIsModalOpen(false);
          setOldPassword('');
        }}
      >
        <input
          type="password"
          placeholder="Enter old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="mt-2 p-2 border rounded"
        />
      </ConfirmationModal>
      <ConfirmationModal
        isOpen={isImgModalOpen}
        title={'Delete Confirmation'}
        message={`This will remove selected Image. Enter Confirm to continue?`}
        btnOne={'Confirm'}
        btnTwo={'Cancel'}
        submit={true}
        onConfirm={() => {
          formik.setFieldValue('picture', null);
          setIsImgModalOpen(false);
        }}
        onClose={() => {
          setIsImgModalOpen(false);
          // @ts-ignore
          setToast({ message: 'Account settings are reverted to last saved', type: 'success' });
        }}
      />
      {showModal && (
        <NavigateModal onClose={handleModalClose} onConfirm={handleModalConfirm} message={'Lecturer Updated Successfuly'} btnOne={'Keep Updating'} btnTwo={'Go To Profile'}/>
      )}
      {toast && (
        <Toast
          {
            // @ts-ignore
            ...toast
          }
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default UpdateLecturerForm;
