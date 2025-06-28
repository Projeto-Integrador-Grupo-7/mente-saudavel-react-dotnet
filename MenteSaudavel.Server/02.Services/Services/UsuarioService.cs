using MenteSaudavel.Server._02.Services.Interfaces.Services;
using MenteSaudavel.Server._03.Data.Entities;
using MenteSaudavel.Server._04.Infrastructure.Dto;
using Microsoft.EntityFrameworkCore;

namespace MenteSaudavel.Server._02.Services.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUnitOfWork _unitOfWork;

        public UsuarioService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<UsuarioTO> ValidarLogin(UsuarioTO usuarioTO)
        {
            Usuario? usuario = await _unitOfWork.UsuarioRepository.GetUsuarioByEmailESenha(usuarioTO);

            if (usuario is null)
            {
                throw new ArgumentException("Email ou senha incorretos.");
            }

            return usuario.ToDto();
        }

        public async Task<List<UsuarioTO>> GetUsuariosAsync()
        {
            List<Usuario> listaUsuarios = await _unitOfWork.UsuarioRepository.GetAll().ToListAsync();

            List<UsuarioTO> listaUsuariosTO = listaUsuarios.Select(usuario => usuario.ToDto()).ToList();

            return listaUsuariosTO;
        }

        public async Task<UsuarioTO> CriarUsuarioAsync(UsuarioTO usuarioTO)
        {
            Usuario usuario = new Usuario(usuarioTO);

            _unitOfWork.UsuarioRepository.Add(usuario);
            await _unitOfWork.SaveChangesAsync();

            usuarioTO.UsuarioId = usuario.Id;

            return usuarioTO;
        }
    }
}