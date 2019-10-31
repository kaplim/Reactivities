using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // [Route("api/[controller]")]
    // [ApiController]
    public class ActivitiesController : BaseController  //Controller
    {
        // private readonly IMediator _mediator;
        // public ActivitiesController(IMediator mediator)
        // {
        //     _mediator = mediator;
        // }
        
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await Mediator.Send(new ListActivities.Query());
        }
        // public async Task<ActionResult<List<Activity>>> List(
        //     CancellationToken cancellationToken)
        // {
        //     return await _mediator.Send(new ListActivities.Query(),
        //         cancellationToken);
        // }

        [HttpGet("{id}")]
        //[Authorize]
        public async Task<Activity> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(
            [FromBody]Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id,
            [FromBody]Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command{Id = id});
        }
    }
}