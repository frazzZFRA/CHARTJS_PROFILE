import React from "react";
import Profile from "./day/cardTotalValue";
import App from "./day/trackPortFolio";

export default function Home() {
  return (
   <div className="relative flex flex-wrap items-center align-top justify-start bg-slate-800 rounded-md p-9">
                
                <Account/>Name Surname
                
                <ProfitLoss/>
                <div className="w-full height-10  ">
                 {/* <App/> */}
                </div>
                <CloseTokenAccount/>
                
            </div>
  );
}
