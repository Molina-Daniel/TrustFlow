import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface TopProposal {
  id: string;
  title: string;
  user: string;
  userImage: string;
  userFallback: string;
  voted: boolean;
}

interface TopProposalsProps {
  proposals: TopProposal[];
}

export function TopProposals({ proposals }: TopProposalsProps) {
  return (
    <Card className="bg-[#1e2b45] border-[#2a3a5a] text-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-lg font-semibold">Top Proposals</h3>
        <Button variant="link" className="text-[#2F80ED] cursor-pointer">
          See more
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4">
        {proposals.map((proposal) => (
          <div
            key={proposal.id}
            className="flex items-center justify-between w-full overflow-hidden"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage
                  src={proposal.userImage || "/placeholder.svg"}
                  alt={proposal.user}
                />
                <AvatarFallback>{proposal.userFallback}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 mr-2">
                <p className="text-sm font-medium truncate max-w-[120px] sm:max-w-[200px] md:max-w-[300px]">
                  {proposal.title}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  @{proposal.user}
                </p>
              </div>
            </div>
            {proposal.voted ? (
              <Badge className="bg-green-600 text-white flex-shrink-0">
                Voted <span className="ml-1">✓</span>
              </Badge>
            ) : (
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 flex-shrink-0 cursor-pointer"
              >
                vote
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
