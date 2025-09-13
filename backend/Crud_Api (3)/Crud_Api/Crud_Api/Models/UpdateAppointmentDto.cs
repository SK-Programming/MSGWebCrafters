namespace Crud_Api.Models
{
    public class UpdateAppointmentDto
    {
        public DateTime AppointmentTime { get; set; }
        public string Status { get; set; } = "Pending";
    }
}
