import { RecoilRoot } from "recoil";
import {NextUIProvider} from '@nextui-org/react'
export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <NextUIProvider>{children}</NextUIProvider>
    </RecoilRoot>
  );
}
