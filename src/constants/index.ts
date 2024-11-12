import { DONE_FEATURES, type FeatureProps } from "./features";
import { LANDING_PAGE_MENU, type MenuProps } from "./menus";

type GroupleConstantsProps = {
  landingPageMenu: MenuProps[];
  doneFeatures: FeatureProps[];
};

export const SMALAG_CONSTANTS: GroupleConstantsProps = {
  landingPageMenu: LANDING_PAGE_MENU,
  doneFeatures: DONE_FEATURES,
};
