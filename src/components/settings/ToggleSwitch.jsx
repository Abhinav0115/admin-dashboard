const ToggleSwitch = ({ label, isOn, onToggle }) => {
    return (
        <div className="flex items-center justify-between py-3">
            <span className="text-gray-300">{label}</span>
            <button
                className={`
          relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none
          ${isOn ? "bg-indigo-600" : "bg-gray-600"}
          `}
                onClick={onToggle}
                aria-pressed={isOn}
            >
                <span
                    className={`
            inline-block w-4 h-4 transform bg-white rounded-full transition-transform
            ${isOn ? "translate-x-6" : "translate-x-1"}
          `}
                />
            </button>
        </div>
    );
};
export default ToggleSwitch;
