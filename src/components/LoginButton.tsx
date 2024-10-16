import { Button } from "./ui/button";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import firebase from "../../lib/firebase";
import { useRecoilState } from "recoil";
import userAtom from "../../store/user/userAtom";
import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LoginButton() {
  const [user, setUser] = useRecoilState(userAtom);

  const handelLogin = async () => {
    signInWithPopup(firebase.auth, new GoogleAuthProvider()).then(
      (user: any) => {
        if (user) {
          setUser({
            email: user.email,
            image: user.photoURL,
          });
        } else {
          setUser(null);
        }
      }
    );
  };

  const handelLogout = async () => {
    signOut(firebase.auth)
      .then(() => {
        console.log("signout successfully");
      })
      .catch((error: any) => {
        console.log("signout error", error);
      });
  };

  console.log(user?.image || "");
  return (
    <div className="flex items-center">
      {!user ? (
        <Button variant={"default"} onClick={handelLogin} className="outline">
          Login
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none bg-black text-white">
            {" "}
            <img
              src={user.image}
              width={38}
              height={38}
              className="rounded-full"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black text-white font-semibold">
            <DropdownMenuItem onClick={handelLogout} className="flex gap-2 border-none focus:outline-none">
              logout <LogOut size={18}/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
