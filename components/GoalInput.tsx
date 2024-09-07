import { useState } from 'react';
import { useStore } from '@/utils/store';

interface GoalInputProps {
  onClose: () => void;
}

const GoalInput: React.FC<GoalInputProps> = ({ onClose }) => {
  const [goalName, setGoalName] = useState('');
  const [goalType, setGoalType] = useState('weightLoss');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalDeadline, setGoalDeadline] = useState<Date | null>(null);
  const { addGoal } = useStore();

  const handleGoalNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoalName(e.target.value);
  };

  const handleGoalTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGoalType(e.target.value);
  };

  const handleGoalTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoalTarget(e.target.value);
  };

  const handleGoalDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoalDeadline(new Date(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!goalName || !goalTarget || !goalDeadline) {
      return;
    }

    try {
      await addGoal({
        name: goalName,
        type: goalType,
        target: parseFloat(goalTarget),
        deadline: goalDeadline,
      });
      onClose();
    } catch (error) {
      console.error(error);
      // Handle error appropriately, e.g., display an error message to the user
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-4">Create New Goal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="goalName" className="block text-gray-700 text-sm font-bold mb-2">
              Goal Name:
            </label>
            <input
              type="text"
              id="goalName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={goalName}
              onChange={handleGoalNameChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="goalType" className="block text-gray-700 text-sm font-bold mb-2">
              Goal Type:
            </label>
            <select
              id="goalType"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={goalType}
              onChange={handleGoalTypeChange}
            >
              <option value="weightLoss">Weight Loss</option>
              <option value="muscleGain">Muscle Gain</option>
              <option value="distanceRunning">Distance Running</option>
              {/* Add more goal types as needed */}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="goalTarget" className="block text-gray-700 text-sm font-bold mb-2">
              Target:
            </label>
            <input
              type="number"
              id="goalTarget"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={goalTarget}
              onChange={handleGoalTargetChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="goalDeadline" className="block text-gray-700 text-sm font-bold mb-2">
              Deadline:
            </label>
            <input
              type="date"
              id="goalDeadline"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={goalDeadline ? goalDeadline.toISOString().slice(0, 10) : ''}
              onChange={handleGoalDeadlineChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-fittrack-primary hover:bg-fittrack-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalInput;