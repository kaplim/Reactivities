using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<ActivityDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ActivityDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ActivityDto> Handle(
                Query request, CancellationToken cancellationToken)
            {
                //throw new Exception("Computer exception");

                var activity = await _context.Activities.FindAsync(request.Id);
                    // .Include(x => x.UserActivities)  // For eager loading
                    // .ThenInclude(x => x.AppUser)
                    // .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { Activity = "Not found" });
                
                var activityToReturn =
                    _mapper.Map<Activity, ActivityDto>(activity);

                return activityToReturn;
            }
        }
    }
}