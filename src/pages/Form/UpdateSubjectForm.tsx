import { useFormik } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';

type SubjectDto = {
  id: number; // Represents the ID
  name: string; // Subject name
  noOfCredits: number; // Number of credits
  description?: string; // Optional description
  isAssigned: boolean; // Indicates assignment status
  lecturerId?: number; // Optional lecturer ID
};

const UpdateSubjectForm = () => {
  const formik = useFormik<SubjectDto>({
    initialValues: {
      id: 1, // Example default ID
      name: '',
      noOfCredits: 1,
      description: '',
      isAssigned: false,
      lecturerId: 1, // Default selection
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Subject name is required')
        .max(255, 'Subject name must not exceed 255 characters'),
      noOfCredits: Yup.number()
        .required('Number of credits is required')
        .integer('Number of credits must be an integer')
        .positive('Number of credits must be a positive value')
        .max(4, 'Number of credits must not exceed 4'),
      description: Yup.string()
        .max(1000, 'Description must not exceed 1000 characters')
        .nullable(),
      isAssigned: Yup.boolean().required('Assignment status is required'),
      lecturerId: Yup.number()
        .required('Lecturer ID is required')
        .oneOf([1, 2, 3, 4], 'Invalid Lecturer ID'), // Must match an actual dropdown entry
    }),
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
    },
  });

  return (
    <>
      <Breadcrumb pageName="Add/Update Subject" />
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 rounded-lg border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark"
      >
        <h2 className="text-lg font-medium mb-6 text-black dark:text-white">
          Update Subject
        </h2>

        {/* Subject Name */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter subject name"
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

        {/* Is Assigned (Toggle) */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white">
            Is Assigned
          </label>
          <div
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

        {/* Lecturer ID (Dropdown) */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white">
            Lecturer ID
          </label>
          <select
            id="lecturerId"
            name="lecturerId"
            className={`w-40 text-center rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
              formik.touched.lecturerId && formik.errors.lecturerId
                ? 'border-red-500'
                : 'border-gray-300 focus:border-primary'
            } dark:bg-gray-800 disabled:bg-gray-300 dark:disabled:bg-gray-600`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lecturerId}
            disabled={!formik.values.isAssigned}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>
        {formik.touched.lecturerId && formik.errors.lecturerId && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.lecturerId}</p>
        )}

        {/* Number of Credits (Counter) */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white">
            No. of Credits
          </label>
          <div className="flex items-center">
            <input
              id="noOfCredits"
              name="noOfCredits"
              type="number"
              placeholder="Enter number of credits"
              className={`w-40 text-center rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
                formik.touched.noOfCredits && formik.errors.noOfCredits
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-primary'
              } dark:bg-gray-800`}
              value={formik.values.noOfCredits}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        {formik.touched.noOfCredits && formik.errors.noOfCredits && (
          <p className="text-red-500 text-sm mb-4">
            {formik.errors.noOfCredits}
          </p>
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
            className="w-full hover:bg-opacity-90 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-white"
          >
            Update Subject
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateSubjectForm;