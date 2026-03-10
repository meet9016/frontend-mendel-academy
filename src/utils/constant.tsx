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
    target: '.mark-question',
    content: 'Mark questions to review later',
    disableBeacon: true,
  },
  {
    target: '.prev-button',
    content: 'Navigate to previous question using the previous button',
    disableBeacon: true,
  },
  {
    target: '.next-button', // Fixed: changed from .next-buttons to .next-button
    content: 'Navigate to next question using the next button',
    disableBeacon: true,
  },
  {
    target: '.full-screen',
    content: 'Toggle between full screen view and regular view',
    disableBeacon: true,
  },
  {
    target: '.lab-button',
    content: 'Reference sheet for lab values',
    disableBeacon: true,
  },
  {
    target: '.calc-button',
    content: 'Provides access to calculator',
    disableBeacon: true,
  },
  {
    target: '.note-button',
    content: 'Add important things to notes',
    disableBeacon: true,
  },
  {
    target: '.color-button',
    content: 'Adjust your color preference using the reverse color option',
    disableBeacon: true,
  },
  {
    target: '.text-button',
    content: 'Adjust your font size using the text zoom option',
    disableBeacon: true,
  },
  {
    target: '.setting-button',
    content: 'Adjust your preferences using the settings option',
    disableBeacon: true,
  },
  {
    target: '.library-button',
    content: 'View medical library articles',
    disableBeacon: true,
  },
  {
    target: '.note-add-button',
    content: 'Add key concepts, tables, and images to your Notebook for later review.',
    disableBeacon: true,
  },
  {
    target: '.flashcard-button',
    content: 'Add important concepts/images to flashcards',
    disableBeacon: true,
  },
  {
    target: '.feedback-button',
    content: 'Provide feedback on an individual question',
    disableBeacon: true,
  },
  {
    target: '.suspend-button',
    content: 'Suspend test to resume later',
    disableBeacon: true,
  },
  {
    target: '.end-button',
    content: 'End the test',
    disableBeacon: true,
  },
];
