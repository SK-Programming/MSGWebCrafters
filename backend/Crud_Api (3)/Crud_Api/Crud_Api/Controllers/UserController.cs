using Crud_Api.Data;
using Crud_Api.Models;
using Crud_Api.Models.Entities;
using Crud_Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Crud_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly ImageService _imageService;

        public UsersController(AppDbContext dbContext, ImageService imageService)
        {
            _dbContext = dbContext;
            _imageService = imageService;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _dbContext.Users.ToList();
            return Ok(users);
        }

        [HttpGet("{id:guid}")]
        public IActionResult GetUserById(Guid id)
        {
            var user = _dbContext.Users.Find(id);
            if (user is null) return NotFound();
            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromForm] AddUserDto dto, IFormFile imageFile)
        {
            var imageUrl = await _imageService.SaveImageAsync(imageFile, "users");

            var userEntity = new User
            {
                UserId = Guid.NewGuid(),
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = "", 
                Role = dto.Role,
                ContactNumber = dto.ContactNumber,
                Address = dto.Address,
                ImageUrl = imageUrl
            };

            _dbContext.Users.Add(userEntity);
            _dbContext.SaveChanges();

            return Ok(userEntity);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromForm] UpdateUserDto dto, IFormFile imageFile)
        {
            var user = _dbContext.Users.Find(id);
            if (user is null) return NotFound();

            if (imageFile != null)
            {
                _imageService.DeleteImage(user.ImageUrl);
                user.ImageUrl = await _imageService.SaveImageAsync(imageFile, "users");
            }

            user.Name = dto.Name;
            user.Email = dto.Email;
            user.Role = dto.Role;
            user.ContactNumber = dto.ContactNumber;
            user.Address = dto.Address;

            _dbContext.SaveChanges();
            return Ok(user);
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeleteUser(Guid id)
        {
            var user = _dbContext.Users.Find(id);
            if (user is null) return NotFound();

            _imageService.DeleteImage(user.ImageUrl);
            _dbContext.Users.Remove(user);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}