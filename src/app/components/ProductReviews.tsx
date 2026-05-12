import { useState } from "react";
import { motion } from "motion/react";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  brewMethod?: string;
}

interface ProductReviewsProps {
  productId: string;
}

// Mock reviews data
const mockReviews: Record<string, Review[]> = {
  "ethiopian-yirgacheffe": [
    {
      id: "1",
      author: "Doğrulanmış müşteri",
      rating: 5,
      date: "2026-05-01",
      comment: "V60 ile harika bir fincan elde ettim. Çiçeksi notalar tam anlatıldığı gibi. Kesinlikle tavsiye ederim!",
      helpful: 12,
      brewMethod: "V60"
    },
    {
      id: "2",
      author: "Doğrulanmış müşteri",
      rating: 4,
      date: "2026-04-28",
      comment: "Çok güzel bir kahve ama beklentim biraz daha yüksekti. Yine de kaliteli.",
      helpful: 5,
      brewMethod: "Chemex"
    },
    {
      id: "3",
      author: "Doğrulanmış müşteri",
      rating: 5,
      date: "2026-04-25",
      comment: "En sevdiğim kahvelerden biri. Narenciye notaları muhteşem!",
      helpful: 8,
      brewMethod: "Espresso"
    }
  ],
  "colombia-supremo": [
    {
      id: "4",
      author: "Doğrulanmış müşteri",
      rating: 5,
      date: "2026-05-03",
      comment: "Dengeli ve yumuşak. Sabah kahvem için ideal.",
      helpful: 6,
      brewMethod: "French Press"
    },
    {
      id: "5",
      author: "Doğrulanmış müşteri",
      rating: 4,
      date: "2026-04-30",
      comment: "Güzel ama biraz fazla hafif geldi bana.",
      helpful: 3,
      brewMethod: "Espresso"
    }
  ]
};

export function ProductReviews({ productId }: ProductReviewsProps) {
  const reviews = mockReviews[productId] || [];
  const [helpfulClicks, setHelpfulClicks] = useState<Set<string>>(new Set());

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 : 0
  }));

  const handleHelpful = (reviewId: string) => {
    setHelpfulClicks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) => {
    const starSize = size === "lg" ? "w-6 h-6" : "w-4 h-4";
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating ? "fill-[var(--gold)] text-[var(--gold)]" : "text-gray-300"
            }`}
            strokeWidth={1.5}
          />
        ))}
      </div>
    );
  };

  if (reviews.length === 0) {
    return (
      <div className="mt-12 p-12 bg-[var(--cream)] rounded-[var(--radius-2xl)] border border-[var(--border)] text-center">
        <MessageCircle className="w-12 h-12 text-[var(--muted-foreground)] mx-auto mb-4" strokeWidth={1.5} />
        <h3 className="mb-2 text-[var(--espresso)]">Henüz Değerlendirme Yok</h3>
        <p className="text-[var(--muted-foreground)]">
          Bu ürün için ilk değerlendirmeyi siz yapın!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-8 relative">
      {/* Rating Summary */}
      <div className="bg-white rounded-[var(--radius-2xl)] p-8 border border-[var(--border)]" style={{ boxShadow: "var(--shadow-md)" }}>
        <h3 className="mb-6 text-[var(--espresso)]">Müşteri Değerlendirmeleri</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl font-serif font-medium text-[var(--espresso)]">
                {averageRating.toFixed(1)}
              </div>
              <div>
                <StarRating rating={Math.round(averageRating)} size="lg" />
                <p className="text-sm text-[var(--muted-foreground)] mt-1">
                  {reviews.length} değerlendirme
                </p>
              </div>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {ratingCounts.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm text-[var(--espresso)]">{rating}</span>
                  <Star className="w-3 h-3 fill-[var(--gold)] text-[var(--gold)]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 h-2 bg-[var(--cream)] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--gold)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, delay: rating * 0.1 }}
                  />
                </div>
                <span className="text-sm text-[var(--muted-foreground)] w-8">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[var(--radius-2xl)] p-6 border border-[var(--border)]"
            style={{ boxShadow: "var(--shadow-sm)" }}
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-[var(--espresso)]">{review.author}</h4>
                  {review.brewMethod && (
                    <span className="px-3 py-1 bg-[var(--cream)] text-xs text-[var(--espresso)] rounded-full border border-[var(--border)]">
                      {review.brewMethod}
                    </span>
                  )}
                </div>
                <StarRating rating={review.rating} />
              </div>
              <span className="text-sm text-[var(--muted-foreground)]">
                {new Date(review.date).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            {/* Review Content */}
            <p className="text-[var(--muted-foreground)] mb-4" style={{ lineHeight: "var(--leading-relaxed)" }}>
              {review.comment}
            </p>

            {/* Helpful Button */}
            <button
              onClick={() => handleHelpful(review.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                helpfulClicks.has(review.id)
                  ? "bg-[var(--espresso)] text-white border-[var(--espresso)]"
                  : "bg-white text-[var(--espresso)] border-[var(--border)] hover:border-[var(--espresso)]/40"
              }`}
            >
              <ThumbsUp className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm">
                Faydalı ({review.helpful + (helpfulClicks.has(review.id) ? 1 : 0)})
              </span>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
