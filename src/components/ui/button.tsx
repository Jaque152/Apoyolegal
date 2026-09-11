import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-none font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-[0.95rem] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-forest text-cream hover:bg-ink hover:tracking-[0.19em] shadow-[3px_3px_0_0_hsl(var(--brass))] hover:shadow-[5px_5px_0_0_hsl(var(--brass))] hover:-translate-x-[1px] hover:-translate-y-[1px]",
        brass:
          "bg-brass text-cream hover:bg-ink shadow-[3px_3px_0_0_hsl(var(--forest))] hover:shadow-[5px_5px_0_0_hsl(var(--forest))] hover:-translate-x-[1px] hover:-translate-y-[1px]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-forest/35 bg-transparent text-forest hover:border-forest hover:bg-forest hover:text-cream",
        outlineCream:
          "border border-cream/35 bg-transparent text-cream hover:border-cream hover:bg-cream hover:text-forest",
        secondary:
          "bg-sand text-ink hover:bg-forest hover:text-cream",
        ghost:
          "text-forest hover:bg-forest/8 hover:text-ink",
        link: "h-auto p-0 text-forest underline-offset-[6px] hover:underline",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-9 px-4 text-[0.66rem] tracking-[0.14em]",
        lg: "h-14 px-10 text-[0.78rem]",
        icon: "h-11 w-11 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
