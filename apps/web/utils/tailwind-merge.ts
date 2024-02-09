import { twMerge } from "tailwind-merge";

import { clsx, ClassValue } from "clsx";

export const cn = (...inputValue: ClassValue[]) => {
	return twMerge(clsx(inputValue));
};
