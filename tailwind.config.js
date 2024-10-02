/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {    colors: {
        // Colors for Deuteranopia (Green Blindness)
        'deuteranopia-color1': '#D7D7D7', // Light Gray
        'deuteranopia-color2': '#4A90E2', // Bright Blue for Buttons
        'deuteranopia-color3': '#F5A623', // Orange for Highlights

        // Colors for Protanopia (Red Blindness)
        'protanopia-color1': '#B0B0B0', // Gray
        'protanopia-color2': '#4A90E2', // Bright Blue for Buttons
        'protanopia-color3': '#F8E71C', // Yellow for Highlights

        // Colors for Tritanopia (Blue Blindness)
        'tritanopia-color1': '#D7D7D7', // Light Gray
        'tritanopia-color2': '#F8E71C', // Yellow for Buttons
        'tritanopia-color3': '#B0B0B0', // Gray for Highlights

        // Standard colors for regular vision
        'primary': '#4A90E2', // Primary Blue
        'secondary': '#F5A623', // Secondary Orange
        'success': '#5BBF9A', // Success Green
        'danger': '#F44336', // Danger Red
        'warning': '#FF9800', // Warning Orange
        'info': '#2196F3', // Info Blue
      },
    },
  },
  plugins: [],
}
