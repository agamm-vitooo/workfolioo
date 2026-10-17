
"use client";

import { ContainerScroll } from "../components/ui/container-scroll-animation";
import scrollImage from "../assets/scoll.JPG.webp";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden transition-colors duration-200">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-slate-800 transition-colors duration-200 dark:text-slate-100">
              Turning ideas into
              <br />
              <span className="mt-1 block text-4xl font-bold leading-none text-slate-900 transition-colors duration-200 dark:text-white md:text-[5rem]">
                interactive digital products
              </span>
            </h1>
          </>
        }
      >
        <img
          src={scrollImage}
          alt="Preview of interactive digital products"
          height={720}
          width={1400}
          className="mx-auto h-full rounded-2xl object-cover object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
