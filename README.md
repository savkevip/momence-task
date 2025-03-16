# Momence Task

Momence Task is a currency exchange application that uses the official **Czech National Bank API**:  
[CNB Exchange Rates](https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt).

## 🚀 Technologies

This project is built with:

- **React** – Frontend framework
- **TypeScript** – Static type checking
- **Styled Components** – CSS-in-JS styling
- **TanStack Query** – Data fetching and caching
- **Formik & Yup** – Form handling and validation
- **Netlify Functions** – API proxy to bypass CORS restrictions
- **Vitest** – Unit testing
- **Playwright** – E2E testing

---

## 🔧 Installation and Local Development

To run the project locally, follow these steps:

### 1️⃣ Clone the repository:

```sh
git clone <repo-url>
cd momence-task
```

### 2️⃣ Install dependencies:

```sh
yarn install
```

### 3️⃣ Run Netlify server:

Since the **API does not allow direct frontend calls due to CORS restrictions**, I used **Netlify Functions** as a proxy.  
To set this up, install **Netlify CLI** globally:

```sh
npm install -g netlify-cli
```

Then start the development server:

```sh
netlify dev
```

This will serve the application at `http://localhost:8888`.

---

## ✅ Testing

### Unit tests (Vitest)

```sh
yarn test
```

### E2E tests (Playwright)

```sh
yarn test:e2e
```
