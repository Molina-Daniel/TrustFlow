import { CategoriesSection } from "@/components/categories-section";
import { FeaturedProposal } from "@/components/featured-proposal";
import { ProposalBanner } from "@/components/proposal-banner";
import { TopProposals } from "@/components/top-proposals";

const topProposals = [
  {
    id: "1",
    title: "LGBTQ+ Legal Support Fund",
    user: "Poma3",
    userImage: "/src/assets/top-proposal-1.jpg",
    userFallback: "P3",
    voted: false,
  },
  {
    id: "2",
    title: "Rights for Indigenous Voices",
    user: "Poma1",
    userImage: "/src/assets/top-proposal-2.png",
    userFallback: "P1",
    voted: true,
  },
  {
    id: "3",
    title: "Prison Reform Outreach",
    user: "Leinard",
    userImage: "/src/assets/top-proposal-1.jpg",
    userFallback: "LD",
    voted: true,
  },
  {
    id: "4",
    title: "JusticeTech Access Hubs",
    user: "Omope",
    userImage: "/src/assets/top-proposal-2.png",
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
            image="/src/assets/featured-proposal.jpg"
            daysLeft={5}
            requested="1,200"
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
