const CommonMistakes = ({ mistakes }) => {
  const defaultMistakes = [
    'Tensing up your body - stay loose!',
    'Rushing ahead of the beat',
    'Not bending your knees enough'
  ];

  const displayMistakes = mistakes || defaultMistakes;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Common Mistakes</h2>
      <ul className="space-y-2 text-gray-700">
        {displayMistakes.map((mistake, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-red-500 mt-1">✗</span>
            <span>{mistake}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommonMistakes;