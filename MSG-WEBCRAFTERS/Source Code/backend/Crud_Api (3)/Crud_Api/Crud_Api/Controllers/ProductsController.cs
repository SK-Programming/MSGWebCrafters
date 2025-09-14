using Crud_Api.Data;
using Crud_Api.Models;
using Crud_Api.Models.Entities;
using Crud_Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Crud_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly ImageService _imageService;

        public ProductsController(AppDbContext dbContext, ImageService imageService)
        {
            _dbContext = dbContext;
            _imageService = imageService;
        }

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            var products = _dbContext.Products.ToList();
            return Ok(products);
        }

        [HttpGet("{id:guid}")]
        public IActionResult GetProductById(Guid id)
        {
            var product = _dbContext.Products.Find(id);
            if (product is null) return NotFound();
            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromForm] AddProductDto dto, IFormFile imageFile)
        {
            var imageUrl = await _imageService.SaveImageAsync(imageFile, "products");

            var productEntity = new Product
            {
                ProductId = Guid.NewGuid(),
                Name = dto.Name,
                Category = dto.Category,
                Price = dto.Price,
                Description = dto.Description,
                StockQuantity = dto.StockQuantity,
                ImageUrl = imageUrl
            };

            _dbContext.Products.Add(productEntity);
            _dbContext.SaveChanges();

            return Ok(productEntity);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateProduct(Guid id, [FromForm] UpdateProductDto dto, IFormFile imageFile)
        {
            var product = _dbContext.Products.Find(id);
            if (product is null) return NotFound();

            if (imageFile != null)
            {
                _imageService.DeleteImage(product.ImageUrl);
                product.ImageUrl = await _imageService.SaveImageAsync(imageFile, "products");
            }

            product.Name = dto.Name;
            product.Category = dto.Category;
            product.Price = dto.Price;
            product.Description = dto.Description;
            product.StockQuantity = dto.StockQuantity;

            _dbContext.SaveChanges();
            return Ok(product);
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeleteProduct(Guid id)
        {
            var product = _dbContext.Products.Find(id);
            if (product is null) return NotFound();

            _imageService.DeleteImage(product.ImageUrl);
            _dbContext.Products.Remove(product);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}
