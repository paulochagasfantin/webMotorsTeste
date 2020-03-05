using Microsoft.EntityFrameworkCore;


namespace WebMotors.Models
{
    public class anunciosContext: DbContext
    {


        public anunciosContext(DbContextOptions options) : base(options)
        { }

        public DbSet<anuncios> anuncios { get; set; }


    }
}