# Gin&Juice Shop - Playwright (in progress)

UI test automation suite for the Gin & Juice Shop application, implemented with Playwright.

## Prerequisites
- Node.js
- npm or yarn
- Playwright

## Running tests
- Run all tests (headless):
```bash
npx playwright test
```
## Test Cases Created**

- `tests/login.spec.js`: 
  - successful login
  - login with wrong username
  - login with wrong password

- `tests/cart.spec.js`:
  - add one product to cart
  - add two products to cart
  - edit quantity on cart
  - remove product from cart

- `tests/viewProducts.spec.js`:
  - view all products in the list
  - only a book is visible when filtered by books
