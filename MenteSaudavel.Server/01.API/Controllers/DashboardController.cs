using MenteSaudavel.Server._02.Services.Interfaces.Services;
using MenteSaudavel.Server._04.Infrastructure.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MenteSaudavel.Server._01.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        private readonly IQuestionarioService _questionarioService;

        public DashboardController(IUsuarioService usuarioService, IQuestionarioService questionarioService)
        {
            _usuarioService = usuarioService;
            _questionarioService = questionarioService;
        }

        [HttpPost("historico")]
        public async Task<IActionResult> GetQuestionariosRespondidosByUsuarioId([FromBody] Guid usuarioId)
        {
            try
            {
                List<QuestionarioTO> listaQuestionariosRespondidos = await _usuarioService.GetHistoricoByUsuarioId(usuarioId);

                if (!listaQuestionariosRespondidos.Any())
                {
                    return NotFound("Você ainda não respondeu nenhum questionário.");
                }

                return Ok(listaQuestionariosRespondidos);
            }
            catch
            {
                return StatusCode(500, "Ocorreu um erro ao buscar o histórico de questionários respondidos.");
            }
        }

        [HttpGet("graficoPizza")]
        public async Task<IActionResult> GetQtdeUsuariosPorEstratificacao()
        {
            try
            {
                Dictionary<string, int> qtdeUsuariosPorEstratificacao = await _questionarioService.GetQtdeUsuariosPorEstratificacao();

                if (!qtdeUsuariosPorEstratificacao.Any())
                {
                    return NotFound("Nenhum questionário foi respondido ainda.");
                }

                return Ok(qtdeUsuariosPorEstratificacao);
            }
            catch
            {
                return StatusCode(500, "Ocorreu um erro ao buscar os questionários mais recentes de cada usuário.");
            }
        }
    }
}
