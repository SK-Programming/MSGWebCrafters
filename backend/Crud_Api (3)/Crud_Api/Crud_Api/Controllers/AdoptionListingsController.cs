using Crud_Api.Data;
using Crud_Api.Models;
using Crud_Api.Models.Entities;
using Crud_Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Crud_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdoptionListingsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly ImageService _imageService;

        public AdoptionListingsController(AppDbContext dbContext, ImageService imageService)
        {
            _dbContext = dbContext;
            _imageService = imageService;
        }

        [HttpGet]
        public IActionResult GetAllAdoptionListings()
        {
            var listings = _dbContext.AdoptionListings.ToList();
            return Ok(listings);
        }

        [HttpGet("{id:guid}")]
        public IActionResult GetAdoptionListingById(Guid id)
        {
            var listing = _dbContext.AdoptionListings.Find(id);
            if (listing is null) return NotFound();
            return Ok(listing);
        }

        [HttpPost]
        public async Task<IActionResult> AddAdoptionListing([FromForm] AddAdoptionListingDto dto, IFormFile imageFile)
        {
            var imageUrl = await _imageService.SaveImageAsync(imageFile, "adoptions");

            var listingEntity = new AdoptionListing
            {
                ListingId = Guid.NewGuid(),
                ShelterId = dto.ShelterId,
                PetName = dto.PetName,
                Species = dto.Species,
                Breed = dto.Breed,
                Age = dto.Age,
                HealthStatus = dto.HealthStatus,
                Status = dto.Status, 
                ImageUrl = imageUrl   
            };

            _dbContext.AdoptionListings.Add(listingEntity);
            _dbContext.SaveChanges();

            return Ok(listingEntity);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateAdoptionListing(Guid id, [FromForm] UpdateAdoptionListingDto dto, IFormFile imageFile)
        {
            var listing = _dbContext.AdoptionListings.Find(id);
            if (listing is null) return NotFound();

            if (imageFile != null)
            {
                _imageService.DeleteImage(listing.ImageUrl);
                listing.ImageUrl = await _imageService.SaveImageAsync(imageFile, "adoptions");
            }

            listing.PetName = dto.PetName;
            listing.Species = dto.Species;
            listing.Breed = dto.Breed;
            listing.Age = dto.Age;
            listing.HealthStatus = dto.HealthStatus;
            listing.Status = dto.Status;

            _dbContext.SaveChanges();
            return Ok(listing);
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeleteAdoptionListing(Guid id)
        {
            var listing = _dbContext.AdoptionListings.Find(id);
            if (listing is null) return NotFound();

            _imageService.DeleteImage(listing.ImageUrl);
            _dbContext.AdoptionListings.Remove(listing);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}