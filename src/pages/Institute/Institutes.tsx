import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useState } from 'react';
import dummyLogo from '../../images/brand/logo_dummy.jpg';
import { useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader/Loader.tsx';
import { useMutation, useQuery } from 'react-query';
import { InstituteRes } from '../../types/instituteTypes/instituteRes.ts';
import instituteService from '../../services/instituteService.ts';
import ConfirmationModal from '../../components/Miscellaneous/ConfirmationModal.tsx';
import Toast from '../../components/Miscellaneous/Toast.tsx';
import { useData, useDispatcher } from '../../context/MainContext.tsx';
import { LecturerRes } from '../../types/lecturerTypes/lecturerRes.ts';

const Institutes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [institutesList, setInstitutesList] = useState<InstituteRes[]>([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // @ts-ignore
  const [selectedInstitute, setSelectedInstitute] = useState(0);
  const [toast, setToast] = useState(null);
  const dispatch = useDispatcher();

  const lecturer: LecturerRes | null= useData();

  const {
    isLoading: isLoadingInstitutes,
    refetch
  } = useQuery(['getInstitutes',(lecturer?.id)], () => instituteService.getInstitutesForLecturer("institutes",{lecturerId: lecturer?.id}), {
    onSuccess: (data) => {
      setInstitutesList(data)
    }
  });

  const { mutate: deleteInstitute, isLoading: isDeletingInstitute } = useMutation(
    instituteService.deleteInstituteById,
    {
      onSuccess: () => {
        // @ts-ignore
        setToast({ message: "Institute deleted successfully!", type: "success" });
        refetch()
        dispatch({ type: "delete" });
      },
      onError: () => {
        // @ts-ignore
        setToast({ message: "Institute deletion unsuccessful!", type: "error" });
      },
    },
  );

  const deleteOperation = (instituteId:number) => {
    setInstitutesList((prev) =>
      prev.filter((inst) => inst.id !== instituteId),
    );
    deleteInstitute({instituteId: instituteId})
  }

  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInstitutes = institutesList?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(institutesList?.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNavigation = (path: string) => {
    navigate(path); // Route navigation
  };

  if (isLoadingInstitutes || isDeletingInstitute) {
    return <Loader />;
  }

  // @ts-ignore
  // @ts-ignore
  return (
    <>
      <Breadcrumb pageName="Institutes" />

      <div className="flex flex-col gap-10">
        <div className="rounded-md border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
              <tr className="bg-gray-2 dark:bg-meta-4">
                <th className="min-w-[120px] py-4 px-4 text-left font-medium text-black dark:text-white">
                  Logo
                </th>
                <th className="min-w-[150px] py-4 px-4 text-left font-medium text-black dark:text-white">
                  Name
                </th>
                <th className="min-w-[150px] py-4 px-4 text-left font-medium text-black dark:text-white">
                  E-mail
                </th>
                <th className="min-w-[150px] py-4 px-4 text-left font-medium text-black dark:text-white">
                  Contact Number
                </th>
                <th className="min-w-[100px] py-4 px-4 text-left font-medium text-black dark:text-white">
                  Division
                </th>
                <th className="py-4 px-4 text-left font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
              </thead>
              <tbody>
              {institutesList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-5">
                    <p className="text-gray-500">No Institutes Found</p>
                  </td>
                </tr>
              ) : (
                currentInstitutes?.map(
                  (institute: InstituteRes, key: number) => (
                    <tr
                      key={key + institute?.name}
                      className="hover:bg-gray-200 dark:hover:bg-gray-800"
                    >
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <img
                          src={institute.logo ?? dummyLogo}
                          alt={institute.name}
                          className="h-12 w-12 rounded-full"
                        />
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {institute.name}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {institute.email ?? 'N/A'}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {institute?.telephone ?? 'N/A'}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {institute.division ?? 'N/A'}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button
                            className="hover:text-primary"
                            title="View"
                            onClick={() =>
                              handleNavigation(
                                `/app/institutes/${institute.id}`,
                              )
                            }
                          >
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                fill=""
                              />
                              <path
                                d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                fill=""
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ),
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded text-black dark:text-white"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === index + 1
                      ? 'bg-primary text-white'
                      : 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded text-black dark:text-white"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        {toast && <Toast {
                           // @ts-ignore
                           ...toast} onClose={() => setToast(null)} />}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        title={'Delete Confirmation'}
        message={'Are you sure that you want to delete this Institute?'}
        btnOne={'Delete'}
        btnTwo={'Cancel'}
        onConfirm={() => {
          deleteOperation(selectedInstitute)
          setIsModalOpen(false)
        }}
        onClose={() => setIsModalOpen(false)}
      ></ConfirmationModal>
    </>
  );
};

export default Institutes;