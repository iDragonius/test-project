import React, { FC } from "react";
import { ChevronRight, HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SignUpStepProps, SignUpStepsEnum } from "@/app/(auth)/sign-up/page";

export interface StepsProps {
  changeStep(step: SignUpStepsEnum): void;
  currentStep: SignUpStepsEnum;
  className?: string;
  steps: SignUpStepProps[];
}

const Steps: FC<StepsProps> = ({
  changeStep,
  currentStep,
  className,
  steps,
}) => {
  return (
    <div className={cn("flex justify-between", className)}>
      {steps.map((step, i) => (
        <div className={"flex gap-4 items-center"} key={i}>
          <div className={"flex items-center gap-3"}>
            <div
              className={cn(
                "w-12 h-12 flex items-center justify-center  rounded-[6px]",
                step.value === currentStep ? "bg-indigo-500" : "bg-gray-100",
              )}
            >
              <HomeIcon
                width={32}
                height={32}
                color={step.value === currentStep ? "#fff" : "#828282"}
              />
            </div>
            <div>
              <h3 className={"text-gray-600 font-semibold"}>{step.title}</h3>
              <p className={"text-gray-500 text-[14px]"}>{step.description}</p>
            </div>
          </div>
          <ChevronRight width={32} height={32} color={"#828282"} />
        </div>
      ))}
    </div>
  );
};

export default Steps;
