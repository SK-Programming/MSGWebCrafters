using Crud_Api.Data;
using Crud_Api.Models;
using Crud_Api.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Crud_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthRecordsController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public HealthRecordsController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllHealthRecords()
        {
            var records = dbContext.HealthRecords
                .Include(r => r.Pet)
                .Include(r => r.Vet)
                .ToList();

            return Ok(records);
        }

        [HttpGet("{id:guid}")]
        public IActionResult GetHealthRecordById(Guid id)
        {
            var record = dbContext.HealthRecords
                .Include(r => r.Pet)
                .Include(r => r.Vet)
                .FirstOrDefault(r => r.RecordId == id);

            if (record is null) return NotFound();
            return Ok(record);
        }

        [HttpPost]
        public IActionResult AddHealthRecord(AddHealthRecordDto dto)
        {
            var recordEntity = new HealthRecord
            {
                RecordId = Guid.NewGuid(),
                PetId = dto.PetId,
                VetId = dto.VetId,
                VisitDate = dto.VisitDate,
                Diagnosis = dto.Diagnosis,
                Treatment = dto.Treatment,
                Allergies = dto.Allergies,
                Vaccination = dto.Vaccination,
            };

            dbContext.HealthRecords.Add(recordEntity);
            dbContext.SaveChanges();

            return Ok(recordEntity);
        }

        [HttpPut("{id:guid}")]
        public IActionResult UpdateHealthRecord(Guid id, UpdateHealthRecordDto dto)
        {
            var record = dbContext.HealthRecords.Find(id);
            if (record is null) return NotFound();

            record.VisitDate = dto.VisitDate;
            record.Diagnosis = dto.Diagnosis;
            record.Treatment = dto.Treatment;
            record.Allergies = dto.Allergies;
            record.Vaccination = dto.Vaccination;

            dbContext.SaveChanges();
            return Ok(record);
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeleteHealthRecord(Guid id)
        {
            var record = dbContext.HealthRecords.Find(id);
            if (record is null) return NotFound();

            dbContext.HealthRecords.Remove(record);
            dbContext.SaveChanges();
            return Ok();
        }
    }
}
