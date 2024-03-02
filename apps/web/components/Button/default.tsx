import React, { forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "~/utils/tailwind-merge";
import { FaSpinner } from "react-icons/fa";

const buttonVariance = cva(
	"text-black flex justify-center items-center gap-2",
	{
		variants: {
			variant: {
				success: ["hover:bg-green-400 hover:text-white focus:bg-green-400"],
				primary: ["hover:bg-blue-400 hover:text-white focus:bg-blue-400"],
				warning: ["hover:bg-orange-400 hover:text-white focus:bg-orange-400"],
				danger: ["hover:bg-red-400 hover:text-white focus:bg-red-400"],
			},
			size: {
				"1": ["px-2 py-1"],
				"2": ["px-3 py-2"],
				"3": ["px-4"],
			},
			outline: {
				"1": "outline outline-black outline-1",
				"2": "outline outline-black outline-2",
				"4": "outline outline-black outline-4",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "1",
			outline: "2",
		},
	}
);

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariance> {
	isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = forwardRef(
	({ children, size, variant, outline, className, isLoading, ...props }) => {
		return (
			<button
				{...props}
				className={cn(
					buttonVariance({ size, variant, outline, className }),
					className
				)}
			>
				{isLoading && <FaSpinner className="animate-spin" />}
				{children}
			</button>
		);
	}
);

export default Button;
