export const computeMedianCustomersThatRecommendProduct = (itemReviews) => {
    let ans = 0;
    itemReviews.forEach((review) => {
        if(review.stars >= 4)
            ans++
    })
    return Math.floor((ans * 100) / itemReviews.length);
}