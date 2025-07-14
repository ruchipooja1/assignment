using System.ComponentModel.DataAnnotations;

public class OrderRequest
{
   
    public string? Symbol { get; set; }

    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }
}
