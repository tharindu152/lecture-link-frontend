import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoDark from '../../images/logo/LectureLinkLogoDark.png';
import Logo from '../../images/logo/LectureLinkLogo.png';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import Toast from '../../components/Miscellaneous/Toast.tsx';
import Loader from '../../common/Loader/Loader.tsx';
import lecturerService from '../../services/lecturerService.ts';
import * as Yup from 'yup';
import instituteService from '../../services/instituteService.ts';
import { Status } from '../../types/enums/status.ts';
import { Role } from '../../types/enums/role.ts';
import SignUpModal from '../../components/Miscellaneous/SignUpModal.tsx';
import { divisionOptions } from '../../types/dropdowns/dropdownOptions.ts';
import RoleSelectionModal from './RoleSelectionModal';

const SignUp: React.FC = () => {
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [roleSelectionModalOpen, setRoleSelectionModalOpen] = useState(false);

  const { mutate: createLecturer, isLoading: isLecturerCreated } = useMutation(
    lecturerService.createLecturer,
    {
      onSuccess: () => {
        setShowModal(true);
        setToast({
          // @ts-ignore
          message: 'Lecturer is successfully Signed Up!',
          type: 'success',
        })
      },
      onError: () => {
        setToast({
          // @ts-ignore
          message: 'Lecturer Signing Up is unsuccessful',
          type: 'error',
        });
      },
    },
  );

  const { mutate: createInstitute, isLoading: isInstituteCreated } = useMutation(
    instituteService.createInstitute,
    {
      onSuccess: () => {
        setShowModal(true);
        setToast({
          // @ts-ignore
          message: 'Institute is Successfully Signed Up!',
          type: 'success',
        })
      },
      onError: () => {
        setToast({
          // @ts-ignore
          message: 'Institute Signing Up is Unsuccessful',
          type: 'error',
        });
      },
    },
  );

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/auth/signin'); // Navigate to login page when modal is closed
  };

  const formik = useFormik({
    initialValues: {
      type: '',
      name: '',
      division: '',
      email: '',
      password: '',
      re_password: '',
      status: Status.ACTIVE
    },
    validationSchema: Yup.object().shape({
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
          ' and one number. No special characters allowed other than underscore ')
        .required('Password is required'),
      re_password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*_?)[A-Za-z\d_]{15,16}$/,
          'Password must be 16 characters long and include at least one uppercase letter, one lowercase letter, and one number. No special characters allowed other than underscore.'
        )
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
      division: Yup.string()
        .required('Division is required')
        .max(500, 'Division must not exceed 500 characters'),
      status: Yup.string()
        .required('Status is required')
        .oneOf(['ACTIVE', 'INACTIVE'], 'Invalid status'),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('password', values.password);
      formData.append('email', values.email);
      formData.append('division', values.division);
      formData.append('status', "ACTIVE");

      values.type === Role.LECTURER ?
        createLecturer({ lecturerConfig: formData }) :
        createInstitute({ instituteConfig: formData })

      formik.resetForm()
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading || isLecturerCreated || isInstituteCreated) {
    return <Loader />;
  }

  return (
    <div className="overflow-y-auto no-scrollbar rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center justify-center h-screen">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <Link className="mb-5.5 inline-block" to="/">
              <img className="hidden dark:block" src={Logo} alt="Logo" />
              <img className="dark:hidden" src={LogoDark} alt="Logo" />
            </Link>
            <div className="mt-6 text-center">
              <p>
                Connect with top lecturers or institutes in the academic world.<br/> Sign Up to start!
              </p>
            </div>
          </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium">Start for free</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign Up to LectureLink
            </h2>

            <form>
              {/* You Are a */}
              <div className="mb-4">
                <label
                  className="mb-2.5 block font-medium text-black dark:text-white"
                  htmlFor="youare"
                >
                  You are a
                </label>
                <div className="type">
                  <select
                    id="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    placeholder="Select whether your a Lectyrer or an Institute user"
                    className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      formik.touched.type && formik.errors.type
                        ? 'border-red-500'
                        : 'border-gray-300 focus:border-primary'
                    }`}
                  >
                    <option value="">Select a role</option>
                    <option value="LECTURER">Lecturer</option>
                    <option value="INSTITUTE">Institute</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="mb-2.5 block font-medium text-black dark:text-white"
                  htmlFor="name"
                >
                  {formik.values?.type === Role.LECTURER ? 'Full Name' : 'Institute Name'}
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      formik.touched.name && formik.errors.name
                        ? 'border-red-500'
                        : 'border-gray-300 focus:border-primary'
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />

                  <span className="absolute right-6 top-4">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                          fill=""
                        />
                        <path
                          d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mb-4">{formik.errors.name}</p>
              )}

              <div className="mb-4">
                <label
                  className="mb-2.5 block font-medium text-black dark:text-white"
                  htmlFor="division"
                >
                  Division
                </label>
                <div className="relative ">
                  <select
                    id="division"
                    name="division"
                    value={formik.values.division}
                    onChange={formik.handleChange}
                    className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      formik.touched.division && formik.errors.division
                        ? 'border-red-500'
                        : 'border-gray-300 focus:border-primary'
                    }`}
                  >
                    <option value="">Select Division</option>
                    {divisionOptions.map((division, index) => (
                      <option key={index + division} value={division}>
                        {division}
                      </option>
                    ))}
                  </select>

                  <span className="absolute right-6 top-4">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill=" ">
                        <circle cx="23.999" cy="15" r="4"></circle>
                        <path d="M24 0C15.78 0 9.113 6.614 9.01 14.81L9 14.792s-.017.752.092 2c.033.18.66 3.566 1.956 6.081l.001.002L24 48l12.423-24s1.789-3.846 2.204-5.954l.037-.229c.009-.056.02-.115.026-.167a28.05 28.05 0 0 0 .284-3.15C38.708 6.448 32.115 0 24 0zm9.599 20.393L24 40l-9.614-19.398-.001-.002c-.91-1.836-1.289-4.217-1.289-4.217a11.41 11.41 0 0 1-.055-.557c-.044-.545-.041-.827-.041-.827C13 8.925 17.925 4 24 4c5.965 0 10.809 4.75 10.983 10.671-.016.75-.168 3.228-1.384 5.722z"></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
              {formik.touched.division && formik.errors.division && (
                <p className="text-red-500 text-sm mb-4">{formik.errors.division}</p>
              )}

              <div className="mb-4">
                <label
                  className="mb-2.5 block font-medium text-black dark:text-white"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      formik.touched.email && formik.errors.email
                        ? 'border-red-500'
                        : 'border-gray-300 focus:border-primary'
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />

                  <span className="absolute right-6 top-4">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mb-4">{formik.errors.email}</p>
              )}

              <div className="mb-4">
                <label
                  className="mb-2.5 block font-medium text-black dark:text-white"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      formik.touched.password && formik.errors.password
                        ? 'border-red-500'
                        : 'border-gray-300 focus:border-primary'
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />

                  <span className="absolute right-6 top-4" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  ):(
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  )}
                  </span>
                </div>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mb-4">{formik.errors.password}</p>
              )}

              <div className="mb-6">
                <label
                  className="mb-2.5 block font-medium text-black dark:text-white"
                  htmlFor="re_password"
                >
                  Re-type Password
                </label>
                <div className="relative">
                  <input
                    id="re_password"
                    type={showRePassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      formik.touched.re_password && formik.errors.re_password
                        ? 'border-red-500'
                        : 'border-gray-300 focus:border-primary'
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.re_password}
                  />

                  <span className="absolute right-6 top-4" onClick={() => setShowRePassword(!showRePassword)}>
                  {showRePassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  ):(
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  )}
                  </span>
                </div>
              </div>
              {formik.touched.re_password && formik.errors.re_password && (
                <p className="text-red-500 text-sm mb-4">{formik.errors.re_password}</p>
              )}

              <div className="mb-5">
                <button
                  type="submit"
                  disabled={!formik.isValid}
                  onClick={() => {
                    formik.handleSubmit();
                    setShowModal(true); // Open modal on button click
                  }}
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                >Create Account</button>
              </div>

              <div className="mt-6 text-center">
                <p>
                  Already have an account?{' '}
                  <Link to="/auth/signin" className="text-primary">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>

            {roleSelectionModalOpen && (
              <RoleSelectionModal toggleModal={() => setRoleSelectionModalOpen}/>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <SignUpModal onClose={handleModalClose} message={'Sign Up is Completed!!'} />
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
    </div>
  );
};

export default SignUp;
