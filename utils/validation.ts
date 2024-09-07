import { isEmail } from 'validator';

export const validateEmail = (email: string): boolean => {
  return isEmail(email);
};

export const validatePassword = (password: string): boolean => {
  if (password.length < 8) {
    return false;
  }
  if (!/\d/.test(password)) {
    return false;
  }
  if (!/[a-zA-Z]/.test(password)) {
    return false;
  }
  return true;
};

export const validateName = (name: string): boolean => {
  if (name.length < 2 || name.length > 50) {
    return false;
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return false;
  }
  return true;
};

export const validateGoalName = (name: string): boolean => {
  if (name.length < 3 || name.length > 30) {
    return false;
  }
  return true;
};

export const validateGoalType = (type: string): boolean => {
  const validTypes = ['weightLoss', 'muscleGain', 'distanceRunning'];
  return validTypes.includes(type);
};

export const validateGoalTarget = (target: number): boolean => {
  if (target <= 0) {
    return false;
  }
  return true;
};

export const validateGoalDeadline = (deadline: Date): boolean => {
  if (deadline.getTime() < Date.now()) {
    return false;
  }
  return true;
};

export const validateProgressDate = (date: Date): boolean => {
  if (date.getTime() > Date.now()) {
    return false;
  }
  return true;
};

export const validateProgressActivity = (activity: string): boolean => {
  if (activity.length < 3 || activity.length > 50) {
    return false;
  }
  return true;
};

export const validateProgressMetrics = (metrics: any): boolean => {
  // Custom validation logic for progress metrics based on the goal type
  // ...
  return true;
};