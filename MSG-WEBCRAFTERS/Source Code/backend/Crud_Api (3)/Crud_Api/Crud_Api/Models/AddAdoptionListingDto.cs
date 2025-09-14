namespace Crud_Api.Models
{
    public class AddAdoptionListingDto
    {
        public Guid ShelterId { get; set; }
        public string PetName { get; set; } = "";
        public string Species { get; set; } = "";
        public string Breed { get; set; } = "";
        public int Age { get; set; }
        public string HealthStatus { get; set; } = "";
        public string Status { get; set; } = "Available";
    }
}
