// The function accepts a callback function (`onPerfEntry`) that will be called when performance metrics are collected.
const reportWebVitals = onPerfEntry => {
  // Check if the callback function (`onPerfEntry`) is provided and if it's a function.
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the "web-vitals" library. This is used to measure web vitals (performance metrics).
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // These functions will call the provided callback (`onPerfEntry`) with performance data for different web vitals.
      getCLS(onPerfEntry); // Cumulative Layout Shift (CLS): Measures the visual stability of the page.
      getFID(onPerfEntry); // First Input Delay (FID): Measures the time from when the user first interacts with the page.
      getFCP(onPerfEntry); // First Contentful Paint (FCP): Measures the time it takes for the first piece of content to appear.
      getLCP(onPerfEntry); // Largest Contentful Paint (LCP): Measures the time it takes for the largest content element to appear.
      getTTFB(onPerfEntry); // Time to First Byte (TTFB): Measures how long it takes for the first byte of the page to load.
    });
  }
};

// Export the "reportWebVitals" function to be used in other parts of the app.
export default reportWebVitals;
