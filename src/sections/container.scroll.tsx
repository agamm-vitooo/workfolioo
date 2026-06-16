"use client";
import { ContainerScroll } from "../components/ui/container-scroll-animation";

import scrollImage from "../assets/scoll.JPG.webp";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-slate-800">
              Turning ideas into
              <br />
              <span className="mt-1 block text-4xl font-bold leading-none md:text-[5rem]">
                interactive digital products
              </span>
            </h1>
          </>
        }
      >
        <img
          src={scrollImage}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
