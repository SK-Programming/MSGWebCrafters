namespace Crud_Api.Models
{
    public class AddCartItemDto
    {
        public Guid OwnerId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
