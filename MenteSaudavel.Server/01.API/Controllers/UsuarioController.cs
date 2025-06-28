using MenteSaudavel.Server._02.Services.Interfaces.Services;
using MenteSaudavel.Server._03.Data.ValueObjects;
using MenteSaudavel.Server._04.Infrastructure.Dto;
using Microsoft.AspNetCore.Mvc;

namespace MenteSaudavel.Server._01.API.Controllers
{
    [ApiController]
    [Route("api/usuarios")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> ValidarLogin([FromBody] Dictionary<string, string> dados)
        {
            try
            {
                UsuarioTO usuarioTO = new UsuarioTO
                {
                    Email = new Email(dados["email"]),
                    Senha = dados["senha"]
                };

                UsuarioTO usuario = await _usuarioService.ValidarLogin(usuarioTO);

                return Ok(usuario);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { Mensagem = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Mensagem = "Ocorreu um erro ao validar email e senha.", Detalhes = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetUsuariosAsync()
        {
            try
            {
                List<UsuarioTO> listaUsuario = await _usuarioService.GetUsuariosAsync();

                if (!listaUsuario.Any())
                {
                    return NotFound("Nenhum usuário encontrado.");
                }

                return Ok(listaUsuario);
            }
            catch
            {
                return StatusCode(500, "Ocorreu um erro ao buscar os usuários.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CriarUsuarioAsync(UsuarioTO usuarioTO)
        {
            try
            {
                usuarioTO = await _usuarioService.CriarUsuarioAsync(usuarioTO);

                return Ok(usuarioTO);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch
            {
                return StatusCode(500, "Ocorreu um erro ao cadastrar o usuário.");
            }
        }
    }   
}