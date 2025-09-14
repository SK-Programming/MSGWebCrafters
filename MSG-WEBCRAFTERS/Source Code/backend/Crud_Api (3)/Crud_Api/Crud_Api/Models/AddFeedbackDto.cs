namespace Crud_Api.Models
{
    public class AddFeedbackDto
    {
        public Guid UserId { get; set; }
        public Guid TargetId { get; set; }
        public string TargetType { get; set; } = "";
        public int Rating { get; set; }
        public string Comment { get; set; } = "";
    }
}
