
import React from "react";
import ResponsiveAppBar from "../components/header/ResponsiveAppBar"; 
import Album from "../components/album/Album";
import AccordionUsage from "../components/question/AccordionUsage";
import FastMarquee from "../components/running-line/FastMarquee";
import ScrollToTopButton from "../ScrollToTop";
function HomePage() {
  return (
    <div>
      <ResponsiveAppBar />
      <ScrollToTopButton />
      <FastMarquee />
      <AccordionUsage />
      <Album />
    </div>
  );
}

export default HomePage;
