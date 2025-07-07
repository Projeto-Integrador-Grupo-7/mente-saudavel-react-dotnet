namespace MenteSaudavel.Server._04.Infrastructure.Dto
{
    public class QuestionarioRequestTO
    {
        public Guid UsuarioId { get; set; }
        public Dictionary<string, bool> Respostas { get; set; }
    }
}