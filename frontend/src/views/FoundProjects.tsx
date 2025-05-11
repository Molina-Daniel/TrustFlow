import { useState } from "react";
import { FeaturedProposal } from "@/components/featured-proposal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sample AI research report
const sampleReport = {
  proposalNumber: "42",
  proposer: "0xd122638eCa5bB644591fE660FCe0B85E2aB6186a",
  status: "Executed",
  votingPeriod: "block 12109017 → 12126297",
  executionTime: "2025-06-30 11:00:30",
  actions: [
    "_reduceReserves(uint256) on 0x39AA39c021dfbaE8faC545936693aC917d5E7563",
    "transfer(address,uint256) on 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "_grantComp(address,uint256) on 0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B",
    "_grantComp(address,uint256) on 0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B",
    "setPendingAdmin(address) on 0x6d903f6003cca6255D85CcA4D3B5E5146dC33925",
    "_initiate(address) on 0xc0Da02939E1441F497fd74F78cE7Decb17B66529",
  ],
  riskAssessment: [
    "Known risky functions used: ✅ No obvious risks",
    "Voting stats: For = 1438678862814169453983519, Against = 1000000000000000000",
    "Proposer history: (to be implemented)",
    "Target contracts verified: (to be implemented)",
  ],
  verdict: "Likely safe",
};

const foundableProposals = [
  {
    title: "Legal Aid for Marginalized Youth",
    daysLeft: 5,
    requested: "1,200",
    category: "Social Justice & Civil Rights",
    imageUrl: "/src/assets/featured-proposal.jpg",
  },
  {
    title: "Rights for Indigenous Voices",
    daysLeft: 3,
    requested: "3,000",
    category: "Women & Equal Opportunity",
    imageUrl: "/src/assets/top-proposal-1.jpg",
  },
  {
    title: "Prison Reform Outreach",
    daysLeft: 10,
    requested: "8,500",
    category: "Inclusion & Disability",
    imageUrl: "/src/assets/top-proposal-2.png",
  },
];

const FoundProjects = () => {
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleResearch = (title: string) => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setSelectedProposal(title);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="container mx-auto p-4 md:p-6">
      <div className="text-2xl font-bold">Foundable Projects</div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {foundableProposals.map((proposal) => (
          <FeaturedProposal
            key={proposal.title}
            title={proposal.title}
            image={proposal.imageUrl}
            daysLeft={proposal.daysLeft}
            requested={proposal.requested}
            category={proposal.category}
            categoryLink="#"
            onResearch={() => handleResearch(proposal.title)}
          />
        ))}
      </div>

      {isLoading && (
        <Card className="mt-6 bg-[#1e2b45] border-[#2a3a5a] text-white">
          <CardContent className="p-6">
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
              <p className="ml-3">Generating AI Research Report...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedProposal && !isLoading && (
        <Card className="mt-6 bg-[#1e2b45] border-[#2a3a5a] text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl sm:text-2xl font-bold">📘</span>
                <h2 className="text-lg sm:text-2xl font-bold break-words">
                  {selectedProposal} - Proposal Report #
                  {sampleReport.proposalNumber}
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <span className="text-xl flex-shrink-0">🧑‍💻</span>
                    <div className="min-w-0">
                      <p className="text-gray-400 text-sm">Proposer:</p>
                      <p className="break-all text-sm sm:text-base">
                        {sampleReport.proposer}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-xl flex-shrink-0">📈</span>
                    <div>
                      <p className="text-gray-400 text-sm">Status:</p>
                      <Badge className="bg-green-600 text-sm sm:text-base">
                        {sampleReport.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-xl flex-shrink-0">📅</span>
                    <div>
                      <p className="text-gray-400 text-sm">Voting Period:</p>
                      <p className="break-words text-sm sm:text-base">
                        {sampleReport.votingPeriod}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-xl flex-shrink-0">🗓️</span>
                    <div>
                      <p className="text-gray-400 text-sm">
                        ETA (execution time):
                      </p>
                      <p className="break-words text-sm sm:text-base">
                        {sampleReport.executionTime}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <span className="text-xl flex-shrink-0">🎯</span>
                    <div className="min-w-0 w-full">
                      <p className="font-semibold mb-2 text-sm sm:text-base">
                        Actions:
                      </p>
                      <ul className="space-y-1 list-decimal pl-6">
                        {sampleReport.actions.map((action, index) => (
                          <li
                            key={index}
                            className="text-xs sm:text-sm break-all"
                          >
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-2 mb-2 sm:mb-3">
                  <span className="text-xl flex-shrink-0">📊</span>
                  <p className="font-semibold text-sm sm:text-base">
                    Risk Assessment:
                  </p>
                </div>
                <ul className="space-y-1 list-disc pl-8 sm:pl-10">
                  {sampleReport.riskAssessment.map((risk, index) => (
                    <li key={index} className="text-xs sm:text-sm break-words">
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 justify-center">
                <Badge className="bg-[#0D1B3F] p-1.5 sm:p-2 text-sm sm:text-lg">
                  🟢 Verdict: {sampleReport.verdict}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
};

export default FoundProjects;
