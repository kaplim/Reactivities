using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class ListActivities
    {
        public class Query : IRequest<List<ActivityDto>> {}

        public class Handler : IRequestHandler<Query, List<ActivityDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            
            public async Task<List<ActivityDto>> Handle(
                Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities
                    // .Include(x => x.UserActivities)  // For eager loading
                    // .ThenInclude(x => x.AppUser)     // For eager loading
                    .ToListAsync();
                    
                return _mapper
                    .Map<List<Activity>, List<ActivityDto>>(activities);
            }

            // private readonly DataContext _context;
            // private readonly ILogger _logger;
            
            // public Handler(DataContext context, ILogger<ListActivities> logger)
            // {
            //     _context = context;
            //     _logger = logger;
            // }

            // public async Task<List<Activity>> Handle(
            //     Query request, CancellationToken cancellationToken)
            // {
            //     try
            //     {
            //         for (var i = 0; i < 10; i++)
            //         {
            //             cancellationToken.ThrowIfCancellationRequested();
            //             await Task.Delay(1000, cancellationToken);
            //             _logger.LogInformation($"Task {i} has completed.");
            //         }
            //     }
            //     catch (Exception ex) when (ex is TaskCanceledException)
            //     {
            //         _logger.LogInformation("Task was cancelled.");
            //     }

            //     var activities = await _context.Activities.ToListAsync(cancellationToken);
            //     return activities;
            // }
        }
    }
}