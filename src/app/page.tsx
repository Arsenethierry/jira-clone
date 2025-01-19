import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex gap-2 p-10">
      <Button size={'lg'} className="">Primary</Button>
      <Button variant={'destructive'}>Destructive</Button>
      <Button variant={'secondary'}>Secondary</Button>
      <Button variant={'ghost'}>Ghost</Button>
      <Button variant={'muted'} className="">muted</Button>
      <Button variant={'outline'}>outline</Button>
      <Button variant={'teritary'} className="bg-blue-100 text-blue-600 border-transparent hover:bg-blue-200 shadow-none">teritary</Button>
    </div>
  );
}
