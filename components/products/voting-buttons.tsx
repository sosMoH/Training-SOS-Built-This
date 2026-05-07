"use client";

import { ChevronDownIcon, ChevronUpIcon, Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  downVoteProductAction,
  upVoteProductAction,
} from "@/lib/products/product-actions";
import { useOptimistic, useTransition } from "react";

interface VotingButtonsProps {
  hasVoted: boolean;
  voteCount: number;
  productId: number;
}

export default function VotingButtons({
  hasVoted,
  voteCount: initialVoteCount,
  productId,
}: VotingButtonsProps) {
  // To Instant Increment/Decrement Vote Count
  const [optimisticVoteCount, setOptimisticVoteCount] = useOptimistic(
    initialVoteCount,
    (currentCount, change: number) => Math.max(0, currentCount + change),
  );

  // Transition Hook, render part of UI
  const [isPending, startTransition] = useTransition();

  const handleUpvote = async () => {
    startTransition(async () => {
      setOptimisticVoteCount(1);
      await upVoteProductAction(productId);
    });
  };
  const handleDownvote = async () => {
    startTransition(async () => {
      setOptimisticVoteCount(-1);
      await downVoteProductAction(productId);
    });
  };

  return (
    <div
      className="flex flex-col items-center gap-1 shrink-0"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Button
        onClick={handleUpvote}
        variant={"ghost"}
        size={"icon-sm"}
        disabled={isPending}
        className={cn(
          "h-8 w-8 text-primary",
          hasVoted
            ? "bg-primary/10 hover:text-primary hover:bg-primary/20"
            : "hover:bg-primary/10 hover:text-primary",
        )}
      >
        <ChevronUpIcon className="size-5" />
      </Button>
      <span className="text-sm font-semibold transition-colors text-foreground">
        {optimisticVoteCount}
      </span>
      <Button
        onClick={handleDownvote}
        variant={"ghost"}
        size={"icon-sm"}
        disabled={isPending}
        className={cn(
          "h-8 w-8 text-primary hover:text-destructive",
          hasVoted
            ? "hover:bg-destructive/30"
            : "opacity-50 cursor-not-allowed",
        )}
      >
        <ChevronDownIcon className="size-5" />
      </Button>
    </div>
  );
}
