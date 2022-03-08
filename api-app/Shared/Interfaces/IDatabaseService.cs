using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace Shared.Interfaces {
    public interface IDatabaseService {
        Task<IEnumerable<Boat>> GetAllBoats();
        Task<Boat> GetBoat(int id);
        Task<Boat> CreateNewBoat(BoatForm boat);
        Task<bool> DeleteBoat(int id);
        Task<Boat> UpdateBoat(int id, BoatForm boat);
        Task<IEnumerable<CrewMember>> GetAllCrewMembers();
        Task<IEnumerable<CrewMember>> GetAllCrewMembersForBoat(int boatId);
        Task<CrewMember> GetCrewMember(int id);
        Task<CrewMember> CreateNewCrewMember(CrewMemberForm crewMember, int boatId);
        Task<bool> DeleteCrewMember(int id);
        Task<CrewMember> UpdateCrewMember(int id, CrewMemberForm crewMember);
    }
}
