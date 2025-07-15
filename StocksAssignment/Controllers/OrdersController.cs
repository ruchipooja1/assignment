
using Microsoft.AspNetCore.Mvc;


namespace StocksAssignment.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }


        [HttpPost("execute")]
        public IActionResult ExecuteOrder(OrderRequest request)
        {
            Console.WriteLine($"Executing: {request.Symbol}, {request.Quantity}");

            if (!_orderService.ValidateOrder(request, out string message))
            {
                return BadRequest(new { Message = message });
            }

            var response = _orderService.ExecuteOrder(request);

            return response.IsSuccess
                ? Ok(response)
                : BadRequest(response.ErrorMessage);
        }


        [HttpPost("validate")]
        public IActionResult ValidateOrder(OrderRequest request)
        {
            Console.WriteLine($"Validating: {request.Symbol}, {request.Quantity}");


            if (!_orderService.ValidateOrder(request, out string errorMessage))
            {
                return Ok(new OrderResponse
                {
                    IsSuccess = false,
                    ErrorMessage = errorMessage
                });

            }

            return Ok(new OrderResponse
            {
                IsSuccess = true,
                ErrorMessage = null
            });




        }
    }

}