import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

// Mock Program Data
const mockProgram = {
  id: 1,
  name: 'Software Engineering',
  description:
    'Combining programming skills with engineering principles. A well-designed program to prepare students to excel in software design and architecture.',
  level: 'BSC',
  durationInDays: 720,
  studentCount: 150,
  batchId: 'SE-B2023',
  payment: 1200.5,
  instituteId: 101,
  subjects: [
    { id: 1, name: 'Object-Oriented Programming', noOfCredits: 3 },
    { id: 2, name: 'Agile Development', noOfCredits: 2 },
    { id: 3, name: 'Software Architecture', noOfCredits: 4 },
  ],
};

const Program = () => {

  return (
    <>
      <Breadcrumb pageName="Program Details" />

      <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
        <h3 className="text-3xl font-semibold text-black dark:text-white mb-6">
          {mockProgram.name}
        </h3>

        <div className="space-y-4">
          {/* Level */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">Level:</h4>
            <p className="flex-1">{mockProgram.level}</p>
          </div>

          {/* Duration in Days */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              Duration (Days):
            </h4>
            <p className="flex-1">{mockProgram.durationInDays}</p>
          </div>

          {/* Student Count */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              Student Count:
            </h4>
            <p className="flex-1">{mockProgram.studentCount}</p>
          </div>

          {/* Batch ID */}
          {mockProgram.batchId && (
            <div className="flex gap-4">
              <h4 className="font-semibold text-black dark:text-white w-40">Batch ID:</h4>
              <p className="flex-1">{mockProgram.batchId}</p>
            </div>
          )}

          {/* Payment */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">Payment:</h4>
            <p className="flex-1">${mockProgram.payment.toFixed(2)}</p>
          </div>

          {/* Institute ID */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              Institute ID:
            </h4>
            <p className="flex-1">{mockProgram.instituteId}</p>
          </div>

          {/* Subjects */}
          {mockProgram.subjects && (
            <div className="flex gap-4">
              <h4 className="font-semibold text-black dark:text-white w-40">Subjects:</h4>
              <ul className="list-disc flex-1 pl-4">
                {mockProgram.subjects.map((subject) => (
                  <li key={subject.id} className="flex-1 ">
                    {subject.name} ({subject.noOfCredits} Credits)
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          <div className="flex gap-4">
            <h4 className="font-semibold text-black dark:text-white w-40">
              Description:
            </h4>
            <p className="flex-1">{mockProgram.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Program;