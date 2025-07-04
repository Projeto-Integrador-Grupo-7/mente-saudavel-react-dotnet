using MenteSaudavel.Server._02.Services.Interfaces.Services;
using MenteSaudavel.Server._02.Services.Services;
using MenteSaudavel.Server._03.Data.ValueObjects;
using MenteSaudavel.Server._04.Infrastructure.Dto;
using MenteSaudavel.Server._04.Infrastructure.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace MenteSaudavel.Server._01.API.Controllers
{
    [ApiController]
    [Route("api/usuarios")]
    public class UsuarioController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(ITokenService tokenService, IUsuarioService usuarioService)
        {
            _tokenService = tokenService;
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

                _tokenService.GenerateToken(ref usuario);

                if (string.IsNullOrEmpty(usuario.Token))
                {
                    throw new TokenException("O servidor não conseguiu gerar o token de autenticação. Por favor, contate o administrador do sistema.");
                }

                return Ok(usuario);
            }
            catch (TokenException ex)
            {
                return Unauthorized(new { Mensagem = "Falha ao gerar token de autenticação.", Detalhes = ex.Message });
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
        public async Task<IActionResult> GetUsuarios()
        {
            try
            {
                List<UsuarioTO> listaUsuario = await _usuarioService.GetUsuarios();

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
        public async Task<IActionResult> CriarUsuario([FromBody] Dictionary<string, string> dados)
        {
            try
            {
                string dataNascimento = dados["dataNascimento"];
                string[] arrayDataNascimento = dataNascimento.Split('-');

                UsuarioTO usuarioTO = new UsuarioTO
                {
                    Nome = dados["nome"],
                    Email = new Email(dados["email"]),
                    Senha = dados["senha"],
                    DataNascimento = new DateOnly(int.Parse(arrayDataNascimento[0]), int.Parse(arrayDataNascimento[1]), int.Parse(arrayDataNascimento[2])),
                    Genero = new Genero(char.Parse(dados["sexo"]))
                };

                usuarioTO = await _usuarioService.CriarUsuario(usuarioTO);

                return Ok(usuarioTO);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { Mensagem = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Mensagem = "Ocorreu um erro ao tentar cadastrar o usuário.", Detalhes = ex.Message });
            }
        }
    }   
}