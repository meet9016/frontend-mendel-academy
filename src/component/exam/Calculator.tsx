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

  // Theme-based classes
  const isDark = settings?.theme === "dark";

  const btn = `${isDark ? "bg-gray-700 text-white border-gray-500" : "bg-gray-100 border-gray-500"} p-1`;
  const opBtn = `${isDark ? "bg-blue-700 text-white border-gray-500" : "bg-blue-300 border-gray-500"} p-1`;
  const memBtn = `${isDark ? "bg-purple-700 text-white border-gray-500" : "bg-purple-300 border-gray-500"} p-1`;
  const equalBtn = `${isDark ? "bg-yellow-700 text-black border-gray-500" : "bg-yellow-300 border-gray-500"} p-1`;
  const containerBg = isDark ? "bg-gray-800 border-gray-600" : "bg-[#d6d6d6] border-blue-700";
  const displayBg = isDark ? "bg-gray-900 text-white" : "bg-white text-black";

  return (
    <div className="flex items-center justify-center">
      <div className={`w-[260px] ${containerBg} shadow-xl rounded-md`}>

        <div className="p-2">
          <div className={`border border-gray-500 p-2 mb-2 text-right text-lg font-mono ${displayBg}`}>
            {display}
          </div>

          <div className="grid grid-cols-4 gap-1 text-sm">

            {/* Memory */}
            <button onClick={memoryAdd} className={memBtn}>M+</button>
            <button onClick={memoryRecall} className={memBtn}>MR</button>
            <button onClick={memoryClear} className={memBtn}>MC</button>
            <button onClick={clearAll} className={equalBtn}>C</button>

            {/* Row */}
            <button onClick={toggleSign} className={opBtn}>±</button>
            <button onClick={squareRoot} className={opBtn}>√</button>
            <button onClick={reciprocal} className={opBtn}>1/x</button>
            <button onClick={() => handleOperator("÷")} className={opBtn}>÷</button>

            {/* Numbers */}
            <button onClick={() => inputDigit("7")} className={btn}>7</button>
            <button onClick={() => inputDigit("8")} className={btn}>8</button>
            <button onClick={() => inputDigit("9")} className={btn}>9</button>
            <button onClick={() => handleOperator("×")} className={opBtn}>×</button>

            <button onClick={() => inputDigit("4")} className={btn}>4</button>
            <button onClick={() => inputDigit("5")} className={btn}>5</button>
            <button onClick={() => inputDigit("6")} className={btn}>6</button>
            <button onClick={() => handleOperator("-")} className={opBtn}>-</button>

            <button onClick={() => inputDigit("1")} className={btn}>1</button>
            <button onClick={() => inputDigit("2")} className={btn}>2</button>
            <button onClick={() => inputDigit("3")} className={btn}>3</button>
            <button onClick={() => handleOperator("+")} className={opBtn}>+</button>

            <button onClick={() => inputDigit("0")} className={`${btn} col-span-2`}>0</button>
            <button onClick={inputDecimal} className={btn}>.</button>
            <button onClick={handleEquals} className={equalBtn}>=</button>

          </div>
        </div>
      </div>
    </div>
  );
}