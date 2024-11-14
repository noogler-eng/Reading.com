import { MarqueeDemo } from "@/components/Marquee";
import coursesFetching from "../../lib/hooks/FetchAllC";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import CourseCard from "@/components/CourseCard";
import { cn } from "@/lib/utils";
import { useRecoilValue } from "recoil";
import userAtom from "../../store/user/userAtom";
import { useState } from "react";


export default function Home() {
  const { data: courses, error } = coursesFetching.FetchAllCourses();
  const user = useRecoilValue(userAtom);
  const [search, setSearch] = useState("");

  const searched = courses && courses.filter((items: any) => {
    return items.title.toUpperCase().includes(search.toUpperCase());
  });

  return (
    <div className="p-6 flex items-center flex-col gap-4">
      <div className="bg-[url('/hero.png')] w-full bg-no-repeat	bg-cover bg-center bg-fixed	bg-clip-content	h-[650px] flex items-center justify-center rounded-xl">
        <div className="flex flex-col items-center justify-center gap-2 w-full">
          <h1 className="text-2xl text-black font-extrabold">
            All the Skills you need in One place
          </h1>
          <input
            type="text"
            className="rounded-xl py-1 px-4 text-center w-1/2 text-white bg-black/70 focus:outline-none"
            placeholder="search here? what you are looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4 w-full items-center">
        {user && (
          <h1 className="text-6xl place-start w-full font-extrabold">
            Welcome,{" "}
            <span className="bg-green-500 bg-clip-text text-transparent">
              {user.name}
            </span>
            <span>✌️</span>
          </h1>
        )}
        <h2 className="text-3xl place-start w-full font-extrabold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent px-16">
          Practice Your Carrer With Us.
        </h2>
        <p className="text-lg font-sans text-center w-1/2 mt-5">
          At{" "}
          <span className="bg-orange-400 bg-clip-text text-transparent">
            Readers.com
          </span>
          , we believe that learning is a lifelong journey. Whether you're
          looking to advance your career, explore a new hobby, or gain valuable
          skills, our diverse range of courses is designed to empower you
        </p>
      </div>
      <div className="relative flex w-full items-center justify-center overflow-hidden rounded-lg border bg-black px-5 py-10 md:shadow-xl border-none flex flex-col gap-5">
        <h2 className="text-5xl font-extrabold whitespace-pre-wrap tracking-tighter bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent underline">
          Popular Courses
        </h2>
        <div className="z-10 flex flex-wrap w-full md:px-10 gap-6 items-start justify-center">
          {courses &&
            !error &&
            (searched.length > 0
              ? searched.map((item: any, index: any) => {
                  return <CourseCard courseData={item} key={index} />;
                })
              : courses.map((item: any, index: any) => {
                  return <CourseCard courseData={item} key={index} />;
                }))}
        </div>
        <AnimatedGridPattern
          numSquares={100}
          maxOpacity={0.8}
          duration={10}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />
      </div>
      <div className="flex-col md:flex-row w-full flex mb-10">
        <h2 className="text-5xl font-extrabold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent hover:bg-gradient-to-b hover:from-gray-900 hover:to-gray-200">
          Always You <br />
          are Our First
          <br /> Priority
        </h2>
        <MarqueeDemo />
      </div>
    </div>
  );
}
