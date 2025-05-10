import { CategoriesSection } from "@/components/categories-section";
import { FeaturedProposal } from "@/components/featured-proposal";
import { ProposalBanner } from "@/components/proposal-banner";
import { TopProposals } from "@/components/top-proposals";

const topProposals = [
  {
    id: "1",
    title: "LGBTQ+ Legal Support Fund",
    user: "Poma3",
    userImage: "/placeholder.svg?height=40&width=40&text=P3",
    userFallback: "P3",
    voted: false,
  },
  {
    id: "2",
    title: "Rights for Indigenous Voices",
    user: "Poma1",
    userImage: "/placeholder.svg?height=40&width=40&text=P1",
    userFallback: "P1",
    voted: true,
  },
  {
    id: "3",
    title: "Prison Reform Outreach",
    user: "Leinard",
    userImage: "/placeholder.svg?height=40&width=40&text=LD",
    userFallback: "LD",
    voted: true,
  },
  {
    id: "4",
    title: "JusticeTech Access Hubs",
    user: "Omope",
    userImage: "/placeholder.svg?height=40&width=40&text=OM",
    userFallback: "OM",
    voted: false,
  },
];

const Dashboard = () => {
  return (
    <main className="container mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ProposalBanner />
          <CategoriesSection />
        </div>
        <div className="space-y-6">
          <FeaturedProposal
            title="Legal Aid for Marginalized Youth"
            image="/placeholder.svg?height=200&width=400&text=Legal+Aid"
            daysLeft={5}
            requested="1,200 xDAI"
            category="Social Justice & Civil Rights"
            categoryLink="#"
          />
          <TopProposals proposals={topProposals} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
