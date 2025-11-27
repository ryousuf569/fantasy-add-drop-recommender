import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DesignSystem() {
  return (
    <div className="p-6 space-y-10">
      
      <h1 className="text-3xl font-bold">Design System</h1>

      {/* Buttons */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Buttons</h2>
        <div className="flex gap-4 flex-wrap">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </section>

      {/* Inputs */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Inputs</h2>
        <div className="flex gap-4 flex-wrap">
          <Input placeholder="Type something..." />
          <Input type="email" placeholder="Email..." />
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Cards</h2>
        <Card className="max-w-xs">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This is a sample card.</p>
          </CardContent>
        </Card>
      </section>

      {/* Badges */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Badges</h2>
        <div className="flex gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>
    </div>
  );
}
