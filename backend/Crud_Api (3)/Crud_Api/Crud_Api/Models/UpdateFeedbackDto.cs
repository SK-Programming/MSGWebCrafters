namespace Crud_Api.Models
{
    public class UpdateFeedbackDto
    {
        public int Rating { get; set; }
        public string Comment { get; set; } = "";
    }
}
