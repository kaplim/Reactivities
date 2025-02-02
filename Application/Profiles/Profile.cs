using System.Collections.Generic;
using Domain;
//using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace Application.Profiles
{
    public class Profile
    {
        public string DisplayName { get; set; }
        public string Username { get; set; }
        public string Image { get; set; }
        public string Bio { get; set; }

        //[JsonProperty("following")]
        [JsonPropertyName("following")]
        public bool IsFollowed { get; set; }
        
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}