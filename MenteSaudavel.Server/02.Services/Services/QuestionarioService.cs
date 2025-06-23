using MenteSaudavel.Server._02.Services.Interfaces.Services;
using MenteSaudavel.Server._03.Data.Entities;
using MenteSaudavel.Server._04.Infrastructure.Dto;

namespace MenteSaudavel.Server._02.Services.Services
{
    public class QuestionarioService : IQuestionarioService
    {
        private readonly IUnitOfWork _unitOfWork;

        public QuestionarioService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<QuestionarioTO> CriarQuestionarioAsync(QuestionarioTO questionarioTO)
        {
            Usuario? respondente = _unitOfWork.UsuarioRepository.GetById(questionarioTO.RespondenteId);

            Questionario questionario = new Questionario(respondente);

            CadastrarRespostas(ref questionario, questionarioTO.ListaRespostas);

            questionario.CalcularPontuacao();
            questionario.DefinirEstratificacao();

            _unitOfWork.QuestionarioRepository.Add(questionario);

            await _unitOfWork.SaveChangesAsync();

            questionarioTO.Id = questionario.Id;
            questionarioTO.DataEnvio = questionario.DataEnvio;
            questionarioTO.ListaRespostas = questionario.Respostas.Select(resposta => resposta.ToDto()).ToList();

            return questionarioTO;
        }

        private void CadastrarRespostas(ref Questionario questionario, List<RespostaTO> listaRespostas)
        {
            foreach (RespostaTO respostaTO in listaRespostas)
            {
                Resposta resposta = new Resposta(questionario, respostaTO);

                questionario.AdicionarResposta(resposta);
            }
        }
    }
}