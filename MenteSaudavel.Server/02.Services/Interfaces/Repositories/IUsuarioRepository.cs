using MenteSaudavel.Server._03.Data.Entities;
using MenteSaudavel.Server._04.Infrastructure.Dto;

namespace MenteSaudavel.Server._02.Services.Interfaces.Repositories
{
    public interface IUsuarioRepository : IRepository<Usuario>
    {
        Task<Usuario?> GetUsuarioByEmailESenha(UsuarioTO usuarioTO);

        Task<Usuario?> GetUsuarioComQuestionarios(Guid usuarioId);
    }
}