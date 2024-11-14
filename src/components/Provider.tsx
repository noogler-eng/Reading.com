import { RecoilRoot } from "recoil";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "./ThemeProvider";
export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <RecoilRoot>
        <NextUIProvider>{children}</NextUIProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
}
