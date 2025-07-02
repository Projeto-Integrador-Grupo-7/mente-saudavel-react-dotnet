using MenteSaudavel.Server._02.Services.Interfaces.Services;
using MenteSaudavel.Server._04.Infrastructure.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MenteSaudavel.Server._01.API.Controllers
{
    [ApiController]
    [Route("api/questionarios")]
    //[Authorize]
    public class QuestionarioController : ControllerBase
    {
        private readonly IQuestionarioService _questionarioService;

        public QuestionarioController(IQuestionarioService questionarioService)
        {
            _questionarioService = questionarioService;
        }

        [HttpPost]
        public async Task<IActionResult> CriarQuestionario(QuestionarioTO questionarioTO)
        {
            try
            {
                questionarioTO = await _questionarioService.CriarQuestionario(questionarioTO);

                return Ok(questionarioTO);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro ao submeter o questionário.");
            }
        }
    }
}