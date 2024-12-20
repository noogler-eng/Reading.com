import { useRecoilValue } from "recoil";
import userAtom from "../../store/user/userAtom";
import coursesFetching from "../../lib/hooks/FetchAllC";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CourseCard from "@/components/CourseCard";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export default function MyCourses() {
  const user = useRecoilValue(userAtom);
  const { data: courses, error } = coursesFetching.FetchSpecificInstCourses({
    uid: user?.id || "",
  });

  if (!user) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <h1 className="text-2xl font-bold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
          <span className="text-8xl font-bold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
            Oops,
          </span>
          <br /> you are not signed in, my courses
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <h1 className="text-2xl font-bold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
          <span className="text-8xl font-bold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
            505 Oops,
          </span>
          <br /> There is some error on server side.
        </h1>
      </div>
    );
  }

  if (!courses || courses?.length == 0) {
    return (
      <div className="flex min-h-screen w-full items-center flex-col p-10 ">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-3xl font-semibold underline">My Courses</h1>
          <Link to="/my-courses/form">
            <Button variant="secondary">create new course</Button>
          </Link>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent mt-24">
          <span className="text-8xl font-bold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
            No Course Found,
          </span>
          <br /> create courses as you are the Best Educators.
        </h1>
      </div>
    );
  }

  return (
    <div className="items-center h-full w-full p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold underline">My Courses</h1>
        <Link to="/my-courses/form">
          <Button variant="secondary">create new course</Button>
        </Link>
      </div>
      <div className="relative w-full overflow-hidden">
        <div className="flex-col md:flex-row items-center md:flex-wrap flex justify-center gap-5 my-10 z-10 w-full">
          {error && (
            <div className="text-2xl font-bold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
              <span className="text-8xl font-bold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
                Oops,
              </span>
              <br />
              Unable to Fetch courses from server
            </div>
          )}
          {courses &&
            courses.map((course: any, index: any) => {
              return <CourseCard courseData={course} key={index} />;
            })}
        </div>
        <AnimatedGridPattern
          numSquares={100}
          maxOpacity={0.5}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />
      </div>
    </div>
  );
}
