import { HeartIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface CategoriesCardProps {
  title: string;
  category: string;
  image: string;
  count: number;
  users: { image: string; fallback: string }[];
}

export function CategoriesCard({
  title,
  category,
  image,
  count,
  users,
}: CategoriesCardProps) {
  return (
    <Card className="overflow-hidden border-[#2a3a5a] p-0 h-full">
      <CardHeader className="p-0">
        <div className="relative h-40">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 rounded-full  text-white bg-black/30 hover:bg-black/80 hover:text-red-500"
          >
            <HeartIcon className="h-5 w-5 cursor-pointer" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="relative px-4 -top-13 h-full max-h-[50px]">
        <div className="flex items-center justify-between">
          <div className="flex -space-x-4">
            {users.map((user, i) => (
              <Avatar key={i} className="border-2 border-white h-12 w-12">
                <AvatarImage
                  src={user.image || "/placeholder.svg"}
                  alt="User"
                />
                <AvatarFallback>{user.fallback}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
        <h3 className="mt-3 text-sm font-medium">{category}</h3>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex flex-col items-start gap-5">
          <Badge
            variant="outline"
            className="bg-[#2a3a5a] text-white border-[#3a4a6a]"
          >
            {count}
          </Badge>
          <Button
            variant="outline"
            className="w-full border-[#2F80ED] hover:bg-[#2a3a5a] hover:text-white cursor-pointer"
          >
            View Proposals
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
