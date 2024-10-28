import { useRecoilValue } from "recoil";
import userAtom from "../../store/user/userAtom";
import { useNavigate } from "react-router-dom";

export default function Chapters({courseInstId, courseId}: {
  courseInstId: string,
  courseId: string
}) {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="flex justify-between w-full">
        <h2>Chapters</h2>
        {user?.id == courseInstId && (
          <button className="p-1 text-sm rounded-lg bg-gray-200 text-black" onClick={()=>navigate(`/course/chapter-form?id=${courseId}`)}>
            create
          </button>
        )}
      </div>
      <div></div>
    </div>
  );
}
