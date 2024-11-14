import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../../store/user/userAtom";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Youtube } from "lucide-react";
import { Link } from "lucide-react";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import firebaseChapter from "../../lib/serverless/chapter";
import { Progress } from "@nextui-org/react";
import "react-quill/dist/quill.snow.css";

export default function ChapterForm() {
  const [params] = useSearchParams();
  const [fileType, setFileType] = useState("");
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [data, setData] = useState<{
    title: string;
    description: string;
  }>();
  const [file, setFile] = useState<File | string | null>();
  const user = useRecoilValue(userAtom);
  const id = params?.get("id");
  const chapterId = params?.get("chapterId");
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <h1 className="text-2xl font-bold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
          <span className="text-8xl font-bold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
            Oops,
          </span>
          <br /> you are not signed in, my-courses/form
        </h1>
      </div>
    );
  }

  if (!id) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <h1 className="text-2xl font-bold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
          <span className="text-8xl font-bold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
            Oops,
          </span>
          <br /> No course are selected now to create chapters
        </h1>
      </div>
    );
  }

  const fetchData = async () => {
    if (!id && !chapterId) {
      throw new Error("Either 'id' or 'chapterId' must be provided.");
    }

    const chapterData = await firebaseChapter.fetchSpecificChapter(
      id || "",
      chapterId || ""
    );

    if (!chapterData) {
      throw new Error("No data found!");
    }

    setData({
      title: chapterData.title,
      description: chapterData.description,
    });
  };

  const handelEditData = async (e: any) => {
    e.preventDefault();
    try {
      if (!id || !chapterId) throw new Error("Invalid Id's");
      await firebaseChapter.editChapters(
        chapterId || "",
        id || "",
        data,
        // @ts-ignore
        file,
        fileType,
        (progress: Number) => {
          // @ts-ignore
          setUploadingProgress((uploadingProgress: Number) => {
            return progress;
          });
        }
      );
      navigate(`/courses/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handelSetData = (key: string, value: string) => {
    setData((data: any) => {
      return {
        ...data,
        [key]: value,
      };
    });
  };
  const handelCreateChapter = async (e: any) => {
    e.preventDefault();
    if (!data || !file || !id) throw new Error("Unable to get the data");
    try {
      await firebaseChapter.createChapter({
        data: data,
        file: file,
        fileType: fileType,
        courseId: id || "",
        // it is an callback which will returns on resolving = true
        progressCallBack: (progress: number) => {
          // updating the usestate with prev data
          // reason: otherwise it will overwrite at very fast speed so we unable to show on ui
          setUploadingProgress((uploadingProgress: number) => {
            console.log(uploadingProgress);
            return progress;
          });
        },
      });
      navigate(`/course/${id}`);
    } catch (error: any) {
      console.log(error);
    }

    setData({
      title: "",
      description: "",
    });
    setFile(null);
  };

  useEffect(() => {
    if (chapterId && id) {
      fetchData();
    }
  }, []);

  // either youtube video upload, video embeed or any thing like image
  return (
    <div className="flex flex-col items-center justify-center p-16 w-full gap-4">
      <h2 className="text-xl md:text-5xl font-extrabold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
        Chapter's Form
      </h2>
      <form
        className="w-1/3 flex flex-col items-center justify-center gap-2"
        onSubmit={chapterId ? handelEditData : handelCreateChapter}
      >
        <input
          className="bg-transparent focus:outline-none text-sm py-1 border-2 rounded-lg border-gray-400 text-center w-full"
          placeholder="chapter title"
          type="text"
          required
          onChange={(e) => handelSetData("title", e.target.value)}
          value={data?.title}
        />
        {!fileType && (
          <div className="flex py-4 items-center justify-center gap-2">
            <div
              className="border rounded-xl p-2  cursor-pointer"
              onClick={() => setFileType("youtube")}
            >
              <Youtube />
            </div>
            <div
              className="border rounded-xl p-2  cursor-pointer"
              onClick={() => setFileType("video")}
            >
              <Link />
            </div>
            <div
              className="border rounded-xl p-2  cursor-pointer"
              onClick={() => setFileType("image")}
            >
              <Image />
            </div>
          </div>
        )}

        <div className="w-full flex gap-2 items-center">
          {fileType &&
            (fileType == "youtube" ? (
              <div className="w-full">
                <input
                  className="bg-transparent focus:outline-none text-sm py-1 border-2 rounded-xl border-gray-400 text-center w-full"
                  placeholder="youtube video url"
                  type="text"
                  onChange={(e) => setFile(e.target?.files?.[0])}
                />
              </div>
            ) : fileType == "video" ? (
              <div>
                <input
                  className="bg-transparent focus:outline-none text-sm py-1 border-2 rounded-xl border-gray-400 text-center w-full"
                  placeholder="youtube video id"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setFile(e.target?.files?.[0])}
                />
              </div>
            ) : (
              <div>
                <input
                  className="bg-transparent focus:outline-none text-sm py-1 border-2 rounded-xl border-gray-400 text-center w-full"
                  placeholder="youtube video url"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target?.files?.[0])}
                />
              </div>
            ))}
          {fileType && (
            <button
              className="text-sm py-1 bg-transparent border-2 border-red-600 font-semibold text-red-600 rounded-xl px-2"
              onClick={() => {
                setFileType("");
                setFile(null);
              }}
            >
              remove
            </button>
          )}
        </div>
        <div className="w-full rounded-xl">
          <ReactQuill
            theme="snow"
            value={data?.description}
            onChange={(value) => handelSetData("description", value)}
            className="rounded-xl"
            placeholder="enter description of chapter"
          />
        </div>
        {uploadingProgress > 0 && (
          <Progress
            aria-label="Downloading..."
            size="md"
            value={Number(uploadingProgress)}
            color="success"
            showValueLabel={true}
            className="max-w-md"
          />
        )}
        <RainbowButton className="w-full" type="submit">
          {chapterId ? "Edit Chapter" : "Save Chapter"}
        </RainbowButton>
      </form>
    </div>
  );
}
