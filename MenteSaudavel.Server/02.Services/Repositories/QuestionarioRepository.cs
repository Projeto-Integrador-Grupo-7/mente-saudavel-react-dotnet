using MenteSaudavel.Server._02.Services.Interfaces.Repositories;
using MenteSaudavel.Server._03.Data.Entities;

namespace MenteSaudavel.Server._02.Services.Repositories
{
    public class QuestionarioRepository : GenericRepository<Questionario>, IQuestionarioRepository
    {
        public QuestionarioRepository(DataBaseContext context) : base(context)
        {
        }
    }
}