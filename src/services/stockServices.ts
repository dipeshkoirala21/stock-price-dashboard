export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  sparkline?: number[];
}

export interface StockQuote {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
  t: number; // Timestamp
}

export const fetchStockQuote = async (symbol: string): Promise<StockData> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/quote?symbol=${symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${symbol}`);
    }

    const data: StockQuote = await response.json();

    return {
      symbol,
      price: data.c,
      change: data.d,
      changePercent: data.dp,
      sparkline: Array.from(
        { length: 15 },
        () => data.c + Math.random() * 2 - 1, //generating random chart to avoid hitting the free tier
      ),
    };
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    throw error;
  }
};

export const fetchStocksService = async (
  symbols: string[],
): Promise<StockData[]> => {
  try {
    const stockPromises = symbols.map((symbol) => fetchStockQuote(symbol));
    return await Promise.all(stockPromises);
  } catch (error) {
    console.error("Error fetching stocks:", error);
    throw error;
  }
};
