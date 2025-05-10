import { Button } from "@/components/ui/button";

export function ProposalBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-[#0f1729] text-white">
      <div
        className="absolute inset-0 bg-cover bg-right"
        style={{
          backgroundImage: "url('/src/assets/make-proposal-bg-image.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/100 to-transparent" />
      <div className="relative z-10 flex flex-col justify-between p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-5xl font-bold tracking-tight">
              WANT TO
              <br />
              MAKE A
              <br />
              PROPOSAL?
            </h2>
          </div>
        </div>
        <Button className="mt-6 px-8 py-2 bg-blue-600 hover:bg-blue-700 rounded-md w-fit text-lg cursor-pointer">
          Explore now
        </Button>
      </div>
    </div>
  );
}
