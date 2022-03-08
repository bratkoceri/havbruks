using Microsoft.AspNetCore.Mvc;
using Shared.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Shared.Models;

namespace LoggenAPI.Controllers {
    [Route("hblapi/boats")]
    public class BoatsController : Controller {
        private readonly IDatabaseService dbService;

        public BoatsController(IDatabaseService dbSrvc) {
            dbService = dbSrvc;
        }

        public async Task<ActionResult<IEnumerable<Boat>>> GetAllBoats() {
            var boats =  await dbService.GetAllBoats();
            return Ok(boats);
        }

        [Route("{id}")]
        public async Task<ActionResult<Boat>> GetBoat(int id) {
            var boat = await dbService.GetBoat(id);
            if (boat == null) 
                return NotFound();
            return Ok(boat);
        }

        [HttpPost]
        [Route("create")]
        public async Task<ActionResult<Boat>> CreateBoat([FromBody] BoatForm boat) {
            var b = await dbService.CreateNewBoat(boat);
            return Ok(b);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<Boat>> UpdateBoat(int id, [FromBody] BoatForm boat) {
            return Ok(await dbService.UpdateBoat(id, boat));
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteBoat(int id)
        {
            var del = await dbService.DeleteBoat(id);
            if (!del) 
                return NotFound();
            return NoContent();
        }
    }
}
