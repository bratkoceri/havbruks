using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Shared.Models
{
    public class Boat {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Producer { get; set; }
        public int BuildNumber { get; set; }
        public double LOA { get; set; }
        public double B { get; set; }
        public string Picture { get; set; }
        public ICollection<CrewMember> Crew { get; set; }
    }
}
