using MenteSaudavel.Server._02.Services.Interfaces.Repositories;
using MenteSaudavel.Server._03.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace MenteSaudavel.Server._02.Services.Repositories
{
    public class QuestionarioRepository : GenericRepository<Questionario>, IQuestionarioRepository
    {
        public QuestionarioRepository(DataBaseContext context) : base(context)
        {
        }

        public async Task<List<Questionario>> GetUltimoQuestionarioRespondidoPorCadaUsuario()
        {
            return await GetAll()
                .GroupBy(q => q.Respondente.Id)
                .Select(g => g.OrderByDescending(q => q.DataEnvio).First())
                .ToListAsync();
        }
    }
}