import "i18next";

import { main } from "../locales/ko-KR";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "main";
    resources: {
      main: typeof main;
    };
  }
}
