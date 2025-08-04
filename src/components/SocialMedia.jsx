import clsx from "clsx";
import {
  BsGithub,
  BsYoutube,
  BsLinkedin,
  BsTwitter,
  BsInstagram,
} from "react-icons/bs";

export const SocialMediaProfiles = [
  {
    title: "Instagram",
    href: "https://www.instagram.com/qiming_liiiu",
    icon: BsInstagram,
  },
  {
    title: "Youtube",
    href: "https://www.youtube.com/@qimingliu1446",
    icon: BsYoutube,
  },
  {
    title: "GitHub",
    href: "https://github.com/qimingliu1021",
    icon: BsGithub,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/qimingliu1382/",
    icon: BsLinkedin,
  },
  { title: "Twitter", href: "https://x.com/Qiming685481", icon: BsTwitter },
];

const SocialMedia = ({ className, invert = false }) => {
  return (
    <ul
      role="list"
      className={clsx(
        "flex gap-x-10",
        invert ? "text-white" : "text-neutral-950",
        className
      )}
    >
      {SocialMediaProfiles.map((item) => (
        <li key={item.title}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.title}
            className={clsx(
              "transition",
              invert ? "hover:text-neutral-200" : "hover:text-neutral-700"
            )}
          >
            <item.icon className="h-6 w-6 fill-current" />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialMedia;
