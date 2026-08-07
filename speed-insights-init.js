// Vercel Speed Insights initialization for static HTML site
// This script injects Speed Insights tracking when the page loads

(function() {
  // Inline the minimal required code from @vercel/speed-insights
  // to avoid needing a build step for static HTML
  
  var speedInsightsVersion = '2.0.0';
  var speedInsightsName = '@vercel/speed-insights';
  
  function isBrowser() {
    return typeof window !== 'undefined';
  }
  
  function isDevelopment() {
    try {
      return window.location.hostname === 'localhost' || 
             window.location.hostname === '127.0.0.1' ||
             window.location.hostname.includes('local');
    } catch {
      return false;
    }
  }
  
  function initQueue() {
    if (window.si) return;
    window.si = function() {
      window.siq = window.siq || [];
      window.siq.push(arguments);
    };
  }
  
  function getScriptSrc() {
    if (isDevelopment()) {
      return 'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js';
    }
    return '/_vercel/speed-insights/script.js';
  }
  
  function injectSpeedInsights() {
    if (!isBrowser()) return;
    
    initQueue();
    
    var src = getScriptSrc();
    
    // Check if script is already loaded
    if (document.head.querySelector('script[src*="' + src + '"]')) {
      return;
    }
    
    var script = document.createElement('script');
    script.src = src;
    script.defer = true;
    
    // Add dataset attributes for Speed Insights
    script.dataset.sdkn = speedInsightsName;
    script.dataset.sdkv = speedInsightsVersion;
    
    script.onerror = function() {
      console.log(
        '[Vercel Speed Insights] Failed to load script from ' + src + 
        '. Please check if any content blockers are enabled and try again.'
      );
    };
    
    document.head.appendChild(script);
  }
  
  // Initialize Speed Insights when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSpeedInsights);
  } else {
    injectSpeedInsights();
  }
})();
