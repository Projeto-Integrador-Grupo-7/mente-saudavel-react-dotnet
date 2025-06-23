using MenteSaudavel.Server._04.Infrastructure.Dto;

namespace MenteSaudavel.Server._02.Services.Interfaces.Services
{
    public interface IUsuarioService
    {
        Task<List<UsuarioTO>> GetUsuariosAsync();

        Task<UsuarioTO> CriarUsuarioAsync(UsuarioTO usuarioTO);
    }
}