using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Crud_Api.Models.Entities
{
    public class User
    {
        [Key]
        public Guid UserId { get; set; }
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string PasswordHash { get; set; } = "";
        public string Role { get; set; } = ""; 
        public string ContactNumber { get; set; } = "";
        public string Address { get; set; } = "";
        public string ImageUrl { get; set; } = "";

    }
    public class Pet
    {
        [Key]
        public Guid PetId { get; set; }

        [ForeignKey("User")]
        public Guid OwnerId { get; set; }

        public string Name { get; set; } = "";
        public string Species { get; set; } = "";       
        public string Breed { get; set; } = "";
        public int Age { get; set; }
        public string Gender { get; set; } = "";
        public string ImageUrl { get; set; } = "";


        public User? Owner { get; set; }
    }
    public class Appointment
    {
        [Key]
        public Guid AppointmentId { get; set; }

        [ForeignKey("Pet")]
        public Guid PetId { get; set; }

        [ForeignKey("Owner")]
        public Guid OwnerId { get; set; }

        [ForeignKey("Vet")]
        public Guid VetId { get; set; }

        public DateTime AppointmentTime { get; set; }
        public string Status { get; set; } = "Pending";

        public Pet? Pet { get; set; }
        public User? Owner { get; set; }
        public User? Vet { get; set; }
    }
    public class HealthRecord
    {
        [Key]
        public Guid RecordId { get; set; }

        [ForeignKey("Pet")]
        public Guid PetId { get; set; }

        [ForeignKey("Vet")]
        public Guid VetId { get; set; }

        public DateTime VisitDate { get; set; }
        public string Diagnosis { get; set; } = "";
        public string Treatment { get; set; } = "";
        public string Allergies { get; set; } = "";
        public string Vaccination { get; set; } = "";

        public Pet? Pet { get; set; }
        public User? Vet { get; set; }
    }
    public class Product
    {
        [Key]
        public Guid ProductId { get; set; }

        public string Name { get; set; } = "";
        public string Category { get; set; } = "";
        public decimal Price { get; set; }
        public string Description { get; set; } = "";
        public int StockQuantity { get; set; }
        public string ImageUrl { get; set; } = "";
    }
    public class CartItem
    {
        [Key]
        public Guid CartItemId { get; set; }

        [ForeignKey("User")]
        public Guid OwnerId { get; set; }

        [ForeignKey("Product")]
        public Guid ProductId { get; set; }

        public int Quantity { get; set; }

        public User? Owner { get; set; }
        public Product? Product { get; set; }
    }
    public class AdoptionListing
    {
        [Key]
        public Guid ListingId { get; set; }

        [ForeignKey("Shelter")]
        public Guid ShelterId { get; set; }

        public string PetName { get; set; } = "";
        public string Species { get; set; } = "";
        public string Breed { get; set; } = "";
        public int Age { get; set; }
        public string HealthStatus { get; set; } = "";
        public string Status { get; set; } = "Available";
        public string ImageUrl { get; set; } = "";

        public User? Shelter { get; set; }
    }
    public class Feedback
    {
        [Key]
        public Guid FeedbackId { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }  

        public Guid TargetId { get; set; } 

        public string TargetType { get; set; } = "";

        public int Rating { get; set; } 
        public string Comment { get; set; } = "";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public User? User { get; set; }
    }
}
