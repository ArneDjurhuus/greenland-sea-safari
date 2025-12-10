import { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import { motion, HTMLMotionProps } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    asChild?: boolean;
    'aria-label'?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arctic-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-sans tracking-wide";

        const variants = {
            primary: "bg-arctic-blue text-white hover:bg-arctic-blue/90 hover:shadow-lg shadow-md shadow-arctic-blue/20 active:scale-[0.98]",
            secondary: "bg-arctic-gold text-arctic-night hover:bg-arctic-gold/90 hover:shadow-lg shadow-md active:scale-[0.98]",
            outline: "border-2 border-arctic-ice text-arctic-blue hover:bg-arctic-ice/10 hover:border-arctic-blue/30",
            ghost: "text-arctic-blue hover:text-arctic-blue/80 hover:bg-arctic-ice/10",
        };

        const sizes = {
            sm: "h-8 px-4 text-xs",
            md: "h-10 px-6 py-2 text-sm",
            lg: "h-12 px-8 text-base",
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
