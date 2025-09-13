namespace Crud_Api.Models
{
    public class AddAppointmentDto
    {
        public Guid PetId { get; set; }
        public Guid OwnerId { get; set; }
        public Guid VetId { get; set; }
        public DateTime AppointmentTime { get; set; }
    }
}
