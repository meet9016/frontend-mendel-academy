"use client";
import { useState } from "react";

export default function Calculator({ settings }: { settings: any }) {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearAll = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const calculateResult = (prev: number, current: number, op: string) => {
    switch (op) {
      case "+": return prev + current;
      case "-": return prev - current;
      case "×": return prev * current;
      case "÷": return current !== 0 ? prev / current : 0;
      default: return current;
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const result = calculateResult(previousValue, inputValue, operator);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (operator && previousValue !== null) {
      const result = calculateResult(
        previousValue,
        parseFloat(display),
        operator
      );
      setDisplay(String(result));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const percentage = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const squareRoot = () => {
    setDisplay(String(Math.sqrt(parseFloat(display))));
    setWaitingForOperand(true);
  };

  const reciprocal = () => {
    const value = parseFloat(display);
    if (value !== 0) {
      setDisplay(String(1 / value));
    }
    setWaitingForOperand(true);
  };

  // Memory Functions
  const memoryAdd = () => setMemory(memory + parseFloat(display));
  const memoryRecall = () => setDisplay(String(memory));
  const memoryClear = () => setMemory(0);

  // Helper function to get text color based on background brightness
  const getTextColor = (bgColor: string) => {
    const color = bgColor.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? '#000000' : '#FFFFFF';
  };

  // Theme-based styles
  const isDark = settings?.theme === "dark";
  const primaryColor = settings?.primaryColor || '#FFCA00';
  const primaryTextColor = getTextColor(primaryColor);
  const secondaryColor = settings?.secondaryColor || '#3B82F6';
  const accentColor = settings?.accentColor || '#10B981';

  // Modern calculator styles with better contrast
  const containerStyle = {
    background: isDark ? '#1e1e2f' : '#f0f4f8',
    boxShadow: isDark 
      ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
      : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  };

  const displayStyle = {
    background: isDark ? '#2d2d44' : '#ffffff',
    color: isDark ? '#ffffff' : '#0f172a',
    borderBottom: isDark ? '1px solid #3d3d5c' : '1px solid #cbd5e1',
    boxShadow: isDark 
      ? 'inset 0 2px 4px rgba(0, 0, 0, 0.3)' 
      : 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  // Get current operator for display
  const getOperatorSymbol = () => {
    switch(operator) {
      case "+": return "+";
      case "-": return "−";
      case "×": return "×";
      case "÷": return "÷";
      default: return "";
    }
  };

  const memoryButtonStyle = {
    background: isDark ? 'rgba(139, 92, 246, 0.25)' : 'rgba(139, 92, 246, 0.15)',
    color: isDark ? '#d8b4fe' : '#6b21a5',
    border: isDark ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid rgba(139, 92, 246, 0.2)',
    boxShadow: isDark ? '0 2px 4px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  const operatorButtonStyle = {
    background: isDark ? 'rgba(59, 130, 246, 0.25)' : 'rgba(59, 130, 246, 0.15)',
    color: isDark ? '#93c5fd' : '#1e40af',
    border: isDark ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(59, 130, 246, 0.2)',
    boxShadow: isDark ? '0 2px 4px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  const numberButtonStyle = {
    background: isDark ? '#2d2d44' : '#ffffff',
    color: isDark ? '#ffffff' : '#0f172a',
    border: isDark ? '1px solid #3d3d5c' : '1px solid #cbd5e1',
    boxShadow: isDark 
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)' 
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  };

  const clearButtonStyle = {
    background: isDark ? 'rgba(239, 68, 68, 0.25)' : 'rgba(239, 68, 68, 0.15)',
    color: isDark ? '#fca5a5' : '#b91c1c',
    border: isDark ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(239, 68, 68, 0.2)',
    boxShadow: isDark ? '0 2px 4px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  const equalButtonStyle = {
    background: primaryColor,
    color: primaryTextColor,
    border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: isDark 
      ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)' 
      : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div 
        className="w-[340px] rounded-3xl overflow-hidden transition-all duration-300"
        style={containerStyle}
      >
        {/* Display with operator indicator */}
        <div className="p-6">
          <div className="relative">
            {/* Operator indicator */}
            {operator && (
              <div 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold opacity-70"
                style={{ color: isDark ? '#94a3b8' : '#475569' }}
              >
                {getOperatorSymbol()}
              </div>
            )}
            
            {/* Previous value indicator (optional) */}
            {previousValue !== null && (
              <div 
                className="absolute right-4 -top-5 text-xs opacity-50"
                style={{ color: isDark ? '#94a3b8' : '#64748b' }}
              >
                {previousValue} {getOperatorSymbol()}
              </div>
            )}
            
            <div 
              className="p-4 rounded-2xl text-right font-mono text-3xl tracking-wider"
              style={displayStyle}
            >
              {display}
            </div>
          </div>
        </div>

        {/* Button Grid */}
        <div className="p-6 pt-0">
          <div className="grid grid-cols-4 gap-2">
            
            {/* Memory Functions */}
            <button
              onClick={memoryAdd}
              className="p-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
              style={memoryButtonStyle}
            >
              M+
            </button>
            <button
              onClick={memoryRecall}
              className="p-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
              style={memoryButtonStyle}
            >
              MR
            </button>
            <button
              onClick={memoryClear}
              className="p-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
              style={memoryButtonStyle}
            >
              MC
            </button>
            <button
              onClick={clearAll}
              className="p-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
              style={clearButtonStyle}
            >
              C
            </button>

            {/* Scientific Functions */}
            <button
              onClick={toggleSign}
              className="p-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
              style={operatorButtonStyle}
            >
              ±
            </button>
            <button
              onClick={squareRoot}
              className="p-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
              style={operatorButtonStyle}
            >
              √
            </button>
            <button
              onClick={reciprocal}
              className="p-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
              style={operatorButtonStyle}
            >
              1/x
            </button>
            <button
              onClick={() => handleOperator("÷")}
              className={`p-3 rounded-xl text-lg font-bold transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg ${
                operator === "÷" ? "ring-2 ring-offset-2" : ""
              }`}
              style={{
                ...operatorButtonStyle,
                ...(operator === "÷" ? {
                  ringColor: primaryColor,
                  transform: 'scale(1.05)',
                } : {})
              }}
            >
              ÷
            </button>

            {/* Numbers Row 1 */}
            <button
              onClick={() => inputDigit("7")}
              className="p-3 rounded-xl text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
              style={numberButtonStyle}
            >
              7
            </button>
            <button
              onClick={() => inputDigit("8")}
              className="p-3 rounded-xl text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
              style={numberButtonStyle}
            >
              8
            </button>
            <button
              onClick={() => inputDigit("9")}
              className="p-3 rounded-xl text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
              style={numberButtonStyle}
            >
              9
            </button>
            <button
              onClick={() => handleOperator("×")}
              className={`p-3 rounded-xl text-lg font-bold transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg ${
                operator === "×" ? "ring-2 ring-offset-2" : ""
              }`}
              style={{
                ...operatorButtonStyle,
                ...(operator === "×" ? {
                  ringColor: primaryColor,
                  transform: 'scale(1.05)',
                } : {})
              }}
            >
              ×
            </button>

            {/* Numbers Row 2 */}
            <button
              onClick={() => inputDigit("4")}
              className="p-3 rounded-xl text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
              style={numberButtonStyle}
            >
              4
            </button>
            <button
              onClick={() => inputDigit("5")}
              className="p-3 rounded-xl text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
              style={numberButtonStyle}
            >
              5
            </button>
            <button
              onClick={() => inputDigit("6")}
              className="p-3 rounded-xl text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
              style={numberButtonStyle}
            >
              6
            </button>
            <button
              onClick={() => handleOperator("-")}
              className={`p-3 rounded-xl text-lg font-bold transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg ${
                operator === "-" ? "ring-2 ring-offset-2" : ""
              }`}
              style={{
                ...operatorButtonStyle,
                ...(operator === "-" ? {
                  ringColor: primaryColor,
                  transform: 'scale(1.05)',
                } : {})
              }}
            >
              −
            </button>

            {/* Numbers Row 3 */}
            <button
              onClick={() => inputDigit("1")}
              className="p-3 rounded-xl text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
              style={numberButtonStyle}
            >
              1
            </button>
            <button
              onClick={() => inputDigit("2")}
              className="p-3 rounded-xl text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
              style={numberButtonStyle}
            >
              2
            </button>
            <button
              onClick={() => inputDigit("3")}
              className="p-3 rounded-xl text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
              style={numberButtonStyle}
            >
              3
            </button>
            <button
              onClick={() => handleOperator("+")}
              className={`p-3 rounded-xl text-lg font-bold transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg ${
                operator === "+" ? "ring-2 ring-offset-2" : ""
              }`}
              style={{
                ...operatorButtonStyle,
                ...(operator === "+" ? {
                  ringColor: primaryColor,
                  transform: 'scale(1.05)',
                } : {})
              }}
            >
              +
            </button>

            {/* Bottom Row */}
            <button
              onClick={() => inputDigit("0")}
              className="col-span-2 p-3 rounded-xl text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
              style={numberButtonStyle}
            >
              0
            </button>
            <button
              onClick={inputDecimal}
              className="p-3 rounded-xl text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
              style={numberButtonStyle}
            >
              .
            </button>
            <button
              onClick={handleEquals}
              className="p-3 rounded-xl text-lg font-bold transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-xl"
              style={equalButtonStyle}
            >
              =
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}