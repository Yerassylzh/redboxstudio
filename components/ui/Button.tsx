import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border-2 border-white shadow-retro active:translate-y-[2px] active:translate-x-[2px] active:shadow-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "bg-transparent text-white hover:bg-white hover:text-black",
        secondary:
          "bg-muted text-white hover:bg-muted/80",
        ghost: "border-transparent shadow-none hover:bg-white/10 hover:text-white active:translate-y-0 active:shadow-none",
        link: "text-primary border-none shadow-none underline-offset-4 hover:underline active:translate-y-0 active:shadow-none",
        premium: "bg-gradient-to-r from-primary to-orange-500 text-white border-white hover:opacity-90",
      },
      size: {
        default: "h-10 px-4 py-2 md:h-12 md:px-6 md:py-4",
        sm: "h-8 px-3 text-xs md:h-9",
        lg: "h-11 px-8 md:h-14",
        icon: "h-10 w-10 md:h-12 md:w-12",
      },
      font: {
        default: "font-sans",
        pixel: "font-heading text-xs uppercase tracking-widest",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      font: "pixel",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
