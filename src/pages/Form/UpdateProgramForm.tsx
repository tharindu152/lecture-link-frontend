import { useFormik } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Subject } from '../../types/subject.ts';

type ProgramDto = {
  id: number;
  name: string;
  description?: string;
  level: 'MSC' | 'BSC' | 'HND' | 'PGD';
  durationInDays: number;
  studentCount: number;
  batchId?: string;
  payment: number;
  instituteId: number;
  subjects?: Subject[];
};

const UpdateProgramForm = () => {
  const formik = useFormik<ProgramDto>({
    initialValues: {
      id: 1, // Example default ID
      name: '',
      description: '',
      level: 'MSC',
      durationInDays: 0,
      studentCount: 0,
      batchId: '',
      payment: 0,
      instituteId: 101, // Example institute ID
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
        .oneOf(['MSC', 'BSC', 'HND', 'PGD'], 'Invalid level'),
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
      instituteId: Yup.number().required('Institute ID is required'),
    }),
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
    },
  });

  return (
    <>
      <Breadcrumb pageName="Add/Update Program" />
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 rounded-lg border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark"
      >
        <h2 className="text-lg font-medium mb-6 text-black dark:text-white">
          Update Program
        </h2>

        {/* Name */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter program name"
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

        {/* Level Dropdown */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white">Level</label>
          <select
            id="level"
            name="level"
            className={`w-40 text-center rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
              formik.touched.level && formik.errors.level
                ? 'border-red-500'
                : 'border-gray-300 focus:border-primary'
            } dark:bg-gray-800`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.level}
          >
            <option className="text-center" value="MSC">
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

        {/* Duration in Days (Counter) */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white">
            Duration (Days)
          </label>
          <div className="flex items-center">
            <input
              id="durationInDays"
              name="durationInDays"
              type="number"
              className="w-40 text-center rounded-md border-[1.5px] py-2 px-3 outline-none transition dark:bg-gray-800"
              value={formik.values.durationInDays}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        {/* Student Count (Counter) */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white">
            Student Count
          </label>
          <div className="flex items-center">
            <input
              id="studentCount"
              name="studentCount"
              type="number"
              className=" w-40 text-center rounded-md border-[1.5px] py-2 px-3 outline-none transition dark:bg-gray-800"
              value={formik.values.studentCount}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        {/* Batch ID */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white">
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
                : 'border-gray-300 focus:border-primary'
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
          <label className="block w-40 text-black dark:text-white">
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
                : 'border-gray-300 focus:border-primary'
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
                : 'border-gray-300 focus:border-primary'
            } dark:bg-gray-800 dark:text-white h-32`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            rows={6} // Allows multi-line support
          />
        </div>
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-sm mb-4">
            {formik.errors.description}
          </p>
        )}

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="mt-6 w-full hover:bg-opacity-90 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-white"
          >
            Update Program
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateProgramForm;