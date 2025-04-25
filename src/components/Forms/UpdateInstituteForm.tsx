import { useFormik } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from '../Breadcrumbs/Breadcrumb.tsx';
import { useMutation } from 'react-query';
import instituteService from '../../services/instituteService.ts';
import Loader from '../../common/Loader/Loader.tsx';
import { useEffect, useState } from 'react';
import Toast from '../Miscellaneous/Toast.tsx';
import { useData, useDispatcher } from '../../context/MainContext.tsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { InstituteRes } from '../../types/instituteTypes/instituteRes.ts';
import { Status } from '../../types/enums/status.ts';
import ConfirmationModal from '../Miscellaneous/ConfirmationModal.tsx';
import NavigateModal from '../Miscellaneous/NavigateModal.tsx';
import { divisionOptions } from '../../types/dropdowns/dropdownOptions.ts';

const UpdateInstituteForm = () => {
  const [toast, setToast] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  // @ts-ignore
  const institute: InstituteRes = useData();
  const navigate = useNavigate();
  const dispatch = useDispatcher();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { pathname } = location;
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);

  const {
    mutate: updateInstituteMultipart,
    isLoading: isUpdatingInstituteMultipart,
  } = useMutation(instituteService.updateInstituteMultipart, {
    onSuccess: () => {
      setToast({
        // @ts-ignore
        message: 'Institute updated successfully!',
        type: 'success',
      });
      dispatch({ type: 'delete' });
      setShowModal(true);
    },
    onError: () => {
      setToast({
        // @ts-ignore
        message: 'Institute update is unsuccessful!',
        type: 'error',
      });
    },
  });

  const { mutate: updateInstituteJson, isLoading: isUpdatingInstituteJson } =
    useMutation(instituteService.updateInstituteJson, {
      onSuccess: async () => {
        if(!pathname.includes('settings')) {
          setToast({
            // @ts-ignore
            message: 'Institute updated successfully!',
            type: 'success',
          });
        } else if(pathname.includes('settings') && (formik.initialValues.email !== formik.values.email || formik.initialValues.password !== formik.values.password) ) {
          setToast({
            // @ts-ignore
            message: 'Settings updated successfully!. Logging out',
            type: 'success',
          });
          await setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('issuer');
            localStorage.removeItem('role');
            localStorage.removeItem('userId');
            navigate('/auth/signin');
          }, 2000);
        }
        dispatch({ type: 'delete' });
        setShowModal(true);
      },
      onError: () => {
        setToast({
          // @ts-ignore
          message: `${pathname.includes('settings') ? 'Settings' : 'Institute'} update is unsuccessful!`,
          type: 'error',
        });
      },
    });

  const { mutate: deactivateInstitute, isLoading: isDeactivating } =
    useMutation(
      instituteService.deactivateInstitute,
      {
        onSuccess: () => {
          setToast({
            // @ts-ignore
            message: 'Account deactivated successfully!',
            type: 'success',
          });
          dispatch({ type: 'delete' });
          navigate('/auth/signin');
        },
        onError: () => {
          setToast({
            // @ts-ignore
            message: 'Failed to deactivate account. Please try again.',
            type: 'error',
          });
        },
      },
    );

  const formik = useFormik({
    initialValues: {
      id: institute?.id,
      name: institute?.name,
      password: institute?.password,
      mapsLocation: institute?.mapsLocation,
      email: institute?.email,
      division: institute?.division,
      telephone: institute?.telephone ?? '',
      description: institute?.description ?? '',
      subscribed: institute?.subscribed ?? false,
      currentRating: institute?.currentRating ?? 0,
      logo: undefined,
      status: institute?.status ?? Status.ACTIVE,
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
      division: Yup.string()
        .required('Division is required')
        .max(500, 'Division must not exceed 500 characters'),
      telephone: Yup.string()
        .matches(
          /^(?:\+94|0)?(?:7[01245678]\d{7}|1\d{8})$/,
          'Invalid Sri Lankan telephone number',
        )
        .nullable(),
      description: Yup.string()
        .max(1000, 'Description must not exceed 1000 characters')
        .nullable(),
      subscribed: Yup.boolean().required('Subscribed status is required'),
      mapsLocation: Yup.string().required('Map Location is required'),
      logo: Yup.mixed().nullable(),
      status: Yup.string()
        .required('Status is required')
        .oneOf(['ACTIVE', 'INACTIVE'], 'Invalid status'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('division', values.division);
      formData.append('description', values.description);
      formData.append('subscribed', values.subscribed.toString());
      formData.append('status', values.status);
      formData.append(
        'currentRating',
        institute?.currentRating?.toString() ?? '0',
      );
      formData.append('mapsLocation', values.mapsLocation);
      // @ts-ignore
      formData.append('logo', values.logo);
      if (values.telephone) formData.append('telephone', values.telephone);

      // @ts-ignore
      formik.values.logo?.size > 0
        ? updateInstituteMultipart({
            instituteId: institute?.id,
            instituteConfig: formData,
          })
        : updateInstituteJson({
            instituteId: institute?.id,
            instituteConfig: values,
          });
    },
  });

  const [loading, setLoading] = useState(true);

  const handleDeactivate = () => {
    deactivateInstitute({ instituteId: institute.id });
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

  useEffect(() => {
    console.log(formik)
  }, [formik]);

  if (
    isUpdatingInstituteMultipart ||
    isUpdatingInstituteJson ||
    isDeactivating ||
    loading
  ) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb
        pageName={`${
          pathname.includes('settings')
            ? 'Account Settings'
            : 'Update Institute'
        }`}
      />
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 rounded-lg border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark"
      >
        <h2 className="text-lg font-medium mb-6 text-black dark:text-white">
          {`${
            pathname.includes('settings')
              ? 'Account Settings'
              : 'Update Institute'
          }`}
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
                className="block w-40 mr-4.5 text-black dark:text-white"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative w-full">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter current password"
                  className={`w-full rounded-md border border-stroke py-2 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                    formik.touched.password && formik.errors.password
                      ? 'border-red-500'
                      : 'border-gray-300 focus:border-primary'
                  }dark:bg-gray-800`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mb-4">
                {formik.errors.password}
              </p>
            )}

            {/* Email */}
            <div className="mb-4 flex items-center">
              <label
                className="block w-40 mr-4.5 text-black dark:text-white"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                className={`w-full rounded-md border border-stroke py-2 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-500'
                    : 'border-gray-300 focus:border-primary'
                }dark:bg-gray-800`}
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
            {/* Division */}
            <div className="mb-4 flex items-center">
              <label
                className="block w-40 text-black dark:text-white"
                htmlFor="division"
              >
                Division in Colombo
              </label>
              <select
                id="division"
                name="division"
                className={`flex-1 rounded-md border-[1.5px] px-3 py-2 outline-none transition ${
                  formik.touched.status && formik.errors.division
                    ? 'border-red-500'
                    : 'border-gray-800 focus:border-primary'
                } bg-white dark:bg-gray-800 dark:text-white`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.division}
              >
                {divisionOptions.map((division, index) => (
                  <option key={index + division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </div>

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
                  formik.touched.telephone && formik.errors.telephone
                    ? 'border-red-500'
                    : 'border-gray-800 focus:border-primary'
                } dark:bg-gray-800`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telephone}
              />
            </div>
            {formik.touched.telephone && formik.errors.telephone && (
              <p className="text-red-500 text-sm mb-4">
                {formik.errors.telephone}
              </p>
            )}

            <div className="mb-4 flex items-center">
              <label
                className="block w-40 text-black dark:text-white"
                htmlFor="mapsLocation"
              >
                Location
              </label>
              <input
                id="mapsLocation"
                name="mapsLocation"
                type="text"
                placeholder="Enter Location Coodinates"
                className={`flex-1 rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
                  formik.touched.mapsLocation && formik.errors.mapsLocation
                    ? 'border-red-500'
                    : 'border-gray-800 focus:border-primary'
                } dark:bg-gray-800`}
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
          <div className="mb-4 flex items-center">
            <label
              className="block w-40 text-black dark:text-white"
              htmlFor="subscribed"
            >
              Subscribed
            </label>
            <div
              id="subscribed"
              className={`w-12 h-6 rounded-full cursor-pointer p-1 transition border-gray-800  ${
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
        )}

        {pathname.includes('update') && (
          <>
            {/* Description */}
            <div className="mb-4 flex flex-wrap sm:flex-nowrap items-start">
              <label
                className="w-full sm:w-40 mb-2 sm:mb-0 text-black dark:text-white"
                htmlFor="description"
              >
                Institute Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter Description"
                className={`w-full sm:flex-1 rounded-md border-[1.5px] py-2 px-3 outline-none transition resize-none ${
                  formik.touched.description && formik.errors.description
                    ? 'border-red-500'
                    : 'border-gray-800 focus:border-primary'
                } dark:bg-gray-800 dark:text-white h-32`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                rows={6}
              />
            </div>
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm mb-4">
                {formik.errors.description}
              </p>
            )}
            {/* Logo Upload */}
            <div className="mb-4 flex flex-wrap sm:flex-nowrap">
              <label
                className="block w-full sm:w-40 mb-2 sm:mb-0 text-black dark:text-white"
                htmlFor="logo"
              >
                Logo
              </label>
              <div
                id="logo"
                className={`relative h-full w-full sm:flex-1 cursor-pointer border rounded bg-gray-50 py-4 px-4 sm:py-7.5 dark:bg-gray-800 dark:text-white ${
                  formik.touched.logo && formik.errors.logo
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
                    formik.setFieldValue('logo', file);
                  }}
                />

                {/* Display File Name or Prompt */}
                <div className="flex flex-col items-center justify-center space-y-2">
                  {/* Placeholder or File Name */}
                  {formik.values.logo ? (
                    <p className="text-sm text-primary truncate">
                      {
                        // @ts-ignore
                        formik.values.logo.name
                      }
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
                        Upload a picture if you want to change the logo, unless
                        leave blank
                      </p>
                      <p className="text-xs text-gray-400">
                        (SVG, PNG, JPG, or GIF - max, 800px by 800px)
                      </p>
                    </>
                  )}
                </div>
              </div>
              {
                //@ts-ignore
                formik.values.logo?.size > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setIsImgModalOpen(true);
                  }}
                  className="mx-3 text-red-500 hover:text-red-700 text-xs"
                >
                  Remove Added
                  <br /> Logo
                </button>
              )}
            </div>
          </>
        )}

        {/* Submit Button */}
        {pathname.includes('settings') ? (
          <>
            <button
              onClick={() => {
                formik.handleSubmit();
              }}
              disabled={!formik.isValid}
              className={`mt-6 w-full inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out ${
                formik.isValid
                  ? 'hover:bg-primary hover:border-primary hover:text-white hover:bg-opacity-90'
                  : ''
              }`}
            >
              Update Settings
            </button>
            <Link to={'/app/profile/pricing-card'}>
              <button
                disabled={!formik.isValid}
                className="mt-6 w-full hover:bg-opacity-90 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out hover:bg-success hover:border-success hover:text-white"
              >
                Update Your Plan
              </button>
            </Link>
            <button
              onClick={() => setIsDeactivateModalOpen(true)}
              className={`mt-6 w-full inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-red-500 py-2 px-5 text-center font-medium text-red-500 transition duration-150 ease-in-out ${
                formik.isValid
                  ? 'hover:bg-red-500 hover:border-red-500 hover:text-white hover:bg-opacity-90'
                  : ''
              }`}
              disabled={!formik.isValid}
            >
              Deactivate Account
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              formik.handleSubmit();
            }}
            disabled={!formik.isValid}
            className={`mt-6 w-full inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out ${
              formik.isValid
                ? 'hover:bg-primary hover:border-primary hover:text-white hover:bg-opacity-90'
                : ''
            }`}
            type="submit"
          >
            {`Update Institute`}
          </button>
        )}
      </form>
      <ConfirmationModal
        isOpen={isDeactivateModalOpen}
        title={'Confirm Account Deactivation'}
        message={`Account deactivation will log you out from LectureLink. You have to login again using new credentials. Enter Confirm to continue?`}
        btnOne={'Yes'}
        btnTwo={'No'}
        onConfirm={handleDeactivate}
        onClose={() => {
          setIsDeactivateModalOpen(false);
          setToast({
            // @ts-ignore
            message: 'Account settings are reverted to last saved',
            type: 'success',
          });
        }}
      />
      <ConfirmationModal
        isOpen={isUpdateModalOpen}
        title={'Confirm Old Password'}
        message={`Please enter your old password to confirm the update.`}
        btnOne={'Confirm'}
        btnTwo={'Cancel'}
        onConfirm={() => {
          if (oldPassword === formik.values.password) {
            setOldPassword('');
            formik.handleSubmit();
            setIsUpdateModalOpen(false);
          } else {
            // @ts-ignore
            setToast({ message: 'Old password is incorrect!', type: 'error' });
            setOldPassword('');
          }
        }}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setOldPassword('');
        }}
      >
        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mt-2 p-2 border rounded"
          />
          <span
            className="absolute right-4 top-2.5 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            )}
          </span>
        </div>
      </ConfirmationModal>
      <ConfirmationModal
        isOpen={isImgModalOpen}
        title={'Remove Confirmation'}
        message={`This will remove selected logo. Enter Confirm to continue?`}
        btnOne={'Confirm'}
        btnTwo={'Cancel'}
        submit={true}
        onConfirm={() => {
          formik.setFieldValue('logo', null);
          setToast({
            // @ts-ignore
            message: 'Selected logo is removed',
            type: 'success',
          });
          setIsImgModalOpen(false);
        }}
        onClose={() => {
          setIsImgModalOpen(false);
        }}
      />
      {showModal && pathname.includes('update') && (
        <NavigateModal
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          message={'Institute Updated Successfully'}
          btnOne={'Keep Updating'}
          btnTwo={'Go To Profile'}
        />
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

export default UpdateInstituteForm;
