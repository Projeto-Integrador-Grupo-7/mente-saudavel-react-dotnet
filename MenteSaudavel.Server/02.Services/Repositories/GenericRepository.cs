using MenteSaudavel.Server._02.Services.Interfaces.Repositories;

namespace MenteSaudavel.Server._02.Services.Repositories
{
    public class GenericRepository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly DataBaseContext _context;

        public GenericRepository(DataBaseContext context)
        {
            _context = context;
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public virtual IQueryable<TEntity> GetAll()
        {
            return _context.Set<TEntity>().AsQueryable();
        }

        public virtual TEntity? GetById(Guid id)
        {
            return _context.Find<TEntity>(id);
        }

        public virtual void Add(TEntity entity)
        {
            _context.Add(entity);
        }

        public virtual void Update(TEntity entity)
        {
            _context.Update(entity);
        }

        public virtual void Delete(TEntity entity)
        {
            _context.Remove(entity);
        }

        public virtual IQueryable<TEntity> Find(Func<TEntity, bool> predicate)
        {
            return _context.Set<TEntity>().Where(predicate).AsQueryable();
        }

        public virtual bool Any(Func<TEntity, bool> predicate)
        {
            return _context.Set<TEntity>().Any(predicate);
        }
    }
}