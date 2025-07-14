public class OrderResponse
{ 
   public bool IsSuccess { get; set; }
    public string? ErrorMessage { get; set; }
    public object? NewBalance { get; set; }
}