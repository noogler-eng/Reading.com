import { useRecoilValue } from "recoil";
import userAtom from "../../store/user/userAtom";
import { useNavigate } from "react-router-dom";
import { Youtube } from "lucide-react";
import { Image } from "lucide-react";
import { Link } from "lucide-react";
import { Pencil } from "lucide-react";
import { BadgeX } from "lucide-react";
import firebaseChapters from "../../lib/serverless/chapter";

export default function Chapters({
  courseInstId,
  courseId,
  chapters,
}: {
  courseInstId: string;
  courseId: string;
  chapters: any;
}) {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const handelDeleteChapter = async (chapterId: string) => {
    try {
      await firebaseChapters.deleteSpecificChapter(chapterId, courseId);
    } catch (error) {
      console.log("error while deleting chapter: ", error);
    }
  };

  const handelEditChapter = async (chapterId: string) => {
    navigate(`/course/chapter-form?id=${courseId}&&chapterId=${chapterId}`);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between w-full">
        <h2>Chapters</h2>
        {user?.id == courseInstId && (
          <button
            className="p-1 text-sm rounded-lg bg-gray-200 text-black"
            onClick={() => navigate(`/course/chapter-form?id=${courseId}`)}
          >
            create
          </button>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {chapters.map((chapter: any, index: any) => {
          return (
            <div
              className="flex w-full items-center justify-between border border-white pr-2 rounded-lg"
              key={index}
            >
              <h2 className="text-sm w-full rounded-sm py-2 px-2 flex gap-1 items-center">
                {chapter.fileType == "youtube" ? (
                  <Youtube size={15} />
                ) : chapter.fileType == "image" ? (
                  <Image size={15} />
                ) : (
                  <Link size={15} />
                )}
                {chapter.title.slice(0, 40)}
              </h2>
              {courseInstId == user?.id && (
                <div className="flex gap-1">
                  <button
                    className="border-1 p-1 rounded-lg bg-red-600"
                    onClick={() => {
                      handelEditChapter(chapter.id);
                    }}
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    className="border-1 p-1 rounded-lg bg-white text-black"
                    onClick={() => handelDeleteChapter(chapter?.id)}
                  >
                    <BadgeX size={15} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
