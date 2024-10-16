import { useRecoilValue } from "recoil";
import userAtom from "../../store/user/userAtom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function MyCourses() {
  const user = useRecoilValue(userAtom);

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

  return (
    <div className="items-center h-full w-full p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold underline">My Courses</h1>
        <Link to="/my-courses/form">
          <Button variant="secondary">create new course</Button>
        </Link>
      </div>
      <div></div>
    </div>
  );
}
