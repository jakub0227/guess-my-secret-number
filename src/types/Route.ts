import { FC } from "react";
import { IconType } from "./IconType";

export interface Route extends FC {
  routeName: string;
  icon: IconType;
  displayName: string;
}
