import './RollButton.css';

interface RollButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export default function RollButton({ onClick, disabled }: RollButtonProps) {
  return (
    <button 
      className="roll-button"
      onClick={onClick}
      disabled={disabled}
    >
      Roll
    </button>
  );
}