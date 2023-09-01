import { atom } from "jotai";
import React from "react";

export const bottomSheetAtom = atom<React.ReactNode | null>(null);
