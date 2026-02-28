import { BsMoon, BsSun } from "react-icons/bs";

export const SettingsPanel = ({
  settings,
  onSettingsChange
}: {
  settings: any;
  onSettingsChange: (
    settings: any | ((prev: any) => any)
  ) => void;
}) => {

  const toggleTheme = () => {
    onSettingsChange({
      ...settings,
      theme: settings.theme === "light" ? "dark" : "light"
    });
  };

  const toggleSetting = (key: keyof any) => {
    if (key === "fontSize" || key === "theme") return;
    onSettingsChange({ ...settings, [key]: !settings[key] });
  };

  const Toggle = ({
    enabled,
    onClick
  }: {
    enabled: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-300 ${enabled ? "bg-primary" : "bg-gray-300"
        }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300 ${enabled ? "translate-x-5" : "translate-x-1"
          }`}
      />
    </button>
  );

  return (
    <div className="p-2 space-y-2 rounded-xl">

      {/* Font Size */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <span className="text-sm text-gray-800">
          Font Size
        </span>

        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              settings.fontSize > 12 &&
              onSettingsChange({ ...settings, fontSize: settings.fontSize - 2 })
            }
            className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-lg font-semibold hover:bg-gray-200"
          >
            −
          </button>

          <span className="text-lg font-semibold text-gray-800">
            Aa
          </span>

          <button
            onClick={() =>
              settings.fontSize < 24 &&
              onSettingsChange({ ...settings, fontSize: settings.fontSize + 2 })
            }
            className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-lg font-semibold hover:bg-gray-200"
          >
            +
          </button>
        </div>
      </div>

      {/* Theme */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
        <span className="text-sm text-gray-800">
          Color Theme
        </span>

        <button
          onClick={toggleTheme}
          className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${settings.theme === "dark"
              ? "bg-gray-800"
              : "bg-yellow-400"
            }`}
        >
          <span
            className={`flex items-center justify-center h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-300 ${settings.theme === "dark"
                ? "translate-x-6"
                : "translate-x-1"
              }`}
          >
            {settings.theme === "dark" ? (
              <BsMoon className="w-3.5 h-3.5 text-gray-700" />
            ) : (
              <BsSun className="w-3.5 h-3.5 text-yellow-500" />
            )}
          </span>
        </button>
      </div>

      {/* Toggles */}
      <div className="">

        <div className="flex items-center justify-between border-b border-gray-200 pb-3 pt-1">
          <span className="text-sm text-gray-800">
            Show Timer
          </span>
          <Toggle
            enabled={settings.showTimer}
            onClick={() => toggleSetting("showTimer")}
          />
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 pb-3 pt-3">
          <span className="text-sm text-gray-800">
            Show Explanations
          </span>
          <Toggle
            enabled={settings.showExplanations}
            onClick={() => toggleSetting("showExplanations")}
          />
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 pb-3 pt-3">
          <span className="text-sm text-gray-800">
            Confirm Answer Omission
          </span>
          <Toggle
            enabled={settings.confirmOmission}
            onClick={() => toggleSetting("confirmOmission")}
          />
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 pb-3 pt-3">
          <span className="text-sm text-gray-800">
            Default Highlighter
          </span>
          <div className="h-5 w-5 rounded-full bg-primary shadow-sm" />
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 pb-3 pt-3">
          <span className="text-sm text-gray-800">
            Add To Annotation
          </span>
          <Toggle
          />
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 pb-3 pt-3">
          <span className="text-sm text-gray-800">
            Add To Notebook
          </span>
          <Toggle
          />
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 pb-3 pt-3">
          <span className="text-sm text-gray-800">
            Add To Flashcard
          </span>
          <Toggle
          />
        </div>

      </div>
    </div>
  );
};