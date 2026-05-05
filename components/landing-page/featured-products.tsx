import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import SectionHeader from "../common/section-header";
import { Button } from "../ui/button";
import Link from "next/link";
import ProductCard from "../products/product-card";


const featuredProducts = [
  {
    id: 1,
    name: "SOS Movies",
    description: "A Movie Recommendation App",
    tags: ["SaaS", "Movies", "Global"],
    votes: 201,
    isFeatured: true,
  },
  {
    id: 2,
    name: "SOS Amazon",
    description: "A Simple Amazon App",
    tags: ["SaaS", "B2B", "Global"],
    votes: 117,
    isFeatured: false,
  },
  {
    id: 3,
    name: "SOS Desserts",
    description: "A Simple Desserts Store",
    tags: ["Shopping", "Desserts", "B2B"],
    votes: 109,
    isFeatured: true,
  },
  {
    id: 4,
    name: "SOS Weathering",
    description: "A Simple Forecast App",
    tags: ["Forecast", "Global"],
    votes: 87,
    isFeatured: false,
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="wrapper">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title="Featured Today"
            icon={StarIcon}
            description="Top picks from our community this week"
          />
          <Button asChild variant={"outline"} className="hidden sm:flex">
            <Link href="/explore">
              View All
              <ArrowUpRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid-wrapper">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
