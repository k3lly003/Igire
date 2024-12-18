"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import React, { useEffect, useRef } from "react";

export default function Home() {
  const [loadingTweet1, setLoadingTweet1] = useState(true);
  const [loadingTweet2, setLoadingTweet2] = useState(true);
  const [loadingTweet3, setLoadingTweet3] = useState(true);

  //news feed scroll hook
  const redBorderDivRef = useRef(null);

  useEffect(() => {
    const handleScroll = (event) => {
      const scrollPosition = redBorderDivRef.current.scrollTop;
      console.log("Scroll position:", scrollPosition);
    };

    const redBorderDiv = redBorderDivRef.current;
    if (redBorderDiv) {
      redBorderDiv.addEventListener("scroll", handleScroll);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (redBorderDiv) {
        redBorderDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center w-full">
        {/* HERO SECTION */}
        <div className="bg-gradient-to-r from-white">
          <div
            className="relative w-full h-[30rem] tablet:h-[40rem] laptop:h-[43rem] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/hero.png)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-gray-900 via-white dark:via-gray-900 to-transparent"></div>
            <div className="flex flex-col items-start absolute inset-0 justify-center px-4 gap-5 tablet:px-8 laptop:px-[126px] text-[#0B3004] dark:text-white">
              <h1 className="text-[24px] tablet:text-[32px] laptop:text-[50px] font-bold">
                Igire Rwanda Organization
              </h1>
              <p className="text-[14px] tablet:text-md laptop:text-xl mt-[38px]">
                Empowering the youth to achieve self-reliance
              </p>
              <Button variant="default" className="mt-10 text-white dark:text-[#1a4611]">
                Learn more
              </Button>
            </div>
          </div>
        </div>
        {/* End of Hero section */}
      </div>
      <div>
        {/* About Section */}
        <div className="flex flex-col gap-[40px] pt-[40px] laptop:pt-[101px] px-4 tablet:px-8 laptop:px-[126px]">
          <div className="flex justify-center">
            <h1 className="text-[24px] font-bold">About</h1>
          </div>

          <div className="flex flex-col gap-[30px] dark:text-black">
            <div
              className="flex flex-col p-4 tablet:p-8 laptop:px-[82px] laptop:py-[37px] dark:text-white border border-[#F79E1B] 
              transition ease-in-out delay-150 duration-300 transform hover:scale-105 hover:shadow-lg gap-4 tablet:gap-6 laptop:gap-[1.5rem]"
            >
              <div className="flex justify-center gap-[40px] tablet:justify-start">
                <Image src="/vision.png" alt="Vision" width={34} height={12} className="dark:bg-white dark:p-2 dark:rounded-full"/>
                <p className="text-[24px] font-semibold">Vision</p>
              </div>
              <div>
                <p className="text-[12px] tablet:text-[14px] laptop:text-[18px] text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmodLorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmodLorem ipsum dolor
                  sit amet, consectetur adipiscing elit, sed do eiusmodLorem
                  ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod
                </p>
              </div>
            </div>

            <div
              className="flex flex-col p-4 tablet:p-8 laptop:px-[82px] laptop:py-[37px] dark:text-white border border-[#F79E1B] 
              transition ease-in-out delay-150 duration-300 transform hover:scale-105 hover:shadow-lg gap-4 tablet:gap-6 laptop:gap-[1.5rem]"
            >
              <div className="flex justify-center gap-[40px] tablet:justify-start">
                <Image
                  src="/mission.png"
                  alt="Mission"
                  width={30}
                  height={12}
                  className=" dark:bg-white dark:p-1 dark:rounded-full"
                />
                <p className="text-[24px] font-semibold">Mission</p>
              </div>
              <div>
                <p className="text-[12px] tablet:text-[14px] laptop:text-[18px] text-center font-light">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmodLorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmodLorem ipsum dolor
                  sit amet, consectetur adipiscing elit, sed do eiusmodLorem
                  ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* End of About Section */}

        {/* Program Section */}
        <div className="flex flex-col gap-[40px] py-[40px] laptop:py-[101px] px-4 tablet:px-8 laptop:px-[126px]">
          <div className="flex justify-center">
            <h1 className="text-[24px] font-bold">Programs</h1>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 transition ease-in-out delay-150">
            <p className="font-SemiBold text-[18px]">
              Unlock your potential with our cutting-edge programs
            </p>
            <p className="w-full max-w-[21rem] tablet:max-w-[28rem] laptop:max-w-[32rem] desktop:max-w-[36rem]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmodLorem ipsum dolor sit amet,
            </p>
          </div>

          <div className="flex flex-col justify-center laptop:flex-row tablet:flex-col">
            <div className=" py-10 border border-[#F79E1B] px-10">
              <div className="flex flex-col items-center gap-5 transition ease-in-out delay-150 duration-300 transform hover:scale-105">
                <Image
                  src="/sheCanCode.png"
                  alt="She Can Code"
                  width={206}
                  height={12}
                />
                <p className="flex text-center font-semibold">
                  Train the next generation in <br></br>software developemnt
                </p>
                <p className="flex text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmodLor
                </p>
              </div>
            </div>
            <div>
              <div className=" py-10 border border-[#F79E1B] px-10">
                <div className="flex flex-col items-center gap-5 transition ease-in-out delay-150 duration-300 transform hover:scale-105">
                  <Image
                    src="/programs.jpg"
                    alt="Programs"
                    width={221}
                    height={4}
                  />

                  <p className="flex text-center font-bold">
                    Train the next generation in <br></br>software developemnt
                  </p>
                  <p className="flex text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmodLorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmodLor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End of programs section */}

        {/* Latest News Section */}
        <div className="flex flex-col items-center justify-center gap-8 px-4 tablet:px-6 laptop:px-[126px] pb-10">
          <div>
            <h1 className="text-[24px] font-bold text-center laptop:text-left">
              Latest News
            </h1>
          </div>
          <div className="flex gap-10">
            <div className="flex justify-center items-center">
              <div
                className="flex flex-col items-center gap-10 h-[25rem] w-[33rem] overflow-auto border rounded-xl"
                ref={redBorderDivRef}
              >
                <div className="flex justify-center laptop:justify-start tablet:w-[500px]">
                  {loadingTweet2 && (
                    <div className="flex items-center justify-center h-[200px] w-full">
                      <div className="loader border-t-transparent border-solid rounded-full animate-spin w-12 h-12 border-4 border-blue-500"></div>
                    </div>
                  )}
                  <div className="w-full">
                    <TwitterTweetEmbed
                      tweetId="1846103655440601374"
                      onLoad={() => setLoadingTweet2(false)}
                    />
                  </div>
                </div>
                <div className="flex laptop:justify-start w-full tablet:w-[500px]">
                  {loadingTweet1 && (
                    <div className="flex items-center justify-center h-[200px] w-full">
                      <div className="loader border-t-transparent border-solid rounded-full animate-spin w-12 h-12 border-4 border-blue-500"></div>
                    </div>
                  )}
                  <div className="w-full">
                    <TwitterTweetEmbed
                      tweetId="1736671378927976921"
                      onLoad={() => setLoadingTweet1(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 w-[40%]">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sagittis, arcu eu malesuada lobortis, quam orci eleifend ante, ac facilisis turpis orci id urna. Vivamus ex velit, consectetur vitae suscipit vel, molestie ac nulla. Duis vitae imperdiet dolor. Phasellus sit amet pretium urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris non ex eu libero vestibulum posuere sit amet et est. Proin rutrum non tellus id volutpat. Aenean </p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sagittis, arcu eu malesuada lobortis, quam orci eleifend ante, ac facilisis turpis orci id urna. Vivamus ex velit, consectetur vitae suscipit vel, molestie ac nulla. Duis vitae imperdiet dolor. Phasellus sit amet pretium urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris non ex eu libero vestibulum posuere sit amet et est. Proin rutrum non tellus id volutpat. Aenean </p>
            </div>
          </div>
        </div>

        {/* end of latest news section  */}

        {/* partners section */}  
        <div className="flex flex-col gap-[40px] py-[40px] laptop:py-[2.3rem] px-4 tablet:px-8 laptop:px-[126px] mb-[5rem]">
          <div className="flex justify-center">
            <h1 className="text-[24px] font-bold">Partners</h1>
          </div>
          <div className="flex flex-wrap justify-center tablet:justify-between items-center">
            <div className="w-[120px] tablet:w-[154px] flex justify-center">
              <Image
                src="/mastercard.png"
                alt="Mastercard"
                width={120.39}
                height={104.81}
                className="transition ease-in-out delay-150 duration-300 transform hover:scale-105"
              />
            </div>
            <div className="w-[120px] tablet:w-[154px] py-1 flex justify-center">
              <Image
                src="/umurava.png"
                alt="Umurava"
                width={178.15}
                height={73.68}
                className="transition ease-in-out delay-150 duration-300 transform hover:scale-105"
              />
            </div>
            <div className="w-[120px] tablet:w-[154px] flex justify-center">
              <Image
                src="/usEmbacy.png"
                alt="Embasy"
                width={80.54}
                height={12.94}
                className="transition ease-in-out delay-150 duration-300 transform hover:scale-105"
              />
            </div>
            <div className="w-[120px] tablet:w-[154px] py-3 flex justify-center">
              <Image
                src="/klab.png"
                alt="Programs"
                width={113.82}
                height={52.92}
                className="transition ease-in-out delay-150 duration-300 transform hover:scale-105"
              />
            </div>
            <div className="w-[120px] tablet:w-[154px] py-3">
              <Image
                src="/iremboreal.png"
                alt="Programs"
                width={163.3}
                height={32.17}
                className="transition ease-in-out delay-150 duration-300 transform hover:scale-105"
              />
            </div>
            <div className="w-[120px] tablet:w-[154px] py-3">
              <Image
                src="/israel.png"
                alt="Programs"
                width={163.3}
                height={32.17}
                className="transition ease-in-out delay-150 duration-300 transform hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
