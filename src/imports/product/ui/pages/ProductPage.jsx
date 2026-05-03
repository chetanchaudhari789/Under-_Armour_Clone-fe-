"use client"
import Type_1ProductTeaserComponent from "@/imports/product/ui/componets/product-teaser/type_1/type_1-product-teaser.component";
import Type_2ProductTeaserComponent from "@/imports/product/ui/componets/product-teaser/type_2/type_2-product-teaser.component";
import React, { useEffect, useState } from "react";
import css from "./ua-product.styles.module.css";
import ProductImgModal from "@/imports/product/ui/componets/product-img-modal/product-img-modal.component";
import { useContext } from "react";
import { ProductContext } from "@/shared/context/product.context";
import Divider from "@/components/divider/divider.component";
import ProductHeader from "@/imports/product/ui/componets/product-header/product-header.component";
import {
  ColorOptions,
  FitGuide,
  Offer,
  Price,
  Sizes,
  Shipment,
  ProductQty,
  WhatDoesItDo,
  AthInfo,
  DesktopImgs,
  ProductPrimaryImage,
} from "@/imports/product/ui/componets/product-specs/product-specs.component";
import ProductCarousel from "@/imports/product/ui/componets/product-carousel/product-carousel.component";
import ProductAddToBag from "@/imports/product/ui/componets/product-add-to-bag/product-add-to-bag.component";
import ProductCharacteristics from "@/imports/product/ui/componets/product-characteristics/product-characteristics.component";
import {
  DNA,
  FitAndCare,
  Specs,
} from "@/imports/product/ui/componets/product-extendable-text/product-extendable-text.component";
import {
  RateUs,
  FreeReturnsAndExchange,
} from "@/imports/product/ui/componets/product-mics/product-mics.component";
import ProductReviewsSection from "@/imports/product/ui/componets/product-reviews-section/product-reviews-section.component";
import ProductReviewImgModal from "@/imports/product/ui/componets/product-review-img-modal/product-review-img-modal.component";
import ProductRecommended from "@/imports/product/ui/componets/product-recommended/product-recommended.component";
import { useRouter } from "next/router";
import ProductContextProvider from "@/shared/context/product.context";
import ReviewContextProvider from "@/shared/context/review-img.context";
import { useParams, useSearchParams } from "next/navigation";
import { useBagStore } from "@/zustand/useBagStore";

const ProductPage = ({ initialProduct }) => {
  return (
    <ProductContextProvider products={initialProduct}>
      <ReviewContextProvider>
        <ProductComp />
      </ReviewContextProvider>
    </ProductContextProvider>
  );
};

