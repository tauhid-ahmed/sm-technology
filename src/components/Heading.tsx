import { cn } from "@/lib/utils";

type HeadingProps = React.ComponentPropsWithoutRef<"h1"> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: Variant;
  weight?: "bold" | "medium";
};

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const headingClasses = {
  h1: "text-heading-1",
  h2: "text-heading-2",
  h3: "text-heading-3",
  h4: "text-heading-4",
  h5: "text-subheading-1",
  h6: "text-subheading-2",
};

const weightClasses = {
  bold: "font-bold",
  medium: "font-medium",
};

export default function Heading({
  as = "h2",
  size = "h2",
  weight = "bold",
  className,
  children,
  ...props
}: HeadingProps) {
  const Comp = as;
  return (
    <Comp
      className={cn(
        "font-rubik tracking-custom",
        headingClasses[size],
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

Heading.displayName = "Heading";
