import React from "react";
import Banner from "./components/Banner";
import Footer from "./components/footer/Footer";
import PostQuestions from "./components/postQuestions/PostQuestions";
import GetQuestions from "./components/GetQuestions";
import Price from "./components/price/Price";
import Roadmap from "./components/Roadmap";
import Forwhom from "./components/Forwhom";
import AboutProject from "./components/AboutProject";
import Advantages from "./components/advantages/Advantages";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import { Separator } from "@/components/ui/separator";

const page = () => {
  return (
    <div>
      <div className="top-0 w-full fixed desktop:static bg-white z-50">
        <div className="desktop:mx-20  tablet:mx-10 mx-5 pt-6 pb-3">
          <Navbar></Navbar>
        </div>
        <Separator></Separator>
      </div>

      <div className="flex flex-col gap-20 desktop:m-20 tablet:m-10 m-5">
        <div className="tablet:mt-24 mt-32 desktop:mt-0">
          <Hero></Hero>
        </div>
        <Advantages></Advantages>
        <AboutProject></AboutProject>
        <Forwhom></Forwhom>
        <Roadmap></Roadmap>
        <Price></Price>
        <GetQuestions></GetQuestions>
        <PostQuestions></PostQuestions>
        <Banner></Banner>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default page;
