import { observer } from 'mobx-react-lite';
import { useStore } from '../store';

export const StartPage = observer(() => {
  const { exampleStore } = useStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Electric City</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-xl mb-4">Counter: {exampleStore.count}</p>
        <p className="text-lg mb-4">
          Is Positive: {exampleStore.isPositive ? 'Yes' : 'No'}
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => exampleStore.increment()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Increment
          </button>
          <button
            onClick={() => exampleStore.decrement()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
});