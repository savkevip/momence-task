export const handler = async () => {
    try {
      const response = await fetch(
        "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt",
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.text();
  
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
        },
        body: data,
      };
    } catch (error) {
      console.error("API Error:", error);
  
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Server error" }),
      };
    }
  };