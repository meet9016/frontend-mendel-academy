// Keyboard shortcuts list
export const KEYBOARD_SHORTCUTS = [
  { key: '1-9', description: 'Select answer option (1-9)' },
  { key: 'Enter', description: 'Submit answer' },
  { key: 'N', description: 'Next question' },
  { key: 'P', description: 'Previous question' },
  { key: 'M', description: 'Mark/Unmark current question' },
  { key: 'F', description: 'Toggle full screen' },
  { key: 'L', description: 'Open lab values' },
  { key: 'C', description: 'Open calculator' },
  { key: 'T', description: 'Open tutorial menu' },
  { key: 'S', description: 'Open settings panel' },
  { key: 'Esc', description: 'Exit full screen / Close modal' },
  { key: '→', description: 'Next question' },
  { key: '←', description: 'Previous question' },
  { key: 'Ctrl + S', description: 'Submit answer' },
  { key: 'Ctrl + M', description: 'Mark question' },
];

// Lab values data
export const LAB_VALUES = {
  hematology: [
    { test: 'WBC', value: '4.5-11.0 × 10³/μL' },
    { test: 'RBC', value: '4.5-5.9 × 10⁶/μL' },
    { test: 'Hemoglobin', value: '13.5-17.5 g/dL (male), 12.0-16.0 g/dL (female)' },
    { test: 'Hematocrit', value: '41-53% (male), 36-46% (female)' },
    { test: 'MCV', value: '80-100 fL' },
    { test: 'Platelets', value: '150-450 × 10³/μL' },
  ],
  chemistry: [
    { test: 'Sodium', value: '135-145 mEq/L' },
    { test: 'Potassium', value: '3.5-5.0 mEq/L' },
    { test: 'Chloride', value: '98-106 mEq/L' },
    { test: 'CO2', value: '23-29 mEq/L' },
    { test: 'BUN', value: '7-20 mg/dL' },
    { test: 'Creatinine', value: '0.6-1.2 mg/dL' },
    { test: 'Glucose', value: '70-99 mg/dL' },
    { test: 'Calcium', value: '8.5-10.2 mg/dL' },
  ],
  liver: [
    { test: 'ALT', value: '10-40 U/L' },
    { test: 'AST', value: '10-40 U/L' },
    { test: 'ALP', value: '30-120 U/L' },
    { test: 'Total Bilirubin', value: '0.3-1.2 mg/dL' },
    { test: 'Albumin', value: '3.5-5.0 g/dL' },
    { test: 'Total Protein', value: '6.0-8.0 g/dL' },
  ],
  cardiac: [
    { test: 'Troponin I', value: '<0.04 ng/mL' },
    { test: 'CK-MB', value: '0-3 ng/mL' },
    { test: 'BNP', value: '<100 pg/mL' },
  ],
  coagulation: [
    { test: 'PT', value: '11-13.5 seconds' },
    { test: 'INR', value: '0.8-1.1' },
    { test: 'aPTT', value: '25-35 seconds' },
  ],
};

// Tutorial steps
export const TUTORIAL_STEPS = [
  {
    target: 'header',
    content: 'This is the main navigation bar. You can navigate between questions and access various tools.',
  },
  {
    target: '.question-number',
    content: 'Shows your current progress through the test.',
  },
  {
    target: '.nav-buttons',
    content: 'Use these buttons to move between questions.',
  },
  {
    target: '.mark-button',
    content: 'Mark questions for review. Marked questions will show a flag icon.',
  },
  {
    target: '.end-test-button',
    content: 'End the test and submit your answers.',
  },
  {
    target: '.fullscreen-button',
    content: 'Toggle full screen mode for better focus.',
  },
  {
    target: '.lab-values-button',
    content: 'View reference lab values during the test.',
  },
  {
    target: '.calculator-button',
    content: 'Open the built-in calculator for calculations.',
  },
  {
    target: '.settings-button',
    content: 'Open settings to customize font size, theme, and other preferences.',
  },
  {
    target: '.question-sidebar',
    content: 'Quickly jump to any question. Colored indicators show your progress (green = correct, red = incorrect).',
  },
  {
    target: '.options-container',
    content: 'Select your answer by clicking on an option.',
  },
  {
    target: '.submit-button',
    content: 'Submit your answer to see if it\'s correct.',
  },
  {
    target: '.explanation-panel',
    content: 'After submitting, you\'ll see detailed explanations here.',
  },
  {
    target: '.footer',
    content: 'Track your time and access additional features.',
  },
];
