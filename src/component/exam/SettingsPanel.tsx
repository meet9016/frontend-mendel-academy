import { BsMoon, BsSun } from "react-icons/bs";

type TestSettings = {
  fontSize: number; // in pixels, base 14px
  theme: 'light' | 'dark';
  showTimer: boolean;
  showExplanations: boolean;
  confirmOmission: boolean;
};

export const SettingsPanel = ({
  settings,
  onSettingsChange
}: {
  settings: TestSettings;
  onSettingsChange: (settings: TestSettings) => void;
}) => {
  const handleFontSizeIncrease = () => {
    if (settings.fontSize < 24) {
      onSettingsChange({ ...settings, fontSize: settings.fontSize + 2 });
    }
  };

  const handleFontSizeDecrease = () => {
    if (settings.fontSize > 12) {
      onSettingsChange({ ...settings, fontSize: settings.fontSize - 2 });
    }
  };

  const toggleTheme = () => {
    onSettingsChange({
      ...settings,
      theme: settings.theme === 'light' ? 'dark' : 'light'
    });
  };

  const toggleSetting = (key: keyof TestSettings) => {
    if (key === 'fontSize' || key === 'theme') return;
    onSettingsChange({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between border-gray-200 border-b pb-4">
        <label htmlFor="showExplanations" className="text-sm text-gray-600">
          Font Size
        </label>
        <button
          onClick={handleFontSizeDecrease}
          disabled={settings.fontSize <= 12}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          -
        </button>
        <span className="text-2xl font-medium w-16 text-center">Aa</span>
        <button
          onClick={handleFontSizeIncrease}
          disabled={settings.fontSize >= 24}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>

      {/* Toggle Switches */}
      <div className="space-y-4">
        {/* <h3 className="text-sm font-semibold text-gray-700">Preferences</h3> */}
        <div className="flex items-center justify-between border-gray-200 border-b pb-4">
          <label htmlFor="showTimer" className="text-sm text-gray-600">
            Show Timer
          </label>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ${settings.theme === "dark" ? "bg-gray-800" : "bg-yellow-400"
              }`}
          >
            <span
              className={`flex items-center justify-center h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${settings.theme === "dark" ? "translate-x-7" : "translate-x-1"
                }`}
            >
              {settings.theme === "dark" ? (
                <BsMoon className="w-4 h-4 text-gray-800" />
              ) : (
                <BsSun className="w-4 h-4 text-yellow-500" />
              )}
            </span>
          </button>
        </div>
        {/* Show Timer */}
        <div className="flex items-center justify-between border-gray-200 border-b pb-4">
          <label htmlFor="showTimer" className="text-sm text-gray-600">
            Show Timer
          </label>
          <button
            id="showTimer"
            onClick={() => toggleSetting('showTimer')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${settings.showTimer ? 'bg-primary' : 'bg-gray-300'
              }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${settings.showTimer ? 'translate-x-5' : 'translate-x-1'
                }`}
            />
          </button>
        </div>

        {/* Show Explanations */}
        <div className="flex items-center justify-between border-gray-200 border-b pb-4">
          <label htmlFor="showExplanations" className="text-sm text-gray-600">
            Show Explanations
          </label>
          <button
            id="showExplanations"
            onClick={() => toggleSetting('showExplanations')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${settings.showExplanations ? 'bg-primary' : 'bg-gray-300'
              }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${settings.showExplanations ? 'translate-x-5' : 'translate-x-1'
                }`}
            />
          </button>
        </div>

        {/* Confirm Answer Omission */}
        <div className="flex items-center justify-between ">
          <label htmlFor="confirmOmission" className="text-sm text-gray-600">
            Confirm Answer Omission
          </label>
          <button
            id="confirmOmission"
            onClick={() => toggleSetting('confirmOmission')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${settings.confirmOmission ? 'bg-primary' : 'bg-gray-300'
              }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${settings.confirmOmission ? 'translate-x-5' : 'translate-x-1'
                }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};