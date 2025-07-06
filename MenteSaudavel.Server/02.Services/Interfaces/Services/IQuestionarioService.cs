using MenteSaudavel.Server._04.Infrastructure.Dto;

namespace MenteSaudavel.Server._02.Services.Interfaces.Services
{
    public interface IQuestionarioService
    {
        Task<QuestionarioTO> GetQuestionario(Guid questionarioId);

        Task<QuestionarioTO> CriarQuestionario(QuestionarioTO questionarioTO);

        Task<List<QuestionarioTO>> GetQuestionariosByUsuarioId(DashboardRequestTO requestTO);

        Task<Dictionary<string, int>> GetQtdeUsuariosPorEstratificacao(DashboardTO dashboardTO);
    }
}