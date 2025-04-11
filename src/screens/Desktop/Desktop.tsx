import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";

export const Desktop = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full max-w-[1440px] h-[1024px] relative">
        <div className="relative h-full">
          {/* Vertical divider line */}
          <Separator
            orientation="vertical"
            className="absolute h-full left-[720px] z-10"
          />

          {/* Background image */}
          <div className="absolute inset-0 bg-[url('/sign-up-page-1.png')] bg-cover bg-center" />

          {/* Left side content */}
          <div className="relative z-10">
            {/* Back button */}
            <div className="absolute top-[11px] left-[29px] flex items-center gap-3">
              <ArrowLeftIcon className="h-[15px] w-[60px]" />
              <span className="font-['Inknut_Antiqua',Helvetica] text-2xl">
                Back
              </span>
            </div>

            {/* New Traveller tab */}
            <div className="absolute w-[226px] h-[86px] top-0 left-[494px] bg-[#faf3b3] opacity-50 flex items-center justify-center">
              <span className="font-['Inknut_Antiqua',Helvetica] text-2xl">
                New Traveller
              </span>
            </div>

            {/* Main heading */}
            <div className="absolute top-[165px] left-[184px] font-['Inknut_Antiqua',Helvetica] text-4xl">
              Explore with Trovio
            </div>

            {/* Subheading */}
            <div className="absolute top-[231px] left-[214px] font-['Inknut_Antiqua',Helvetica] text-[26px]">
              Unveil the Mystries
            </div>

            {/* Form fields */}
            <div className="absolute top-[444px] left-[89px] flex gap-12">
              <div className="flex flex-col">
                <label className="font-['Inknut_Antiqua',Helvetica] text-2xl mb-4">
                  Name
                </label>
                <Input className="w-[250px] border-t-0 border-x-0 border-b-2 rounded-none px-0 focus-visible:ring-0" />
              </div>
              <div className="flex flex-col">
                <label className="font-['Inknut_Antiqua',Helvetica] text-2xl mb-4">
                  Phone No.
                </label>
                <Input className="w-[270px] border-t-0 border-x-0 border-b-2 rounded-none px-0 focus-visible:ring-0" />
              </div>
            </div>

            <div className="absolute top-[575px] left-[89px] flex flex-col">
              <label className="font-['Inknut_Antiqua',Helvetica] text-2xl mb-4">
                Email
              </label>
              <Input className="w-[567px] border-t-0 border-x-0 border-b-2 rounded-none px-0 focus-visible:ring-0" />
            </div>

            <div className="absolute top-[685px] left-[89px] flex flex-col">
              <label className="font-['Inknut_Antiqua',Helvetica] text-2xl mb-4">
                Create Password
              </label>
              <Input
                type="password"
                className="w-[567px] border-t-0 border-x-0 border-b-2 rounded-none px-0 focus-visible:ring-0"
              />
            </div>

            {/* Sign up button */}
            <Button className="absolute w-[570px] h-[90px] top-[862px] left-[89px] bg-[#a9a573] rounded-[20px] hover:bg-[#a9a573]/90">
              <span className="font-['Inknut_Antiqua',Helvetica] font-bold text-[26px] text-black">
                Sign up
              </span>
            </Button>
          </div>

          {/* Right side content */}
          <div className="relative z-10">
            {/* Trovio logo */}
            <img
              className="absolute w-[114px] h-[114px] top-[109px] right-[295px] object-cover"
              alt="Trovio logo"
              src="/chatgpt-image-apr-11--2025--06-44-50-am-removebg-preview-2.png"
            />

            {/* Quote */}
            <div className="absolute top-[405px] left-[746px] opacity-90 font-['Inknut_Antiqua',Helvetica] text-3xl max-w-[600px]">
              "Every place has a story. Let's find yours."
            </div>

            {/* Sign in link */}
            <div className="absolute top-[875px] left-[850px] flex items-center gap-2 font-['Inknut_Antiqua',Helvetica] text-2xl">
              <span>Already a Traveller? Sign in</span>
              <ArrowRightIcon className="h-[15px] w-[47px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
