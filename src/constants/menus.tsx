import type React from "react";
import { Explore, Home, Tech } from "@/icons";

export type MenuProps = {
  id: number;
  label: string;
  icon: React.JSX.Element;
  path: string;
  section?: boolean;
  integration?: boolean;
};

export const LANDING_PAGE_MENU: MenuProps[] = [
  {
    id: 0,
    label: "Home",
    icon: <Home />,
    path: "/",
    section: true,
  },
  {
    id: 1,
    label: "Features",
    icon: <Tech />,
    path: "#features",
    section: true,
  },
  {
    id: 2,
    label: "Explore",
    icon: <Explore />,
    path: "/explore",
  },
];
