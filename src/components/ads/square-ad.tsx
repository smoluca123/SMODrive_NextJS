import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SquareAdProps {
  size?: "small" | "medium" | "large"
  className?: string
  label?: string
}

const squareSizes = {
  small: { dimensions: "250x250", height: "h-32" },
  medium: { dimensions: "300x300", height: "h-40" },
  large: { dimensions: "336x336", height: "h-48" },
}

export function SquareAd({ size = "medium", className, label = "Advertisement" }: SquareAdProps) {
  const { dimensions, height } = squareSizes[size]

  return (
    <Card className={cn("border-dashed border-2 border-muted-foreground/20", className)}>
      <CardContent className="p-4 text-center">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">{label}</p>
          <div className={cn("bg-muted/50 rounded-lg flex items-center justify-center", height)}>
            <span className="text-muted-foreground text-sm">Square Ad ({dimensions})</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
