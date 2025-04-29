import React, { useState } from "react";
import { Typography, Card, Input, Space, Select, notification } from "antd";
import DashboardLayout from "../templates/DashboardLayout";
import StockTable from "../organisms/StockTable";
import useStocks from "../../hooks/useStocks";
import ActionButton from "../atoms/ActionButton";

const { Title, Text } = Typography;
const { Option } = Select;

const DEFAULT_STOCKS = [
  "AAPL",
  "MSFT",
  "AMZN",
  "GOOGL",
  "META",
  "TSLA",
  "NVDA",
];

const POPULAR_STOCKS = [
  "AAPL",
  "MSFT",
  "AMZN",
  "GOOGL",
  "META",
  "TSLA",
  "NVDA",
  "NFLX",
  "PYPL",
  "INTC",
];

const HomePage: React.FC = () => {
  const [newSymbol, setNewSymbol] = useState("");
  const [selectedDefaultSymbol, setSelectedDefaultSymbol] = useState<
    string | undefined
  >();

  const { stocks, loading, error, fetchStocks, refreshStocks } =
    useStocks(DEFAULT_STOCKS);

  const handleAddSymbol = () => {
    if (!newSymbol) return;

    const symbol = newSymbol.trim().toUpperCase();

    if (stocks.some((stock) => stock.symbol === symbol)) {
      notification.warning({
        message: "Symbol already exists",
        description: `${symbol} is already in your watchlist.`,
      });
      return;
    }

    fetchStocks([...stocks.map((s) => s.symbol), symbol])
      .then(() => {
        setNewSymbol("");
        notification.success({
          message: "Symbol added",
          description: `${symbol} has been added to your watchlist.`,
        });
      })
      .catch(() => {
        notification.error({
          message: "Failed to add symbol",
          description: `Could not fetch data for ${symbol}. Please check the symbol and try again.`,
        });
      });
  };

  const handleAddDefaultSymbol = () => {
    if (!selectedDefaultSymbol) return;

    if (stocks.some((stock) => stock.symbol === selectedDefaultSymbol)) {
      notification.warning({
        message: "Symbol already exists",
        description: `${selectedDefaultSymbol} is already in your watchlist.`,
      });
      return;
    }

    fetchStocks([...stocks.map((s) => s.symbol), selectedDefaultSymbol]).then(
      () => {
        setSelectedDefaultSymbol(undefined);
      },
    );
  };

  return (
    <DashboardLayout title="Stock Price Dashboard">
      <Card className="mb-6">
        <Title level={4}>Add Stocks to Your Watchlist</Title>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <Text className="block mb-2">Add custom symbol:</Text>
            <Space.Compact style={{ width: "100%" }}>
              <Input
                placeholder="Enter stock symbol (e.g., AAPL)"
                value={newSymbol}
                onChange={(e) => setNewSymbol(e.target.value)}
                onPressEnter={handleAddSymbol}
              />
              <ActionButton
                label="Add"
                iconType="plus"
                onClick={handleAddSymbol}
              />
            </Space.Compact>
          </div>

          <div className="flex-1 mt-4 md:mt-0">
            <Text className="block mb-2">Add from popular stocks:</Text>
            <Space.Compact style={{ width: "100%" }}>
              <Select
                placeholder="Select a stock"
                style={{ width: "100%" }}
                value={selectedDefaultSymbol}
                onChange={(value) => setSelectedDefaultSymbol(value)}
              >
                {POPULAR_STOCKS.map((symbol) => (
                  <Option key={symbol} value={symbol}>
                    {symbol}
                  </Option>
                ))}
              </Select>
              <ActionButton
                label="Add"
                iconType="plus"
                onClick={handleAddDefaultSymbol}
                disabled={!selectedDefaultSymbol}
              />
            </Space.Compact>
          </div>
        </div>
      </Card>

      <Card>
        <Title level={4} className="m-0">
          Watchlist
        </Title>

        <StockTable
          stocks={stocks}
          loading={loading}
          error={error}
          onRefresh={refreshStocks}
        />
      </Card>
    </DashboardLayout>
  );
};

export default HomePage;
