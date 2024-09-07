import axios from "axios";
import { Goal, Progress } from "@/utils/models";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import { API_URL } from "@/config/index";
import { formatDate } from "@/utils/helpers";

export const getGoals = async () => {
  const session = await getSession();
  if (!session) return;

  const userId = session.user.id;

  try {
    const res = await axios.get(`${API_URL}/goals`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    const goals: Goal[] = res.data;

    return goals;
  } catch (error) {
    console.error("Error fetching goals:", error);
    toast.error("Error fetching goals. Please try again later.");
  }
};

export const addGoal = async (goal: Partial<Goal>) => {
  const session = await getSession();
  if (!session) return;

  try {
    const res = await axios.post(`${API_URL}/goals`, goal, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error creating goal:", error);
    toast.error("Error creating goal. Please try again later.");
  }
};

export const updateGoal = async (goalId: string, goal: Partial<Goal>) => {
  const session = await getSession();
  if (!session) return;

  try {
    const res = await axios.put(`${API_URL}/goals/${goalId}`, goal, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error updating goal:", error);
    toast.error("Error updating goal. Please try again later.");
  }
};

export const deleteGoal = async (goalId: string) => {
  const session = await getSession();
  if (!session) return;

  try {
    const res = await axios.delete(`${API_URL}/goals/${goalId}`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error deleting goal:", error);
    toast.error("Error deleting goal. Please try again later.");
  }
};

export const getProgress = async (goalId: string) => {
  const session = await getSession();
  if (!session) return;

  try {
    const res = await axios.get(`${API_URL}/progress/${goalId}`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    const progress: Progress[] = res.data.map((p: any) => ({
      ...p,
      date: new Date(p.date),
    }));

    return progress;
  } catch (error) {
    console.error("Error fetching progress:", error);
    toast.error("Error fetching progress. Please try again later.");
  }
};

export const addProgress = async (
  goalId: string,
  progress: Partial<Progress>
) => {
  const session = await getSession();
  if (!session) return;

  try {
    const res = await axios.post(`${API_URL}/progress/${goalId}`, progress, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error creating progress:", error);
    toast.error("Error creating progress. Please try again later.");
  }
};

export const updateProgress = async (
  progressId: string,
  progress: Partial<Progress>
) => {
  const session = await getSession();
  if (!session) return;

  try {
    const res = await axios.put(`${API_URL}/progress/${progressId}`, progress, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error updating progress:", error);
    toast.error("Error updating progress. Please try again later.");
  }
};

export const deleteProgress = async (progressId: string) => {
  const session = await getSession();
  if (!session) return;

  try {
    const res = await axios.delete(`${API_URL}/progress/${progressId}`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error deleting progress:", error);
    toast.error("Error deleting progress. Please try again later.");
  }
};