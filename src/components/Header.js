import Link from "next/link";
import Logo from "@/images/share/logo.svg";
import ObjectNavyTop from "@/images/share/object-navy-top.svg";

const Header = () => {
  return (
    <header id="header">
      <div className="container flex justify-between">
        <Link
          href="/"
          className="mt-10 self-start"
        >
          <Logo />
        </Link>
        <ObjectNavyTop className="-mr-[88px] -mt-[57px] " />
      </div>
    </header>
  );
};

export default Header;
