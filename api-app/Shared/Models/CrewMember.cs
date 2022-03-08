﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Shared.Models
{
    public class CrewMember {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Picture { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public Role Role { get; set; }
        public DateTime CertifiedUntil { get; set; }

        [JsonIgnore]
        public Boat Boat { get; set; }
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Role {
        Captain,
        DeckCadet,
        ChiefEngineer,
        Motorman,
    }
}
