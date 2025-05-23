import { useFormik } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from '../Breadcrumbs/Breadcrumb.tsx';
import { Subject } from '../../types/instituteTypes/subject.ts';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import Loader from '../../common/Loader/Loader.tsx';
import subjectService from '../../services/subjectService.ts';
import Toast from '../Miscellaneous/Toast.tsx';
import { useData, useDispatcher } from '../../context/MainContext.tsx';
import { InstituteRes } from '../../types/instituteTypes/instituteRes.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigateModal from '../Miscellaneous/NavigateModal.tsx';
import EmailService from '../../services/emailService.ts';
import LecturerService from '../../services/lecturerService.ts';

const UpdateSubjectForm = () => {
  //@ts-ignore
  const data: InstituteRes | null = useData()
  const dispatch = useDispatcher();
  const location = useLocation();
  const [toast, setToast] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const { pathname } = location;
  const subject = data?.programs?.flatMap(prog => prog.subjects || []).find(sub => sub?.id === Number(pathname.slice(29)));

  const { mutate: updateSubject, isLoading: isUpdatingSubject } = useMutation(
    subjectService.updateSubject,
    {
      onSuccess: async () => {
        // @ts-ignore
        setToast({ message: "Subject updated successfully!", type: "success" });
        dispatch({ type: "delete" });
        setShowModal(true);
        if (formik?.values?.isAssigned && formik?.values?.lecturerId) {
          const lecturerId = formik?.values?.lecturerId;
          const lecturerData = await LecturerService.getLecturerById({ lecturerId });
          const lecturerEmail = lecturerData.email;
          const formData = new FormData();
          formData.append('assign', String(formik?.values?.isAssigned));
          await updateLecturerIsAssigned({ lecturerId: formik?.values?.lecturerId, isAssigned: formData })
          await sendEmail({
            lecturerEmail,
            name: formik?.values?.name,
            data: data?.name,
          });
        }
      },
      onError: () => {
        // @ts-ignore
        setToast({ message: "Subject update is unsuccessful!", type: "error" });
      },
    },
  );

  const { mutate: sendEmail, isLoading: isSendingEmail } = useMutation(
    EmailService.sendEmailLecturer,
    {
      onSuccess: () => {
        // @ts-ignore
        setToast({ message: "Assigned Subject to Lecturer successfully, Email has send successfully", type: "success" });
      },
      onError: () => {
        // @ts-ignore
        setToast({ message: "Assigned subject unsuccessfull!", type: "error" });
      },
    }
  );

  const { mutate: updateLecturerIsAssigned, isLoading: isUpdatingLecturerIsAssigned } = useMutation(
    LecturerService.updateLecturerIsAssigned,
    {
      onSuccess: () => {
        setToast({
          // @ts-ignore
          message: 'Lecturer assigned successfully!',
          type: 'success',
        });
        dispatch({ type: 'delete' });
      },
      onError: () => {
        setToast({
          // @ts-ignore
          message: 'Failed to assign lecturer. Please try again.',
          type: 'error',
        });
      },
    }
  );

  const formik = useFormik<Subject>({
    initialValues: {
      id: subject?.id ?? 0,
      name: subject?.name ?? '',
      noOfCredits: subject?.noOfCredits ?? 0,
      description: subject?.description ?? '',
      isAssigned: subject?.isAssigned ?? false,
      lecturerId: subject?.lecturerId ?? undefined,
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
      lecturerId: Yup.number().nullable(),
    }),
    onSubmit: async (values) => {
      await updateSubject({ subjectId: subject?.id, subjectData: values });
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleModalConfirm = () => {
    setShowModal(false);
    navigate('/app/subjects');
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  if (  isUpdatingSubject || loading || isUpdatingLecturerIsAssigned) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName= "Update Subject" />
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 rounded-lg border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark"
      >
        <h2 className="text-lg font-medium mb-6 text-black dark:text-white">
          Update Subject
        </h2>

        {/* Subject Name */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter subject name"
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

        {/* Is Assigned (Toggle) */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white" htmlFor="isAssigned">
            Is Assigned to a Lecturer
          </label>

          <div
            id="isAssigned"
            onClick={() =>
              formik.setFieldValue('isAssigned', !formik.values.isAssigned)
            }
            className={`w-12 h-6 rounded-full cursor-pointer p-1 transition border-gray-800 ${
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
          <label className="block w-40 text-black dark:text-white" htmlFor="lecturerId">
            Lecturer ID
          </label>
          <input
            id="lecturerId"
            name="lecturerId"
            className={`w-40 text-center rounded-md border-[1.5px] py-2 px-3 outline-none transition ${
              formik.touched.lecturerId && formik.errors.lecturerId
                ? 'border-red-500'
                : 'border-gray-800 focus:border-primary'
            } dark:bg-gray-800 disabled:bg-gray-300 dark:disabled:bg-gray-600`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lecturerId}
            disabled={!formik.values.isAssigned}



          ></input>
        </div>
        {formik.touched.lecturerId && formik.errors.lecturerId && (
          <p className="text-red-500 text-sm mb-4">{formik.errors.lecturerId}</p>
        )}

        {/* Number of Credits (Counter) */}
        <div className="mb-4 flex items-center">
          <label className="block w-40 text-black dark:text-white" htmlFor="noOfCredits">
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
                  : 'border-gray-800 focus:border-primary'
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
            Subject Description
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
            onClick={() => {
              formik.handleSubmit();
            }}
            disabled={!formik.isValid || isSendingEmail}
            className={`mt-6 w-full inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-gray-500 py-2 px-5 text-center font-medium text-gray-500 transition duration-150 ease-in-out ${formik.isValid ? 'hover:bg-primary hover:border-primary hover:text-white hover:bg-opacity-90' : ''}`}
          >
            Update Subject
          </button>
        </div>
      </form>
      {showModal && (
        <NavigateModal
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          message={'Subject Updated Successfully'}
          btnOne={'Keep Updating Subject'}
          btnTwo={'View Subject List'}/>
      )}
      {toast && <Toast
        // @ts-ignore
        {...toast} onClose={() => setToast(null)} />}
    </>
  );
};

export default UpdateSubjectForm;