using MenteSaudavel.Server._04.Infrastructure.Dto;

namespace MenteSaudavel.Server._02.Services.Interfaces.Services
{
    public interface IQuestionarioService
    {
        Task<QuestionarioTO> CriarQuestionario(QuestionarioTO questionarioTO);

        Task<Dictionary<string, int>> GetQtdeUsuariosPorEstratificacao();
    }
}