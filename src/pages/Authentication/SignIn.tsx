import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoDark from '../../images/logo/LectureLinkLogoDark.png';
import Logo from '../../images/logo/LectureLinkLogo.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import authService from '../../services/authService.ts';
import Loader from '../../common/Loader/Loader.tsx';
import Toast from '../../components/Miscellaneous/Toast.tsx';
import { jwtDecode } from 'jwt-decode';
import { useData, useDispatcher } from '../../context/MainContext.tsx';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [toast, setToast] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const dispatcher = useDispatcher();
  const data = useData();
  const navigate = useNavigate(); // Properly initialize useNavigate

  // const responseMessage = (response) => {
  //     console.log(response);
  // };
  // const errorMessage = (error) => {
  //     console.log(error);
  // };

  const { mutate: signInUser, isLoading: isSigningIn } = useMutation(
    authService.signIn,
    {
      onSuccess: (data) => {
        try {

          const decodedToken = jwtDecode(data.token);
          // @ts-ignore
          if (decodedToken.iss !== import.meta.env.VITE_TOKEN_ISSUER) {
            // @ts-ignore
            setToast({ message: "Invalid token issuer!", type: "error" });
            return;
          }

          localStorage.setItem("token", data.token);
          localStorage.setItem("issuer", decodedToken.iss ?? '');
          localStorage.setItem("userId", data.id ?? '');
          localStorage.setItem("role", data.role ?? '');
          dispatcher({ type: 'view'});
          // @ts-ignore
          setToast({ message: 'User Signed In Successfully', type: 'success' });
          setTimeout(() => {
            window.location.href = '/app/dashboard';
          }, 3000);
        } catch (error) {
          // @ts-ignore
          setToast({ message: "Token validation failed!", type: "error" });
        }
      },
      onError: () => {
        // @ts-ignore
        setToast({ message: "User Signing In is unsuccessful!", type: "error" });
      },
    },
  );

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*_?)[A-Za-z\d_]{15,16}$/,
          'Password must be 16 characters long and include at least one uppercase letter, one lowercase letter,' +
          ' and one number. No special characters allowed other than underscore ',
        )
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      signInUser({ email: values.email, password: values.password });
      formik.resetForm();
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulating a loading state
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (loading || isSigningIn) {
    return <Loader />;
  }

  return (
    <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark min-h-screen">
      <div className="flex flex-wrap items-center justify-center h-screen">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <Link className="mb-5.5 inline-block" to="/">
              <img className="hidden dark:block" src={Logo} alt="Logo" />
              <img className="dark:hidden" src={LogoDark} alt="Logo" />
            </Link>
            <div className="mt-6 text-center">
              <p>
                Connect with top lecturers or institutes in the academic world.<br/>Sign In to start!
              </p>
            </div>
          </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium">Start for free</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign In to Lecture Link
            </h2>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white" htmlFor="email">
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

                  <span className="absolute right-4 top-4">
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

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white" htmlFor="password">
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

                  <span className="absolute right-4 top-4" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  ):(
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  )}
                </span>
                </div>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mb-4">{formik.errors.password}</p>
              )}

              <div className="mb-5">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  disabled={!formik.isValid}
                >
                  Sign In
                </button>
              </div>

              {/*<GoogleLogin onSuccess={responseMessage} onError={errorMessage} />*/}

              <div className="mt-6 text-center">
                <p>
                  Don't have any account?{' '}
                  <Link to="/auth/signup" className="text-primary">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
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

export default SignIn;