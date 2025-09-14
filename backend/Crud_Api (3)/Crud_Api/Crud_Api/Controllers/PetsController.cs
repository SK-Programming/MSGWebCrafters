using Crud_Api.Data;
using Crud_Api.Models;
using Crud_Api.Models.Entities;
using Crud_Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Crud_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly ImageService _imageService;

        public PetsController(AppDbContext dbContext, ImageService imageService)
        {
            _dbContext = dbContext;
            _imageService = imageService;
        }

        [HttpGet]
        public IActionResult GetAllPets()
        {
            var pets = _dbContext.Pets.Include(p => p.Owner).ToList();
            return Ok(pets);
        }

        [HttpGet("{id:guid}")]
        public IActionResult GetPetById(Guid id)
        {
            var pet = _dbContext.Pets.Include(p => p.Owner).FirstOrDefault(p => p.PetId == id);
            if (pet is null) return NotFound();
            return Ok(pet);
        }

        [HttpPost]
        public async Task<IActionResult> AddPet([FromForm] AddPetDto dto, IFormFile imageFile)
        {
            try
            {
               
                var owner = await _dbContext.Users.FindAsync(dto.OwnerId);
                if (owner == null)
                    return BadRequest("Invalid OwnerId");

                string imageUrl = null;
                if (imageFile != null)
                {
                    imageUrl = await _imageService.SaveImageAsync(imageFile, "pets");
                }

                var petEntity = new Pet
                {
                    PetId = Guid.NewGuid(),
                    OwnerId = dto.OwnerId,
                    Name = dto.Name,
                    Species = dto.Species,
                    Breed = dto.Breed,
                    Age = dto.Age,
                    Gender = dto.Gender,
                    ImageUrl = imageUrl
                };

                _dbContext.Pets.Add(petEntity);
                await _dbContext.SaveChangesAsync();

                var petWithOwner = await _dbContext.Pets
                    .Include(p => p.Owner)
                    .FirstOrDefaultAsync(p => p.PetId == petEntity.PetId);

                return Ok(petWithOwner);
            }
            catch (Exception ex)
            {
              
                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }


        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdatePet(Guid id, [FromForm] UpdatePetDto dto, IFormFile imageFile)
        {
            var pet = _dbContext.Pets.Find(id);
            if (pet is null) return NotFound();

            if (imageFile != null)
            {
                _imageService.DeleteImage(pet.ImageUrl);
                pet.ImageUrl = await _imageService.SaveImageAsync(imageFile, "pets");
            }

            pet.Name = dto.Name;
            pet.Species = dto.Species;
            pet.Breed = dto.Breed;
            pet.Age = dto.Age;
            pet.Gender = dto.Gender;

            _dbContext.SaveChanges();
            return Ok(pet);
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeletePet(Guid id)
        {
            var pet = _dbContext.Pets.Find(id);
            if (pet is null) return NotFound();

            _imageService.DeleteImage(pet.ImageUrl);
            _dbContext.Pets.Remove(pet);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}