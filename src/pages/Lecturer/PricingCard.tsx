import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Role } from "../../types/enums/role";
import { useData, useDispatcher } from "../../context/MainContext";
import InstituteService from "../../services/instituteService";
import AuthService from "../../services/authService";
import LecturerService from "../../services/lecturerService";
import ConfirmationModal from "../../components/Miscellaneous/ConfirmationModal";
import Toast from "../../components/Miscellaneous/Toast";
import Loader from "../../common/Loader/Loader";
import { InstituteRes } from "../../types/instituteTypes/instituteRes";
import { LecturerRes } from "../../types/lecturerTypes/lecturerRes";

// @ts-ignore
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PricingCard = () => {
  // @ts-ignore
  const data: LecturerRes | InstituteRes = useData();
  const dispatch = useDispatcher();
  const [toast, setToast] = useState(null);
  const id = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    try {
      const session = await AuthService.createCheckoutSession({
        priceId: "price_1R6vJr4GnqXvQpQkabcde12345",
      });

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId: session.sessionId });
        if (error) console.error("Stripe checkout error:", error);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  const handleOnClick = () => {
    window.location.href = "https://buy.stripe.com/test_28ocPdgu58i2dkA8ww";
    handleCheckout();
  };

  const { mutate: subscribeInstitute, isLoading: isSubscribingInstitute } = useMutation(
    InstituteService.subscribeInstitute,
    {
      onSuccess: () => {
        setToast({
          // @ts-ignore
          message: 'Account Unsubscribed successfully!',
          type: 'success',
        });
        dispatch({ type: 'delete' });
      },
      onError: () => {
        setToast({
          // @ts-ignore
          message: 'Failed to Unsubscribe account. Please try again.',
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
          message: 'Account Unsubscribed successfully!',
          type: 'success',
        });
        dispatch({ type: 'delete' });
      },
      onError: () => {
        setToast({
          // @ts-ignore
          message: 'Failed to Unsubscribe account. Please try again.',
          type: 'error',
        });
      },
    }
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isSubscribingInstitute || isSubscribingLecturer || loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-m flex flex-col rounded-3xl bg-white dark:bg-boxdark shadow-xl ring-1 ring-black/10">
      <div className="p-8 sm:p-10">
        <h3 className="text-xl font-semibold leading-8 tracking-tight text-indigo-600">
          {data?.subscribed
            ? `Change subscription to AI Match Feature`
            : `Subscribe to AI Match Feature`}
        </h3>
        <div className="mt-4 flex items-baseline text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          <span>$10</span>
          <span className="text-lg font-semibold leading-8 tracking-normal text-gray-500">
            /month
          </span>
        </div>
        <p className="mt-6 text-base leading-7 text-gray-500 ">
          {`The $10 per month Basic Subscription Package unlocks the AI Match
            Feature, ${
              localStorage.getItem('role') === 'INSTITUTE'
                ? 'offering one click smart matching between a given subject and a suitable lecturer to that subject.'
                : 'makes your profile available for AI match model training'
            }`}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-2">
        <div className="flex flex-1 flex-col justify-between rounded-2xl bg-gray-50 dark:bg-gray-900 p-6 sm:p-8">
          <ul className="space-y-6">
            <strong className="ml-3">Features enabled</strong>
            <li className="flex items-start">
              <p className="ml-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Unlimited AI Assistance
              </p>
            </li>
            <li className="flex items-start">
              <p className="ml-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Free model training for updated data sets
              </p>
            </li>
            <li className="flex items-start">
              <p className="ml-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Timely updates on new features
              </p>
            </li>
          </ul>
          <div className="mt-8">
            {data?.subscribed ? (
              <div className="flex items-center gap-3">
                <button
                  disabled
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg cursor-not-allowed"
                >
                  Already Subscribed
                </button>
                <button
                  onClick={() => {
                    setIsNewModalOpen(true);
                  }}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Unsubscribe
                </button>
              </div>
            ) : (
              <button
                onClick={handleOnClick}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Get Started Today
              </button>
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isNewModalOpen}
        title={'Confirm Unsubscription'}
        message={`This will unsubscribed you. Enter Confirm to continue?`}
        btnOne={'Confirm'}
        btnTwo={'Cancel'}
        submit={true}
        onConfirm={() => {
          const formData = new FormData();
          formData.append('subscribed', String(false));
          role === Role.LECTURER
            ? subscribeLecturer({ lecturerId: id, subscribed: formData })
            : subscribeInstitute({ instituteId: id, subscribed: formData });
          setIsNewModalOpen(false);
          setToast({
            // @ts-ignore
            message: 'Account successfully unsubscribe!',
            type: 'success',
          });
        }}
        onClose={() => {
          setIsNewModalOpen(false);
          setToast({
            // @ts-ignore
            message: 'Subscription settings are reverted to last saved',
            type: 'success',
          });
        }}
      />
      {toast && (
        <Toast
          // @ts-ignore
          {...toast}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default PricingCard;
