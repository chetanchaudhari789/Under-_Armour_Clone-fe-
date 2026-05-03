import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBagStore = create(
  persist(
    (set, get) => ({
      bag: [],
      subTotal: 0,
      totalItems: 0,

      addItemToBag: (newItem) => {
        const { bag } = get();

        const existingItemIndex = bag.findIndex(
          (item) =>
            item.id === newItem.id &&
            item.color === newItem.color &&
            item.size === newItem.size,
        );

        let updatedBag;
        if (existingItemIndex !== -1) {
          updatedBag = [...bag];
          updatedBag[existingItemIndex].qty += newItem.qty;
        } else {
          updatedBag = [...bag, newItem];
        }

        set({ bag: updatedBag });
        get().calculateTotals();
      },

      removeItemFromBag: (itemToRemove) => {
        const updatedBag = get().bag.filter(
          (item) =>
            !(
              item.id === itemToRemove.id &&
              item.color === itemToRemove.color &&
              item.size === itemToRemove.size
            ),
        );
        set({ bag: updatedBag });
        get().calculateTotals();
      },

      setCustomQty: (payload) => {
        if (!payload || (!payload.item && !payload.id)) return;

        const targetItem = payload.item || payload;
        const newQty =
          payload.qty || payload.qty === 0 ? payload.qty : targetItem.qty;

        const updatedBag = get().bag.map((item) => {
          if (
            item.id === targetItem.id &&
            item.color === targetItem.color &&
            item.size === targetItem.size
          ) {
            return { ...item, qty: newQty };
          }
          return item;
        });

        set({ bag: updatedBag });
        get().calculateTotals();
      },

      calculateTotals: () => {
        const { bag } = get();

        const subTotal = bag.reduce((acc, item) => {
          const price =
            typeof item.price === "string"
              ? parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
              : item.price;
          return acc + price * item.qty;
        }, 0);

        const totalItems = bag.reduce((acc, item) => acc + item.qty, 0);
        set({ subTotal, totalItems });
      },

      dispatch: (action) => {
        const { type, payload } = action;
        if (type === "ADD_TO_BAG") get().addItemToBag(payload.item);
        if (type === "REMOVE_FROM_BAG") get().removeItemFromBag(payload.item);
        if (type === "SET_CUSTOM_QTY") get().setCustomQty(payload);
      },
    }),
    {
      name: "ua-bag-storage",
    },
  ),
);
