import { useEffect, useState } from "react";
import gmail from '../../images/brand/google.svg';
import twitter from '../../images/brand/twitter.svg';
import github from '../../images/brand/gitHub.svg';
import linkedIn from '../../images/brand/linkedin.svg';
import facebook from '../../images/brand/facebook.svg';
import { Role } from '../../types/enums/role.ts';

const brandData = [
  {
    logo: gmail,
    name: 'Gmail',
    visitors: 3.5,
    link: 'https://mail.google.com/mail/u/0/#inbox',
  },
  {
    logo: linkedIn,
    name: 'LinkedIn',
    visitors: 1.5,
    link: 'https://www.linkedin.com/in/tharindu-thennakoon-b1a40b94/',
  },
  {
    logo: github,
    name: 'Github',
    visitors: 2.1,
    link: 'https://github.com/tharindu152',
  },
  {
    logo: twitter,
    name: 'Twitter',
    visitors: 2.2,
    link: 'https://x.com/home?lang=en',
  },
  {
    logo: facebook,
    name: 'Facebook',
    visitors: 0.5,
    link: 'https://web.facebook.com/tharindu.thennakoon.397',
  },
];

const TableOne = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100); // Small delay for animation
  }, []);

  return (
    <div className={`rounded-sm col-span-12 border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 xl:col-span-8 
      ${isVisible ? "opacity-100 translate-y-0 transition-all duration-700 ease-out" : "opacity-0 translate-y-5"}
    `}>
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {`Other Platforms of the ${
          localStorage.getItem("role") === Role.INSTITUTE ? 'Institute' : 'Lecturer'
        }`}
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Platform
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Followers
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Link
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-3 ${
              key === brandData.length - 1 ? '' : 'border-b hover:bg-gray-200 dark:hover:bg-gray-800 border-stroke hover:bg- dark:border-strokedark'
            } transition-all duration-700 ease-out transform 
              ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}
              delay-[${key * 100}ms]
            `}
            key={key+brand.name}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0 hover:scale-110 transition-transform duration-300 ease-in-out">
                <img src={brand.logo} alt="Brand" />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {brand.name}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.visitors}K</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <button
                className="hover:text-primary transition-colors duration-300 ease-in-out"
                title={`Go to ${brand.name}`}
                onClick={() => window.open(brand.link)}
              >
                <svg
                  className="fill-current hover:scale-110 transition-transform duration-300 ease-in-out"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
