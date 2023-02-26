# blinkist

This is a temporary repository which I'll remove in 1 week

This code defines several functions that can be used to run an AB test on a page:

## getRandomVariation(variations)

Helper function that returns a random variation ID from the provided variations object.

## getUserVariation(testId)

Checks if the user has already been assigned a variation for this test, and returns the variation ID if found.

## setUserVariation(testId, variationId)

Sets the user's variation for this test in localStorage.

## sendAnalyticsEvent(testId, variationId)

Sends an analytics event to track a click on the sign up button, including the test ID and variation ID.

## onSignUpButtonClick(testId, variations)

Event handler function that runs when the user clicks on the sign up button. It checks if the user has already been assigned a variation for this test, and if not, it assigns a random variation and sends an analytics event.

## runABTest(testId, variations)

Main function that runs the AB test on a page. It checks if the user has already been assigned a variation for this test, and if not, it assigns a random variation and sets the variation-specific content (e.g. text and Id) on the page.

This application was created based on basic understanding on Blinkist.
