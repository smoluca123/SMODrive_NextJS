import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MobileAdProps {
  type?: "banner" | "interstitial" | "native"
  className?: string
  label?: string
}

export function MobileAd({ type = "banner", className, label = "Advertisement" }: MobileAdProps) {
  const getAdContent = () => {
    switch (type) {
      case "banner":
        return (
          <div className="h-16 bg-muted/50 rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Mobile Banner (320x50)</span>
          </div>
        )
      case "interstitial":
        return (
          <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Mobile Interstitial</span>
          </div>
        )
      case "native":
        return (
          <div className="space-y-3">
            <div className="h-32 bg-muted/50 rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Mobile Native Ad</span>
            </div>
            <p className="text-xs text-muted-foreground">Sponsored content optimized for mobile</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className={cn("border-dashed border-2 border-muted-foreground/20 md:hidden", className)}>
      <CardContent className="p-4 text-center">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">{label}</p>
          {getAdContent()}
        </div>
      </CardContent>
    </Card>
  )
}
