using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shared.Interfaces;
using Shared.Models;

namespace LoggenData
{
    public class DatabaseService : IDatabaseService {
        private readonly LoggenDataContext dbContext;

        public DatabaseService(LoggenDataContext ctx) {
            dbContext = ctx;
        }

        public async Task<Boat> CreateNewBoat(BoatForm boat) {
            Boat b = new Boat() {
                Name = boat.Name,
                Producer = boat.Producer,
                BuildNumber = boat.BuildNumber,
                LOA = boat.LOA,
                Picture = boat.Picture,
                B = boat.B
            };

            await dbContext.BoatsTable.AddAsync(b);
            await dbContext.SaveChangesAsync();
            return b;
        }

        public async Task<CrewMember> CreateNewCrewMember(CrewMemberForm crewMember, int boatId) {
            var boat = await dbContext.BoatsTable.FirstOrDefaultAsync(x => x.Id == boatId);
            CrewMember cm = new CrewMember {
                Age = crewMember.Age,
                Name = crewMember.Name,
                Email = crewMember.Email,
                //CertifiedUntil = crewMember.CertifiedUntil,
                Role = crewMember.Role,
                Picture = crewMember.Picture
            };
            if (boat.Crew == null) {
                boat.Crew = new List<CrewMember>();
            }
            boat.Crew.Add(cm);
            await dbContext.SaveChangesAsync();
            return cm;
        }

        public async Task<bool> DeleteBoat(int id) {
            var boat = await dbContext.BoatsTable.FirstOrDefaultAsync(x => x.Id == id);
            if (boat == null)
                return false;
            dbContext.BoatsTable.Remove(boat);
            await dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCrewMember(int id) {
            var crewMember = await dbContext.CrewMembersTable.FirstOrDefaultAsync(x => x.Id == id);
            if (crewMember == null)
                return false;
            dbContext.CrewMembersTable.Remove(crewMember);
            return true;
        }

        public async Task<IEnumerable<Boat>> GetAllBoats() {
            return await dbContext.BoatsTable.Include(x=>x.Crew).ToListAsync();
        }

        public async Task<IEnumerable<CrewMember>> GetAllCrewMembers() {
            return await dbContext.CrewMembersTable.ToListAsync();
        }

        public async Task<IEnumerable<CrewMember>> GetAllCrewMembersForBoat(int boatId) {
            return await dbContext.CrewMembersTable.Where(x => x.Boat.Id == boatId).ToListAsync();
        }

        public async Task<Boat> GetBoat(int id) {
            return await dbContext.BoatsTable.Include(x=>x.Crew).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<CrewMember> GetCrewMember(int id) {
            return await dbContext.CrewMembersTable.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Boat> UpdateBoat(int id, BoatForm boat) {
            var b = await dbContext.BoatsTable.FirstOrDefaultAsync(x => x.Id == id);
            b.Name = boat.Name;
            b.BuildNumber = boat.BuildNumber;
            b.Producer = boat.Producer;
            b.B = boat.B;
            b.LOA = boat.LOA;
            b.Picture = boat.Picture;
            dbContext.BoatsTable.Update(b);
            await dbContext.SaveChangesAsync();
            return b;
        }
        
        public async Task<CrewMember> UpdateCrewMember(int id, CrewMemberForm crewMember) {
            var cm = await dbContext.CrewMembersTable.FirstOrDefaultAsync(x => x.Id == id);
            cm.Name = crewMember.Name;
            cm.Age = crewMember.Age;
            cm.Email = crewMember.Email;
            cm.Role = crewMember.Role;
            cm.Picture = crewMember.Picture;
            //cm.CertifiedUntil = crewMember.CertifiedUntil;
            dbContext.CrewMembersTable.Update(cm);
            return cm;
        }

    }
}
