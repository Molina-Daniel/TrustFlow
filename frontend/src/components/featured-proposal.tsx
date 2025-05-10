import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import DonationDialog from "./modals/donation-dialog";

interface FeaturedProposalProps {
  title: string;
  image: string;
  daysLeft: number;
  requested: string;
  category: string;
  categoryLink: string;
}

export function FeaturedProposal({
  title,
  image,
  daysLeft,
  requested,
  category,
  categoryLink,
}: FeaturedProposalProps) {
  return (
    <Card className="overflow-hidden bg-[#1e2b45] border-[#2a3a5a] text-white p-0">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="h-52 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute right-3 top-3">
            <Badge className="bg-green-500 text-white px-4 py-1 text-md">
              Promoted 🔥
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3">
            <Badge
              variant="outline"
              className="bg-black/50 text-white border-transparent backdrop-blur-sm"
            >
              {daysLeft} days left
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-300">
          Requested: <span className="font-medium text-white">{requested}</span>
        </p>
        <p className="mt-1 text-sm text-gray-300">
          Category:{" "}
          <a
            href={categoryLink}
            className="font-medium text-cyan-400 hover:underline"
          >
            {category}
          </a>
        </p>
      </CardContent>
      <CardFooter className="flex gap-2 p-4 pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex-1 bg-green-600 hover:bg-green-700 cursor-pointer">
              Donate
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#202020] text-white sm:max-w-4xl">
            <DialogTitle className="sr-only">
              Legal Aid for Marginalized Youth
            </DialogTitle>
            <DonationDialog
              title={title}
              imageUrl={image}
              daysLeft={daysLeft}
              category={category}
              description="Provide legal consultations and court representation for 40+ low-income youth in urban areas"
              requestedAmount={requested}
              currency="TF"
              raisedAmount="312"
              percentageFunded={26}
              target="40 youth · Urban justice access"
            />
          </DialogContent>
        </Dialog>
        <Button
          variant="outline"
          className="flex-1 bg-[#0D1B3F] border-none text-white hover:bg-[#2a3a5a] hover:text-white cursor-pointer"
        >
          Track
        </Button>
      </CardFooter>
    </Card>
  );
}
