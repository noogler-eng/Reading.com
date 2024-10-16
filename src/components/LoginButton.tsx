import { Button } from "./ui/button";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import firebase from "../../lib/firebase";
import { useRecoilState } from "recoil";
import userAtom from "../../store/user/userAtom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

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
            <DropdownMenuItem className="flex gap-2 border-none focus:outline-none">
              {user.email}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handelLogout}
              className="flex gap-2 border-none focus:outline-none"
            >
              logout
            </DropdownMenuItem>
            <Link to="/">
              <DropdownMenuItem className="flex gap-2 border-none focus:outline-none">
                Home
              </DropdownMenuItem>
            </Link>
            <Link to="/my-courses">
              <DropdownMenuItem className="flex gap-2 border-none focus:outline-none">
                My-courses
              </DropdownMenuItem>
            </Link>
            <Link to="/subscription">
              <DropdownMenuItem className="flex gap-2 border-none focus:outline-none">
                Subscription
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
