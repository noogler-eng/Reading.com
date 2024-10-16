import { atom } from "recoil";

const userAtom = atom<{
    email: string,
    image: string
} | null>({
  key: "userAtom",
  default: null,
});

export default userAtom;
