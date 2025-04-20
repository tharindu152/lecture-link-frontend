import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button"; 
import LecturerService from "../../services/lecturerService.ts";
import InstituteService from "../../services/instituteService.ts";
import Toast from "./Toast.tsx";
import { useEffect, useState } from "react";
import { useDispatcher } from "../../context/MainContext.tsx";
import { useMutation } from "react-query";
import Loader from "../../common/Loader/Loader.tsx";

interface StarRatingProps {
  lecturerId?: number;
  instituteId?: number;
  marginLeft?: number; 
  marginTop?: number;
  refetch?: () => void;
}

export default function StarRating({
  lecturerId,
  instituteId,
  marginLeft = 4,
  marginTop = 2,
  refetch
}: Readonly<StarRatingProps>) {
  const [value, setValue] = React.useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const dispatch = useDispatcher();

  const handleRatingChange = (
    //@ts-ignore
    event: React.SyntheticEvent,
    newValue: number | null,
  ) => {
    setValue(newValue);
  };

  const { mutate: updateInstituteRating, isLoading: isRatingInstitute } =
    useMutation(InstituteService.updateInstituteRating, {
      onSuccess: () => {
        setToast({
          // @ts-ignore
          message: 'Institute Rating successfull!',
          type: 'success',
        });
        dispatch({ type: 'delete' });
        if (refetch) {
          refetch();
        }
      },
      onError: () => {
        setToast({
          // @ts-ignore
          message: 'Failed to Rate Institute. Please try again.',
          type: 'error',
        });
      },
    });

  const { mutate: updateLecturerRating, isLoading: isRatingLecturer } =
    useMutation(LecturerService.updateLecturerRating, {
      onSuccess: () => {
        setToast({
          // @ts-ignore
          message: 'Lecturer Rating successfully!',
          type: 'success',
        });
        dispatch({ type: 'delete' });
        if (refetch) {
          refetch();
        }
      },
      onError: () => {
        setToast({
          // @ts-ignore
          message: 'Failed to Rate Lecturer. Please try again.',
          type: 'error',
        });
      },
    });

  const handleSubmit = async () => {
    if (value === null) {
      setToast({
        // @ts-ignore
        message: 'Error: No rating selected!',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('newRating', value.toString());
      if (lecturerId) {
        updateLecturerRating({ lecturerId: lecturerId, newRating: formData });
      } else if (instituteId) {
        updateInstituteRating({
          instituteId: instituteId,
          newRating: formData,
        });
      }
    } finally {
      setIsSubmitting(false);
      setValue(0);
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isRatingInstitute || isRatingLecturer || loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: marginTop }}>
      <label
        htmlFor={'rating'}
        style={{ marginRight: '8px', fontWeight: 'bold', color: 'white' }}
      >
        Rate this Lecturer:
      </label>
      <Rating
        id={'rating'}
        name="simple-controlled"
        value={value}
        onChange={handleRatingChange}
        sx={{ ml: marginLeft, justifyContent: 'center' }}
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={handleSubmit}
        disabled={isSubmitting}
        sx={{
          ml: 2,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2.5,
          borderRadius: '9999px',
          border: '2px solid',
          borderColor: '#515965',
          textAlign: 'center',
          fontWeight: '500',
          fontFeatureSettings: 'normal',
          color: '#515965',
          transition:
            'background-color 150ms ease-in-out, border-color 150ms ease-in-out, color 150ms ease-in-out', // transition duration-150 ease-in-out
          '&:hover': {
            backgroundColor: '#3a50df',
            borderColor: '#3a50df',
            color: 'white',
          },
        }}
      >
        Submit Rating
      </Button>
      {toast && (
        <Toast
          // @ts-ignore
          {...toast}
          onClose={() => setToast(null)}
        />
      )}
    </Box>
  );
}