const ProductComp = () => {
  const params = useParams();
  const { productImgPopUpHandler, category, subcategory} =
    useContext(ProductContext);
  
  const item = useContext(ProductContext) 

const { dispatch } = useBagStore();
  const searchParams = useSearchParams();

  const {
    colorOptions,
    fullName,
    athInfo,
    explanation,
    dna,
    specs,
    fitAndCare,
    teaser,
    reviews,
    qAndA,
    id,
    isNew,
  } = item;

  const { openImg: openProductImg } = productImgPopUpHandler;

  const queryColor = searchParams.get('c');
  const [addToBagItem, setAddToBagItem] = useState({
    item: {
      id: params.id || id,
      title: fullName,
      color: getColor(colorOptions, queryColor),
      get size() {
        for (const size of colorOptions[this.color].colorProps.sizes) {
          if (size.available) return size.name;
        }
      },
      qty: 1,
      get img() {
        return colorOptions[this.color].colorProps.imgs[0];
      },
      category: category,
      subcategory: subcategory,
      get colorName() {
        return colorOptions[this.color].name;
      },
      get price() {
        return colorOptions[this.color].colorProps.price;
      },
      get sku() {
        return colorOptions[this.color].sku;
      },
    },
    shipment: "ship",
  });

  
  useEffect(() => {
    addToBagItem.item.color = getColor(colorOptions, queryColor);
  }, [queryColor]);

  const {
    setSelectedColor,
    setSelectedQty,
    setSelectedShipmentType,
    setSelectedSize,
  } = new addToBagItemHandler(setAddToBagItem, item);

  const addToBag = () =>
    dispatch({ type: "ADD_TO_BAG", payload: addToBagItem });

  const {
    item: { color: selectedColor, size: selectedSize, qty: selectedQty },
    shipment: selectedShipmentType,
  } = addToBagItem;

  const currentItem = colorOptions[selectedColor].colorProps;
  return (
    <>
      <div className={css["product-container"]}>
        <div className={css["top"]}>
          <ProductPrimaryImage
            img={currentItem.imgs[0]}
            openProductImg={openProductImg}
            isNew={isNew}
            athInfo={athInfo}
            imgCount={currentItem.imgs.length}
            video={colorOptions[selectedColor].video}
          />
          <div>
            <ProductHeader
              category={category}
              subcategory={subcategory}
              fullName={fullName}
              price={currentItem.price}
              klarna={currentItem.klarna}
            />
            <ProductCarousel
              imgs={currentItem.imgs}
              isNew={isNew}
              video={colorOptions[selectedColor].video}
            />
            <AthInfo athInfo={athInfo} />

            <div className={css["product-specs"]}>
              <Divider marginBottom="1rem" />
              <ColorOptions
                colorOptions={colorOptions}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                category={category}
                subCategory={subcategory}
                id={id}
              />
              <Divider className={"sm-dt-hide"} marginBottom="1rem" />
              <Price price={currentItem.price} addiClassName={"sm-dt-hide"} />
              <Offer klarna={currentItem.klarna} addiClassName={"sm-dt-hide"} />
              <Divider className={"sm-dt-hide"} marginBottom="1rem" />
              <Sizes
                sizes={currentItem.sizes}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
              <FitGuide fit={currentItem.fit} />
              <Divider marginBottom="1rem" />
              <Shipment
                selectedShipmentType={selectedShipmentType}
                setSelectedShipmentType={setSelectedShipmentType}
              />
              <Divider />
              <div className={css["user-action"]}>
                <ProductQty
                  selectedQty={selectedQty}
                  setSelectedQty={setSelectedQty}
                />
                <ProductAddToBag
                  addToBag={addToBag}
                  addToBagItem={addToBagItem}
                  fullName={fullName}
                  price={currentItem.price}
                />
              </div>
              <Divider marginBottom="0" />
              <FreeReturnsAndExchange />
              <Divider />
              <WhatDoesItDo explanation={explanation} />

              <ProductCharacteristics item={item} />

              <Divider className="sm-dt-hide" marginBottom="1rem" />
              <DNA iterableText={dna} className="sm-dt-hide" />
              <Divider className="sm-dt-hide" marginBottom="1rem" />
              <Specs iterableText={specs} className="sm-dt-hide" />
              <Divider className="sm-dt-hide" marginBottom="1rem" />
              <FitAndCare iterableText={fitAndCare} className="sm-dt-hide" />
              <Divider className="sm-dt-hide" marginBottom="1rem" />
              <RateUs />
            </div>
            {teaser ? (
              <div className={`${css["teaser-wrapper"]} sm-dt-hide`}>
                <Type_1ProductTeaserComponent teaser={teaser.type_1[0]} />
                <Type_2ProductTeaserComponent
                  teaser={teaser.type_2[0]}
                  reversed={true}
                />
                <div
                  className={`${css["video-wrapper"]} sm-dt-hide`}
                  style={{ marginBottom: "1rem" }}
                >
                  <video
                    preload="auto"
                    autoPlay
                    playsInline
                    loop
                    muted
                    src={`videos/${id}/mb-teaser-video.mp4`}
                  ></video>
                </div>
                <div></div>
                <Type_2ProductTeaserComponent teaser={teaser.type_2[1]} />
                <Type_2ProductTeaserComponent
                  teaser={teaser.type_2[2]}
                  reversed={true}
                />
              </div>
            ) : null}
          </div>
        </div>
        <DesktopImgs imgs={currentItem.imgs} openProductImg={openProductImg} />
        {teaser ? (
          <div className={`${css["teaser-wrapper"]} sm-dt-show`}>
            <Type_1ProductTeaserComponent teaser={teaser.type_1[0]} />
            <Type_2ProductTeaserComponent
              teaser={teaser.type_2[0]}
              reversed={true}
            />
            <div className={css["video-wrapper"]}>
              <video
                preload="auto"
                autoPlay
                playsInline
                loop
                muted
                poster={`imgs/${id}/poster.webp`}
                src={`videos/${id}/dt-teaser-video.mp4`}
              ></video>
            </div>
            <Type_2ProductTeaserComponent teaser={teaser.type_2[1]} />
            <Type_2ProductTeaserComponent
              teaser={teaser.type_2[2]}
              reversed={true}
            />
            <Divider marginBottom={0} />
          </div>
        ) : null}

        <ProductRecommended />
        <ProductReviewsSection reviews={reviews} qAndA={qAndA} />

        <Divider marginBottom={0} />

        <ProductImgModal imgs={currentItem.detailedReviewImgs} />
        <ProductReviewImgModal />
      </div>
    </>
  );
};

const getColor = (colorOptions, queryColor) =>
  Object.keys(colorOptions).find((c) => {
    return c === queryColor;
  }) || 0;


class addToBagItemHandler {
  constructor(setState, item) {
    this.setSelectedColor = function (payload) {
      setState((prev) => ({
        ...prev,
        item: {
          ...prev.item,
          color: payload,
          colorName: item.colorOptions[payload].name,
          img: item.colorOptions[payload].colorProps.imgs[0],
          sku: item.colorOptions[payload].sku,
        },
      }));
    };
    this.setSelectedSize = function (payload) {
      setState((prev) => ({ ...prev, item: { ...prev.item, size: payload } }));
    };
    this.setSelectedQty = function (payload) {
      setState((prev) => ({ ...prev, item: { ...prev.item, qty: payload } }));
    };
    this.setSelectedShipmentType = function (payload) {
      setState((prev) => ({ ...prev, shipment: payload }));
    };
  }
}


export default ProductPage;
