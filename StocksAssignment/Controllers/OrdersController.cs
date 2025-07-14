
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
        public IActionResult ExecuteOrder(OrderRequest req)
        {
            if (!_orderService.ValidateOrder(req, out string message))
            {
                return BadRequest(new { Message = message });
            }

            var response = _orderService.ExecuteOrder(req);

            return response.IsSuccess
                ? Ok(response)
                : BadRequest(response.ErrorMessage);
        }


        [HttpPost("validate")]
        public IActionResult ValidateOrder(OrderRequest request)
        {
            if (!_orderService.ValidateOrder(request, out string message))
            {
                return BadRequest(new { Message = message });
            }
            return Ok(new { Message = "Order is valid" });
        }



    }
}