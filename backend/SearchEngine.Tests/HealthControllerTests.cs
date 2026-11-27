using SearchEngine.API.Controllers;
using Xunit;

namespace SearchEngine.Tests;

public sealed class HealthControllerTests
{
    [Fact]
    public void Get_ReturnsOkStatus()
    {
        var controller = new HealthController();

        var response = controller.Get();

        Assert.NotNull(response.Value);
        Assert.Equal("ok", response.Value.Status);
    }
}
