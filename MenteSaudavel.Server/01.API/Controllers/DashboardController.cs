using MenteSaudavel.Server._02.Services.Interfaces.Services;
using MenteSaudavel.Server._04.Infrastructure.Enums;
using MenteSaudavel.Server._04.Infrastructure.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace MenteSaudavel.Server._01.API.Controllers
{
    [ApiController]
    [Route("api/dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly IQuestionarioService _questionarioService;

        public DashboardController(IQuestionarioService questionarioService)
        {
            _questionarioService = questionarioService;
        }

        [HttpGet("graficoPizza")]
        public async Task<IActionResult> GetQtdeUsuariosPorEstratificacao()
        {
            try
            {
                //Dictionary<string, int> qtdeUsuariosPorEstratificacao = await _questionarioService.GetQtdeUsuariosPorEstratificacao();

                Dictionary<string, int> qtdeUsuariosPorEstratificacao = new Dictionary<string, int>
                {
                    { EnumEstratificacao.NaoIdentificado.GetDisplayName(), 400 },
                    { EnumEstratificacao.Leve.GetDisplayName(), 300 },
                    { EnumEstratificacao.Moderado.GetDisplayName(), 100 },
                    { EnumEstratificacao.Grave.GetDisplayName(), 200 }
                };

                if (!qtdeUsuariosPorEstratificacao.Any())
                {
                    return NotFound("Nenhum questionário foi respondido ainda.");
                }

                return Ok(qtdeUsuariosPorEstratificacao);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro ao buscar os questionários mais recentes de cada usuário.");
            }
        }
    }
}
