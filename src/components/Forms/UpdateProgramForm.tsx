import { useFormik } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from '../Breadcrumbs/Breadcrumb.tsx';
import { useMutation } from 'react-query';
import programService from '../../services/programService.ts';
import { Program } from '../../types/instituteTypes/program.ts';
import { useEffect, useState } from 'react';
import Loader from '../../common/Loader/Loader.tsx';
import { Level } from '../../types/enums/level.ts';
import Toast from '../Miscellaneous/Toast.tsx';
import { useData, useDispatcher } from '../../context/MainContext.tsx';
import { useLocation } from 'react-router-dom';
import { InstituteRes } from '../../types/instituteTypes/instituteRes.ts';
import { Language } from '../../types/enums/language.ts';

const UpdateProgramForm = () => {
  // @ts-ignore
  const institute: InstituteRes = useData()
  const dispatch = useDispatcher();
  const location = useLocation();
  const [toast, setToast] = useState(null);

  const { pathname } = location;
  const program = institute?.programs?.find(prog => prog?.id === Number(pathname.slice(29)));

  const { mutate: createProgram, isLoading: isCreatingProgram } = useMutation(
    programService.createProgram,
    {
      onSuccess: () => {
        // @ts-ignore
        setToast({ message: "Program created successfully!", type: "success" });
        dispatch({ type: "delete" });
        formik.resetForm()
      },
      onError: () => {
        // @ts-ignore
        setToast({ message: "Program creation is unsuccessful!", type: "error" });
      },
    },
  );

  const { mutate: updateProgram, isLoading: isUpdatingProgram } = useMutation(
    programService.updateProgram,
    {
      onSuccess: () => {
        // @ts-ignore
        setToast({ message: "Program updated successfully!", type: "success" });
        dispatch({ type: "delete" });
      },
      onError: () => {
        // @ts-ignore
        setToast({ message: "Program update is unsuccessful!", type: "error" });
      },
    },
  );

  const formik = useFormik<Program>({
    initialValues:
      pathname?.includes('update')
        ? {
            id: program?.id,
            name: program?.name ?? '',
            description: program?.description,
            level: program?.level ?? Level.PGD,
            language: program?.language ?? Language.ENGLISH,
            durationInDays: program?.durationInDays ?? 0,
            studentCount: program?.studentCount ?? 0,
            batchId: program?.batchId,
            payment: program?.payment ?? 0,
            instituteId: institute?.id,
            subjects: program?.subjects
          }
        : {
            id: 0,
            name: '',
            description: '',
            level: Level.PGD,
            language: Language.ENGLISH,
            durationInDays: 0,
            studentCount: 0,
            batchId: '',
            payment: 0,
            instituteId: institute?.id,
          },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Program name is required')
        .max(255, 'Program name must not exceed 255 characters'),
      description: Yup.string()
        .max(1000, 'Description must not exceed 1000 characters')
        .nullable(),
      level: Yup.string()
        .required('Level is required')
        .oneOf(['MSC', 'BSC', 'HND', 'PGD', 'PHD'], 'Invalid level'),
      language: Yup.string()
        .required('Language is required')
        .oneOf(['TAMIL', 'SINHALA', 'ENGLISH'], 'Invalid Language'),
      durationInDays: Yup.number()
        .required('Duration is required')
        .integer('Duration must be an integer')
        .positive('Duration must be a positive value'),
      studentCount: Yup.number()
        .required('Student count is required')
        .integer('Student count must be an integer')
        .positive('Student count must be a positive value'),
      batchId: Yup.string()
        .max(255, 'Batch ID must not exceed 255 characters')
        .nullable(),
      payment: Yup.number()
        .required('Payment is required')
        .positive('Payment must be greater than 0'),
      instituteId: Yup.number().required('Institute ID is required').default(2),
    }),
    onSubmit: (values) => {
      pathname.slice(14, 20) === 'update'
        ? updateProgram({
            programId: program?.id,
            programData: values,
          })
        : createProgram({ programData: values });
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isCreatingProgram || isUpdatingProgram || loading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb
        pageName={`${
          pathname.slice(14, 20) === 'update' ? 'Update' : 'Add'
        } Program`}
      />
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 rounded-lg border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark"
      >
        <h2 className="text-lg font-medium mb-6 text-black dark:text-white">
          Update Program
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
            placeholder="Enter program name"
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

        {/* Level Dropdown */}
        <div className="mb-4 flex items-center">
          <label
            className="block w-40 text-black dark:text-white"
            htmlFor="level"
          >
            Level
          </label>
          <select
            id="level"
            name="level"
            className={`w-40 text-center rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
              formik.touched.level && formik.errors.level
                ? 'border-red-500'
                : 'border-gray-800 focus:border-primary'
            } dark:bg-gray-800`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.level}
          >
            <option
              className="text-center rounded-md border-[1.5px]"
              value="PHD"
            >
              PHD
            </option>
            <option
              className="text-center rounded-md border-[1.5px]"
              value="MSC"
            >
              MSC
            </option>
            <option
              className="text-center rounded-md border-[1.5px]"
              value="BSC"
            >
              BSC
            </option>
            <option
              className="text-center rounded-md border-[1.5px]"
              value="HND"
            >
              HND
            </option>
            <option
              className="text-center rounded-md border-[1.5px]"
              value="PGD"
            >
              PGD
            </option>
          </select>
        </div>
        {formik.touched.level && formik.errors.level && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.level}</p>
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

        {/* Duration in Days (Counter) */}
        <div className="mb-4 flex items-center">
          <label
            className="block w-40 text-black dark:text-white"
            htmlFor="durationInDays"
          >
            Duration (Days)
          </label>
          <div className="flex items-center">
            <input
              id="durationInDays"
              name="durationInDays"
              type="number"
              className="w-40 text-center rounded-md border-[1.5px] py-2 px-3 outline-none transition border-gray-800 dark:bg-gray-800"
              value={formik.values.durationInDays}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        {/* Student Count (Counter) */}
        <div className="mb-4 flex items-center">
          <label
            className="block w-40 text-black dark:text-white"
            htmlFor="studentCount"
          >
            Student Count
          </label>
          <div className="flex items-center">
            <input
              id="studentCount"
              name="studentCount"
              type="number"
              className={`rounded-md border-[1.5px] py-2 px-3 outline-none w-40 text-center transition ${
                formik.touched.studentCount && formik.errors.studentCount
                  ? 'border-red-500'
                  : 'border-gray-800 focus:border-primary'
              } dark:bg-gray-800`}
              value={formik.values.studentCount}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        {formik.touched.studentCount && formik.errors.studentCount && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.studentCount}</p>
        )}

        {/* Batch ID */}
        <div className="mb-4 flex items-center">
          <label
            className="block w-40 text-black dark:text-white"
            htmlFor="batchId"
          >
            Batch ID
          </label>
          <input
            id="batchId"
            name="batchId"
            type="text"
            placeholder="Enter batch ID"
            className={`w-40 text-center rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
              formik.touched.batchId && formik.errors.batchId
                ? 'border-red-500'
                : 'border-gray-800 focus:border-primary'
            } dark:bg-gray-800`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.batchId}
          />
        </div>
        {formik.touched.batchId && formik.errors.batchId && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.batchId}</p>
        )}

        {/* Payment */}
        <div className="mb-4 flex items-center">
          <label
            className="block w-40 text-black dark:text-white"
            htmlFor="payment"
          >
            Payment
          </label>
          <input
            id="payment"
            name="payment"
            type="number"
            placeholder="Enter payment amount"
            className={`rounded-md border-[1.5px] py-2 px-3 outline-none w-40 text-center transition ${
              formik.touched.payment && formik.errors.payment
                ? 'border-red-500'
                : 'border-gray-800 focus:border-primary'
            } dark:bg-gray-800`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.payment}
          />
        </div>
        {formik.touched.payment && formik.errors.payment && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.payment}</p>
        )}

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

        {/* Submit Button */}
        <button
          onClick={() => {
            return formik.handleSubmit;
          }}
          className="mt-6 w-full hover:bg-opacity-90 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-white"
          type="submit"
          disabled={!formik.isValid}
        >
          {`${pathname.slice(14, 20) === 'update' ? 'Update' : 'Add'} `}
          Program
        </button>
      </form>
      {toast && (
        <Toast
          // @ts-ignore
          {...toast}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default UpdateProgramForm;