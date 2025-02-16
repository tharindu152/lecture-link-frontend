import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

// Mock Subject Data
const mockSubjects: SubjectDto[] = [
  {
    id: 1,
    name: 'Agile Development',
    noOfCredits: 2,
    description: 'Introduction to Agile methodologies and practices.',
    isAssigned: true,
    lecturerId: 101,
  },
  {
    id: 2,
    name: 'Object-Oriented Programming',
    noOfCredits: 3,
    description:
      'Learn the fundamentals of object-oriented programming and design patterns.',
    isAssigned: true,
    lecturerId: 102,
  },
  {
    id: 3,
    name: 'Software Architecture',
    noOfCredits: 4,
    description:
      'An advanced course on designing scalable and maintainable software systems.',
    isAssigned: false,
    lecturerId: 103,
  },
];

type SubjectDto = {
  id: number;
  name: string;
  noOfCredits: number;
  description?: string;
  isAssigned: boolean;
  lecturerId?: number;
};

const Subject = () => {

  // Parse the subjectId from params and find the relevant subject
  const subject = mockSubjects.find((sub) => sub.id === 1);

  // Handle case where subject is not found
  if (!subject) {
    return (
      <>
        <Breadcrumb pageName="Subject Details" />
        <div className="p-6 rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="text-2xl font-semibold text-red-600">Subject Not Found</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb pageName="Subject Details" />

      <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
        <h3 className="text-3xl font-semibold text-black dark:text-white mb-6">
          {subject.name}
        </h3>

        <div className="space-y-4">
          {/* Program */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              Program:
            </h4>
            <p className="flex-1">{subject.noOfCredits}</p>
          </div>

          {/* Number of Credits */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              No. of Credits:
            </h4>
            <p className="flex-1">{subject.noOfCredits}</p>
          </div>

          {/* Description */}
          {subject.description && (
            <div className="flex gap-4">
              <h4 className="font-semibold text-black dark:text-white w-40">
                Description:
              </h4>
              <p className="flex-1">{subject.description}</p>
            </div>
          )}

          {/* Assigned Status */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              Assigned:
            </h4>
            <p className="flex-1">
              {subject.isAssigned ? (
                <span className="text-green-500">Yes</span>
              ) : (
                <span className="text-red-500">No</span>
              )}
            </p>
          </div>

          {/* Lecturer ID */}
          {subject.lecturerId && (
            <div className="flex gap-4">
              <h4 className="font-semibold text-black dark:text-white w-40">
                Lecturer ID:
              </h4>
              <p className="flex-1">{subject.lecturerId}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Subject;