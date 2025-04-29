import { useState, useEffect } from "react";
import { StockData, fetchStocksService } from "../services/stockServices";

interface UseStocksState {
  stocks: StockData[];
  loading: boolean;
  error: string | null;
  fetchStocks: (symbols?: string[]) => Promise<void>;
  refreshStocks: () => Promise<void>;
}

export const useStocks = (initialSymbols: string[] = []): UseStocksState => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [symbols, setSymbols] = useState<string[]>(initialSymbols);

  const fetchStocks = async (newSymbols?: string[]) => {
    if (newSymbols && newSymbols.length > 0) {
      setSymbols(newSymbols);
    }

    const symbolsToFetch = newSymbols || symbols;

    if (symbolsToFetch.length === 0) {
      setStocks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const stockData = await fetchStocksService(symbolsToFetch);
      setStocks(stockData);
    } catch (err) {
      setError("Failed to fetch the data. Please try again later.");
      console.error("Error in useStocks hook:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshStocks = async () => {
    return fetchStocks();
  };

  useEffect(() => {
    if (symbols.length > 0) {
      fetchStocks();
    } else {
      setLoading(false);
    }
  }, []);

  return {
    stocks,
    loading,
    error,
    fetchStocks,
    refreshStocks,
  };
};

export default useStocks;
