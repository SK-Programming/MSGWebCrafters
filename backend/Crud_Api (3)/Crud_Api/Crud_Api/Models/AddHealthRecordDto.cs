namespace Crud_Api.Models
{
    public class AddHealthRecordDto
    {
        public Guid PetId { get; set; }
        public Guid VetId { get; set; }
        public DateTime VisitDate { get; set; }
        public string Diagnosis { get; set; } = "";
        public string Treatment { get; set; } = "";
        public string Allergies { get; set; } = "";
        public string Vaccination { get; set; } = "";
    }
}
