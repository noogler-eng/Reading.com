import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import userAtom from "../../store/user/userAtom";
import { useRecoilValue } from "recoil";
import ShineBorder from "@/components/ui/shine-border";
import { SelectScrollable } from "@/components/Select";
import ReactQuill from "react-quill";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

export default function Form() {
  const handelCreateCourse = async () => {};

  const user = useRecoilValue(userAtom);
  const [data, setData] = useState<{
    title: string;
    desctiption: string;
    message: string;
    level: string;
    category: string;
    language: string;
  } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [des, setDes] = useState<string>("");

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

  const categories = [
    "Development",
    "Business",
    "Finance & Accounting",
    "IT & Software",
    "Office Productivity",
    "Personal Development",
    "Design",
    "Marketing",
    "Lifestyle",
    "Photography & Video",
    "Health & Fitness",
    "Music",
    "Teaching",
  ];

  const levels = ["Begginer", "Moderate", "Advanced"];

  const languages = ["English", "Hindi"];
  const handelData = (key: string, value: string) => {};

  return (
    <div className="p-6 flex flex-col items-center">
      <ShineBorder
        className="w-4/6 p-4 my-10 bg-transparent rounded-xl"
        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      >
        <div className="w-full flex flex-col items-center p-10">
          <h1 className="text-3xl font-extrabold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent mb-10 underline">
            Create New Course
          </h1>
          <form
            onSubmit={handelCreateCourse}
            className="flex flex-col items-center gap-3 justify-center z-10 text-white w-full"
          >
            <Input
              type="title"
              id="title"
              placeholder="title"
              className="w-5/6"
              required
              onChange={(e) => handelData("title", e.target.value)}
            />
            <Textarea
              placeholder="Type your message here."
              className="w-5/6"
              onChange={(e) => handelData("message", e.target.value)}
            />
            <div className="w-5/6">
              <div className="flex items-center justify-center w-full bg-black">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 bg-black"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 bg-black">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    required
                    onChange={(e) =>
                      setFile(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </label>
              </div>
            </div>
            <div className="w-5/6 flex gap-3">
              <SelectScrollable
                title={"category"}
                items={categories}
                handelData={handelData}
              />
              <SelectScrollable
                title={"level"}
                items={levels}
                handelData={handelData}
              />
              <SelectScrollable
                title={"language"}
                items={languages}
                handelData={handelData}
              />
            </div>
            <div className="w-5/6 rounded-xl">
              <ReactQuill
                theme="snow"
                value={des}
                onChange={setDes}
                className="rounded-xl"
              />
            </div>
            <Button type="submit" variant={"secondary"} className="w-5/6">
              create
            </Button>
          </form>
        </div>
      </ShineBorder>
    </div>
  );
}
