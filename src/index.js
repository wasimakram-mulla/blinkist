import './styles.css';
import { trackPageview, trackEvent } from './analytics-api.js';

// Helper function to get a random variation ID
function getRandomVariation(variations) {
  const variationIds = Object.keys(variations);
  const randomIndex = Math.floor(Math.random() * variationIds.length);
  return variationIds[randomIndex];
}

// Check if the user has already been assigned a variation for this test
function getUserVariation(testId) {
  const variation = localStorage.getItem(`ab_test_${testId}`);
  return variation;
}

// Set the user's variation for this test
function setUserVariation(testId, variationId) {
  localStorage.setItem(`ab_test_${testId}`, variationId);
}

// Send an analytics event for a click on the sign up button
function sendAnalyticsEvent(testId, variationId) {
  const payload = {
    url: window.location.href,
    testId: testId,
    variationId: variationId,
    eventType: 'click',
    element: 'sign_up_button',
  };
  // Call the analytics API to send the payload
  trackEvent(payload);
}

// Handle clicks on the sign up button
function onSignUpButtonClick(event, testId, variations) {
  event.preventDefault();
  const variationId =
    getUserVariation(testId) || getRandomVariation(variations);
  sendAnalyticsEvent(testId, variationId);
}

// Track Page View while loading the page at the beginning or refresh
function trackPageviewOnLoad(variationId, variation) {
  const params = {
    url: window.location.href,
    variationDets: { variationId, variation },
  };
  // Call the analytics page view API with params payload
  trackPageview(params);
}

// Main function to run the AB test on a page
function runABTest(testId, variations) {
  // Below line, will check and generate random variation for each new user and same variation for existing user (even if refreshed).
  const variationId =
    getUserVariation(testId) || getRandomVariation(variations);

  // Remove below line to stop adding to WebStorage, also removing this will line will keep randomizing the variation values
  setUserVariation(testId, variationId);

  const variation = variations[variationId];
  trackPageviewOnLoad(variationId, variation);

  document.getElementById('disp_variation_text').innerHTML = variation.dispText;
}

// Example usage
const testId = 'Test_1';

const variations = {
  variation_1: {
    dispId: 1,
    dispText: 'Meet the app that revolutionized reading.',
  },
  variation_2: {
    dispId: 2,
    dispText: 'Meet the app that has 18 million users.',
  },
};

const signUpButton = document.getElementById('sign_up_button');
signUpButton.addEventListener('click', (e) => {
  onSignUpButtonClick(e, testId, variations);
});

runABTest(testId, variations);
