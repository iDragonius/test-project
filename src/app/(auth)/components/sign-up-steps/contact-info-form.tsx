import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpData, SignUpStepsEnum } from "@/app/(auth)/sign-up/page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UserProps } from "@/types";

export interface ContactInfoFormProps {
  changeStep(step: SignUpStepsEnum): void;
  data: SignUpData;
  setData: Dispatch<SetStateAction<SignUpData>>;
  usersData: UserProps[];
}
const formSchema = z.object({
  companyName: z.string().min(1),
  subCompany: z.string().min(1),
  workersCount: z.string().min(1),
  email: z.string().min(1),
  phoneNumber: z.string().min(1),
});
const WorkersCountVariants = ["1-10", "11-50", "51-100", "101-500", "501-5000"];
const subCompanyVariants = ["Hə", "Yox"];
const ContactInfoForm: FC<ContactInfoFormProps> = ({
  changeStep,
  data,
  setData,
  usersData,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      subCompany: "",
      workersCount: "",
      email: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    form.setValue("companyName", data.contactInfo.companyName);
    form.setValue("subCompany", data.contactInfo.subCompany);
    form.setValue("workersCount", data.contactInfo.workersCount);
    form.setValue("email", data.contactInfo.email);
    form.setValue("phoneNumber", data.contactInfo.phoneNumber);
  }, []);
  function onSubmit(values: z.infer<typeof formSchema>) {
    setData((prevState) => ({
      ...prevState,
      contactInfo: values,
    }));
    changeStep(SignUpStepsEnum.RULES);
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className={"flex flex-col gap-4"}>
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormLabel>Qurumun adı</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Qurumun adını daxil et"
                      className={"!w-full !mt-1"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subCompany"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormLabel>Alt qurum</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        {subCompanyVariants.find(
                          (subCompany) => subCompany === field.value,
                        ) || "Alt qurum"}
                      </SelectTrigger>
                      <SelectContent>
                        {subCompanyVariants.map((subCompany) => (
                          <SelectItem value={subCompany} key={subCompany}>
                            {subCompany}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workersCount"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormLabel>İşçi sayı</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        {WorkersCountVariants.find(
                          (workersCount) => workersCount === field.value,
                        ) || "İşçi sayını daxil edin"}
                      </SelectTrigger>
                      <SelectContent>
                        {WorkersCountVariants.map((workersCount) => (
                          <SelectItem value={workersCount} key={workersCount}>
                            {workersCount}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="nana@gmail.com"
                      className={"!w-full !mt-1"}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormLabel>Mobil nömrə</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+994 50 500 50 50"
                      type={"text"}
                      className={"!w-full !mt-1"}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={"flex items-center justify-between mt-16"}>
            <Button
              onClick={() => changeStep(SignUpStepsEnum.USER_INFO)}
              type={"button"}
              className={
                "bg-indigo-200 text-indigo-600 hover:bg-indigo-300 w-[200px] flex gap-2"
              }
            >
              <ArrowLeft />
              Əvvəlki
            </Button>
            <Button
              type={"submit"}
              className={
                "bg-indigo-500 text-white hover:bg-indigo-600 w-[200px] flex gap-2"
              }
            >
              Sonrakı
              <ArrowRight />
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ContactInfoForm;
