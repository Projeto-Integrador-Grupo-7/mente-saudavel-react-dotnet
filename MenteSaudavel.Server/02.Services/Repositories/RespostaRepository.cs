using MenteSaudavel.Server._02.Services.Interfaces.Repositories;
using MenteSaudavel.Server._03.Data.Entities;

namespace MenteSaudavel.Server._02.Services.Repositories
{
    public class RespostaRepository : GenericRepository<Resposta>, IRespostaRepository
    {
        public RespostaRepository(DataBaseContext context) : base(context)
        {
        }
    }
}