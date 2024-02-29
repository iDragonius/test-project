"use client";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { SignUpData, SignUpStepsEnum } from "@/app/(auth)/sign-up/page";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export interface RulesFormProps {
  data: SignUpData;
  setData: Dispatch<SetStateAction<SignUpData>>;
  changeStep(step: SignUpStepsEnum): void;
}

const RulesForm: FC<RulesFormProps> = ({ data, setData, changeStep }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const { push } = useRouter();
  const { toast } = useToast();
  const completeRegistration = () => {
    if (checked) {
      push("/sign-in");
      toast({
        title: "Success!",
      });
    }
  };
  return (
    <div>
      <h2 className={"font-semibold text-[18px] mb-3"}>
        Siz{" "}
        {data.userInfo.name +
          " " +
          data.userInfo.surname +
          " " +
          data.contactInfo.companyName}{" "}
        kimi qeydiyyatdan keçəcəksiniz
      </h2>
      <p className={"mb-4 text-gray-600"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
        corporis cupiditate et officiis quaerat quia quo quos reprehenderit
        veniam! Culpa illo ipsam minus natus non ratione reiciendis sed veniam.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias at dicta
        eveniet impedit, saepe unde. Accusamus beatae illum iste labore
        molestias nam, nemo perferendis, quibusdam quidem, quisquam rem
        temporibus ut?
      </p>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={checked}
          onCheckedChange={(state) => setChecked(state as boolean)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Mən şirkətin rəsmi nümayəndəsiyəm
        </label>
      </div>
      <div className={"flex items-center justify-between mt-16"}>
        <Button
          type={"button"}
          onClick={() => changeStep(SignUpStepsEnum.CONTACT_INFO)}
          className={
            "bg-indigo-200 text-indigo-600 hover:bg-indigo-300 w-[200px] flex gap-2"
          }
        >
          <ArrowLeft />
          Əvvəlki
        </Button>
        <Button
          onClick={completeRegistration}
          type={"submit"}
          className={
            "bg-indigo-500 text-white hover:bg-indigo-600 w-[200px] flex gap-2"
          }
        >
          Qeydiyyatı bitir
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default RulesForm;
