import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useState } from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import touristByCar from "@/assets/images/Tourists by car.json";

interface IDivision {
  _id: string;
  name: string;
}

const HeroSection = () => {
  const [selectedDivision, setSelectedDivision] = useState<string>();

  const { data: divisionData, isLoading: divisionIsLoading } =
    useGetDivisionsQuery(undefined);

  const divisionOption =
    divisionData?.map((item: IDivision) => ({
      label: item.name,
      value: item._id,
    })) ?? [];

  return (
    <section className="relative overflow-hidden py-20 min-h-screen flex flex-col items-center">
      {/* Hero Background Lottie */}
      <div className="w-full">
        <Lottie
          animationData={touristByCar}
          loop
          autoplay
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto mt-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            {/* Logo */}
            <div className="px-4 backdrop-blur-sm">
              <Logo />
            </div>

            {/* Title + Subtitle */}
            <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight lg:text-5xl">
                Explore the beauty of{" "}
                <span className="text-primary">Bangladesh</span>
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Discover breathtaking destinations, plan your dream trip, and
                enjoy unforgettable experiences across Bangladesh.
              </p>
            </div>

            {/* Division Select + Button */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Select
                onValueChange={(value) => setSelectedDivision(value)}
                disabled={divisionIsLoading}
              >
                <SelectTrigger className="w-[300px] rounded-none">
                  <SelectValue placeholder="Select a Division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Divisions</SelectLabel>
                    {divisionOption.map(
                      (item: { label: string; value: string }) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {selectedDivision ? (
                <Button className="rounded-none" asChild>
                  <Link to={`/tours?division=${selectedDivision}`}>Search</Link>
                </Button>
              ) : (
                <Button className="rounded-none" disabled>
                  {divisionIsLoading ? "Loading..." : "Search"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
