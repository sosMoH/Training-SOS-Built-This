import SectionHeader from "../common/section-header";
import { CalendarIcon, RocketIcon } from "lucide-react";
import ProductCard from "../products/product-card";
import EmptyState from "../common/empty-state";

const recentlyLaunchedProducts: any[] = [
  // {
  //   id: 1,
  //   name: "SOS Movies",
  //   description: "A Movie Recommendation App",
  //   tags: ["SaaS", "Movies", "Global"],
  //   votes: 201,
  //   isFeatured: true,
  // },
  // {
  //   id: 2,
  //   name: "SOS Amazon",
  //   description: "A Simple Amazon App",
  //   tags: ["SaaS", "B2B", "Global"],
  //   votes: 117,
  //   isFeatured: false,
  // },
  // {
  //   id: 3,
  //   name: "SOS Desserts",
  //   description: "A Simple Desserts Store",
  //   tags: ["Shopping", "Desserts", "B2B"],
  //   votes: 109,
  //   isFeatured: true,
  // },
  // {
  //   id: 4,
  //   name: "SOS Weathering",
  //   description: "A Simple Forecast App",
  //   tags: ["Forecast", "Global"],
  //   votes: 87,
  //   isFeatured: false,
  // },
];

export default function RecentlyLaunchedProducts() {
  return (
    <section className="py-20">
      <div className="wrapper">
        <SectionHeader
          title="Recently Launched"
          icon={RocketIcon}
          description="Discover the latest products from our community"
        />
        {recentlyLaunchedProducts.length > 0 ? (
          <div className="grid-wrapper">
            {recentlyLaunchedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            message="No products launched in the last week. Check back soon for new launches."
            icon={CalendarIcon}
          />
        )}
      </div>
    </section>
  );
}
