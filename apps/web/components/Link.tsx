import React from "react";
import NextLink from "next/link";
import type { LinkProps as DefaultLinkProps } from "next/link";
import { VariantProps, cva } from "class-variance-authority";
import { ClassValue } from "clsx";
import { cn } from "~/lib/utils";

const LinkVariance = cva(
  "flex items-center w-fit hover:underline hover:underline-offset-2",
  {
    variants: {
      variant: {
        default: "",
        button: "px-3 py-2 shadow-solid-xs",
      },
      outline: {
        none: "",
        "1": "outline outline-black outline-1",
        "2": "outline outline-black outline-2",
        "3": "outline outline-black outline-3",
      },
    },
    defaultVariants: {
      variant: "default",
      outline: "none",
    },
  },
);

type LinkProps = {
  children?: React.ReactNode;
  className?: ClassValue;
  target?: React.HTMLAttributeAnchorTarget;
} & DefaultLinkProps &
  VariantProps<typeof LinkVariance>;

const Link: React.FC<LinkProps> = ({
  children,
  href,
  className,
  variant,
  outline,
  target,
  ...props
}) => {
  return (
    <NextLink
      href={href}
      className={cn(LinkVariance({ className, outline, variant }), className)}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;
