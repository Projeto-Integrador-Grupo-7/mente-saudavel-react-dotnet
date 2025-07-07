namespace MenteSaudavel.Server._04.Infrastructure.Extensions
{
    public static class DateExtensions
    {
        public static string GetDataHorario(this DateTime datetime)
        {
            return datetime.ToShortDateString() + " " + datetime.ToLongTimeString();
        }
    }
}
