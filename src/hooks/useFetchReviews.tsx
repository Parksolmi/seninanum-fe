import { useEffect, useState } from 'react';
import { instance } from '../api/instance';

const useFetchReviews = (profileId?: string) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [ratingCounts, setRatingCounts] = useState<any>({
    rating1: [0, 0, 0],
    rating2: [0, 0, 0],
  });
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const url = profileId ? `/review/${profileId}` : `/review`;
        const res = await instance.get(url);
        const { reviews, ratingCounts, totalReviews } = res.data;
        setReviews(reviews);
        setRatingCounts(ratingCounts);
        setTotalReviews(totalReviews);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [profileId]);

  return { reviews, ratingCounts, totalReviews };
};

export default useFetchReviews;
