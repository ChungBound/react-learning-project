import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  // 注意：这里不能使用客户端组件的钩子，因为这是一个特殊的文件
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="space-y-4 max-w-md">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">页面未找到</h2>
        <p className="text-muted-foreground">抱歉，您访问的页面不存在或已被移动。</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Button variant="outline" asChild>
            <Link href="javascript:history.back()" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              返回上一页
            </Link>
          </Button>
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              返回首页
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
