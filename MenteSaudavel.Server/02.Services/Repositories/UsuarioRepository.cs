using MenteSaudavel.Server._02.Services.Interfaces.Repositories;
using MenteSaudavel.Server._03.Data.Entities;
using MenteSaudavel.Server._04.Infrastructure.Dto;
using Microsoft.EntityFrameworkCore;

namespace MenteSaudavel.Server._02.Services.Repositories
{
    public class UsuarioRepository : GenericRepository<Usuario>, IUsuarioRepository
    {
        public UsuarioRepository(DataBaseContext context) : base(context)
        {
        }

        public Task<Usuario?> GetUsuarioByEmailESenha(UsuarioTO usuarioTO)
        {
            return Find(usuario =>
                usuario.Email.Endereco == usuarioTO.Email.Endereco &&
                usuario.Senha == usuarioTO.Senha)
                .SingleOrDefaultAsync();
        }

        public Task<Usuario?> GetUsuarioComQuestionarios(Guid usuarioId)
        {
            return Find(usuario => usuario.Id == usuarioId)
                .Include(usuario => usuario.Questionarios)
                .SingleOrDefaultAsync();
        }
    }
}