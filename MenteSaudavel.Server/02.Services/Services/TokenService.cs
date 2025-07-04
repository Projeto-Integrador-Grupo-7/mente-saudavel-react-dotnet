using MenteSaudavel.Server._02.Services.Interfaces.Services;
using MenteSaudavel.Server._04.Infrastructure.Dto;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MenteSaudavel.Server._02.Services.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void GenerateToken(ref UsuarioTO usuarioTO)
        {
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();

            byte[] key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

            SigningCredentials credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = GenerateClaims(usuarioTO),
                SigningCredentials = credentials,
                Expires = DateTime.UtcNow.AddHours(5)
            };

            SecurityToken token = handler.CreateToken(tokenDescriptor);

            usuarioTO.Token = handler.WriteToken(token);
        }

        private static ClaimsIdentity GenerateClaims(UsuarioTO usuarioTO)
        {
            ClaimsIdentity claimsIdentity = new ClaimsIdentity();
            claimsIdentity.AddClaim(new Claim(ClaimTypes.NameIdentifier, usuarioTO.UsuarioId.ToString()));
            claimsIdentity.AddClaim(new Claim(ClaimTypes.Name, usuarioTO.Nome));
            claimsIdentity.AddClaim(new Claim(ClaimTypes.Email, usuarioTO.Email.Endereco));

            return claimsIdentity;
        }
    }
}