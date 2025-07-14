public class OrderService : IOrderService {

    // This method executes an order by checking the stock price and user's cash balance.
    public OrderResponse ExecuteOrder(OrderRequest req) { 

    var stock = InMemoryDatabase.GetStockQuote(req.Symbol);
        var totalCost = stock.Price * req.Quantity;
        var balance = InMemoryDatabase.GetCashBalance();
        var holdings = InMemoryDatabase.GetHoldings();

        if (balance < totalCost)
        {
            return new OrderResponse
            {
                IsSuccess = false,
                ErrorMessage = "Insufficient funds."

            };
        }

        InMemoryDatabase.DecreaseCashBalance(totalCost);
        InMemoryDatabase.AddHolding(req.Symbol, req.Quantity);
        InMemoryDatabase.RecordOrder(req.Symbol, req.Quantity, stock.Price);

        return new OrderResponse
        {
            IsSuccess = true,
            ErrorMessage = "Order executed successfully",
            NewBalance = InMemoryDatabase.GetCashBalance()
        };

    }


    public bool ValidateOrder(OrderRequest req, out string validationMessage)
    {
        validationMessage = string.Empty;
        if (string.IsNullOrWhiteSpace(req.Symbol))
        {
            validationMessage = "Stock symbol is required.";
            return false;
        }
        if (req.Quantity <= 0)
        {
            validationMessage = "Quantity must be greater than zero.";
            return false;
        }
        var stock = InMemoryDatabase.GetStockQuote(req.Symbol);
        if (stock == null)
        {
            validationMessage = "Invalid stock symbol.";
            return false;
        }
        var totalCost = stock.Price * req.Quantity;
        var balance = InMemoryDatabase.GetCashBalance();
        if (balance < totalCost)
        {
            validationMessage = "Insufficient funds.";
            return false;
        }
        return true;
    }

    public IEnumerable<OrderHistoryItem> GetOrderHistory()
    {
        return InMemoryDatabase.GetOrderHistory();
    }



}