import { create } from "zustand";

export const useProductStore = create((set, get) => ({
  product: null,
  productStarRatingInfo: null,

  productImgPopUp: { open: false, currentImg: 0 },
  reviewImgPopUp: { open: false, selectedReview: 0, selectedReviewImg: 0 },

  setProduct: (productData) => {
    const info = calculateStarRatingPercentages(productData?.reviews || []);
    set({ product: productData, productStarRatingInfo: info });
  },

  setProductImgPopUp: (status) =>
    set((state) => ({
      productImgPopUp: { ...state.productImgPopUp, ...status },
    })),

  setReviewImgPopUp: (status) =>
    set((state) => ({
      reviewImgPopUp: { ...state.reviewImgPopUp, ...status },
    })),
}));

function calculateStarRatingPercentages(reviews) {
  if (!reviews || !reviews.length) return null;
}
