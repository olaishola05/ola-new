import React from "react";
import Image from "next/image";

interface AboutImage {
  photo: string;
}

const AboutImage = (props: AboutImage) => {
  const { photo } = props;
  return (
    <div
      className="w-[35%] py-5"
      data-aos="fade-up"
    >
      <Image
        src={photo}
        alt="Ola"
        priority
        width={100}
        height={300}
        className="w-full object-cover transition-all duration-300 ease-in-out rounded-md shadow-xl hover:scale-105"
      />
    </div>
  );
};

export default AboutImage;