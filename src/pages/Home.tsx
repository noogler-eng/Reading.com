import { MarqueeDemo } from "@/components/Marquee";
import FetchAllCourses from "../../lib/hooks/FetchAllC";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import CourseCard from "@/components/CourseCard";
import { cn } from "@/lib/utils";

export default function Home() {
  const { data: courses, error } = FetchAllCourses();

  console.log(courses);

  return (
    <div className="p-6 flex items-center flex-col gap-16">
      <h2 className="text-5xl font-extrabold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent mt-10">
        Practice Your Carrer With Us.
      </h2>
      <div className="relative flex w-full items-center justify-center overflow-hidden rounded-lg border bg-black px-5 py-10 md:shadow-xl border-none flex flex-col gap-16">
        <h2 className="text-5xl font-extrabold whitespace-pre-wrap tracking-tighter bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
          Popular Courses
        </h2>
        <div className="z-10 flex flex-wrap w-full px-10 gap-6 items-start justify-center">
          {courses &&
            !error &&
            courses.map((item: any, index: any) => {
              return <CourseCard courseData={item} key={index} />;
            })}
        </div>
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />
      </div>
      <div className="w-full flex mb-10">
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
