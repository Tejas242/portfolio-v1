import React from "react";
import Typewriter from "../components/Typewriter"; // Import your Typewriter component
import Logo from "../app/assets/site-title.svg";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="Hero h-screen flex justify-center">
      <div className="flex flex-col items-center">
        <Image src={Logo} alt="Logo"/>
        <Typewriter words={['developer', 'designer', 'programmer']}/>
      </div>
    </section>
  );
};

export default Hero;
