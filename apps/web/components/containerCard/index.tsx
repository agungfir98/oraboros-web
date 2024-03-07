import { VariantProps, cva } from "class-variance-authority";
import React, { PropsWithChildren } from "react";
import { cn } from "~/lib/utils";

const cardVariance = cva("px-3 py-4 outline outline-3 outline-slate-700", {
  variants: {
    variant: {
      default: "bg-white",
      blue: "bg-teal-200",
    },
    rounded: {
      sm: "rounded-sm",
      xl: "rounded-xl",
      full: "rounded-full",
    },
    shadow: {
      default: "",
      sm: "shadow-solid-sm",
      base: "shadow-solid-base",
    },
  },
  defaultVariants: {
    variant: "default",
    rounded: "xl",
    shadow: "default",
  },
});

type CardProps = {} & React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariance>;

const ContainerCard: React.FC<CardProps> = ({
  children,
  variant,
  shadow,
  rounded,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(cardVariance({ variant, rounded, shadow, className }))}
      {...props}
    >
      {children}
    </div>
  );
};

export default ContainerCard;
