import React, { useState } from "react";
import { Row, Col, Table, Input, Alert } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import LoadingSpinner from "../atoms/LoadingSpinner";
import { StockData } from "../../services/stockServices";
import { Sparklines, SparklinesLine } from "react-sparklines";
import ActionButton from "../atoms/ActionButton";

interface StockTableProps {
  stocks: StockData[];
  loading: boolean;
  error: string | null;
  onRefresh?: () => void;
}

const StockTable: React.FC<StockTableProps> = ({
  stocks,
  loading,
  error,
  onRefresh,
}) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredStocks = stocks.filter((stock) =>
    stock.symbol.toLowerCase().includes(searchText.toLowerCase()),
  );

  const columns: ColumnsType<StockData> = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      align: "center",
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
      align: "center",
      sorter: (a, b) => a.price - b.price,
      render: (price) => price.toFixed(2),
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "change",
      align: "center",
      sorter: (a, b) => a.change - b.change,
      render: (change) => (
        <span style={{ color: change >= 0 ? "green" : "red" }}>
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Change %",
      dataIndex: "changePercent",
      key: "changePercent",
      align: "center",
      sorter: (a, b) => a.changePercent - b.changePercent,
      render: (changePercent) => (
        <span style={{ color: changePercent >= 0 ? "green" : "red" }}>
          {changePercent >= 0 ? "+" : ""}
          {changePercent.toFixed(2)}%
        </span>
      ),
    },
    {
      title: "Trend",
      dataIndex: "sparkline",
      key: "sparkline",
      align: "center",
      render: (data: number[] | undefined, record) =>
        data ? (
          <div className="w-24">
            <Sparklines data={data} width={80} height={20}>
              <SparklinesLine color={record.change >= 0 ? "green" : "red"} />
            </Sparklines>
          </div>
        ) : (
          "-"
        ),
    },
  ];
  const lastDataUpdated = new Date().toLocaleString();

  return (
    <div>
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="mb-4"
        />
      )}

      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col>
          <Input
            placeholder="Search by symbol"
            value={searchText}
            onChange={handleSearch}
            prefix={<SearchOutlined />}
            style={{ width: 200, marginRight: 8 }}
          />
          {onRefresh && (
            <ActionButton
              label="Refresh"
              iconType="sync"
              onClick={onRefresh}
              disabled={loading}
            />
          )}
        </Col>

        <Col>
          <div style={{ fontSize: "14px", color: "#000", marginTop: "10px" }}>
            Last updated: {lastDataUpdated}
          </div>
        </Col>
      </Row>
      {loading ? (
        <LoadingSpinner tip="Loading stock data..." />
      ) : (
        <Table
          rowKey="symbol"
          columns={columns}
          dataSource={filteredStocks}
          pagination={{
            pageSize: 10,
          }}
          loading={loading}
          locale={{ emptyText: "No stock data available" }}
          scroll={{ x: "max-content" }}
        />
      )}
    </div>
  );
};

export default StockTable;
