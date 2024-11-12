import { Check } from "@/icons";
import type React from "react";

export type FeatureProps = {
  id: number;
  label: string;
  icon: React.JSX.Element;
};

export const DONE_FEATURES: FeatureProps[] = [
  {
    id: 0,
    label: "First Feature",
    icon: <Check />,
  },
  {
    id: 1,
    label: "Second Feature",
    icon: <Check />,
  },
  {
    id: 2,
    label: "Third Feature",
    icon: <Check />,
  },
];
