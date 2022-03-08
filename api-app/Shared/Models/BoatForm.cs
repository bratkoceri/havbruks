using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Models
{
    public class BoatForm
    {
        public string Name { get; set; }
        public string Producer { get; set; }
        public int BuildNumber { get; set; }
        public double LOA { get; set; }
        public double B { get; set; }
        public string Picture { get; set; }
    }
}
