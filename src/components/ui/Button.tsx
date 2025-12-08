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
        const baseStyles = "inline-flex items-center justify-center rounded-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-arctic-gold disabled:pointer-events-none disabled:opacity-50 font-sans tracking-wide";

        const variants = {
            primary: "bg-arctic-blue text-white hover:bg-arctic-blue/90 shadow-lg shadow-arctic-blue/20",
            secondary: "bg-arctic-gold text-arctic-night hover:bg-arctic-gold/90 shadow-md",
            outline: "border border-arctic-ice text-arctic-blue hover:bg-arctic-ice/10",
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
