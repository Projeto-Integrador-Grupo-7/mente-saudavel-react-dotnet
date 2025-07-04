using MenteSaudavel.Server._02.Services.Interfaces.Services;
using MenteSaudavel.Server._03.Data.ValueObjects;
using MenteSaudavel.Server._04.Infrastructure.Dto;
using MenteSaudavel.Server._04.Infrastructure.Enums;
using MenteSaudavel.Server._04.Infrastructure.Extensions;
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
                List<QuestionarioTO> listaQuestionariosRespondidos = new List<QuestionarioTO>
                {
                    new QuestionarioTO
                    {
                        Id = Guid.NewGuid(),
                        Estratificacao = new Estratificacao(10),
                        Pontuacao = 10,
                        DataEnvio = DateTime.Now.AddDays(-8).GetDataHorario()
                    },
                    new QuestionarioTO
                    {
                        Id = Guid.NewGuid(),
                        Estratificacao = new Estratificacao(0),
                        Pontuacao = 0,
                        DataEnvio = DateTime.Now.AddDays(-1).GetDataHorario()
                    },
                    new QuestionarioTO
                    {
                        Id = Guid.NewGuid(),
                        Estratificacao = new Estratificacao(20),
                        Pontuacao = 20,
                        DataEnvio = DateTime.Now.GetDataHorario()
                    },
                    new QuestionarioTO
                    {
                        Id = Guid.NewGuid(),
                        Estratificacao = new Estratificacao(3),
                        Pontuacao = 3,
                        DataEnvio = DateTime.Now.AddDays(-5).GetDataHorario()
                    },
                    new QuestionarioTO
                    {
                        Id = Guid.NewGuid(),
                        Estratificacao = new Estratificacao(1),
                        Pontuacao = 1,
                        DataEnvio = DateTime.Now.AddDays(-10).GetDataHorario()
                    }
                };

                //List<QuestionarioTO> listaQuestionariosRespondidos = await _usuarioService.GetHistoricoByUsuarioId(usuarioId);

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
