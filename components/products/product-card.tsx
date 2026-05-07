import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { ChevronDownIcon, ChevronUpIcon, Ghost, StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { InferSelectModel } from "drizzle-orm";
import { products } from "@/db/schema";
import VotingButtons from "./voting-buttons";

// export interface Product {
//   id: number;
//   name: string;
//   description: string;
//   tags: string[];
//   votes: number;
//   isFeatured: boolean;
// }

type Product = InferSelectModel<typeof products>

interface ProductCardProps {
  product: Product;
}


export default function ProductCard({ product }: ProductCardProps) {
  const hasVoted = false;

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group card-hover hover:bg-primary-foreground/10 border-solid border-gray-400 border-2 min-h-[150px]">
        <CardHeader className="flex-1">
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                {product.voteCount > 80 && (
                  <Badge className="gap-1 bg-primary text-primary-foreground">
                    <StarIcon className="size-4 fill-current" /> Featured
                  </Badge>
                )}
              </div>
              <CardDescription>{product.description}</CardDescription>
            </div>
            {/* Voting Buttons */}
            <VotingButtons productId={product.id} voteCount={product.voteCount} hasVoted={hasVoted} />
          </div>
        </CardHeader>
        <CardFooter>
          <div className="flex items-center gap-2">
            {product.tags?.map((tag) => (
              <Badge key={tag} variant={"secondary"}>
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
