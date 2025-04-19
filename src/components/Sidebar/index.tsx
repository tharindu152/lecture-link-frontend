import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../images/logo/LectureLinkLogo.png';
import { Role } from '../../types/enums/role.ts';
import { useData } from '../../context/MainContext.tsx';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const data = useData();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 shadow-default flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/app/profile">
          <img src={Logo} alt="Logo" style={{ width: '150px' }} />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className=" py-4 px-4 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-lg font-semibold text-bodydark2">
              {data?.name}
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/app/dashboard"
                  className={`group relative flex items-center gap-2 rounded-sm py-2 px-4 font-medium text-grey-800 duration-300 ease-in-out hover:bg-gray-500 dark:hover:bg-meta-4 hover:text-bodydark1 ${
                    pathname.includes('dashboard') &&
                    'bg-gray-500 dark:bg-meta-4 text-bodydark1'
                  }`}
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
                      d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                      fill=""
                    />
                    <path
                      d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                      fill=""
                    />
                    <path
                      d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                      fill=""
                    />
                    <path
                      d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                      fill=""
                    />
                  </svg>
                  Dashboard
                </NavLink>
              </li>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Institute --> */}
              <li>
                <NavLink
                  to="/app/profile"
                  className={`group relative flex items-center gap-2 rounded-sm py-2 ${localStorage.getItem('role') === Role.INSTITUTE ? 'px-3' : "px-4"} font-medium text-grey-800 duration-300 ease-in-out hover:bg-gray-500 dark:hover:bg-meta-4 hover:text-bodydark1 ${
                    pathname.includes('profile') &&
                    !pathname.includes('settings') &&
                    'bg-gray-500 dark:bg-meta-4 text-bodydark1'
                  }`}
                >
                  {localStorage.getItem('role') === Role.INSTITUTE ? (
                    <svg
                      className="fill-current"
                      width="23"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 2H9c-1.103 0-2 .897-2 2v5.586l-4.707 4.707A1 1 0 0 0 3 16v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4c0-1.103-.897-2-2-2zm-8 18H5v-5.586l3-3 3 3V20zm8 0h-6v-4a.999.999 0 0 0 .707-1.707L9 9.586V4h10v16z"
                        fill=""
                        className="fill-000000"
                      ></path>
                      <path
                        d="M11 6h2v2h-2zm4 0h2v2h-2zm0 4.031h2V12h-2zM15 14h2v2h-2zm-8 1h2v2H7z"
                        fill=""
                        className="fill-000000"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="stroke-current"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.249 6a5.25 5.25 0 1 1-10.5 0V.75h10.5ZM2.249 23.25a9.75 9.75 0 1 1 19.5 0M.749.75h22.5M6.749 5.25h10.5M2.249.75v7.5"
                        fill="none"
                        stroke=""
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5px"
                        className="stroke-000000"
                      ></path>
                      <path
                        d="m7.012 14.871 4.987 3.879 4.987-3.879"
                        fill="none"
                        stroke=""
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5px"
                        className="stroke-000000"
                      ></path>
                    </svg>
                  )}
                  {`${
                    localStorage.getItem('role') === Role.INSTITUTE
                      ? 'Institute'
                      : 'Lecturer'
                  } Profile`}
                </NavLink>
              </li>
              {/* <!-- Menu Item Institute --> */}

              {/* <!-- Menu Item Programs --> */}
              {localStorage.getItem('role') === Role.INSTITUTE && (
                <li>
                  <NavLink
                    to="/app/programs"
                    className={`group relative flex items-center gap-1.5 rounded-sm py-2 px-3 font-medium text-grey-800 duration-300 ease-in-out hover:bg-gray-500 dark:hover:bg-meta-4 hover:text-bodydark1 ${
                      pathname.includes('programs') &&
                      'bg-gray-500 dark:bg-meta-4 text-bodydark1'
                    }`}
                  >
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m28.82 8.69-11-6.13a3.13 3.13 0 0 0-3.58 0l-11 6.13a2.85 2.85 0 0 0 0 4.62l.11.07L7 15.44V25c0 1.57 2.26 5 9 5s9-3.43 9-5v-9.56l3-1.67V25a1 1 0 0 0 2 0V11a2.87 2.87 0 0 0-1.18-2.31ZM23 25c0 .39-1.41 3-7 3s-7-2.61-7-3v-8.45l5.2 2.89a3.17 3.17 0 0 0 3.6 0l5.2-2.89Zm4.67-13.33-11 6.12a1.14 1.14 0 0 1-1.32 0l-11-6.12a.85.85 0 0 1 0-1.34s11-6.09 11-6.12a1.17 1.17 0 0 1 1.34 0s11 6.12 11 6.12a.85.85 0 0 1 0 1.34Z"
                        data-name="cap, graduation, hat, graduate, university, school, student, ceremony, diploma, college"
                        fill=""
                        className="fill-000000"
                      ></path>
                    </svg>
                    Programs
                  </NavLink>
                </li>
              )}
              {/* <!-- Menu Item Programs --> */}

              {/* <!-- Menu Item Subjects --> */}
              {localStorage.getItem('role') === Role.INSTITUTE && (
                <li>
                  <NavLink
                    to="/app/subjects"
                    className={`group relative flex items-center gap-2 rounded-sm py-2 px-4 font-medium text-grey-800 duration-300 ease-in-out hover:bg-gray-500 dark:hover:bg-meta-4 hover:text-bodydark1 ${
                      pathname.includes('subjects') &&
                      'bg-gray-500 dark:bg-meta-4 text-bodydark1'
                    }`}
                  >
                    <svg
                      className="stroke-current"
                      width="18"
                      height="18"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g data-name="81-book">
                        <path
                          d="M3 27V5a4 4 0 0 1 4-4h22v22H7.17A4.12 4.12 0 0 0 3 26.61 4 4 0 0 0 7 31h22M27 23v8"
                          fill="none"
                          stroke=""
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3px"
                          className="fill-000000"
                        ></path>
                      </g>
                    </svg>
                    Subjects
                  </NavLink>
                </li>
              )}
              {localStorage.getItem('role') === Role.LECTURER && (
                <li>
                  <NavLink
                    to="/app/qualifications"
                    className={`group relative flex items-center gap-2 rounded-sm py-2 px-4 font-medium text-grey-800 duration-300 ease-in-out hover:bg-gray-500 dark:hover:bg-meta-4 hover:text-bodydark1 ${
                      pathname.includes('qualifications') &&
                      'bg-gray-500 dark:bg-meta-4 text-bodydark1'
                    }`}
                  >
                    <svg
                      className="stroke-current"
                      width="18"
                      height="18"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g data-name="81-book">
                        <path
                          d="M3 27V5a4 4 0 0 1 4-4h22v22H7.17A4.12 4.12 0 0 0 3 26.61 4 4 0 0 0 7 31h22M27 23v8"
                          fill="none"
                          stroke=""
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3px"
                          className="fill-000000"
                        ></path>
                      </g>
                    </svg>
                    Qualifications
                  </NavLink>
                </li>
              )}
              {/* <!-- Menu Item Subjects --> */}

              {/* <!-- Menu Item Lecturers --> */}
              {localStorage.getItem('role') === Role.INSTITUTE && (
                <li>
                  <NavLink
                    to="/app/lecturers"
                    className={`group relative flex items-center gap-2 rounded-sm py-2 px-4 font-medium text-grey-800 duration-300 ease-in-out hover:bg-gray-500 dark:hover:bg-meta-4 hover:text-bodydark1 ${
                      pathname.includes('lecturers') &&
                      pathname.split('/').length === 3 &&
                      'bg-gray-500 dark:bg-meta-4 text-bodydark1'
                    }`}
                  >
                    <svg
                      className="stroke-current"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.249 6a5.25 5.25 0 1 1-10.5 0V.75h10.5ZM2.249 23.25a9.75 9.75 0 1 1 19.5 0M.749.75h22.5M6.749 5.25h10.5M2.249.75v7.5"
                        fill="none"
                        stroke=""
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5px"
                        className="stroke-000000"
                      ></path>
                      <path
                        d="m7.012 14.871 4.987 3.879 4.987-3.879"
                        fill="none"
                        stroke=""
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5px"
                        className="stroke-000000"
                      ></path>
                    </svg>
                    Assigned Lecturers
                  </NavLink>
                </li>
              )}
              {localStorage.getItem('role') === Role.LECTURER && (
                <li>
                  <NavLink
                    to="/app/institutes"
                    className={`group relative flex items-center gap-2 rounded-sm py-2 px-3 font-medium text-grey-800 duration-300 ease-in-out hover:bg-gray-500 dark:hover:bg-meta-4 hover:text-bodydark1 ${
                      pathname.includes('institutes') &&
                      pathname.split('/').length === 3 &&
                      'bg-gray-500 dark:bg-meta-4 text-bodydark1'
                    }`}
                  >
                    {localStorage.getItem('role') === Role.LECTURER ? (
                      <svg
                        className="fill-current"
                        width="23"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 2H9c-1.103 0-2 .897-2 2v5.586l-4.707 4.707A1 1 0 0 0 3 16v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4c0-1.103-.897-2-2-2zm-8 18H5v-5.586l3-3 3 3V20zm8 0h-6v-4a.999.999 0 0 0 .707-1.707L9 9.586V4h10v16z"
                          fill=""
                          className="fill-000000"
                        ></path>
                        <path
                          d="M11 6h2v2h-2zm4 0h2v2h-2zm0 4.031h2V12h-2zM15 14h2v2h-2zm-8 1h2v2H7z"
                          fill=""
                          className="fill-000000"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="stroke-current"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.249 6a5.25 5.25 0 1 1-10.5 0V.75h10.5ZM2.249 23.25a9.75 9.75 0 1 1 19.5 0M.749.75h22.5M6.749 5.25h10.5M2.249.75v7.5"
                          fill="none"
                          stroke=""
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5px"
                          className="stroke-000000"
                        ></path>
                        <path
                          d="m7.012 14.871 4.987 3.879 4.987-3.879"
                          fill="none"
                          stroke=""
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5px"
                          className="stroke-000000"
                        ></path>
                      </svg>
                    )}
                    Institutes Working On
                  </NavLink>
                </li>
              )}
              {/* <!-- Menu Item Lecturers --> */}

              {/* <!-- Menu Item Filter Lecturers --> */}
              {localStorage.getItem('role') === Role.INSTITUTE && (
                <li>
                  <NavLink
                    to="/app/lecturers/filtered-lecturers"
                    className={`group relative flex items-center gap-2 rounded-sm py-2 px-3.5 font-medium text-grey-800 duration-300 ease-in-out hover:bg-gray-500 dark:hover:bg-meta-4 hover:text-bodydark1 ${
                      pathname.includes('filtered-lecturers') &&
                      'bg-gray-500 dark:bg-meta-4 text-bodydark1'
                    }`}
                  >
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M27 59a1.94 1.94 0 0 1-.87-.2A2 2 0 0 1 25 57V37.77L6.46 17.38A5.61 5.61 0 0 1 10.61 8h42.78a5.61 5.61 0 0 1 4.15 9.38L39 37.77V49a2 2 0 0 1-.75 1.56l-10 8A2 2 0 0 1 27 59ZM10.61 12a1.61 1.61 0 0 0-1.19 2.69l19.06 21A2 2 0 0 1 29 37v15.84L35 48V37a2 2 0 0 1 .52-1.35l19.06-21A1.61 1.61 0 0 0 53.39 12ZM37 49Z"
                        fill=""
                        className="fill-231f20"
                      ></path>
                    </svg>
                    Filter Lecturers
                  </NavLink>
                </li>
              )}
              {localStorage.getItem('role') === Role.LECTURER && (
                <li>
                  <NavLink
                    to="/app/subjects/filtered-subjects"
                    className={`group relative flex items-center gap-2 rounded-sm py-2 px-3.5 font-medium text-grey-800 duration-300 ease-in-out hover:bg-gray-500 dark:hover:bg-meta-4 hover:text-bodydark1 ${
                      pathname.includes('filtered-subjects') &&
                      'bg-gray-500 dark:bg-meta-4 text-bodydark1'
                    }`}
                  >
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M27 59a1.94 1.94 0 0 1-.87-.2A2 2 0 0 1 25 57V37.77L6.46 17.38A5.61 5.61 0 0 1 10.61 8h42.78a5.61 5.61 0 0 1 4.15 9.38L39 37.77V49a2 2 0 0 1-.75 1.56l-10 8A2 2 0 0 1 27 59ZM10.61 12a1.61 1.61 0 0 0-1.19 2.69l19.06 21A2 2 0 0 1 29 37v15.84L35 48V37a2 2 0 0 1 .52-1.35l19.06-21A1.61 1.61 0 0 0 53.39 12ZM37 49Z"
                        fill=""
                        className="fill-231f20"
                      ></path>
                    </svg>
                    Filter Subjects
                  </NavLink>
                </li>
              )}
              {/* <!-- Menu Item Filter Lecturers --> */}

              {/* <!-- Menu Item AI Match --> */}
              <li>
                <NavLink
                  to="/app/lecturers/smartmatch-lecturers"
                  className={`group relative flex items-center gap-0.5 rounded-sm py-2 px-2.5 font-medium text-grey-800 duration-300 ease-in-out hover:bg-gray-500 dark:hover:bg-meta-4 hover:text-bodydark1 ${
                    pathname.includes('smart-match') &&
                    'bg-gray-500 dark:bg-meta-4 text-bodydark1'
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="32"
                    data-name="Layer 1"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M335 156.17H177A20.85 20.85 0 0 0 156.17 177v158A20.85 20.85 0 0 0 177 355.83h158A20.85 20.85 0 0 0 355.83 335V177A20.85 20.85 0 0 0 335 156.17ZM346 335a11 11 0 0 1-11 11H177a11 11 0 0 1-11-11V177a11 11 0 0 1 11-11h158a11 11 0 0 1 11 11ZM172 140.4h168a4.93 4.93 0 0 0 0-9.86h-16.17V88.41a4.93 4.93 0 0 0-9.86 0v42.13H292V66.28a4.93 4.93 0 0 0-9.86 0v64.26h-22V88.41a4.93 4.93 0 0 0-9.86 0v42.13h-22V66.28a4.93 4.93 0 0 0-9.86 0v64.26h-22V88.41a4.93 4.93 0 0 0-9.86 0v42.13H172a4.93 4.93 0 1 0 0 9.86ZM340 371.6H172a4.93 4.93 0 0 0 0 9.86h16.18v42.13a4.93 4.93 0 0 0 9.86 0v-42.13h22v64.26a4.93 4.93 0 0 0 9.86 0v-64.26h22v42.13a4.93 4.93 0 0 0 9.86 0v-42.13h22v64.26a4.93 4.93 0 0 0 9.86 0v-64.26h22v42.13a4.93 4.93 0 0 0 9.86 0v-42.13H340a4.93 4.93 0 1 0 0-9.86ZM445.71 282.1h-64.26v-22h42.15a4.93 4.93 0 0 0 0-9.85h-42.15v-22h64.26a4.93 4.93 0 1 0 0-9.85h-64.26v-22h42.15a4.93 4.93 0 0 0 0-9.85h-42.15V172a4.93 4.93 0 0 0-9.86 0v168a4.93 4.93 0 0 0 9.86 0v-16.17h42.15a4.93 4.93 0 0 0 0-9.85h-42.15V292h64.26a4.93 4.93 0 1 0 0-9.85ZM135.47 167.06a4.92 4.92 0 0 0-4.93 4.92v16.19H88.4a4.93 4.93 0 0 0 0 9.85h42.14v22H66.29a4.93 4.93 0 1 0 0 9.85h64.25v22H88.4a4.93 4.93 0 0 0 0 9.85h42.14v22H66.29a4.93 4.93 0 1 0 0 9.85h64.25v22H88.4a4.93 4.93 0 0 0 0 9.85h42.14V340a4.93 4.93 0 0 0 9.85 0V172a4.92 4.92 0 0 0-4.92-4.94Z"
                      fill=""
                      className="fill-000000"
                    ></path>
                    <path
                      d="M241.79 207.56c-1.38-3.93-7.9-3.93-9.29 0l-22 62.38-2.45 6.95v.07l-8.52 24.2a4.91 4.91 0 0 0 3 6.28 4.81 4.81 0 0 0 1.64.29 4.94 4.94 0 0 0 4.65-3.29l7.39-21h41.9l7.4 21a4.93 4.93 0 0 0 9.29-3.28Zm-22.11 66 3.26-9.24a.56.56 0 0 1 0-.12l14.21-40.2 17.47 49.58ZM307.84 204.27a4.93 4.93 0 0 0-4.93 4.93v93.6a4.93 4.93 0 1 0 9.85 0v-93.6a4.93 4.93 0 0 0-4.92-4.93Z"
                      fill=""
                      className="fill-000000"
                    ></path>
                  </svg>
                  AI Match
                </NavLink>
              </li>
              {/* <!-- Menu Item AI Match --> */}

              {/* <!-- Menu Item Settings --> */}
              {localStorage.getItem('role') === Role.INSTITUTE && (
                <li>
                  <NavLink
                    to="/app/institutes/settings"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-grey-800 duration-300 ease-in-out hover:bg-gray-500 dark:hover:bg-meta-4 hover:text-bodydark1 ${
                      pathname.includes('settings') &&
                      'bg-gray-500 dark:bg-meta-4 text-bodydark1'
                    }`}
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_130_9763)">
                        <path
                          d="M17.0721 7.30835C16.7909 6.99897 16.3971 6.83022 15.9752 6.83022H15.8909C15.7502 6.83022 15.6377 6.74585 15.6096 6.63335C15.5815 6.52085 15.5252 6.43647 15.4971 6.32397C15.4409 6.21147 15.4971 6.09897 15.5815 6.0146L15.6377 5.95835C15.9471 5.6771 16.1159 5.28335 16.1159 4.86147C16.1159 4.4396 15.9752 4.04585 15.6659 3.73647L14.569 2.61147C13.9784 1.99272 12.9659 1.9646 12.3471 2.58335L12.2627 2.6396C12.1784 2.72397 12.0377 2.7521 11.8971 2.69585C11.7846 2.6396 11.6721 2.58335 11.5315 2.55522C11.3909 2.49897 11.3065 2.38647 11.3065 2.27397V2.13335C11.3065 1.26147 10.6034 0.55835 9.73148 0.55835H8.15648C7.7346 0.55835 7.34085 0.7271 7.0596 1.00835C6.75023 1.31772 6.6096 1.71147 6.6096 2.10522V2.21772C6.6096 2.33022 6.52523 2.44272 6.41273 2.49897C6.35648 2.5271 6.32835 2.5271 6.2721 2.55522C6.1596 2.61147 6.01898 2.58335 5.9346 2.49897L5.87835 2.4146C5.5971 2.10522 5.20335 1.93647 4.78148 1.93647C4.3596 1.93647 3.96585 2.0771 3.65648 2.38647L2.53148 3.48335C1.91273 4.07397 1.8846 5.08647 2.50335 5.70522L2.5596 5.7896C2.64398 5.87397 2.6721 6.0146 2.61585 6.09897C2.5596 6.21147 2.53148 6.29585 2.47523 6.40835C2.41898 6.52085 2.3346 6.5771 2.19398 6.5771H2.1096C1.68773 6.5771 1.29398 6.71772 0.984604 7.0271C0.675229 7.30835 0.506479 7.7021 0.506479 8.12397L0.478354 9.69897C0.450229 10.5708 1.15335 11.274 2.02523 11.3021H2.1096C2.25023 11.3021 2.36273 11.3865 2.39085 11.499C2.4471 11.5833 2.50335 11.6677 2.53148 11.7802C2.5596 11.8927 2.53148 12.0052 2.4471 12.0896L2.39085 12.1458C2.08148 12.4271 1.91273 12.8208 1.91273 13.2427C1.91273 13.6646 2.05335 14.0583 2.36273 14.3677L3.4596 15.4927C4.05023 16.1115 5.06273 16.1396 5.68148 15.5208L5.76585 15.4646C5.85023 15.3802 5.99085 15.3521 6.13148 15.4083C6.24398 15.4646 6.35648 15.5208 6.4971 15.549C6.63773 15.6052 6.7221 15.7177 6.7221 15.8302V15.9427C6.7221 16.8146 7.42523 17.5177 8.2971 17.5177H9.8721C10.744 17.5177 11.4471 16.8146 11.4471 15.9427V15.8302C11.4471 15.7177 11.5315 15.6052 11.644 15.549C11.7002 15.5208 11.7284 15.5208 11.7846 15.4927C11.9252 15.4365 12.0377 15.4646 12.1221 15.549L12.1784 15.6333C12.4596 15.9427 12.8534 16.1115 13.2752 16.1115C13.6971 16.1115 14.0909 15.9708 14.4002 15.6615L15.5252 14.5646C16.144 13.974 16.1721 12.9615 15.5534 12.3427L15.4971 12.2583C15.4127 12.174 15.3846 12.0333 15.4409 11.949C15.4971 11.8365 15.5252 11.7521 15.5815 11.6396C15.6377 11.5271 15.7502 11.4708 15.8627 11.4708H15.9471H15.9752C16.819 11.4708 17.5221 10.7958 17.5502 9.92397L17.5784 8.34897C17.5221 8.01147 17.3534 7.5896 17.0721 7.30835ZM16.2284 9.9521C16.2284 10.1208 16.0877 10.2615 15.919 10.2615H15.8346H15.8065C15.1596 10.2615 14.569 10.6552 14.344 11.2177C14.3159 11.3021 14.2596 11.3865 14.2315 11.4708C13.9784 12.0333 14.0909 12.7365 14.5409 13.1865L14.5971 13.2708C14.7096 13.3833 14.7096 13.5802 14.5971 13.6927L13.4721 14.7896C13.3877 14.874 13.3034 14.874 13.2471 14.874C13.1909 14.874 13.1065 14.874 13.0221 14.7896L12.9659 14.7052C12.5159 14.2271 11.8409 14.0865 11.2221 14.3677L11.1096 14.424C10.4909 14.6771 10.0971 15.2396 10.0971 15.8865V15.999C10.0971 16.1677 9.95648 16.3083 9.78773 16.3083H8.21273C8.04398 16.3083 7.90335 16.1677 7.90335 15.999V15.8865C7.90335 15.2396 7.5096 14.649 6.89085 14.424C6.80648 14.3958 6.69398 14.3396 6.6096 14.3115C6.3846 14.199 6.1596 14.1708 5.9346 14.1708C5.54085 14.1708 5.1471 14.3115 4.83773 14.6208L4.78148 14.649C4.66898 14.7615 4.4721 14.7615 4.3596 14.649L3.26273 13.524C3.17835 13.4396 3.17835 13.3552 3.17835 13.299C3.17835 13.2427 3.17835 13.1583 3.26273 13.074L3.31898 13.0177C3.7971 12.5677 3.93773 11.8646 3.6846 11.3021C3.65648 11.2177 3.62835 11.1333 3.5721 11.049C3.3471 10.4583 2.7846 10.0365 2.13773 10.0365H2.05335C1.8846 10.0365 1.74398 9.89585 1.74398 9.7271L1.7721 8.1521C1.7721 8.0396 1.82835 7.98335 1.85648 7.9271C1.8846 7.89897 1.96898 7.84272 2.08148 7.84272H2.16585C2.81273 7.87085 3.40335 7.4771 3.65648 6.88647C3.6846 6.8021 3.74085 6.71772 3.76898 6.63335C4.0221 6.07085 3.9096 5.36772 3.4596 4.91772L3.40335 4.83335C3.29085 4.72085 3.29085 4.52397 3.40335 4.41147L4.52835 3.3146C4.61273 3.23022 4.6971 3.23022 4.75335 3.23022C4.8096 3.23022 4.89398 3.23022 4.97835 3.3146L5.0346 3.39897C5.4846 3.8771 6.1596 4.01772 6.77835 3.7646L6.89085 3.70835C7.5096 3.45522 7.90335 2.89272 7.90335 2.24585V2.13335C7.90335 2.02085 7.9596 1.9646 7.98773 1.90835C8.01585 1.8521 8.10023 1.82397 8.21273 1.82397H9.78773C9.95648 1.82397 10.0971 1.9646 10.0971 2.13335V2.24585C10.0971 2.89272 10.4909 3.48335 11.1096 3.70835C11.194 3.73647 11.3065 3.79272 11.3909 3.82085C11.9815 4.1021 12.6846 3.9896 13.1627 3.5396L13.2471 3.48335C13.3596 3.37085 13.5565 3.37085 13.669 3.48335L14.7659 4.60835C14.8502 4.69272 14.8502 4.7771 14.8502 4.83335C14.8502 4.8896 14.8221 4.97397 14.7659 5.05835L14.7096 5.1146C14.2034 5.53647 14.0627 6.2396 14.2877 6.8021C14.3159 6.88647 14.344 6.97085 14.4002 7.05522C14.6252 7.64585 15.1877 8.06772 15.8346 8.06772H15.919C16.0315 8.06772 16.0877 8.12397 16.144 8.1521C16.2002 8.18022 16.2284 8.2646 16.2284 8.3771V9.9521Z"
                          fill=""
                        />
                        <path
                          d="M9.00029 5.22705C6.89092 5.22705 5.17529 6.94268 5.17529 9.05205C5.17529 11.1614 6.89092 12.8771 9.00029 12.8771C11.1097 12.8771 12.8253 11.1614 12.8253 9.05205C12.8253 6.94268 11.1097 5.22705 9.00029 5.22705ZM9.00029 11.6114C7.59404 11.6114 6.44092 10.4583 6.44092 9.05205C6.44092 7.6458 7.59404 6.49268 9.00029 6.49268C10.4065 6.49268 11.5597 7.6458 11.5597 9.05205C11.5597 10.4583 10.4065 11.6114 9.00029 11.6114Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_130_9763">
                          <rect
                            width="18"
                            height="18"
                            fill="white"
                            transform="translate(0 0.052124)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Settings
                  </NavLink>
                </li>
              )}
              {localStorage.getItem('role') === Role.LECTURER && (
                <li>
                  <NavLink
                    to="/app/lecturers/settings"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-grey-800 duration-300 ease-in-out hover:bg-gray-500 dark:hover:bg-meta-4 hover:text-bodydark1 ${
                      pathname.includes('settings') &&
                      'bg-gray-500 dark:bg-meta-4 text-bodydark1'
                    }`}
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_130_9763)">
                        <path
                          d="M17.0721 7.30835C16.7909 6.99897 16.3971 6.83022 15.9752 6.83022H15.8909C15.7502 6.83022 15.6377 6.74585 15.6096 6.63335C15.5815 6.52085 15.5252 6.43647 15.4971 6.32397C15.4409 6.21147 15.4971 6.09897 15.5815 6.0146L15.6377 5.95835C15.9471 5.6771 16.1159 5.28335 16.1159 4.86147C16.1159 4.4396 15.9752 4.04585 15.6659 3.73647L14.569 2.61147C13.9784 1.99272 12.9659 1.9646 12.3471 2.58335L12.2627 2.6396C12.1784 2.72397 12.0377 2.7521 11.8971 2.69585C11.7846 2.6396 11.6721 2.58335 11.5315 2.55522C11.3909 2.49897 11.3065 2.38647 11.3065 2.27397V2.13335C11.3065 1.26147 10.6034 0.55835 9.73148 0.55835H8.15648C7.7346 0.55835 7.34085 0.7271 7.0596 1.00835C6.75023 1.31772 6.6096 1.71147 6.6096 2.10522V2.21772C6.6096 2.33022 6.52523 2.44272 6.41273 2.49897C6.35648 2.5271 6.32835 2.5271 6.2721 2.55522C6.1596 2.61147 6.01898 2.58335 5.9346 2.49897L5.87835 2.4146C5.5971 2.10522 5.20335 1.93647 4.78148 1.93647C4.3596 1.93647 3.96585 2.0771 3.65648 2.38647L2.53148 3.48335C1.91273 4.07397 1.8846 5.08647 2.50335 5.70522L2.5596 5.7896C2.64398 5.87397 2.6721 6.0146 2.61585 6.09897C2.5596 6.21147 2.53148 6.29585 2.47523 6.40835C2.41898 6.52085 2.3346 6.5771 2.19398 6.5771H2.1096C1.68773 6.5771 1.29398 6.71772 0.984604 7.0271C0.675229 7.30835 0.506479 7.7021 0.506479 8.12397L0.478354 9.69897C0.450229 10.5708 1.15335 11.274 2.02523 11.3021H2.1096C2.25023 11.3021 2.36273 11.3865 2.39085 11.499C2.4471 11.5833 2.50335 11.6677 2.53148 11.7802C2.5596 11.8927 2.53148 12.0052 2.4471 12.0896L2.39085 12.1458C2.08148 12.4271 1.91273 12.8208 1.91273 13.2427C1.91273 13.6646 2.05335 14.0583 2.36273 14.3677L3.4596 15.4927C4.05023 16.1115 5.06273 16.1396 5.68148 15.5208L5.76585 15.4646C5.85023 15.3802 5.99085 15.3521 6.13148 15.4083C6.24398 15.4646 6.35648 15.5208 6.4971 15.549C6.63773 15.6052 6.7221 15.7177 6.7221 15.8302V15.9427C6.7221 16.8146 7.42523 17.5177 8.2971 17.5177H9.8721C10.744 17.5177 11.4471 16.8146 11.4471 15.9427V15.8302C11.4471 15.7177 11.5315 15.6052 11.644 15.549C11.7002 15.5208 11.7284 15.5208 11.7846 15.4927C11.9252 15.4365 12.0377 15.4646 12.1221 15.549L12.1784 15.6333C12.4596 15.9427 12.8534 16.1115 13.2752 16.1115C13.6971 16.1115 14.0909 15.9708 14.4002 15.6615L15.5252 14.5646C16.144 13.974 16.1721 12.9615 15.5534 12.3427L15.4971 12.2583C15.4127 12.174 15.3846 12.0333 15.4409 11.949C15.4971 11.8365 15.5252 11.7521 15.5815 11.6396C15.6377 11.5271 15.7502 11.4708 15.8627 11.4708H15.9471H15.9752C16.819 11.4708 17.5221 10.7958 17.5502 9.92397L17.5784 8.34897C17.5221 8.01147 17.3534 7.5896 17.0721 7.30835ZM16.2284 9.9521C16.2284 10.1208 16.0877 10.2615 15.919 10.2615H15.8346H15.8065C15.1596 10.2615 14.569 10.6552 14.344 11.2177C14.3159 11.3021 14.2596 11.3865 14.2315 11.4708C13.9784 12.0333 14.0909 12.7365 14.5409 13.1865L14.5971 13.2708C14.7096 13.3833 14.7096 13.5802 14.5971 13.6927L13.4721 14.7896C13.3877 14.874 13.3034 14.874 13.2471 14.874C13.1909 14.874 13.1065 14.874 13.0221 14.7896L12.9659 14.7052C12.5159 14.2271 11.8409 14.0865 11.2221 14.3677L11.1096 14.424C10.4909 14.6771 10.0971 15.2396 10.0971 15.8865V15.999C10.0971 16.1677 9.95648 16.3083 9.78773 16.3083H8.21273C8.04398 16.3083 7.90335 16.1677 7.90335 15.999V15.8865C7.90335 15.2396 7.5096 14.649 6.89085 14.424C6.80648 14.3958 6.69398 14.3396 6.6096 14.3115C6.3846 14.199 6.1596 14.1708 5.9346 14.1708C5.54085 14.1708 5.1471 14.3115 4.83773 14.6208L4.78148 14.649C4.66898 14.7615 4.4721 14.7615 4.3596 14.649L3.26273 13.524C3.17835 13.4396 3.17835 13.3552 3.17835 13.299C3.17835 13.2427 3.17835 13.1583 3.26273 13.074L3.31898 13.0177C3.7971 12.5677 3.93773 11.8646 3.6846 11.3021C3.65648 11.2177 3.62835 11.1333 3.5721 11.049C3.3471 10.4583 2.7846 10.0365 2.13773 10.0365H2.05335C1.8846 10.0365 1.74398 9.89585 1.74398 9.7271L1.7721 8.1521C1.7721 8.0396 1.82835 7.98335 1.85648 7.9271C1.8846 7.89897 1.96898 7.84272 2.08148 7.84272H2.16585C2.81273 7.87085 3.40335 7.4771 3.65648 6.88647C3.6846 6.8021 3.74085 6.71772 3.76898 6.63335C4.0221 6.07085 3.9096 5.36772 3.4596 4.91772L3.40335 4.83335C3.29085 4.72085 3.29085 4.52397 3.40335 4.41147L4.52835 3.3146C4.61273 3.23022 4.6971 3.23022 4.75335 3.23022C4.8096 3.23022 4.89398 3.23022 4.97835 3.3146L5.0346 3.39897C5.4846 3.8771 6.1596 4.01772 6.77835 3.7646L6.89085 3.70835C7.5096 3.45522 7.90335 2.89272 7.90335 2.24585V2.13335C7.90335 2.02085 7.9596 1.9646 7.98773 1.90835C8.01585 1.8521 8.10023 1.82397 8.21273 1.82397H9.78773C9.95648 1.82397 10.0971 1.9646 10.0971 2.13335V2.24585C10.0971 2.89272 10.4909 3.48335 11.1096 3.70835C11.194 3.73647 11.3065 3.79272 11.3909 3.82085C11.9815 4.1021 12.6846 3.9896 13.1627 3.5396L13.2471 3.48335C13.3596 3.37085 13.5565 3.37085 13.669 3.48335L14.7659 4.60835C14.8502 4.69272 14.8502 4.7771 14.8502 4.83335C14.8502 4.8896 14.8221 4.97397 14.7659 5.05835L14.7096 5.1146C14.2034 5.53647 14.0627 6.2396 14.2877 6.8021C14.3159 6.88647 14.344 6.97085 14.4002 7.05522C14.6252 7.64585 15.1877 8.06772 15.8346 8.06772H15.919C16.0315 8.06772 16.0877 8.12397 16.144 8.1521C16.2002 8.18022 16.2284 8.2646 16.2284 8.3771V9.9521Z"
                          fill=""
                        />
                        <path
                          d="M9.00029 5.22705C6.89092 5.22705 5.17529 6.94268 5.17529 9.05205C5.17529 11.1614 6.89092 12.8771 9.00029 12.8771C11.1097 12.8771 12.8253 11.1614 12.8253 9.05205C12.8253 6.94268 11.1097 5.22705 9.00029 5.22705ZM9.00029 11.6114C7.59404 11.6114 6.44092 10.4583 6.44092 9.05205C6.44092 7.6458 7.59404 6.49268 9.00029 6.49268C10.4065 6.49268 11.5597 7.6458 11.5597 9.05205C11.5597 10.4583 10.4065 11.6114 9.00029 11.6114Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_130_9763">
                          <rect
                            width="18"
                            height="18"
                            fill="white"
                            transform="translate(0 0.052124)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Settings
                  </NavLink>
                </li>
              )}
              {/* <!-- Menu Item Settings --> */}

              {/* <!-- About Lecture Link --> */}
              <li className="fixed bottom-0 w-60">
                <NavLink
                  to="/app/about"
                  className={`group relative flex items-center gap-2.2 rounded-sm py-2 px-3 font-medium text-grey-800 duration-300 ease-in-out hover:bg-gray-500 dark:hover:bg-meta-4 hover:text-bodydark1 ${
                    pathname.includes('about') &&
                    'bg-gray-500 dark:bg-meta-4 text-bodydark1'
                  }`}
                >
                  <svg
                    className="fill-current pl-1 pt-1"
                    width="32"
                    height="32"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g data-name="Layer 4">
                      <path
                        d="M16 31a15 15 0 1 1 15-15 15 15 0 0 1-15 15Zm0-28a13 13 0 1 0 13 13A13 13 0 0 0 16 3Z"
                        fill=""
                        className="fill-101820"
                      ></path>
                      <path
                        d="M15 14h2v9h-2zM16 12a2 2 0 1 1 2-2 2 2 0 0 1-2 2Zm0-2Z"
                        fill=""
                        className="fill-101820"
                      ></path>
                    </g>
                  </svg>
                  About Lecture Link
                </NavLink>
              </li>
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
