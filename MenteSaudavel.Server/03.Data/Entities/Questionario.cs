using MenteSaudavel.Server._03.Data.ValueObjects;
using MenteSaudavel.Server._04.Infrastructure.Dto;
using MenteSaudavel.Server._04.Infrastructure.Extensions;

namespace MenteSaudavel.Server._03.Data.Entities
{
    public class Questionario : Entity
    {
        #region PROPRIEDADES
        private Usuario _respondente;
        public Usuario Respondente
        {
            get
            {
                return _respondente;
            }
            set
            {
                if (value is null)
                {
                    throw new ArgumentException("Respondente não pode ser nulo.");
                }

                _respondente = value;
            }
        }

        public int? Pontuacao { get; private set; }

        public Estratificacao? Estratificacao { get; private set; }

        public DateTime DataEnvio { get; private set; }

        public List<Resposta> Respostas { get; private set; } = new List<Resposta>();
        #endregion

        #region CONSTRUTORES
        internal Questionario() { }

        public Questionario(Usuario? respondente)
        {
            Respondente = respondente;
            DataEnvio = DateTime.Now;
        }
        #endregion

        #region METODOS
        public void AdicionarResposta(Resposta resposta)
        {
            Respostas.Add(resposta);
        }

        public void CalcularPontuacao()
        {
            Pontuacao = Respostas.Count(resposta => resposta.Valor);
        }

        public void DefinirEstratificacao()
        {
            if (!Pontuacao.HasValue)
            {
                throw new ArgumentException("Pontuação deve ser calculada antes de definir a estratificação.");
            }

            Estratificacao = new Estratificacao(Pontuacao.Value);
        }

        public QuestionarioTO ToDto()
        {
            return new QuestionarioTO()
            {
                Id = Id,
                Pontuacao = Pontuacao,
                Estratificacao = Estratificacao,
                DataEnvio = DataEnvio.GetDataHorario()
            };
        }
        #endregion

        #region VALIDACOES

        #endregion
    }
}
