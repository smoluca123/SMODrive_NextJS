import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface NativeAdProps {
  layout?: "single" | "grid"
  className?: string
  label?: string
}

export function NativeAd({ layout = "grid", className, label = "Sponsored Content" }: NativeAdProps) {
  if (layout === "single") {
    return (
      <Card className={cn("border-dashed border-2 border-muted-foreground/20", className)}>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">{label}</p>
            <div className="h-32 bg-muted/50 rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Native Ad Content</span>
            </div>
            <p className="text-xs text-muted-foreground">Recommended for you</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("border-dashed border-2 border-muted-foreground/20", className)}>
      <CardContent className="p-6 sm:p-8">
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">{label}</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted/50 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Native Ad {i}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">You might also like these recommendations</p>
        </div>
      </CardContent>
    </Card>
  )
}
