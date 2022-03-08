using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Shared.Interfaces;
using Shared.Models;

namespace LoggenAPI.Controllers
{
    [Route("hblapi/boats/{boatId}/cm")]
    public class CrewController : Controller {
        private readonly IDatabaseService dbService;

        public CrewController(IDatabaseService dbSrvc) {
            dbService = dbSrvc;
        }

        public async Task<ActionResult<IEnumerable<CrewMember>>> GetCrew(int boatId) {
            var crew = await dbService.GetAllCrewMembersForBoat(boatId);
            return Ok(crew);
        }

        [Route("{id}")]
        public async Task<ActionResult<CrewMember>> GetCrewMemeber(int id) {
            var crewMember = await dbService.GetCrewMember(id);
            if (crewMember == null)
                return NotFound();
            return Ok(crewMember);
        }

        [HttpPost]
        [Route("create")]
        public async Task<ActionResult<CrewMember>> CreateCrewMember(int boatId, [FromBody] CrewMemberForm crewMember) {
            var cm = await dbService.CreateNewCrewMember(crewMember, boatId);
            return Ok(cm);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<Boat>> UpdateCrewMember(int id, [FromBody] CrewMemberForm crewMember) {
            return Ok(await dbService.UpdateCrewMember(id, crewMember));
        }
    }
}
