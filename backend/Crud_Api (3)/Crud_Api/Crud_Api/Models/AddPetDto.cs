namespace Crud_Api.Models
{
    public class AddPetDto
    {
        public Guid OwnerId { get; set; }
        public string Name { get; set; } = "";
        public string Species { get; set; } = "";
        public string Breed { get; set; } = "";
        public int Age { get; set; }
        public string Gender { get; set; } = "";

    }
}
