using MenteSaudavel.Server._04.Infrastructure.Dto;

namespace MenteSaudavel.Server._02.Services.Interfaces.Services
{
    public interface ITokenService
    {
        void GenerateToken(ref UsuarioTO usuarioTO);
    }
}