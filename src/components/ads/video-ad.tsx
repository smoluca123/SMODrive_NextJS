import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Volume2, Maximize } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoAdProps {
  className?: string
  label?: string
  autoplay?: boolean
}

export function VideoAd({ className, label = "Video Advertisement", autoplay = false }: VideoAdProps) {
  return (
    <Card className={cn("border-dashed border-2 border-muted-foreground/20", className)}>
      <CardContent className="p-4 text-center">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">{label}</p>
          <div className="relative h-48 bg-muted/50 rounded-lg flex items-center justify-center group">
            <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
            <div className="relative z-10 flex flex-col items-center space-y-2">
              <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                <Play className="h-6 w-6 text-white ml-1" />
              </div>
              <span className="text-white text-sm font-medium">Video Ad (16:9)</span>
            </div>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white hover:bg-white/20">
                  <Play className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white hover:bg-white/20">
                  <Volume2 className="h-3 w-3" />
                </Button>
              </div>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white hover:bg-white/20">
                <Maximize className="h-3 w-3" />
              </Button>
            </div>

            {autoplay && (
              <div className="absolute top-2 right-2">
                <div className="bg-black/50 text-white text-xs px-2 py-1 rounded">Auto-play</div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
