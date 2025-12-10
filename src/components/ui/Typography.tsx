import { HTMLAttributes, forwardRef, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ className, level = 1, children, ...props }, ref) => {
        const Tag = `h${level}` as ElementType;

        const styles = {
            1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl font-serif text-arctic-blue",
            2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 font-serif text-arctic-blue",
            3: "scroll-m-20 text-2xl font-semibold tracking-tight font-serif text-arctic-blue",
            4: "scroll-m-20 text-xl font-semibold tracking-tight font-serif text-arctic-blue",
            5: "scroll-m-20 text-lg font-semibold tracking-tight font-serif text-arctic-blue",
            6: "scroll-m-20 text-base font-semibold tracking-tight font-serif text-arctic-blue",
        };

        return (
            <Tag ref={ref} className={cn(styles[level], className)} {...props}>
                {children}
            </Tag>
        );
    }
);
Heading.displayName = "Heading";

export const Text = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <p ref={ref} className={cn("leading-7 text-arctic-night/80 not-first:mt-6", className)} {...props}>
                {children}
            </p>
        );
    }
);
Text.displayName = "Text";
