public interface IOrderService
{
    OrderResponse ExecuteOrder(OrderRequest request);
    bool ValidateOrder(OrderRequest request, out string validationMessage);
    IEnumerable<OrderHistoryItem> GetOrderHistory();
}
