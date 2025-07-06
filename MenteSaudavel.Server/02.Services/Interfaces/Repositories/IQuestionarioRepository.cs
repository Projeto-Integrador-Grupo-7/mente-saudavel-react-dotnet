using MenteSaudavel.Server._03.Data.Entities;

namespace MenteSaudavel.Server._02.Services.Interfaces.Repositories
{
    public interface IQuestionarioRepository : IRepository<Questionario>
    {
        Task<Questionario?> GetQuestionarioComRespostas(Guid questionarioId);

        Task<List<Questionario>> GetUltimoQuestionarioRespondidoPorCadaUsuario();

        IQueryable<Questionario> GetQuestionariosByUsuarioId(Guid usuarioId);
    }
}