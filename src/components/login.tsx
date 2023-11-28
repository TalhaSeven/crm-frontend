import Input from "@/components/input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { login } from "@/store/apps/login";

type FormValues = {
  email: string;
  password: string;
};
const loginFormSchema = yup.object().shape({
  email: yup.string().required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});

const defaultValues: FormValues = {
  email: "",
  password: "",
};

const Login = () => {
  // ** Redux
  const dispatch = useDispatch<AppDispatch>();

  // ** Selectors
  const data: any = useSelector((state: RootState) => state.login.data);
  const loading = useSelector((state: RootState) => state.login.loading);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = (payload: FormValues) => {
    dispatch(login(payload));
    reset(defaultValues);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap justify-center items-center text-center">
          <div className="w-full md:w-1/2 px-1">
            <Input
              type="text"
              placeholder="Email"
              className="mt-1"
              rounded="rounded-2xl"
              {...register("email", { required: true })}
            />
            {errors.email && <>{errors.email.message}</>}
          </div>
          <div className="w-full md:w-1/2 px-1">
            <Input
              type="text"
              placeholder="Password"
              className="mt-1"
              rounded="rounded-2xl"
              {...register("password", { required: true })}
            />
            {errors.password && <>{errors.password.message}</>}
          </div>
          <div className="w-full md:w-2/2 px-1">
            <button type="submit" className="text-red-500">
              Send
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
