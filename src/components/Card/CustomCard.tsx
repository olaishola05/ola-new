import React from "react";
import Image from "next/image";
import { BiTimeFive as AccessTimeSharpIcon } from "react-icons/bi";
import Link from "next/link";

interface CustomCardProps {
  image: string;
  name: string;
  description: string;
  role?: string;
  duration?: string;
  overlayText?: string;
  onClick?: () => void;
  url?: string;
}

const CardContainer = ({ children }: React.PropsWithChildren<{}>) => (
  <div className="flex flex-col relative justify-center gap-6 px-3 pt-3 pb-8 md:px-4 md:pt-4 md:pb-14  shadow-xl rounded-lg bg-[--contactBg] hover:bg-white hover:shadow-lg hover:cursor-pointer transition duration-300">
    {children}
  </div>
);

function CardMediaContainer({ image }: { image: string }) {
  return (
    <div className="relative w-full h-[170px] md:h-[250px] lg:h-[250px] rounded-lg transform m-auto">
      <Image
        src={image || ''}
        alt={image || ''}
        fill
        className="object-cover rounded-lg w-full h-full"
        sizes="100"
      />
    </div>
  )
}

const CardContentContainer = ({ children }: React.PropsWithChildren<{}>) => (
  <div className="flex flex-col gap-2 py-0 px-2 md:p-0">{children}</div>
);

const CardMediaTop = ({
  name,
  role,
  duration,
}: {
  name: string;
  role?: string;
  duration?: string;
}) => (
  <div className="flex flex-row items-center justify-between mb-3">
    <h6 className="text-[var(--textColor)] font-semibold text-base md:text-lg py-1 px-0 md:p-0 capitalize">
      {name}
    </h6>
    <div className="text-[var(--textColor)]">
      {duration ? (
        <div className="flex items-center gap-2">
          <AccessTimeSharpIcon className="text-base md:text-lg" />
          <span>{duration}</span>
        </div>
      ) : (
        <span className="text-base font-medium capitalize">
          {role ? role[0].toUpperCase() + role.slice(1) : ""}
        </span>
      )}
    </div>
  </div>
);

const OverlayDiv = ({
  url,
  overlayText,
}: React.PropsWithChildren<{ url?: string; overlayText?: string }>) => (
  <div className="absolute top-0 bottom-0 left-0 right-0 opacity-0 hover:opacity-100 transition duration-300 hover:bg-[var(--softBg)] hover:transform hover:rounded-lg">
    <Link
      href={url || "#"}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 text-base cursor-pointer rounded-md text-center transition duration-300 hover:border hover:border-[var(--primary)] shadow-lg"
    >
      {overlayText}
    </Link>
  </div>
);

const CustomCard = ({
  image,
  name,
  description,
  role,
  duration,
  overlayText,
  url,
}: CustomCardProps) => {
  return (
    <CardContainer>
      <CardMediaContainer image={image} />
      <CardContentContainer>
        <CardMediaTop name={name} role={role} duration={duration} />
        <p className="text-dark text-left">{description.slice(0, 200)}...</p>
      </CardContentContainer>
      <OverlayDiv url={url} overlayText={overlayText} />
    </CardContainer>
  );
};

export default CustomCard;
