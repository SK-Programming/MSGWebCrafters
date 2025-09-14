using Crud_Api.Data;
using Crud_Api.Models;
using Crud_Api.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Crud_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public CartController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("{ownerId:guid}")]
        public IActionResult GetCartByOwner(Guid ownerId)
        {
            var cartItems = dbContext.CartItems
                .Include(c => c.Product)
                .Include(c => c.Owner)
                .Where(c => c.OwnerId == ownerId)
                .ToList();

            return Ok(cartItems);
        }

        [HttpPost]
        public IActionResult AddCartItem(AddCartItemDto dto)
        {
            var cartItem = new CartItem
            {
                CartItemId = Guid.NewGuid(),
                OwnerId = dto.OwnerId,
                ProductId = dto.ProductId,
                Quantity = dto.Quantity
            };

            dbContext.CartItems.Add(cartItem);
            dbContext.SaveChanges();

            return Ok(cartItem);
        }

        [HttpPut("{id:guid}")]
        public IActionResult UpdateCartItem(Guid id, UpdateCartItemDto dto)
        {
            var cartItem = dbContext.CartItems.Find(id);
            if (cartItem is null) return NotFound();

            cartItem.Quantity = dto.Quantity;
            dbContext.SaveChanges();

            return Ok(cartItem);
        }

        [HttpDelete("{id:guid}")]
        public IActionResult RemoveCartItem(Guid id)
        {
            var cartItem = dbContext.CartItems.Find(id);
            if (cartItem is null) return NotFound();

            dbContext.CartItems.Remove(cartItem);
            dbContext.SaveChanges();

            return Ok();
        }
    }
}
