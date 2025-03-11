const skills = [
  { name: "HTML", percentage: 90 },
  { name: "CSS", percentage: 80 },
  { name: "JS", percentage: 90 },
  { name: "PHP", percentage: 90 },
];

export default function UserSidebar() {
  return (
    <div className="w-full mx-auto minfo__sidebar__wrapper xl:fixed xl:top-1/2 xl:left-4 2xl:left-14 xl:-translate-y-1/2 sm:max-w-sidebar xl:max-2xl:max-w-xs z-50">
      <div className="p-3 max-xl:mb-3 overflow-hidden minfo__sidebar bg-white dark:bg-nightBlack rounded-2xl">
        <div className="mx-4 mt-12 text-center user-info lg:mx-6">
          <a
            className="mb-2.5 h-36 w-36 block mx-auto border-6 border-platinum dark:border-gray-700 overflow-hidden rounded-full"
            href="/"
          >
            <img
              alt="Brown Reddick"
              width={200}
              height={200}
              className="hidden dark:block w-full h-full rounded-full"
              src="/_next/static/media/user-sidebar-thumb.png"
            />
            <img
              alt="Brown Reddick"
              width={200}
              height={200}
              className="dark:hidden w-full h-full rounded-full"
              src="/_next/static/media/user-sidebar-thumb-light.png"
            />
          </a>
          <h6 className="mb-1 text-lg font-semibold text-black dark:text-white">
            Brown Reddick
          </h6>
          <h6 className="text-sm text-theme after:!bg-theme">Web Developer</h6>
        </div>

        <div className="pt-6 mx-4 border-t lg:mx-6 user-meta-info md:mx-7 my-7 border-platinum dark:border-metalBlack">
          <ul className="space-y-3">
            <li className="flex text-sm">
              <span className="flex-1 font-medium text-black dark:text-white">
                Residence:
              </span>{" "}
              Canada
            </li>
            <li className="flex text-sm">
              <span className="flex-1 font-medium text-black dark:text-white">
                City:
              </span>{" "}
              Toronto
            </li>
            <li className="flex text-sm">
              <span className="flex-1 font-medium text-black dark:text-white">
                Age:
              </span>{" "}
              26
            </li>
          </ul>
        </div>

        <div className="px-4 py-5 lg:py-6 lg:px-6 rounded-2xl md:px-8 bg-flashWhite dark:bg-metalBlack">
          <div className="text-sm font-medium text-black dark:text-white">
            Skills
          </div>
          <div className="flex items-center justify-between my-4 space-x-4 skills_circle">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="space-y-2 text-center progressCircle"
              >
                {/* <CircularProgressbar
                  value={skill.percentage}
                  text={`${skill.percentage}%`}
                /> */}
                <p className="text-[13px] font-normal dark:font-light text-black dark:text-white/90">
                  {skill.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <a
            download
            className="text-center text-sm border border-theme bg-theme flex items-center justify-center gap-2 text-white rounded-4xl py-3.5 transition duration-300 text-[15px] font-semibold hover:bg-themeHover hover:border-themeHover"
            href="blank.pdf"
          >
            DOWNLOAD CV
          </a>
        </div>
      </div>
    </div>
  );
}
