import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Role } from "../../types/enums/role";
import InstituteService from "../../services/instituteService";
import LecturerService from "../../services/lecturerService";
import { useMutation } from "react-query";
import Toast from "../../components/Miscellaneous/Toast";
import Loader from "../../common/Loader/Loader";
import { useDispatcher } from "../../context/MainContext";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const dispatch = useDispatcher();

  const { mutate: subscribeInstitute, isLoading: isSubscribingInstitute } = useMutation(
    InstituteService.subscribeInstitute, 
    {
      onSuccess: () => {
        setToast({
          // @ts-ignore
          message: 'Account subscribed successfully!',
          type: 'success',
        });
        dispatch({ type: 'delete' });
      },
      onError: () => {
        setToast({
          // @ts-ignore
          message: 'Failed to subscribe account. Please try again.',
          type: 'error',
        });
      },
    }
  );

  const { mutate: subscribeLecturer, isLoading: isSubscribingLecturer } = useMutation(
    LecturerService.subscribeLecturer, 
    {
      onSuccess: () => {
        setToast({
          // @ts-ignore
          message: 'Account subscribed successfully!',
          type: 'success',
        });
        dispatch({ type: 'delete' });
      },
      onError: () => {
        setToast({
          // @ts-ignore
          message: 'Failed to subscribe account. Please try again.',
          type: 'error',
        });
      },
    }
  );

  useEffect(() => {
    const id = localStorage.getItem("userId");
    const role = localStorage.getItem("role");


    const formData = new FormData();
    formData.append('subscribed', String(true));
    role === Role.LECTURER ? subscribeLecturer({lecturerId:id, subscribed:formData}) : subscribeInstitute({instituteId:id, subscribed:formData})


    const timer = setTimeout(() => {
      navigate("/app/profile/pricing-card");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isSubscribingInstitute || isSubscribingLecturer || loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="bg-white p-8 rounded-lg shadow-md text-center dark:bg-boxdark">
        <h2 className="mb-4 text-3xl font-semibold text-black dark:text-white text-center md:text-left">Payment Successful! 🎉</h2>
        <p className="mt-2 text-black dark:text-white">Redirecting you to your profile...</p>
      </div>
      {toast && <Toast
        // @ts-ignore
        {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default PaymentSuccess;
