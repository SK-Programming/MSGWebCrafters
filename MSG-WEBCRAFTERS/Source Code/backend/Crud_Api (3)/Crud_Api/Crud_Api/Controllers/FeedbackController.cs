using Crud_Api.Data;
using Crud_Api.Models;
using Crud_Api.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Crud_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public FeedbackController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllFeedback()
        {
            var feedbacks = dbContext.Feedbacks
                .Include(f => f.User)
                .ToList();

            return Ok(feedbacks);
        }

        [HttpGet("{id:guid}")]
        public IActionResult GetFeedbackById(Guid id)
        {
            var feedback = dbContext.Feedbacks
                .Include(f => f.User)
                .FirstOrDefault(f => f.FeedbackId == id);

            if (feedback is null) return NotFound();
            return Ok(feedback);
        }

        [HttpPost]
        public IActionResult AddFeedback(AddFeedbackDto dto)
        {
            var feedbackEntity = new Feedback
            {
                FeedbackId = Guid.NewGuid(),
                UserId = dto.UserId,
                TargetId = dto.TargetId,
                TargetType = dto.TargetType,
                Rating = dto.Rating,
                Comment = dto.Comment,
                CreatedAt = DateTime.UtcNow
            };

            dbContext.Feedbacks.Add(feedbackEntity);
            dbContext.SaveChanges();

            return Ok(feedbackEntity);
        }

        [HttpPut("{id:guid}")]
        public IActionResult UpdateFeedback(Guid id, UpdateFeedbackDto dto)
        {
            var feedback = dbContext.Feedbacks.Find(id);
            if (feedback is null) return NotFound();

            feedback.Rating = dto.Rating;
            feedback.Comment = dto.Comment;

            dbContext.SaveChanges();
            return Ok(feedback);
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeleteFeedback(Guid id)
        {
            var feedback = dbContext.Feedbacks.Find(id);
            if (feedback is null) return NotFound();

            dbContext.Feedbacks.Remove(feedback);
            dbContext.SaveChanges();

            return Ok();
        }
    }
}
