import { useFormik } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Qualification } from '../../types/qualification.ts';
import { Level } from '../../types/level.ts';
import DatePickerTwo from '../../components/Forms/DatePicker/DatePickerTwo.tsx';

const UpdateQualificationForm = () => {
  const formik = useFormik<Qualification>({
    initialValues: {
      id: 1, // Example default ID
      name: '',
      awardingBody: '',
      durationInDays: 1, // Default duration
      discipline: '', // Optional field
      completedAt: '', // Example empty date string
      level: '' as Level, // Replace with a default value based on Level type
      lecturerId: 1, // Default lecturer ID
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Qualification name is required')
        .max(255, 'Qualification name must not exceed 255 characters'),
      awardingBody: Yup.string().required('Awarding body is required'),
      durationInDays: Yup.number()
        .required('Duration is required')
        .integer('Duration must be an integer')
        .positive('Duration must be a positive value'),
      discipline: Yup.string()
        .max(255, 'Discipline must not exceed 255 characters')
        .nullable(),
      completedAt: Yup.date()
        .required('Completion date is required')
        .typeError('Please enter a valid date in YYYY-MM-DD format'),
      level: Yup.string()
        .required('Level is required')
        .oneOf(
          [
            'PGD',
            'HND',
            'BSc',
            'MSc',
            'Phd',
          ],
          'Invalid level',
        ), // Adjust based on Level values
      lecturerId: Yup.number()
        .required('Lecturer ID is required')
        .oneOf([1, 2, 3, 4], 'Invalid Lecturer ID'), // Valid lecturer IDs
    }),
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
    },
  });

  return (
    <>
      <Breadcrumb pageName="Add/Update Qualification" />
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 rounded-lg border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark"
      >
        <h2 className="text-lg font-medium mb-6 text-black dark:text-white">
          Update Qualification
        </h2>

        {/* Qualification Name */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter qualification name"
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

        {/* Awarding Body */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white" htmlFor="awardingBody">
            Awarding Body
          </label>
          <input
            id="awardingBody"
            name="awardingBody"
            type="text"
            placeholder="Enter awarding body"
            className={`flex-1 rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
              formik.touched.awardingBody && formik.errors.awardingBody
                ? 'border-red-500'
                : 'border-gray-300 focus:border-primary'
            } dark:bg-gray-800`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.awardingBody}
          />
        </div>
        {formik.touched.awardingBody && formik.errors.awardingBody && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.awardingBody}</p>
        )}

        {/* Duration in Days */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white" htmlFor="durationInDays">
            Duration (Days)
          </label>
          <div className="flex items-center gap-4">
            <input
              id="durationInDays"
              name="durationInDays"
              type="number"
              className="w-30 text-center rounded-md border-[1.5px] py-2 px-3 outline-none dark:bg-gray-800"
              value={formik.values.durationInDays}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        {formik.touched.durationInDays && formik.errors.durationInDays && (
          <p className="text-red-500 text-sm mb-4">
            {formik.errors.durationInDays}
          </p>
        )}

        {/* Discipline */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white" htmlFor="discipline">
            Discipline
          </label>
          <input
            id="discipline"
            name="discipline"
            type="text"
            placeholder="Enter discipline"
            className={`flex-1 rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
              formik.touched.discipline && formik.errors.discipline
                ? 'border-red-500'
                : 'border-gray-300 focus:border-primary'
            } dark:bg-gray-800`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.discipline}
          />
        </div>
        {formik.touched.discipline && formik.errors.discipline && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.discipline}</p>
        )}

        {/* Completed At (Date Picker) */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white" htmlFor="completedAt">
            Completed At
          </label>
          <DatePickerTwo
            id="completedAt"
            value={formik.values.completedAt}
            onChange={(date) => formik.setFieldValue('completedAt', date)}
          />
        </div>
        {formik.touched.completedAt && formik.errors.completedAt && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.completedAt}</p>
        )}

        {/* Level (Dropdown) */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white" htmlFor='level'>Level</label>
          <select
            id="level"
            name="level"
            className={`w-40 text-center rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
              formik.touched.level && formik.errors.level
                ? 'border-red-500'
                : 'border-gray-300 focus:border-primary'
            } dark:bg-gray-800`}
            onChange={formik.handleChange}
            value={formik.values.level}
          >
            <option value="">Select Level</option>
            <option value="PGD">PGD</option>
            <option value="MSc">MSc</option>
            <option value="BSc">BSc</option>
            <option value="HND">HND</option>
            <option value="PGD">PGD</option>
          </select>
        </div>
        {formik.touched.level && formik.errors.level && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.level}</p>
        )}

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full hover:bg-opacity-90 inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-white"
          >
            Update Qualification
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateQualificationForm;