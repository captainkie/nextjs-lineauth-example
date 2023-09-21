import Image from "next/image";
import ObjectNavy from "@/images/share/object-navy.svg";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="mt-auto pb-6"
    >
      <div className="container flex justify-between">
        <ObjectNavy />

        <Image
          src="/images/share/obj-car@3x.png"
          alt="car"
          width={191}
          height={138}
        />
      </div>
    </footer>
  );
};

export default Footer;
