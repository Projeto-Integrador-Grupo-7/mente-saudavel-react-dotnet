using MenteSaudavel.Server._03.Data.Entities;

namespace MenteSaudavel.Server._02.Services.Interfaces.Repositories
{
    public interface IQuestionarioRepository : IRepository<Questionario>
    {
        Task<List<Questionario>> GetUltimoQuestionarioRespondidoPorCadaUsuario();
    }
}