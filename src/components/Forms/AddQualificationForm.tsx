import { useFormik } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from '../Breadcrumbs/Breadcrumb.tsx';
import { Qualification } from '../../types/lecturerTypes/qualification.ts';
import { Level } from '../../types/enums/level.ts';
import DatePicker from './DatePicker/DatePicker.tsx';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import qualificationService from '../../services/qualificationService.ts';
import Loader from '../../common/Loader/Loader.tsx';
import Toast from '../Miscellaneous/Toast.tsx';
import NavigateModal from '../Miscellaneous/NavigateModal.tsx';
import { useNavigate } from 'react-router-dom';
import { LecturerRes } from '../../types/lecturerTypes/lecturerRes.ts';
import { useData, useDispatcher } from '../../context/MainContext.tsx';

const AddQualificationForm = () => {

  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const lecturer: LecturerRes | null = useData()
  const dispatch = useDispatcher();

  const { mutate: createQualification, isLoading: isCreatingQualification } = useMutation(
    qualificationService.createQualification,
    {
      onSuccess: () => {
        // @ts-ignore
        setToast({ message: "Qualification created successfully!", type: "success" });
        dispatch({ type: 'delete' });
        formik.resetForm()
      },
      onError: () => {
        // @ts-ignore
        setToast({ message: "Qualification creation is unsuccessful!", type: "error" });
      },
    },
  );

  const formik = useFormik<Qualification>({
    initialValues: {
      name: '',
      awardingBody: '',
      durationInDays: 1,
      discipline: '',
      completedAt: '',
      level: '' as Level,
      lecturerId: lecturer?.id ?? 0,
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
          ['DOCTORATE', 'MASTERS', 'POSTGRADUATE', 'BACHELORS', 'HND', 'HNC'],
          'Invalid level',
        )
    }),
    onSubmit: (values) => {
      createQualification({ qualificationData: values });
      setShowModal(true);
    },
  });

  const [loading, setLoading] = useState(true);

  const handleModalConfirm = () => {
    setShowModal(false);
    navigate('/app/qualifications');
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isCreatingQualification || loading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName={'Add Qualification'} />
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 rounded-lg border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark"
      >
        <h2 className="text-lg font-medium mb-6 text-black dark:text-white">
          Update Qualification
        </h2>

        {/* Qualification Name */}
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
            placeholder="Enter qualification name"
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

        {/* Awarding Body */}
        <div className="mb-4 flex items-center">
          <label
            className="block w-40 text-black dark:text-white"
            htmlFor="awardingBody"
          >
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
                : 'border-gray-800 focus:border-primary'
            } dark:bg-gray-800`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.awardingBody}
          />
        </div>
        {formik.touched.awardingBody && formik.errors.awardingBody && (
          <p className="text-red-500 text-sm mb-4">
            {formik.errors.awardingBody}
          </p>
        )}

        {/* Duration in Days */}
        <div className="mb-4 flex items-center">
          <label
            className="block w-40 text-black dark:text-white"
            htmlFor="durationInDays"
          >
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
          <label
            className="block w-40 text-black dark:text-white"
            htmlFor="discipline"
          >
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
                : 'border-gray-800 focus:border-primary'
            } dark:bg-gray-800`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.discipline}
          />
        </div>
        {formik.touched.discipline && formik.errors.discipline && (
          <p className="text-red-500 text-sm mb-4">
            {formik.errors.discipline}
          </p>
        )}

        {/* Completed At (Date Picker) */}
        <div className="mb-4 flex items-center">
          <label
            className="block w-40 text-black dark:text-white"
            htmlFor="completedAt"
          >
            Completed At
          </label>
          <DatePicker
            id="completedAt"
            value={formik.values.completedAt}
            onChange={(date) => formik.setFieldValue('completedAt', date)}
          />
        </div>
        {formik.touched.completedAt && formik.errors.completedAt && (
          <p className="text-red-500 text-sm mb-4">
            {formik.errors.completedAt}
          </p>
        )}

        {/* Level (Dropdown) */}
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
            value={formik.values.level}
          >
            <option value="">Select Level</option>
            <option value="DOCTORATE">DOCTORATE</option>
            <option value="MASTERS">MASTERS</option>
            <option value="BACHELORS">BACHELORS</option>
            <option value="POSTGRADUATE">POSTGRADUATE</option>
            <option value="HND">HND</option>
            <option value="HNC">HNC</option>
          </select>
        </div>
        {formik.touched.level && formik.errors.level && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.level}</p>
        )}

        {/* Submit Button */}
        <button
          onClick={() => {
            formik.handleSubmit();
          }}
          className={`mt-6 w-full inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out ${formik.isValid ? 'hover:bg-primary hover:border-primary hover:text-white hover:bg-opacity-90' : ''}`}
          type="submit"
          disabled={!formik.isValid}
        >
          {'Add Qualification'}
        </button>
      </form>
      {showModal && (
        <NavigateModal
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          message={'Qualification Added Successfully!'}
          btnOne={'Keep adding'}
          btnTwo={'Go to qualification list'}
        />
      )}
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

export default AddQualificationForm;