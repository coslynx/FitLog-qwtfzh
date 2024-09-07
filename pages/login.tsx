import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useStore } from "@/utils/store";
import { useState } from "react";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Login: React.FC = () => {
  const router = useRouter();
  const { user, setUser } = useStore();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (res?.error) {
        toast.error(res?.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsLoading(false);
        return;
      }
      setUser(res?.user);
      router.push("/dashboard");
    } catch (error) {
      toast.error(
        "An error occurred during login. Please try again later.",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (session) {
    router.push("/dashboard");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-fittrack-primary">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email && "border-red-500"
            }`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password && "border-red-500"
            }`}
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? "Logging In..." : "Login"}
          </Button>
          <a href={`/api/auth/signin?callbackUrl=${router.asPath}`} className="inline-block align-baseline font-bold text-sm text-fittrack-primary hover:text-fittrack-secondary">
            Forgot Password?
          </a>
        </div>
      </form>
      <div className="mt-4 text-center">
        Don't have an account?
        <a
          href={`/api/auth/signin?callbackUrl=${router.asPath}`}
          className="ml-2 inline-block align-baseline font-bold text-sm text-fittrack-primary hover:text-fittrack-secondary"
        >
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default Login;