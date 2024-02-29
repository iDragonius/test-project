"use client";
import React, { FC, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import Steps from "@/app/(auth)/components/sign-up-steps/steps";
import UserInfoForm from "@/app/(auth)/components/sign-up-steps/user-info-form";
import RulesForm from "@/app/(auth)/components/sign-up-steps/rules-form";
import ContactInfoForm from "@/app/(auth)/components/sign-up-steps/contact-info-form";
import { Button } from "@/components/ui/button";

export interface PageProps {}
export type SignUpStepProps = {
  title: string;
  description: string;
  value: SignUpStepsEnum;
};
export enum SignUpStepsEnum {
  USER_INFO = "user-info",
  CONTACT_INFO = "contact-info",
  RULES = "rules",
}
const SignUpSteps: SignUpStepProps[] = [
  {
    title: "İstifadəçi məlumatları",
    description: "Mərhələ 1",
    value: SignUpStepsEnum.USER_INFO,
  },
  {
    title: "Əlaqə məlumatları",
    description: "Mərhələ 2",
    value: SignUpStepsEnum.CONTACT_INFO,
  },
  {
    title: "Qaydalar",
    description: "Mərhələ 3",
    value: SignUpStepsEnum.RULES,
  },
];

export type SignUpData = {
  userInfo: {
    name: string;
    surname: string;
    patronymic: string;
    pin: string;
    passportNumber: string;
    password: string;
    repeatPassword: string;
    email: string;
    phoneNumber: string;
    isEmailConfirmed: boolean;
    isPhoneNumberConfirmed: boolean;
  };
  contactInfo: {
    companyName: string;
    subCompany: string;
    workersCount: string;
    email: string;
    phoneNumber: string;
  };
};
const Page: FC<PageProps> = () => {
  const [currentStep, setCurrentStep] = useState<SignUpStepsEnum>(
    SignUpSteps[0].value,
  );
  const [data, setData] = useState<SignUpData>({
    userInfo: {
      name: "",
      surname: "",
      patronymic: "",
      email: "",
      phoneNumber: "",
      pin: "",
      password: "",
      passportNumber: "",
      repeatPassword: "",
      isEmailConfirmed: false,
      isPhoneNumberConfirmed: false,
    },
    contactInfo: {
      companyName: "",
      phoneNumber: "",
      email: "",
      workersCount: "",
      subCompany: "",
    },
  });

  function changeStep(step: SignUpStepsEnum) {
    setCurrentStep(step);
  }
  return (
    <main
      className={
        "bg-indigo-200 h-screen w-full flex items-center justify-center overflow-y-hidden overflow-x-hidden"
      }
    >
      <div
        className={"w-[900px] bg-white py-10 px-12 shadow-2xl rounded-[32px]"}
      >
        <div className={"flex justify-between items-center"}>
          <div
            className={
              "w-10 h-10 rounded-[8px] bg-gray-100 flex items-center justify-center transition-all ease-in-out hover:bg-gray-200 cursor-pointer"
            }
          >
            <ChevronLeft width={32} height={32} color={"#828282"} />{" "}
          </div>
          <h1 className={"text-3xl font-semibold text-gray-500"}>
            Şirkətlər üçün qeydiyyat
          </h1>
          <div />
        </div>
        <Steps
          className={"my-16"}
          currentStep={currentStep}
          changeStep={changeStep}
          steps={SignUpSteps}
        />
        {currentStep === SignUpStepsEnum.USER_INFO && (
          <UserInfoForm changeStep={changeStep} data={data} setData={setData} />
        )}
        {currentStep === SignUpStepsEnum.CONTACT_INFO && (
          <ContactInfoForm
            changeStep={changeStep}
            data={data}
            setData={setData}
          />
        )}
        {currentStep === SignUpStepsEnum.RULES && (
          <RulesForm data={data} setData={setData} changeStep={changeStep} />
        )}
      </div>
    </main>
  );
};

export default Page;
