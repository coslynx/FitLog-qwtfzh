import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useStore } from "@/utils/store";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import GoalInput from "@/components/GoalInput";
import ProgressChart from "@/components/ProgressChart";
import SocialShareButton from "@/components/SocialShareButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { toast } from "react-toastify";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { user, setUser, goals, addGoal, updateGoal, deleteGoal } = useStore();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoalInputOpen, setIsGoalInputOpen] = useState(false);

  const fetchUser = async () => {
    const session = await getServerSession(authOptions);
    setUser(session?.user);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleGoalCreate = () => {
    setIsGoalInputOpen(true);
  };

  const handleGoalUpdate = async (goalId: string, updatedGoal: any) => {
    setIsLoading(true);
    try {
      await updateGoal(goalId, updatedGoal);
      toast.success("Goal updated successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
    } catch (error) {
      toast.error("Error updating goal. Please try again later.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
    }
  };

  const handleGoalDelete = async (goalId: string) => {
    setIsLoading(true);
    try {
      await deleteGoal(goalId);
      toast.success("Goal deleted successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
    } catch (error) {
      toast.error("Error deleting goal. Please try again later.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-fittrack-primary">
        Dashboard
      </h1>
      <Button variant="primary" onClick={handleGoalCreate}>
        Create New Goal
      </Button>
      {isGoalInputOpen && (
        <GoalInput onClose={() => setIsGoalInputOpen(false)} />
      )}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <div
            key={goal.goalId}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-bold mb-2">{goal.name}</h2>
            <p className="text-gray-700 mb-4">
              {goal.type === "weightLoss"
                ? `Lose ${goal.target} pounds`
                : goal.type === "muscleGain"
                ? `Gain ${goal.target} pounds`
                : goal.type === "distanceRunning"
                ? `Run ${goal.target} miles`
                : ""}
            </p>
            <ProgressChart goalId={goal.goalId} />
            <div className="mt-4 flex space-x-4">
              <SocialShareButton
                title={`My progress towards ${goal.name}`}
                description={`Check out my progress towards my ${goal.name} goal!`}
                url={`http://localhost:3000/goals/${goal.goalId}`}
              />
              <Button
                variant="secondary"
                onClick={() =>
                  handleGoalUpdate(goal.goalId, {
                    name: goal.name,
                    type: goal.type,
                    target: goal.target,
                    deadline: goal.deadline,
                  })
                }
              >
                Update
              </Button>
              <Button
                variant="tertiary"
                onClick={() => handleGoalDelete(goal.goalId)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;