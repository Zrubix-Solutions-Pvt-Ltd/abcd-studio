import React, { Suspense } from "react";
import HeaderComponent from "./HeaderComponent";

export default  function Header (){
  return(
    <div>
      <Suspense>
        <HeaderComponent/>
      </Suspense>
    </div>
  )
}