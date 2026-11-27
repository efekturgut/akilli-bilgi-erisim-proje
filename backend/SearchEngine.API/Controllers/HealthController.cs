using Microsoft.AspNetCore.Mvc;

namespace SearchEngine.API.Controllers;

[ApiController]
[Route("api/health")]
public sealed class HealthController : ControllerBase
{
    [HttpGet]
    public ActionResult<HealthResponse> Get() => new HealthResponse("ok");
}

public sealed record HealthResponse(string Status);
