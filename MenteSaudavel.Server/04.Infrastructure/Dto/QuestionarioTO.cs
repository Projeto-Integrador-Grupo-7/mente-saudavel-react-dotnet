using MenteSaudavel.Server._03.Data.ValueObjects;

namespace MenteSaudavel.Server._04.Infrastructure.Dto
{
    public class QuestionarioTO
    {
        public Guid? Id { get; set; }

        public Guid RespondenteId { get; set; }
        public string? RespondenteNome { get; set; }

        public int? Pontuacao { get; set; }

        public Estratificacao? Estratificacao { get; set; }

        public DateTime? DataEnvio { get; set; }

        public List<RespostaTO> ListaRespostas { get; set; }
    }
}