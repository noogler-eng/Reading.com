import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebaseCourse from "../../lib/serverless/courses";
import { CircularProgress } from "@nextui-org/react";
import { DocumentData } from "firebase/firestore";
import { Image } from "@nextui-org/react";
import Chapters from "@/components/Chapters";
import Hero from "@/components/Hero";
import firebaseChapters from "../../lib/hooks/FetchChapters";
import ChapterCard from "@/components/ChapterCard";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useRecoilValue } from "recoil";
import userAtom from "../../store/user/userAtom";
import firebaseUser from "../../lib/serverless/user";

export default function Course() {
  const params = useParams();
  const user = useRecoilValue(userAtom);
  const [course, setCourse] = useState<DocumentData | null>();
  const [error, setError] = useState<{} | null>();
  const courseId = params.id;

  const fetchData = async () => {
    const { data: courseData, error } =
      await firebaseCourse.getSpecificCourseData(courseId || "");
    setCourse(courseData || null);
    setError(error || null);
  };

  const { data: chapter, error: err } = firebaseChapters.useFetchChapters(
    {courseId: courseId || ""}
  );


  useEffect(() => {
    if (courseId) {
      fetchData();
    }
  }, []);

  const isPurchased = course && course?.purchasers?.includes(user?.id);

  async function handelBuy(){
    if(!user?.id || !courseId || !user?.name || !user?.email || !user?.image) {
      
      return;
    }

    console.log('purchasing the course!');
    await firebaseUser.purchaseCourse(courseId, user?.id, user?.name, user?.email, user?.image);
  }

  if ((!course && !error) || (!chapter && !err)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress label="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <h1 className="text-2xl font-bold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
          <span className="text-8xl font-bold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
            Oops,
          </span>
          <br /> there is some error from server side
        </h1>
      </div>
    );
  }

  return (
    <div className="px-16 flex gap-4 justify-center w-full">
      <div className="flex flex-col items-center justify-center gap-4 w-9/12 mb-10">
        <Hero course={course} />
        <h2 className="text-2xl w-full">Chapters</h2>
        <div className="flex flex-col gap-2 w-full">
          {chapter &&
            chapter?.map((chapt: any, index: any) => {
              return <ChapterCard chapter={chapt} key={index} />;
            })}
        </div>
      </div>
      <div className="w-3/12 flex flex-col gap-4 items-center h-fit py-4">
        <div className="px-4 border-l-2 border-gray-600 w-full py-2 flex flex-col gap-2">
          <h2 className="text-sm text-gray-200">Author / Educator</h2>
          <div className="flex gap-4 items-center">
            <Image
              alt="Card background"
              className="object-cover rounded-full w-fit border-2 p-1 border-blue-500"
              src={course?.instImage || ""}
              width={""}
            />
            <div className="flex flex-col">
              <h2 className="text-gray-400 text-xl">{course?.instName}</h2>
              <p className="text-blue-600">verified</p>
            </div>
          </div>
          <p className="text-left text-gray-400">
            <span className="text-white underline">message:</span>{" "}
            {course?.message}
          </p>
        </div>
        <div className="border-l-2 border-gray-600 px-4 w-full flex flex-col gap-4 items-center h-fit">
          <Chapters courseInstId={course?.instId} courseId={course?.id} chapters={chapter}/>
        </div>
        {!isPurchased && <RainbowButton className="w-full" onClick={handelBuy} disabled={!user}>{"Buy Now"}</RainbowButton>}
      </div>
    </div>
  );
}
