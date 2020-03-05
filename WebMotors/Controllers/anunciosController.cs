using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using WebMotors.Models;
using System.Threading.Tasks;

namespace WebMotors.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class anunciosController : Controller
    {
        private anunciosContext _anunciosContext;

        public anunciosController(anunciosContext context)
        {
            _anunciosContext = context;
        }

     
 // GET api/values
 
        [HttpGet]
        public ActionResult<IEnumerable<anuncios>> Get()
        {
            return _anunciosContext.anuncios.ToList();
        }

        [HttpGet]
        [Route("getbyid/{id}")]
        public ActionResult<anuncios> GetById(int id)
        {
            if (id <= 0)
            {
                return NotFound("O ID do anuncio deve ser maior que zero");
            }
            anuncios anuncio = _anunciosContext.anuncios.FirstOrDefault(s => s.Id == id);
            if (anuncio == null)
            {
                return NotFound("Anuncio não encontrado");
            }
            return Ok(anuncio);
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromBody]anuncios anuncios)
        {
            if (anuncios == null)
            {
                return NotFound("Os dados do anuncio não  foi fornecido");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _anunciosContext.anuncios.AddAsync(anuncios);
            await _anunciosContext.SaveChangesAsync();
            return Ok(anuncios);
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody]anuncios anuncio)
        {
            if (anuncio == null)
            {
                return NotFound("Os dados do anuncio não foi fornecido");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            anuncios existingAnuncio = _anunciosContext.anuncios.FirstOrDefault(s => s.Id == anuncio.Id);
            if (existingAnuncio == null)
            {
                return NotFound("O anuncio não existe no banco de dados");
            }
            existingAnuncio.Marca           = anuncio.Marca;
            existingAnuncio.Modelo          = anuncio.Modelo;
            existingAnuncio.Ano             = anuncio.Ano;
            existingAnuncio.Quilometragem   = anuncio.Quilometragem;
            existingAnuncio.Observacao      = anuncio.Observacao;
  

            _anunciosContext.Attach(existingAnuncio).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await _anunciosContext.SaveChangesAsync();
            return Ok(existingAnuncio);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound("O ID não fornecido para deletar");
            }
            anuncios anuncio = _anunciosContext.anuncios.FirstOrDefault(s => s.Id == id);
            if (anuncio == null)
            {
                return NotFound("Nenhum anuncio encontrado com o ID específico fornecido");
            }
            _anunciosContext.anuncios.Remove(anuncio);
            await _anunciosContext.SaveChangesAsync();
            return Ok("Anuncio deletado com sucesso.");
        }

        ~anunciosController()
        {
            _anunciosContext.Dispose();
        }


    }
}