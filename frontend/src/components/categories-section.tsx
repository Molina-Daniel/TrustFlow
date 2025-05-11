import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProposalCard } from "@/components/proposal-card";

const categories = [
  {
    title: "Social Justice & Civil Rights",
    image: "/src/assets/category-1.png",
    count: 150,
    users: [
      { image: "/src/assets/user-1.jpg", fallback: "U1" },
      { image: "/src/assets/user-2.jpg", fallback: "U2" },
      { image: "/src/assets/user-3.jpg", fallback: "U3" },
    ],
  },
  {
    title: "Inclusion & Disability",
    image: "/src/assets/category-2.png",
    count: 20,
    users: [
      { image: "/src/assets/user-4.jpg", fallback: "U4" },
      { image: "/src/assets/user-5.jpg", fallback: "U5" },
      { image: "/src/assets/user-6.jpg", fallback: "U6" },
    ],
  },
  {
    title: "Women & Equal Opportunity",
    image: "/src/assets/category-3.jpg",
    count: 30,
    users: [
      { image: "/src/assets/user-5.jpg", fallback: "U5" },
      { image: "/src/assets/user-6.jpg", fallback: "U6" },
      { image: "/src/assets/user-7.jpg", fallback: "U7" },
    ],
  },
];

export function CategoriesSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Categories</h2>
        <Button
          variant="outline"
          className="cursor-pointer rounded-lg bg-[#0D1B3F] border-none px-8 py-6 text-white text-lg font-medium shadow-[0_0_10px_rgba(34,67,212,0.5)] hover:shadow-[0_0_30px_rgba(34,67,212,0.7)]"
        >
          Categories <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <ProposalCard
            key={category.title}
            title={category.title}
            category={category.title}
            image={category.image}
            count={category.count}
            users={category.users}
          />
        ))}
      </div>
    </div>
  );
}
