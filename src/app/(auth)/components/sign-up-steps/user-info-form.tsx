import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckSquare, Repeat } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SignUpData, SignUpStepsEnum } from "@/app/(auth)/sign-up/page";
import { useToast } from "@/components/ui/use-toast";
import Config from "@/config";
import { formatNumber } from "@/lib/utils";

export interface UserInfoFormProps {
  changeStep(step: SignUpStepsEnum): void;
  data: SignUpData;
  setData: Dispatch<SetStateAction<SignUpData>>;
}
const formSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  patronymic: z.string().min(1),
  pin: z.string().min(1),
  passportNumber: z.string().min(1),
  password: z.string().min(1),
  repeatPassword: z.string().min(1),
  email: z.string().min(1),
  phoneNumber: z.string().min(1),
});

const UserInfoForm: FC<UserInfoFormProps> = ({ changeStep, data, setData }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      patronymic: "",
      pin: "",
      passportNumber: "",
      email: "",
      password: "",
      repeatPassword: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    form.setValue("name", data.userInfo.name);
    form.setValue("surname", data.userInfo.surname);
    form.setValue("patronymic", data.userInfo.patronymic);
    form.setValue("pin", data.userInfo.pin);
    form.setValue("passportNumber", data.userInfo.passportNumber);
    form.setValue("email", data.userInfo.email);
    form.setValue("repeatPassword", data.userInfo.repeatPassword);
    form.setValue("password", data.userInfo.password);
    form.setValue("phoneNumber", data.userInfo.phoneNumber);
  }, []);
  const { toast } = useToast();
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!otps.email.confirmed) {
      toast({
        title: "Emaili təsdiq edin!",
        variant: "destructive",
      });
      return;
    }
    if (!otps.email.confirmed) {
      toast({
        title: "Mobil nömrəni təsdiq edin!",
        variant: "destructive",
      });
      return;
    }
    changeStep(SignUpStepsEnum.CONTACT_INFO);

    setData((prevState) => ({
      ...prevState,
      userInfo: {
        ...form.getValues(),
        isEmailConfirmed: otps.email.confirmed,
        isPhoneNumberConfirmed: otps.phoneNumber.confirmed,
      },
    }));
  }
  const [otps, setOtps] = useState<{
    email: {
      confirmed: boolean;
      otp: string;
      isActive: boolean;
    };
    phoneNumber: {
      confirmed: boolean;
      otp: string;
      isActive: boolean;
    };
  }>({
    email: {
      otp: "",
      isActive: false,
      confirmed: false,
    },
    phoneNumber: {
      otp: "",
      isActive: false,
      confirmed: false,
    },
  });

  const confirmField = (field: "email" | "phoneNumber") => {
    if (field === "email") {
      if (otps.email.isActive) {
        if (Config.emailOTP === otps.email.otp) {
          setOtps((prevState) => ({
            ...prevState,
            email: {
              confirmed: true,
              isActive: false,
              otp: "",
            },
          }));
          toast({
            title: "Email təsdiq edildi!",
          });
        }
      } else {
        setOtps((prevState) => ({
          ...prevState,
          email: {
            otp: "",
            isActive: true,
            confirmed: false,
          },
        }));
      }
    } else {
      if (otps.phoneNumber.isActive) {
        if (Config.phoneOTP === otps.phoneNumber.otp) {
          setOtps((prevState) => ({
            ...prevState,
            phoneNumber: {
              confirmed: true,
              isActive: false,
              otp: "",
            },
          }));
          toast({
            title: "Mobil nömrə təsdiq edildi!",
          });
        }
      } else {
        setOtps((prevState) => ({
          ...prevState,

          phoneNumber: {
            otp: "",
            isActive: true,
            confirmed: false,
          },
        }));
      }
    }
  };
  function reset(field: "email" | "phoneNumber") {
    if (field === "email") {
      setOtps((prevState) => ({
        ...prevState,
        email: {
          isActive: false,
          otp: "",
          confirmed: false,
        },
      }));
      setData((prevState) => ({
        ...prevState,
        userInfo: {
          ...prevState.userInfo,
          isEmailConfirmed: false,
        },
      }));
      form.setValue("email", "");
    } else {
      setOtps((prevState) => ({
        ...prevState,
        phoneNumber: {
          isActive: false,
          otp: "",
          confirmed: false,
        },
      }));
      setData((prevState) => ({
        ...prevState,
        userInfo: {
          ...prevState.userInfo,
          isPhoneNumberConfirmed: false,
        },
      }));
      form.setValue("phoneNumber", "");
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className={"flex gap-2"}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormLabel>Ad</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Emin"
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
              name="surname"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormLabel>Soyad</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Qadimli"
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
              name="patronymic"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormLabel>Ata adı</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Emin"
                      className={"!w-full !mt-1"}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={"flex items-center gap-4 mt-8"}>
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormLabel>Fin kod</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1234567"
                      className={"!w-full !mt-1"}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className={"absolute"} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passportNumber"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormLabel>Ş.V seriya nömrəsi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="AA"
                      className={"!w-full !mt-1"}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className={"absolute"} />
                </FormItem>
              )}
            />
          </div>
          <div className={"flex items-center gap-4 mt-8"}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormLabel>Şifr</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Şifr daxil edin"
                      className={"!w-full !mt-1"}
                      type={"password"}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className={"absolute"} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormLabel>Şifr təkrarı</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Şifr təkrarını daxil edin"
                      className={"!w-full !mt-1"}
                      type={"password"}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className={"absolute"} />
                </FormItem>
              )}
            />
          </div>
          <div className={"flex items-end gap-3 mt-8"}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={otps.email.confirmed || otps.email.isActive}
                      placeholder="rufet@in4tech.com"
                      className={"!w-full !mt-1"}
                      type={"text"}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className={"absolute"} />
                </FormItem>
              )}
            />
            {otps.email.isActive ? (
              <div>
                <Label>OTP Kod</Label>
                <Input
                  className={"mt-1"}
                  placeholder={"189 132"}
                  value={otps.email.otp}
                  onChange={(e) =>
                    setOtps((prevState) => ({
                      ...prevState,
                      email: {
                        ...prevState.email,
                        otp: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            ) : (
              <Button
                onClick={() => reset("email")}
                type={"button"}
                className={"w-[180px] bg-red-600  hover:bg-red-700 flex gap-1"}
              >
                <Repeat width={16} />
                Dəyiş
              </Button>
            )}
            {!otps.email.confirmed && (
              <Button
                onClick={() => confirmField("email")}
                type={"button"}
                className={
                  "w-[180px] bg-green-500 hover:bg-green-600 flex gap-1"
                }
              >
                <CheckSquare width={16} />
                Təsdiqlə
              </Button>
            )}
          </div>

          <div className={"flex items-end gap-3 mt-6"}>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormLabel>Mobil nömrə</FormLabel>
                  <FormControl>
                    <Input
                      disabled={
                        otps.phoneNumber.confirmed || otps.phoneNumber.isActive
                      }
                      placeholder="+994 50 500 50 50"
                      className={"!w-full !mt-1"}
                      type={"text"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className={"absolute"} />
                </FormItem>
              )}
            />

            {otps.phoneNumber.isActive ? (
              <div>
                <Label>OTP Kod</Label>
                <Input
                  className={"mt-1"}
                  placeholder={"189 132"}
                  value={otps.phoneNumber.otp}
                  onChange={(e) =>
                    setOtps((prevState) => ({
                      ...prevState,
                      phoneNumber: {
                        ...prevState.phoneNumber,
                        otp: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            ) : (
              <Button
                onClick={() => reset("phoneNumber")}
                type={"button"}
                className={"w-[180px] bg-red-600  hover:bg-red-700 flex gap-1"}
              >
                <Repeat width={16} />
                Dəyiş
              </Button>
            )}
            {!otps.phoneNumber.confirmed && (
              <Button
                onClick={() => confirmField("phoneNumber")}
                type={"button"}
                className={
                  "w-[180px] bg-green-500 hover:bg-green-600 flex gap-1"
                }
              >
                <CheckSquare width={16} />
                Təsdiqlə
              </Button>
            )}
          </div>

          <div className={"flex items-center justify-between mt-16"}>
            <Button
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

export default UserInfoForm;
