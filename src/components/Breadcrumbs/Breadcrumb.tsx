import { Link } from 'react-router-dom';
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium hover:underline" to="/app/dashboard">
              Dashboard /
            </Link>
            {pageName === 'Add/Update Profile' ? (
              <Link className="font-medium hover:underline" to="/app/profile">
                Profile /
              </Link>
            ) : (
              ''
            )}
            {pageName === 'Add/Update Program' ||
            pageName === 'Program Details' ? (
              <Link className="font-medium hover:underline" to="/app/programs">
                Programs /
              </Link>
            ) : (
              ''
            )}
            {pageName === 'Add/Update Subject' ||
            pageName === 'Subject Details' ? (
              <Link className="font-medium hover:underline" to="/app/subjects">
                Subjects /
              </Link>
            ) : (
              ''
            )}
            {pageName === 'Add/Update Lecturer' ||
            pageName === 'Lecturer Profile' ? (
              <Link className="font-medium hover:underline" to="/app/lecturers">
                Lecturers /
              </Link>
            ) : (
              ''
            )}
          </li>
          <li className="text-primary">
            <Link className="font-medium hover:underline" to="">
              {pageName}
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
