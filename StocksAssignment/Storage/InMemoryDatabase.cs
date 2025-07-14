public static class InMemoryDatabase
{

	private static decimal _cashBalance = 10000m;
	private static Dictionary<string, int> _holdings = new Dictionary<string, int> ();
	private static Dictionary<string, StockQuote> _stockQuotes = new() {
	 { "Apple", new StockQuote { Symbol = "Apple", Price = 180 } }

	 };
	private static List<OrderHistoryItem> _orderHistory = new();

	 public static decimal GetCashBalance() => _cashBalance;
	 public static void DecreaseCashBalance(decimal amount) => _cashBalance -= amount;
	 public static void AddHolding(string symbol, int quantity)
	 {
		if (!_holdings.ContainsKey(symbol)) 
		_holdings[symbol] = 0;


		_holdings[symbol] += quantity;
	 }
	public static Dictionary<string, int> GetHoldings() => _holdings;

	public static StockQuote GetStockQuote(string symbol) {
		_stockQuotes.TryGetValue(symbol, out var quote);
		return quote ?? new StockQuote { Symbol = symbol, Price = 0};

	}

	
	
	 public static void RecordOrder(string symbol, int quantity, decimal price)
	 {
		_orderHistory.Add(new OrderHistoryItem
		{
			Symbol = symbol,
			Quantity = quantity,
			Price = price,
			Timestamp = DateTime.UtcNow
		});
	}


	public static IEnumerable<OrderHistoryItem> GetOrderHistory() => _orderHistory;

}