import React from "react";
import Meta from "./Meta";
import SNavigation from './navigation/SNavigation';

const Page = ({ children, title }) => {

  return (
    <>
      <Meta title={title}/>
      <SNavigation/>
      { children }
    </>
  );
};

export default Page;
