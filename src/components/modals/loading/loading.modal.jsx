"use client"
import { useLoadingStore } from "@/zustand/useLoadingStore";
import css from "./loading.styles.module.css";
import { Oval } from "react-loader-spinner";

const Loading = () => {
   const { isLoading } = useLoadingStore();

  if (!isLoading) return null; 

  return (
    <>
     <div className="fixed inset-0 bg-white/90 z-[9999] flex items-center justify-center">
        <div className={css["loading-container"]}>
          <Oval
            height={50}
            width={50}
            color="#e8ede8"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#060606"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      <div className="flex flex-col items-center">
         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
         <p className="mt-4 font-bold uppercase tracking-widest">Loading...</p>
      </div>
    </div>
      
  
    </>
  );
};

export default Loading;
