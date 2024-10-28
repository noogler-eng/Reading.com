import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../../store/user/userAtom";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Youtube } from "lucide-react";
import { Link } from "lucide-react";
import { Image } from "lucide-react";

export default function ChapterForm() {
  const [params] = useSearchParams();
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

  const handelCreateChapter = async () => {};

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
          className="bg-transparent focus:outline-none text-sm py-1 border-2 rounded-sm border-gray-400 text-center w-full"
          placeholder="chapter title"
          type="text"
          required
        />
        <div className="flex py-4 items-center justify-center gap-2">
          <div className="border rounded-xl p-2" onClick={()=>{}}> 
            <Youtube />
          </div>
          <div className="border rounded-xl p-2" onClick={()=>{}}>
            <Link />
          </div>
          <div className="border rounded-xl p-2" onClick={()=>{}}>
            <Image />
          </div>
        </div>
        <RainbowButton className="w-full" type="submit">
          save
        </RainbowButton>
      </form>
    </div>
  );
}
