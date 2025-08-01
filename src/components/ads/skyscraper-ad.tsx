import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SkyscraperAdProps {
  className?: string
  label?: string
  height?: "standard" | "tall"
}

export function SkyscraperAd({ className, label = "Advertisement", height = "standard" }: SkyscraperAdProps) {
  const adHeight = height === "standard" ? "h-96" : "h-[600px]"

  return (
    <Card className={cn("border-dashed border-2 border-muted-foreground/20", className)}>
      <CardContent className="p-4 text-center">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">{label}</p>
          <div className={cn("bg-muted/50 rounded-lg flex items-center justify-center", adHeight)}>
            <span className="text-muted-foreground text-sm">Skyscraper Ad (160x600)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
