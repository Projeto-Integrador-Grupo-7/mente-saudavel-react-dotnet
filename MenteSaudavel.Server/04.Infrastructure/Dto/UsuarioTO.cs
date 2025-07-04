using MenteSaudavel.Server._03.Data.ValueObjects;

namespace MenteSaudavel.Server._04.Infrastructure.Dto
{
    public class UsuarioTO
    {
        public Guid? UsuarioId { get; set; }

        public string Nome { get; set; }

        public Email Email { get; set; }

        public string Senha { get; set; }

        public DateOnly DataNascimento { get; set; }

        public Genero Genero { get; set; }

        public string? Token { get; set; }
    }
}