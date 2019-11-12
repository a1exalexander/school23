import React from "react";
import Meta from "./Meta";
import '../scss/styles.scss';
// import SNavigation from './navigation/SNavigation';

const Page = ({ children, title }) => {

  return (
    <>
      <Meta title={title}/>
      { children }
    </>
  );
};

export default Page;
