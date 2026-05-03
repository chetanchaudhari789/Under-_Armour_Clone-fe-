import BackShadow from "../../back-shadow/back-shadow.component";
import Divider from "../../divider/divider.component";
import css from "./bag.styles.module.css";
import ConfirmActionModal from "../confirm-action/confirm-action.modal";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useBagStore } from "@/zustand/useBagStore";

const BagModalComp = () => {
  const {
     bag, totalItems, subTotal,
    removeItemFromBag,
  } = useBagStore();

  const [confirmActionRenderDetails, setConfirmActionRenderDetails] = useState({
    actionItem: undefined,
    render: false,
  });

  const actionMsg = "Are you sure you want to remove this item?";

  const rejectAction = () => {
    setConfirmActionRenderDetails({
      actionItem: undefined,
      render: false,
    });
  };

  const confirmAction = () => {
    removeItemFromBag(confirmActionRenderDetails.actionItem);
    setConfirmActionRenderDetails({
      actionItem: undefined,
      render: false,
    });
  };

  return (
    <div
      className={css["hover-container"]}
      data-modal="bag-modal"
      style={{ display: bag.length ? "" : "none" }}
    >
      <div className={css["hover-content"]}>
        <div className={css["bag-title"]}>
          <div>
            <span>
              Your bag (
              {totalItems <= 1 ? `${bag.length} Item` : `${totalItems}  Items`})
            </span>
          </div>
          <Divider marginBottom={"0"} marginTop="1rem" />
        </div>
        <div className={css["bag-content"]}>
          <div className={css["bag-items"]}>
            {bag.map((item, i) => (
              <div className={css["bag-item"]} key={i}>
                <div className={css["bag-item-top"]}>
                  <div>
                    <Link
                      href={`/p/${item.category}/${item.subcategory}/${item.id}?c=${item.color}`}
                    >
                      <img src={item.img} alt="product" />
                    </Link>
                  </div>
                  <div className={css["item-info"]}>
                    <div>
                      <span>{item.title}</span>
                    </div>
                    <div>
                      <div>
                        <span>Color : {item.color}</span>
                      </div>
                      <div>
                        <span>Size : {item.size}</span>
                      </div>
                      <div>
                        <span>Qty : {item.qty}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={css["bag-item-bottom"]}>
                  <div>
                    <span
                      onClick={() =>
                        setConfirmActionRenderDetails({
                          actionItem: item,
                          render: true,
                        })
                      }
                      style={{ cursor: "pointer" }}
                    >
                      Remove
                    </span>
                  </div>
                  <div>
                    <span>{item.priceTotal}</span>
                  </div>
                </div>
                <Divider marginBottom="0" marginTop="1rem" />
              </div>
            ))}
          </div>
          <div></div>
        </div>
        <div className={css["bag-next"]}>
          <div className={css["subtotal"]}>
            <div>Estimated Subtotal ({totalItems}) :</div>
            <div>{subTotal}</div>
          </div>
          <Link href="/cart">View Bag&Checkout</Link>
        </div>
      </div>
      {confirmActionRenderDetails.render ? (
        <ConfirmActionModal
          actionMsg={actionMsg}
          rejectText={"Nevermind"}
          confirmText={"Remove Item"}
          rejectAction={rejectAction}
          confirmAction={confirmAction}
        />
      ) : null}
    </div>
  );
};

const BagModal = () => {
  const { bag,
      totalItems } = useBagStore();
  return (
    <>
      {totalItems ? (
        <>
          <BackShadow
            trigger={"bag-modal"}
            className={css["back-shadow"]}
            closeOnBackgroundHover={true}
          >
            <BagModalComp bag={bag} />
          </BackShadow>
        </>
      ) : null}
    </>
  );
};

export default dynamic(() => Promise.resolve(BagModal), {
  ssr: false,
});
