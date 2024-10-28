import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../../store/user/userAtom";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Youtube } from "lucide-react";
import { Link } from "lucide-react";
import { Image } from "lucide-react";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

export default function ChapterForm() {
  const [params] = useSearchParams();
  const [fileType, setFileType] = useState("");
  const [data, setData] = useState<{
    title: string;
    description: string;
  }>();
  const [file, setFile] = useState<File | null>();
  const navigate = useNavigate();

  const user = useRecoilValue(userAtom);
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
    try{

        navigate(`/course/${params.get('id')}`);
    }catch(error: any){
        console.log(error);
    }
    
    setData({
      title: "",
      description: "",
    });
    setFile(null);
  };

  // either youtube video upload, video embeed or any thing like image
  return (
    <div className="flex flex-col items-center justify-center p-16 w-full gap-4">
      <h2 className="text-xl md:text-5xl font-extrabold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
        Chapter's Form
      </h2>
      <form
        className="w-1/3 flex flex-col items-center justify-center gap-2"
        onSubmit={handelCreateChapter}
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
        <RainbowButton className="w-full" type="submit">
          save
        </RainbowButton>
      </form>
    </div>
  );
}
