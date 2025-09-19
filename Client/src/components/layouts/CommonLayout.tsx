import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface IProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <div className="grow-1 w-11/12 mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
