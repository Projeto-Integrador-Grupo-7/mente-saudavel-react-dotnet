using MenteSaudavel.Server._04.Infrastructure.Dto;

namespace MenteSaudavel.Server._02.Services.Interfaces.Services
{
    public interface IUsuarioService
    {
        Task<UsuarioTO> ValidarLogin(UsuarioTO usuarioTO);

        Task<List<UsuarioTO>> GetUsuarios();

        Task<UsuarioTO> CriarUsuario(UsuarioTO usuarioTO);

        Task<List<QuestionarioTO>> GetHistoricoByUsuarioId(Guid usuarioId);
    }
}