using Crud_Api.Data;
using Crud_Api.Models;
using Crud_Api.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;  

namespace Crud_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public AppointmentsController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllAppointments()
        {
            var appointments = dbContext.Appointments
                .Include(a => a.Pet)    
                .Include(a => a.Owner)  
                .Include(a => a.Vet)    
                .ToList();
            return Ok(appointments);
        }

        [HttpGet("{id:guid}")]
        public IActionResult GetAppointmentById(Guid id)
        {
            var appointment = dbContext.Appointments
                .Include(a => a.Pet)    
                .Include(a => a.Owner)  
                .Include(a => a.Vet)    
                .FirstOrDefault(a => a.AppointmentId == id);

            if (appointment is null) return NotFound();
            return Ok(appointment);
        }

        [HttpPost]
        public IActionResult AddAppointment(AddAppointmentDto dto)
        {
            if (!dbContext.Pets.Any(p => p.PetId == dto.PetId))
                return BadRequest("Pet does not exist");

            if (!dbContext.Users.Any(u => u.UserId == dto.OwnerId))
                return BadRequest("Owner does not exist");

            if (!dbContext.Users.Any(u => u.UserId == dto.VetId))
                return BadRequest("Vet does not exist");

            var appointmentEntity = new Appointment
            {
                AppointmentId = Guid.NewGuid(),
                PetId = dto.PetId,
                OwnerId = dto.OwnerId,
                VetId = dto.VetId,
                AppointmentTime = dto.AppointmentTime,
                Status = "Pending"
            };

            dbContext.Appointments.Add(appointmentEntity);
            dbContext.SaveChanges();

            var appointmentWithDetails = dbContext.Appointments
                .Include(a => a.Pet)
                .Include(a => a.Owner)
                .Include(a => a.Vet)
                .FirstOrDefault(a => a.AppointmentId == appointmentEntity.AppointmentId);

            return Ok(appointmentWithDetails);
        }

        [HttpPut("{id:guid}")]
        public IActionResult UpdateAppointment(Guid id, UpdateAppointmentDto dto)
        {
            var appointment = dbContext.Appointments
                .Include(a => a.Pet)
                .Include(a => a.Owner)
                .Include(a => a.Vet)
                .FirstOrDefault(a => a.AppointmentId == id);

            if (appointment is null) return NotFound();

            appointment.AppointmentTime = dto.AppointmentTime;
            appointment.Status = dto.Status;

            dbContext.SaveChanges();

            return Ok(appointment);
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeleteAppointment(Guid id)
        {
            var appointment = dbContext.Appointments.Find(id);
            if (appointment is null) return NotFound();

            dbContext.Appointments.Remove(appointment);
            dbContext.SaveChanges();
            return Ok();
        }
    }
}